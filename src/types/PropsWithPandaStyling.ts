import type { SystemStyleObject } from "../../styled-system-out/types";

export type PropsWithPandaStyling<P = unknown> = P & {
    css?: SystemStyleObject;
};
