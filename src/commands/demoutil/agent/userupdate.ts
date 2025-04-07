import * as fs from 'node:fs';
import * as path from 'node:path';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, Org } from '@salesforce/core';
import { singleRecordQuery } from '../../../utils/query.js';
import { User } from '../../../utils/typeDefs.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('sf-demo-utils', 'demoutil.agent.userupdate');

export type DemoutilAgentUserupdateResult = {
  message: string;
};

export default class DemoutilAgentUserupdate extends SfCommand<DemoutilAgentUserupdateResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    directory: Flags.directory({
      summary: messages.getMessage('flags.directory.summary'),
      char: 'd',
      exists: true,
      default: 'force-app/main/default',
    }),
  };

  public async run(): Promise<DemoutilAgentUserupdateResult> {
    const { flags } = await this.parse(DemoutilAgentUserupdate);
    const botsDir = path.join(flags.directory ?? '.', 'bots');
    const org = await Org.create();
    const conn = org.getConnection();
    const username = org.getUsername();

    if (!username) {
      this.error(messages.getMessage('error.noUsername'));
    }

    try {
      // Query for Einstein Agent User
      const query = "SELECT Id, Username FROM User WHERE Profile.Name = 'Einstein Agent User' LIMIT 1";
      let einsteinAgentUser: User;
      
      try {
        einsteinAgentUser = await singleRecordQuery({ conn, query }) as User;
      } catch (error) {
        this.error(messages.getMessage('error.noEinsteinAgentUser'));
      }

      if (!einsteinAgentUser?.Username) {
        this.error(messages.getMessage('error.noEinsteinAgentUser'));
      }

      const agentUsername = einsteinAgentUser.Username;
      this.debug(`Found Einstein Agent User: ${agentUsername}`);

      // Check if the bots directory exists
      if (!fs.existsSync(botsDir)) {
        this.error(messages.getMessage('error.noBotsDirectory'));
      }

      // Find all bot-meta.xml files recursively in the bots directory
      const botFiles = await this.findBotMetaFiles(botsDir);

      if (botFiles.length === 0) {
        this.error(messages.getMessage('error.noBotsFound'));
      }

      let updatedCount = 0;

      // Process bot files
      await Promise.all(botFiles.map(async (filePath) => {
        const content = await fs.promises.readFile(filePath, 'utf8');

        // Only update files with Einstein Service Agent type
        if (content.includes('<agentType>EinsteinServiceAgent</agentType>')) {
          // Replace botUser value with the Einstein Agent User
          const updatedContent = content.replace(/<botUser>.*<\/botUser>/, `<botUser>${agentUsername}</botUser>`);
          
          // Only write if content changed
          if (content !== updatedContent) {
            await fs.promises.writeFile(filePath, updatedContent, 'utf8');
            this.log(`Updated ${filePath}`);
            updatedCount++;
          }
        }
      }));

      if (updatedCount === 0) {
        this.info(messages.getMessage('info.noUpdateNeeded'));
        return {
          message: messages.getMessage('info.noUpdateNeeded')
        };
      } else {
        const successMessage = messages.getMessage('success.updated', [updatedCount.toString(), agentUsername]);
        this.log(successMessage);
        return {
          message: successMessage
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        this.error(error.message);
      } else {
        this.error('An unknown error occurred');
      }
      return { message: 'Error occurred' };
    }
  }
  
  // Helper function to recursively find all .bot-meta.xml files
  private async findBotMetaFiles(dir: string): Promise<string[]> {
    // Check if directory exists
    if (!fs.existsSync(dir)) {
      return [];
    }
    
    const items = await fs.promises.readdir(dir, { withFileTypes: true });
    
    // Split items into files and directories
    const botFiles: string[] = [];
    const directories: string[] = [];
    
    for (const item of items) {
      const itemPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        directories.push(itemPath);
      } else if (item.isFile() && item.name.endsWith('.bot-meta.xml')) {
        botFiles.push(itemPath);
      }
    }
    
    // Process subdirectories in parallel
    if (directories.length > 0) {
      const subDirResults = await Promise.all(
        directories.map((subDir) => this.findBotMetaFiles(subDir))
      );
      
      // Flatten the results and add to our files
      return botFiles.concat(subDirResults.flat());
    }
    
    return botFiles;
  }
}
