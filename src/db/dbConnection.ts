import { Pool } from "pg";

export const db = new Pool();

export const query = <T extends object, U>(sqlCode: string, params: U[]) => {
    console.log(sqlCode, params)
    return db.query<T>(sqlCode, params);
};
