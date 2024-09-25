import { TestSession } from '@salesforce/cli-plugins-testkit';

describe('demoutil user password set NUTs', () => {
  let session: TestSession;

  before(async () => {
    session = await TestSession.create({ devhubAuthStrategy: 'NONE' });
  });

  after(async () => {
    await session?.clean();
  });
});
