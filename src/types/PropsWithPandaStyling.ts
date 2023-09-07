import { SystemStyleObject } from "../../styled-system-out/types";

type PropsWithPandaStyling<P = unknown> = P & {
    css?: SystemStyleObject
}

export default PropsWithPandaStyling