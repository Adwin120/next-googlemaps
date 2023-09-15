import type { Pool } from "pg";
import type { Adapter, AdapterSession, AdapterUser, VerificationToken } from "next-auth/adapters";
import type { query as queryT } from "@/db/dbConnection";

// FIXME: code directly copied from a nearly merged PR on nextAuth repo at https://github.com/nextauthjs/next-auth/pull/4933
// FIXME: replace this with imported nextAuth function once it releases
function mapExpiresAt(account: any): any {
    const expires_at: number = parseInt(account.expires_at);
    return {
        ...account,
        expires_at,
    };
}

export default function PGAdapter(query: any): Adapter {
    return {
        async createVerificationToken(
            verificationToken: VerificationToken
        ): Promise<VerificationToken> {
            const { identifier, expires, token } = verificationToken;
            const sql = `
                INSERT INTO verification_token ( identifier, expires, token ) 
                VALUES ($1, $2, $3)
                `;
            await query(sql, [identifier, expires, token]);
            return verificationToken;
        },
        async useVerificationToken({
            identifier,
            token,
        }: {
            identifier: string;
            token: string;
        }): Promise<VerificationToken> {
            const sql = `delete from verification_token
              where identifier = $1 and token = $2
              RETURNING identifier, expires, token `;
            const result = await query(sql, [identifier, token]);
            return result.rowCount !== 0 ? result.rows[0] : null;
        },

        async createUser(user: Omit<AdapterUser, "id">) {
            const { name, email, emailVerified, image } = user;
            const sql = `
                INSERT INTO users (name, email, "emailVerified", image) 
                VALUES ($1, $2, $3, $4) 
                RETURNING id, name, email, "emailVerified", image`;
            const result = await query(sql, [name, email, emailVerified, image]);
            return result.rows[0];
        },
        async getUser(id) {
            const sql = `select * from users where id = $1`;
            try {
                const result = await query(sql, [id]);
                return result.rowCount === 0 ? null : result.rows[0];
            } catch (e) {
                return null;
            }
        },
        async getUserByEmail(email) {
            const sql = `select * from users where email = $1`;
            const result = await query(sql, [email]);
            return result.rowCount !== 0 ? result.rows[0] : null;
        },
        async getUserByAccount({ providerAccountId, provider }): Promise<AdapterUser | null> {
            const sql = `
                  select u.* from users u join accounts a on u.id = a."userId"
                  where 
                  a.provider = $1 
                  and 
                  a."providerAccountId" = $2`;

            const result = await query(sql, [provider, providerAccountId]);
            return result.rowCount !== 0 ? result.rows[0] : null;
        },
        async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
            const fetchSql = `select * from users where id = $1`;
            const query1 = await query(fetchSql, [user.id]);
            const oldUser = query1.rows[0];

            const newUser = {
                ...oldUser,
                ...user,
            };

            const { id, name, email, emailVerified, image } = newUser;
            const updateSql = `
                UPDATE users set
                name = $2, email = $3, "emailVerified" = $4, image = $5
                where id = $1
                RETURNING name, id, email, "emailVerified", image
              `;
            const query2 = await query(updateSql, [id, name, email, emailVerified, image]);
            return query2.rows[0];
        },
        async linkAccount(account) {
            const sql = `
              insert into accounts 
              (
                "userId", 
                provider, 
                type, 
                "providerAccountId", 
                access_token,
                expires_at,
                refresh_token,
                id_token,
                scope,
                session_state,
                token_type
              )
              values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
              returning
                id,
                "userId", 
                provider, 
                type, 
                "providerAccountId", 
                access_token,
                expires_at,
                refresh_token,
                id_token,
                scope,
                session_state,
                token_type
              `;
            console.log(account);
            const params = [
                account.userId,
                account.provider,
                account.type,
                account.providerAccountId,
                account.access_token,
                account.expires_at,
                account.refresh_token,
                account.id_token,
                account.scope,
                account.session_state,
                account.token_type,
            ];

            const result = await query(sql, params);
            return mapExpiresAt(result.rows[0]);
        },
        async createSession({ sessionToken, userId, expires }) {
            if (userId === undefined) {
                throw Error(`userId is undef in createSession`);
            }
            const sql = `insert into sessions ("userId", expires, "sessionToken")
              values ($1, $2, $3)
              RETURNING id, "sessionToken", "userId", expires`;

            const result = await query(sql, [userId, expires, sessionToken]);
            return result.rows[0];
        },

        async getSessionAndUser(sessionToken: string | undefined): Promise<{
            session: AdapterSession;
            user: AdapterUser;
        } | null> {
            if (sessionToken === undefined) {
                return null;
            }
            const result1 = await query(`select * from sessions where "sessionToken" = $1`, [
                sessionToken,
            ]);
            if (result1.rowCount === 0) {
                return null;
            }
            let session: AdapterSession = result1.rows[0];

            const result2 = await query("select * from users where id = $1", [
                session.userId,
            ]);
            if (result2.rowCount === 0) {
                return null;
            }
            const user = result2.rows[0];
            return {
                session,
                user,
            };
        },
        async updateSession(
            session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
        ): Promise<AdapterSession | null | undefined> {
            const { sessionToken } = session;
            const result1 = await query(`select * from sessions where "sessionToken" = $1`, [
                sessionToken,
            ]);
            if (result1.rowCount === 0) {
                return null;
            }
            const originalSession: AdapterSession = result1.rows[0];

            const newSession: AdapterSession = {
                ...originalSession,
                ...session,
            };
            const sql = `
        UPDATE sessions set
        "userId" = $2, expires = $3
        where "sessionToken" = $1
        `;
            const result = await query(sql, [
                newSession.sessionToken,
                newSession.userId,
                newSession.expires,
            ]);
            return result.rows[0];
        },
        async deleteSession(sessionToken) {
            const sql = `delete from sessions where "sessionToken" = $1`;
            await query(sql, [sessionToken]);
        },
        async unlinkAccount(partialAccount) {
            const { provider, providerAccountId } = partialAccount;
            const sql = `delete from accounts where "providerAccountId" = $1 and provider = $2`;
            await query(sql, [providerAccountId, provider]);
        },
        async deleteUser(userId: string) {
            await query(`delete from users where id = $1`, [userId]);
            await query(`delete from sessions where "userId" = $1`, [userId]);
            await query(`delete from accounts where "userId" = $1`, [userId]);
        },
    };
}
