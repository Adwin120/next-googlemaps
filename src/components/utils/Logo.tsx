import Image from "next/image";
import logo from "../../../public/logo.svg";
import PropsWithPandaStyling from "@/types/PropsWithPandaStyling";
import { css } from "../../../styled-system-out/css";

interface Props extends PropsWithPandaStyling {}
const Logo: React.FC<Props> = ({ css: cssProp }) => {
    return <Image className={css(cssProp)} src={logo} alt="company logo" priority />;
};

export default Logo;
