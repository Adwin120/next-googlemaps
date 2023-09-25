import { Suspense } from "react";
import logo from "../../public/logo.svg";

import Logo from "@/components/topBar/Logo";
import TopBar from "@/components/topBar/TopBar";
import UserInfo from "@/components/topBar/UserInfo";
import GoogleMapsApiProvider from "@/components/maps/GoogleMapsApiProvider";
import MainMap from "@/components/layout/mainMap/MainMap";
import SideDrawerOpener from "@/components/topBar/SideDrawerOpener";
import SideDrawer from "@/components/sideDrawer/SideDrawer";
import { BlockLoadingSpinner, LoadingSpinner } from "@/components/utils/LoadingSpinner";
import EnsureLoggedIn from "@/components/authentication/EnsureLoggedIn";
import NotLoggedInfo from "@/components/utils/NotLoggedInfo";
import AddMarkerForm from "@/components/markerForm/AddMarkerForm";
import DrawerContent from "@/components/sideDrawer/DrawerContent";
import MainDialog from "@/components/layout/MainDialog";
import MainMapInstanceProvider from "@/components/layout/MainMapInstanceProvider";
import LocationAutocomplete from "@/components/searchBar/locationAutocomplete/LocationAutocomplete";

export default function Home() {
    return (
        <GoogleMapsApiProvider>
            <MainMapInstanceProvider>
                <TopBar>
                    <Logo title="MyPlace" src={logo} />
                    <LocationAutocomplete />
                    <SideDrawerOpener>
                        <Suspense fallback={<LoadingSpinner />}>
                            <UserInfo />
                        </Suspense>
                    </SideDrawerOpener>
                </TopBar>

                <SideDrawer>
                    <Suspense fallback={<BlockLoadingSpinner />}>
                        <EnsureLoggedIn fallback={<NotLoggedInfo />}>
                            <DrawerContent />
                        </EnsureLoggedIn>
                    </Suspense>
                </SideDrawer>

                {/* TODO: suspense and use()?  */}
                <MainMap />

                <MainDialog>
                    <AddMarkerForm />
                </MainDialog>
            </MainMapInstanceProvider>
        </GoogleMapsApiProvider>
    );
}
