import { useId } from "react";
import { revalidateTag } from "next/cache";

import insertMarkerSql from "./insertUserMarker.sql";
import { query } from "@/db/dbConnection";
import getDbSession from "@/auth/getDbSession";

import MarkerFormSubmitButton from "./MarkerFormSubmitButton";
import { vstack } from "../../../styled-system-out/patterns";
import { css } from "../../../styled-system-out/css";

// TODO: position and photos

async function create(formData: FormData) {
    "use server";

    // mutate data
    // revalidate cache
    console.log(formData);
    const session = await getDbSession();
    const userID = session?.user.id;
    await query(insertMarkerSql, [formData.get("name"), formData.get("description"), 0, 0, userID]);
    revalidateTag("user-marker");
    revalidateTag("cache-key");
}

interface Props {}
const AddMarkerForm: React.FC<Props> = () => {
    const nameID = useId();
    const descriptionID = useId();

    const inputStyles = css({
        bg: "gray.900",
        shadow: "well",
        rounded: "sm",
        color: "white",
        px: "2",
    });

    return (
        <form action={create} autoComplete="off" className={vstack({ color: "white", gap: "4" })}>
            <header>Add marker</header>
            <div className={vstack({ gap: "2", alignItems: "start" })}>
                <label htmlFor={nameID}>name</label>
                <input name="name" className={inputStyles} id={nameID} autoFocus />

                <label htmlFor={descriptionID}>description</label>
                <input name="description" className={inputStyles} id={descriptionID} />
            </div>

            <MarkerFormSubmitButton/>
        </form>
    );
};

export default AddMarkerForm;
