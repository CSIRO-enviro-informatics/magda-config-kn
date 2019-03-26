import createPool from "./createPool";
// import { User } from "@magda/typescript-common/dist/authorization-api/model";
import { Maybe } from "tsmonad";
import arrayToMaybe from "@magda/typescript-common/dist/util/arrayToMaybe";
import * as pg from "pg";

export interface DatabaseOptions {
    dbHost: string;
    dbPort: number;
}

export interface View {
    id?:string,
    datasetId: string
    user: string,
    datetime?: Date,
    eventType?: Number
}

export default class Database {
    private pool: pg.Pool;

    constructor(options: DatabaseOptions) {
        this.pool = createPool(options);
    }

    getViews(datasetId: string): Promise<Maybe<View>> {
        return this.pool
            .query(
                'SELECT "datasetId", count(*) as "count" FROM views WHERE "datasetId" = $1 group by "datasetId"',
                [datasetId] 
            )
            .then(res => arrayToMaybe(res.rows));
    }

    // getUsers(): Promise<User[]> {
    //     return this.pool
    //         .query(
    //             `SELECT id, "displayName", email, "photoURL", source, "isAdmin" FROM users WHERE id <> '00000000-0000-4000-8000-000000000000'`
    //         )
    //         .then(res => res.rows);
    // }

    // async updateUser(userId: string, update: any): Promise<void> {
    //     await this.pool.query(`UPDATE users SET "isAdmin" = $1 WHERE id = $2`, [
    //         update.isAdmin || false,
    //         userId
    //     ]);
    // }

    // getUserByExternalDetails(
    //     source: string,
    //     sourceId: string
    // ): Promise<Maybe<User>> {
    //     return this.pool
    //         .query(
    //             'SELECT id, "displayName", email, "photoURL", source, "sourceId", "isAdmin" FROM users WHERE "sourceId" = $1 AND source = $2',
    //             [sourceId, source]
    //         )
    //         .then(res => arrayToMaybe(res.rows));
    // }

    createView(view: View): Promise<View> {
        return this.pool
            .query(
                'INSERT INTO views(id, "datasetId", "user", datetime) VALUES(uuid_generate_v4(), $1, $2, $3) RETURNING id',
                [
                    view.datasetId,
                    view.user,
                    new Date()
                ]
            )
            .then(result => result.rows[0]);
    }

    async check(): Promise<any> {
        await this.pool.query("SELECT id FROM views LIMIT 1");
        return {
            ready: true
        };
    }
}
