"use client"
import { Dispatch, PropsWithChildren, Reducer, createContext, useContext, useReducer } from "react";

type LayoutState = {
    isSideBarOpen: boolean;
};
type LayoutActionTypes = "openSideBar" | "closeSideBar" | "toggleSideBar";
type LayoutAction = {
    type: LayoutActionTypes;
};

const layoutReducer: Reducer<LayoutState, LayoutAction> = (state, action) => {
    switch (action.type) {
        case "openSideBar":
            return { ...state, isSideBarOpen: true };
        case "closeSideBar":
            return { ...state, isSideBarOpen: false };
        case "toggleSideBar":
            return {...state, isSideBarOpen: !state.isSideBarOpen}
    }
};
const initialLayoutState: LayoutState = {
    isSideBarOpen: false,
};

interface Props extends PropsWithChildren {}
const TopBarAndDrawerLayoutContext: React.FC<Props> = ({children}) => {
    const context = useReducer(layoutReducer, initialLayoutState);
    return <LayoutContext.Provider value={context}>{children}</LayoutContext.Provider>;
};

export default TopBarAndDrawerLayoutContext;

const LayoutContext = createContext<[LayoutState, Dispatch<LayoutAction>]>([
    initialLayoutState,
    () => {},
]);
export const useLayout = () => useContext(LayoutContext);