import { TestContext } from '@salesforce/core/testSetup';
import { expect } from 'chai';
import { stubSfCommandUx } from '@salesforce/sf-plugins-core';
import DemoutilAgentUserupdate from '../../../../src/commands/demoutil/agent/userupdate.js'

describe('demoutil agent userupdate', () => {
  const $$ = new TestContext();
  let sfCommandStubs: ReturnType<typeof stubSfCommandUx>;

  beforeEach(() => {
    sfCommandStubs = stubSfCommandUx($$.SANDBOX);
  });

  afterEach(() => {
    $$.restore();
  });

  it('runs hello', async () => {
    await DemoutilAgentUserupdate.run([])
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('hello world');
  })

  it('runs hello with --json and no provided name', async () => {
    const result = await DemoutilAgentUserupdate.run([]);
    expect(result.path).to.equal('src/commands/demoutil/agent/userupdate.ts');
  });

  it('runs hello world --name Astro', async () => {
    await DemoutilAgentUserupdate.run(['--name', 'Astro']);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('hello Astro');
  });
});
