import { css } from "../../../styled-system-out/css";
import { SquareStyles, center, square } from "../../../styled-system-out/patterns";

export const LoadingSpinner: React.FC<{ css?: SquareStyles; spinnerWidth?: string }> = ({
    css: cssProp,
    spinnerWidth = 10,
}) => {
    return (
        <span
            className={square({
                size: "8",
                display: "inline-flex",
                verticalAlign: "middle",
                m: "1",
                ...cssProp,
            })}
        >
            <svg viewBox="0 0 120 120">
                <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className={css({
                        fill: "none",
                        stroke: "gray.300",
                    })}
                    strokeWidth={spinnerWidth}
                />
                <circle
                    cx="60"
                    cy="60"
                    r="50"
                    strokeWidth={spinnerWidth}
                    className={css({
                        stroke: "blue",
                        fill: "none",
                        strokeLinecap: "round",
                        transformOrigin: "center",
                        animation:
                            "spin 1s linear infinite, pulseSvgStroke 1s ease-in-out infinite alternate",
                    })}
                />
            </svg>
        </span>
    );
};

export const BlockLoadingSpinner: React.FC = () => {
    return (
        <div className={center({ bg: "gray.800", h: "full" })}>
            <LoadingSpinner spinnerWidth="8" css={{ size: "72" }} />
        </div>
    );
};
