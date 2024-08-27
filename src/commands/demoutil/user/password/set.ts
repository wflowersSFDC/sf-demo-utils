import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, Connection, Org } from '@salesforce/core';
import got from 'got';
import { getUserId } from '../../../../utils/userIdLookup.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('sf-demo-utils', 'demoutil.user.password.set');

export type DemoutilUserPasswordSetResult = {
  username: string;
  password: string;
};

export default class DemoutilUserPasswordSet extends SfCommand<DemoutilUserPasswordSetResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    name: Flags.string({
      summary: messages.getMessage('flags.name.summary'),
      description: messages.getMessage('flags.name.description'),
      char: 'n',
      required: false,
    }),
    firstname: Flags.string({
      summary: messages.getMessage('flags.firstname.summary'),
      char: 'g',
      required: true,
    }),
    lastname: Flags.string({
      summary: messages.getMessage('flags.lastname.summary'),
      char: 'l',
      required: true,
    }),
    password: Flags.string({
      summary: messages.getMessage('flags.password.summary'),
      char: 'p',
      required: true,
    }),
  };

  protected static requiresUsername = true;

  public async run(): Promise<DemoutilUserPasswordSetResult> {
    const { flags } = await this.parse(DemoutilUserPasswordSet);
    const org: Org = await Org.create();
    const conn: Connection = org.getConnection();
    const user = await getUserId(conn, flags.lastname, flags.firstname);
    this.log(`found user with id ${user.Id}`);

    const resetResult = await got.post({
      url: `${conn.instanceUrl}/services/data/v61.0/sobjects/User/${user.Id}/password`,
      headers: {
        Authorization: `Bearer ${conn.accessToken}`,
        'Content-Type': 'application/json',
      },
      json: {
        NewPassword: flags.password,
      },
    });

    if (resetResult.statusCode !== 204) {
      throw new Error(`Password not set correctly: ${JSON.stringify(resetResult)}`);
    }

    this.log(`Successfully set the password "${flags.password}" for user ${user.Username}.`);
    // this.log(`You can see the password again by running "sfdx force:user:display -u ${user.Username}".`);

    return {
      username: user.Username ? user.Username : '',
      password: flags.password,
    };
  }
}
