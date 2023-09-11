import pudzian from "../../public/pudzian.png";

export const getUser = async () => {
    // await wait(1000)
    return {
        username: "Pudzian",
        avatarUrl: pudzian,
    };
};

export const search = async (query: string) => {
    await wait(1000);
    return [0, 1, 2, 3].map((n) => query + n);
};

const wait = (milis: number) => new Promise((resolve) => setTimeout(resolve, milis));
