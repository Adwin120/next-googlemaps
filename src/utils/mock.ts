import type MarkerData from "@/types/MarkerData";
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

export const getUserData = async (): Promise<MarkerData[]> => {
    await wait(1000);
    return [
        {
            id: "1",
            name: "marker1",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ad, minima mollitia molestiae odit nostrum ipsam, quaerat ut, sed nulla nesciunt harum nemo fugiat. Fuga praesentium aperiam quos accusantium hic?",
            latitude:52.520007,
            longitude: 13.404954
        },
        {
            id: "2",
            name: "marker with longer name",
            description: "",
            latitude: -23.55052,
            longitude: -46.633309
        },
        {
            id: "3",
            name: "marker3",
            description: "this is my description",
            latitude: 31.230416,
            longitude: 121.473701
        },
    ];
};
