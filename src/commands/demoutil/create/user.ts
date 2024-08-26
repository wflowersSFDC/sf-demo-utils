/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable sf-plugin/no-missing-messages */
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import got from 'got';
import { exec2JSON } from 'src/utils/exec';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('sf-demo-utils', 'demoutil.create.user');

export type DemoutilCreateUserResult = {
  path: string;
};

export default class DemoutilCreateUser extends SfCommand<DemoutilCreateUserResult> {
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

  public async run(): Promise<DemoutilCreateUserResult> {
    const { flags } = await this.parse(DemoutilCreateUser);

    // Generate the unique username
    const usernameURL = 'https://unique-username-generator.herokuapp.com/unique';
    const response = await got.post(usernameURL, {
      json: { prefix: flags.userprefix, domain: flags.userdomain },
    });

    // const name = flags.name?? 'world';
    this.log(JSON.parse(response.body).message);

    // required flags
    let command = `sfdx force:org:create --json -f ${flags.definitionfile} -d ${flags.durationdays} --wait ${
      flags.wait || 20
    }`;

    // optional value 	flags without defaults
    if (flags.clientid) {
      command += ` -i ${flags.clientid}`;
    }

    // if (flags.targetdevhubusername) {
    //     command += ` -v ${flags.targetdevhubusername}`;
    // }

    if (flags.setalias) {
      command += ` -a ${flags.setalias}`;
    }

    // optional boolean
    if (flags.noancestors) {
      command += ' -c';
    }

    if (flags.nonamespace) {
      command += ' -n';
    }

    if (flags.setdefaultusername) {
      command += ' -s';
    }

    if (flags.setdefaultusername) {
      command += ` username=${JSON.parse(response.body).message}`;
    }
    this.log(`executing ${command}`);

    const cliresponse = await exec2JSON(command);
    this.log(cliresponse);
    return {
      path: command,
    };
  }
}
