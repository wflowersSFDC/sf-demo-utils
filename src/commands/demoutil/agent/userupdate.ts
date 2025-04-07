import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, Org } from '@salesforce/core';
import { singleRecordQuery } from '../../../utils/query.js';

Messages.importMessagesDirectory(dirname(fileURLToPath(import.meta.url)));
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
      let einsteinAgentUser;
      
      try {
        einsteinAgentUser = await singleRecordQuery({ conn, query });
      } catch (error) {
        this.error(messages.getMessage('error.noEinsteinAgentUser'));
      }

      if (!einsteinAgentUser || !einsteinAgentUser.Username) {
        this.error(messages.getMessage('error.noEinsteinAgentUser'));
      }

      const agentUsername = einsteinAgentUser.Username;
      this.debug(`Found Einstein Agent User: ${agentUsername}`);

      // Check if the bots directory exists
      if (!fs.existsSync(botsDir)) {
        this.error(messages.getMessage('error.noBotsDirectory'));
      }

      const files = await fs.promises.readdir(botsDir);
      const botFiles = files.filter(file => file.endsWith('.bot-meta.xml'));

      if (botFiles.length === 0) {
        this.error(messages.getMessage('error.noBotsFound'));
      }

      let updatedCount = 0;

      for (const file of botFiles) {
        const filePath = path.join(botsDir, file);
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
      }

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
}
