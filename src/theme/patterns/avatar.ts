import { SystemStyleObject } from "@pandacss/dev";

export const avatar = {
    properties: {
        size: { type: "token", value: "sizes" },
        shadow: { type: "token", value: "shadows" },
    },
    transform({ size, shadow, ...rest }: { size: number; shadow: string } & SystemStyleObject) {
        return {
            pos: "relative",
            _after: {
                content: "''",
                shadow,
                position: "absolute",
                w: "full",
                h: "full",
                top: 0,
                left: 0,
                borderRadius: "100%",
            },
            "& img": {
                borderRadius: "100%",
                width: size,
                height: size,
            },
            ...rest,
        };
    },
} as const;
