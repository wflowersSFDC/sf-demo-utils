/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable sf-plugin/no-missing-messages */
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import got from 'got';
import { exec2JSON } from 'src/utils/exec.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('sf-demo-utils', 'demoutil.org.create.scratch');

export default class DemoutilOrgCreateScratch extends SfCommand<object> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    userprefix: Flags.string({
      summary: messages.getMessage('flags.userprefix.summary'),
      char: 'p',
    }),
    userdomain: Flags.string({
      summary: messages.getMessage('flags.userdomain.summary'),
      char: 'e',
    }),
    definitionfile: Flags.file({
      summary: messages.getMessage('flags.definitionfile.summary'),
      char: 'f',
      exists: true,
      default: 'config/user.definition.json',
    }),
    durationdays: Flags.integer({
      summary: messages.getMessage('flags.durationdays.summary'),
      char: 'd',
      min: 1,
      max: 30,
      default: 7,
    }),
    wait: Flags.integer({
      summary: messages.getMessage('flags.wait.summary'),
      char: 'w',
      min: 2,
      default: 20,
    }),
    clientid: Flags.string({
      summary: messages.getMessage('flags.clientid.summary'),
      char: 'i',
    }),
    setalias: Flags.string({
      summary: messages.getMessage('flags.setalias.summary'),
      char: 'a',
    }),
    noancestors: Flags.boolean({
      summary: messages.getMessage('flags.noancestors.summary'),
      char: 'c',
    }),
    nonamespace: Flags.boolean({
      summary: messages.getMessage('flags.nonamespace.summary'),
      char: 'n',
    }),
    setdefaultusername: Flags.boolean({
      summary: messages.getMessage('flags.setdefaultusername.summary'),
      char: 's',
    }),
  };

  public async run(): Promise<object> {
    const { flags } = await this.parse(DemoutilOrgCreateScratch);

    // Generate the unique username
    const usernameURL = 'https://unique-username-generator.herokuapp.com/unique';
    const response = await got.post(usernameURL, {
      json: { prefix: flags.userprefix, domain: flags.userdomain },
    });

    this.log('Generated unique username:', JSON.parse(response.body).message);

    let command = `sf org create scratch --json -d -f ${flags.definitionfile} -y ${flags.durationdays} -w ${
      flags.wait || 20
    }`;

    if (flags.clientid) {
      command += ` -i ${flags.clientid}`;
    }

    if (flags.setalias) {
      command += ` -a ${flags.setalias}`;
    }

    if (flags.noancestors) {
      command += ' -c';
    }

    if (flags.nonamespace) {
      command += ' -m';
    }

    if (flags.setdefaultusername) {
      command += ` --username=${JSON.parse(response.body).message}`;
    }
    this.log(`executing ${command}`);

    let cliResponse = Object;
    try {
      const execResult = await exec2JSON(command);
      this.logJson(execResult.result);
      cliResponse = execResult.result;
      if (execResult.status === 0) {
        this.logSuccess(`Org created with id ${execResult.result.orgId} and username ${execResult.result.username} `);
      }
    } catch (error) {
      this.error(`Error executing command: ${error}`);
    }

    return cliResponse;
  }
}
