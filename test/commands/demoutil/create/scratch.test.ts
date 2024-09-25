import { TestContext } from '@salesforce/core/testSetup';

describe('demoutil create scratch', () => {
  const $$ = new TestContext();

  beforeEach(() => {});

  afterEach(() => {
    $$.restore();
  });
});
