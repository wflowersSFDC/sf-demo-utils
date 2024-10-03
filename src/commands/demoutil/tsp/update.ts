/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable sf-plugin/no-missing-messages */
import fs from 'node:fs';
import path from 'node:path';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, Org } from '@salesforce/core';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('sf-demo-utils', 'demoutil.tsp.update');

export default class DemoutilTspUpdate extends SfCommand<any> {
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

  public async run(): Promise<any> {
    const { flags } = await this.parse(DemoutilTspUpdate);
    const policyDir = path.join(flags.directory ?? '.', 'transactionSecurityPolicies');
    const org: Org = await Org.create();
    // const conn: Connection = org.getConnection('61.0');
    const username = org.getUsername();

    if (!username) {
      this.error(messages.getMessage('error.noUsername'));
    }

    try {
      // Check if the directory exists
      if (!fs.existsSync(policyDir)) {
        this.error('No transaction security policies directory found.');
      }

      const files = await fs.promises.readdir(policyDir);

      if (files.length === 0) {
        this.error('No transaction security policy files found.');
      }

      let updatedCount = 0;

      for (const file of files) {
        if (file.endsWith('.transactionSecurityPolicy-meta.xml')) {
          const filePath = path.join(policyDir, file);
          fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
              this.error(`Error reading file ${filePath}:`, err);
            }

            content = content.replace(/<user>.*<\/user>/, `<user>${username}</user>`);
            content = content.replace(
              /<executionUser>.*<\/executionUser>/,
              `<executionUser>${username}</executionUser>`
            );

            // Assuming you want to write the updated content back to the file
            fs.writeFile(filePath, content, 'utf8', (writeErr) => {
              if (writeErr) {
                this.error(`Error writing file ${filePath}:`, writeErr);
              }

              this.logSuccess(`Updated ${filePath}`);
            });
          });
          updatedCount++;
        }
      }

      if (updatedCount === 0) {
        this.info('No transaction security policy files needed updating.');
      } else {
        this.logSuccess(`Updated ${updatedCount} transaction security policy files.`);
      }
      return `{'message':'Updated ${updatedCount} transaction security policy files.'}`;
    } catch (error) {
      if (error instanceof Error) {
        this.error(error.message, { exit: false });
      } else {
        this.error('An unknown error occurred', { exit: false });
      }
    }
  }
}
