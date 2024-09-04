import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';

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
    name: Flags.string({
      summary: messages.getMessage('flags.name.summary'),
      description: messages.getMessage('flags.name.description'),
      char: 'n',
      required: false,
    }),
  };

  public async run(): Promise<DemoutilCreateUserResult> {
    const { flags } = await this.parse(DemoutilCreateUser);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from src/commands/demoutil/create/user.ts`);
    return {
      path: 'src/commands/demoutil/create/user.ts',
    };
  }
}
