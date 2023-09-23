import type MarkerData from "@/types/MarkerData";

import { query } from "@/db/dbConnection";
import selectMarkers from "./selectUserMarkers.sql";
import {unstable_cache as cache} from "next/cache"

export const getUserMarkers = cache(async (userId: number) => {
    const data = await query<MarkerData>(selectMarkers, [userId]);
    return data;
}, ['cache-key'], {tags: ["user-marker"]});
