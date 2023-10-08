import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
        } & DefaultSession["user"];
    }
}

declare module "react" {
    type ForwardRefFC<T, P = {}> = ForwardRefRenderFunction<T, P>;

    interface HTMLAttributes<T> {
        popover?: "auto" | "manual";
    }

    interface ButtonHTMLAttributes<T> {
        popovertarget?: string;
        popovertargetaction?: "hide" | "show" | "toggle";
    }
}
