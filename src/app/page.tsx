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
import EnsureLoggedIn from "@/components/sideDrawer/EnsureLoggedIn";
import NotLoggedInfo from "@/components/sideDrawer/NotLoggedInfo";
import UserData from "@/components/sideDrawer/UserData";
import LogOutButton from "@/components/sideDrawer/LogOutButton";
import { vstack } from "../../styled-system-out/patterns";

export default function Home() {
    return (
        <GoogleMapsApiProvider>
            <TopBar>
                <Logo />
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
                        <div className={vstack({ h: "full" })}>
                            <UserData css={{ flexGrow: 1 }} />
                            <LogOutButton />
                        </div>
                    </EnsureLoggedIn>
                </Suspense>
            </SideDrawer>

            <MainMap />
        </GoogleMapsApiProvider>
    );
}
