import { TestContext } from '@salesforce/core/testSetup';
// import { expect } from 'chai';
// import { stubSfCommandUx } from '@salesforce/sf-plugins-core';
// import DemoutilCreateUser from '../../../../src/commands/demoutil/create/user.js';

describe('demoutil create user', () => {
  const $$ = new TestContext();
  // let sfCommandStubs: ReturnType<typeof stubSfCommandUx>;

  beforeEach(() => {
    // sfCommandStubs = stubSfCommandUx($$.SANDBOX);
  });

  afterEach(() => {
    $$.restore();
  });

  // it('runs hello', async () => {
  //   await DemoutilCreateUser.run([]);
  //   const output = sfCommandStubs.log
  //     .getCalls()
  //     .flatMap((c) => c.args)
  //     .join('\n');
  //   expect(output).to.include('hello world');
  // });

  // it('runs hello with --json and no provided name', async () => {
  //   const result = await DemoutilCreateUser.run([]);
  //   expect(result.path).to.equal('src/commands/demoutil/create/user.ts');
  // });

  // it('runs hello world --name Astro', async () => {
  //   await DemoutilCreateUser.run(['--name', 'Astro']);
  //   const output = sfCommandStubs.log
  //     .getCalls()
  //     .flatMap((c) => c.args)
  //     .join('\n');
  //   expect(output).to.include('hello Astro');
  // });
});
