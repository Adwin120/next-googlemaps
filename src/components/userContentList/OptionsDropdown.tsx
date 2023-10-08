"use client";
import { iconButton } from "@/theme/styles/buttons";
import {
    Root,
    Trigger,
    Portal,
    Content,
    Arrow,
    Item,
    Separator,
} from "@radix-ui/react-dropdown-menu";
import { square } from "../../../styled-system-out/patterns";
import { FaEllipsisVertical } from "react-icons/fa6";
import { css } from "../../../styled-system-out/css";
import { FaPen, FaTrash } from "react-icons/fa6";
import AlertDeleteButton from "./deleteMarkerDialog/AlertDeleteButton";

interface Props {
    itemId: string
}
const OptionsDropdown: React.FC<Props> = ({itemId}) => {
    return (
        <Root modal={false}>
            <Trigger asChild>
                <button className={iconButton} aria-label="open options menu">
                    <FaEllipsisVertical className={square({ size: 6 })} />
                </button>
            </Trigger>
            <Portal>
                <Content
                    className={css({
                        zIndex: 1,
                        color: "white",
                        bg: "gray.950",
                        px: 3,
                        mr: 4,
                    })}
                >
                    <Arrow className={css({ fill: "gray.950" })} />
                    <Item className={css({ p: 1, cursor: "pointer" })}>
                        <FaPen className={css({ display: "inline" })} /> Edit
                    </Item>
                    <Separator className={css({ h: "1px", bg: "secondary" })} />
                    <Item className={css({ p: 1, color: "red.600", cursor: "pointer" })} asChild>
                        <AlertDeleteButton itemId={itemId}/>
                    </Item>
                </Content>
            </Portal>
        </Root>
    );
};

export default OptionsDropdown;
