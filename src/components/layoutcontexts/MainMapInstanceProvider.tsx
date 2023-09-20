"use client";
import { createContext, useContext, useState, type PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}
const MainMapInstanceProvider: React.FC<Props> = ({ children }) => {
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
    return (
        <MainMapInstanceContext.Provider value={{ map: mapInstance, initializer: setMapInstance }}>
            {children}
        </MainMapInstanceContext.Provider>
    );
};

const MainMapInstanceContext = createContext<{
    map: google.maps.Map | null;
    initializer: (mapInstance: google.maps.Map) => void;
}>({ map: null, initializer: () => {} });
export const useMainMap = () => useContext(MainMapInstanceContext).map;
export const useMainMapInitializer = () => useContext(MainMapInstanceContext).initializer;

export default MainMapInstanceProvider;
