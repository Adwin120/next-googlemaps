import type MarkerData from "@/types/MarkerData";
import { css } from "../../../styled-system-out/css";
import Image from "next/image";
import { bleed } from "../../../styled-system-out/patterns";

interface Props {
    marker: MarkerData
}
//TODO: display image
const MarkerCard: React.FC<Props> = ({marker}) => {
    const mainImage = marker.images[0];
    return <div className={css({shadow: "5", rounded: "lg", w: "full", py: "1", px: "4", bg: "gray.600", color: "white", maxH: "32", lineClamp: "5"})}>
        <h3>{marker.name}</h3>
        <p className={css({color: "gray.300"})}>{marker.description}</p>
        {/* {mainImage && <Image className={bleed({inline: '4',, w: "full"})} src={mainImage} alt="" width={400} height={300}/>} */}
    </div>;
};

export default MarkerCard;