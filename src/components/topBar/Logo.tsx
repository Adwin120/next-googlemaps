import Image from "next/image";
import type {PropsWithPandaStyling} from "@/types/PropsWithPandaStyling";
import { css } from "../../../styled-system-out/css";
import { visuallyHidden } from "../../../styled-system-out/patterns";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Props extends PropsWithPandaStyling {
    src: string | StaticImport
    title: string
}
const Logo: React.FC<Props> = ({ css: cssProp, src, title }) => {
    return <div>
        <h1 className={visuallyHidden()}>{title}</h1>
        <Image className={css(cssProp)} src={src} alt={title} priority />
    </div>
    return ;
};

export default Logo;
