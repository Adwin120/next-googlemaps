import type MarkerData from "@/types/MarkerData";
import { css } from "../../../styled-system-out/css";
import Image from "next/image"
import { bleed, hstack, square } from "../../../styled-system-out/patterns";
import {FaEllipsisVertical} from "react-icons/fa6"
import { iconButton } from "@/theme/styles/buttons";
import OptionsDropdown from "./OptionsDropdown";

interface Props {
    marker: MarkerData
}

const MarkerCard: React.FC<Props> = ({marker}) => {
    //TODO: display image
    const mainImage = null;
    return <div className={css({shadow: "well", rounded: "lg", w: "full", py: "1", px: "4", bg: "gray.900", color: "white", maxH: "32", lineClamp: "5"})}>
        <h3>{marker.name}</h3>
        <div className={hstack({justify: "end", alignItems: "center"})}>
            <p className={css({color: "gray.300", flexGrow: 1})}>{marker.description}</p>
            
            <OptionsDropdown itemId={marker.id}/>
        </div>
        {mainImage && <Image className={bleed({inline: '4', w: "full"})} src={mainImage} alt="" width={400} height={300}/>}
    </div>;
};

export default MarkerCard;