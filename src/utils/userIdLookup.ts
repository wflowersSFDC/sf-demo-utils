/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line unicorn/filename-case
import { Connection } from '@salesforce/core';
import { singleRecordQuery } from './query.js';
import { User } from './typeDefs.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function getUserId(conn: Connection, lastname: string, firstname?: string): Promise<User> {
    let query = `Select Id, Username from User where LastName = '${lastname}'`;
    if (firstname) {
        query = `${query} and FirstName = '${firstname}'`;
    }
    return singleRecordQuery({ conn, query });
}