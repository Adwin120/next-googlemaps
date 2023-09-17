"use client";
import { createContext, useContext, useReducer } from "react";
import type { Dispatch, PropsWithChildren, Reducer } from "react";

type LayoutState = {
    isSideBarOpen: boolean;
    isFormModalOpen: boolean;
};
type LayoutActionTypes = "openSideBar" | "closeSideBar" | "toggleSideBar"
 | "openFormModal" | "closeFormModal" | "toggleFormModal";
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
            return { ...state, isSideBarOpen: !state.isSideBarOpen };
        case "openFormModal":
            return { ...state, isFormModalOpen: true};
        case "closeFormModal":
            return { ...state, isFormModalOpen: false}
        case "toggleFormModal":
            return {...state, isFormModalOpen: !state.isFormModalOpen}
    }
};
const initialLayoutState: LayoutState = {
    isSideBarOpen: false,
    isFormModalOpen: false
};

interface Props extends PropsWithChildren {}
const TopBarAndDrawerLayoutContext: React.FC<Props> = ({ children }) => {
    const context = useReducer(layoutReducer, initialLayoutState);
    return <LayoutContext.Provider value={context}>{children}</LayoutContext.Provider>;
};

export default TopBarAndDrawerLayoutContext;

const LayoutContext = createContext<[LayoutState, Dispatch<LayoutAction>]>([
    initialLayoutState,
    () => {},
]);
export const useLayout = () => useContext(LayoutContext);
