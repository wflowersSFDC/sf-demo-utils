/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { exec } from 'node:child_process';
import * as util from 'node:util';

const execProm = util.promisify(exec);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exec2JSON = async (cmd: string, options = {}): Promise<any> => {
  try {
    const results = await execProm(cmd, options);
    return JSON.parse(results.stdout);
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'stdout' in error) {
      return JSON.parse((error as { stdout: string }).stdout);
    } else {
      throw new Error('Unexpected error');
    }
  }
};

const exec2String = async (cmd: string, options = {}): Promise<unknown> => {
  try {
    const results = await execProm(cmd, options);
    return results.stdout.trim();
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'stdout' in error) {
      return (error as { stdout: string }).stdout;
    } else {
      throw new Error('Unexpected error');
    }
  }
};

export { execProm, exec2JSON, exec2String };
export { execProm as exec };
