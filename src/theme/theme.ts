import type {Theme} from "@pandacss/types"

export const theme: Theme = {
    tokens: {
        sizes: {
            headerHeight: {value: "60px"},
            underHeaderHeight: {value: `calc(100vh - 60px)`}
        },
    },
    keyframes: {
        pulseSvgStroke: {
            "0%": {
                strokeDasharray: "10,300"
            },
            "100%": {
                strokeDasharray: "160,300",
                strokeDashoffset: "-10px"
            }
        }
    }
};
