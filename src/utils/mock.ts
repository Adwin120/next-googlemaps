import pudzian from "../../public/pudzian.png";

export const getUser = async () => {
    return {
        username: "Pudzian",
        avatarUrl: pudzian,
    };
};

export const search = async (query: string) => {
    return [0, 1, 2, 3].map((n) => query + n);
};
