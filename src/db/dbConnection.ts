import { Pool } from "pg";

export const db = new Pool();

export type DB = <T extends object, U = unknown>(sqlCode:string, params: U[]) => Promise<T[]>;

export const query: DB = async <T extends object, U>(sqlCode: string, params: U[]) => {
    // console.log(sqlCode, params)
    const result = await db.query<T>(sqlCode, params);
    // console.log(result.rows);
    return result.rows;
};
