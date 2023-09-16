import { useId } from "react";
import { vstack } from "../../styled-system-out/patterns";
import { css } from "../../styled-system-out/css";

// TODO: position and photos

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
        <form method="dialog" autoComplete="off" className={vstack({ color: "white", gap: "4" })}>
            <header>Add marker</header>
            <div className={vstack({ gap: "2", alignItems: "start" })}>
                <label htmlFor={nameID}>name</label>
                <input className={inputStyles} id={nameID} />

                <label htmlFor={descriptionID}>description</label>
                <input className={inputStyles} id={descriptionID} />
            </div>

            <button>Add</button>
        </form>
    );
};

export default AddMarkerForm;
