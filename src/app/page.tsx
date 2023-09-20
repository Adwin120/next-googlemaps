import Logo from "@/components/utils/Logo";
import TopBar from "@/components/topBar/TopBar";
import UserInfo from "@/components/topBar/UserInfo";
import SearchBar from "@/components/locationAutocomplete/SearchBar";
import GoogleMapsApiProvider from "@/components/maps/GoogleMapsApiProvider";
import MainMap from "@/components/maps/MainMap";
import SideDrawerOpener from "@/components/topBar/SideDrawerOpener";
import SideDrawer from "@/components/sideDrawer/SideDrawer";
import { Suspense } from "react";
import { BlockLoadingSpinner, LoadingSpinner } from "@/components/utils/LoadingSpinner";
import EnsureLoggedIn from "@/components/utils/EnsureLoggedIn";
import NotLoggedInfo from "@/components/sideDrawer/NotLoggedInfo";
import { visuallyHidden } from "../../styled-system-out/patterns";
import AddMarkerForm from "@/components/AddMarkerForm";
import DrawerContent from "@/components/DrawerContent";
import MainDialog from "@/components/MainDialog";
import MainMapInstanceProvider from "@/components/layoutContexts/MainMapInstanceProvider";

export default function Home() {
    return (
        <GoogleMapsApiProvider>
            <MainMapInstanceProvider>
                <TopBar>
                    <div>
                        <h1 className={visuallyHidden()}>Product name</h1>
                        <Logo />
                    </div>
                    <SearchBar />
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

                <MainMap />

                <MainDialog>
                    <AddMarkerForm />
                </MainDialog>
            </MainMapInstanceProvider>
        </GoogleMapsApiProvider>
    );
}
