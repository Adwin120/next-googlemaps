"use client";
import { createContext, useContext, useReducer } from "react";
import type { Dispatch, PropsWithChildren, Reducer } from "react";
import type { Transform } from "@/types/functions";

type LayoutState = {
    isSideBarOpen: boolean;
    isFormModalOpen: boolean;
};
type LayoutActionTypes = "open" | "close" | "toggle";
type LayoutStateParts = "FormModal" | "SideBar";

type LayoutAction = {
    type: LayoutActionTypes;
    part: LayoutStateParts;
};

const reduceSideBar: Reducer<LayoutState, Transform<boolean>> = (state, action) => ({
    ...state,
    isSideBarOpen: action(state.isSideBarOpen),
});
const reduceFormModal: Reducer<LayoutState, Transform<boolean>> = (state, action) => ({
    ...state,
    isFormModalOpen: action(state.isFormModalOpen),
});

const typeToActionRecord: Record<LayoutActionTypes, Transform<boolean>> = {
    open: () => true,
    close: () => false,
    toggle: (prev) => !prev,
};

const layoutReducer: Reducer<LayoutState, LayoutAction> = (state, action) => {
    const innerAction = typeToActionRecord[action.type];
    switch (action.part) {
        case "SideBar":
            return reduceSideBar(state, innerAction);
        case "FormModal":
            return reduceFormModal(state, innerAction);
    }
};
const initialLayoutState: LayoutState = {
    isSideBarOpen: false,
    isFormModalOpen: false,
};

const MainLayoutContext: React.FC<PropsWithChildren> = ({ children }) => {
    const context = useReducer(layoutReducer, initialLayoutState);
    return <LayoutContext.Provider value={context}>{children}</LayoutContext.Provider>;
};

export default MainLayoutContext;

const LayoutContext = createContext<[LayoutState, Dispatch<LayoutAction>]>([
    initialLayoutState,
    () => {},
]);
export const useLayout = () => useContext(LayoutContext);
