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
import UserData from "@/components/sideDrawer/UserData";
import { divider, visuallyHidden, vstack } from "../../styled-system-out/patterns";
import { css } from "../../styled-system-out/css";
import LogOutButton from "@/components/utils/LogOutButton";
import ModalDialog from "@/components/ModalDialog";
import AddMarkerForm from "@/components/AddMarkerForm";
import DrawerHeader from "@/components/sideDrawer/DrawerHeader";
import DrawerContent from "@/components/DrawerContent";
import MainDialog from "@/components/MainDialog";

export default function Home() {
    return (
        <GoogleMapsApiProvider>
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
        </GoogleMapsApiProvider>
    );
}
