"use server"

import getDbSession from "@/auth/getDbSession";
import { query } from "@/db/dbConnection";
import { revalidateTag } from "next/cache";
import deleteMarkerSql from "./deleteMarker.sql"

export async function deleteMarker(itemId: string) {
    "use server"
    console.log(itemId);
    const session = await getDbSession();
    const userID = session?.user.id;
    await query(deleteMarkerSql, [userID, itemId]);
    revalidateTag("user-marker");
    revalidateTag("cache-key");
}