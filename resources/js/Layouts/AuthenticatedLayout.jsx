/* eslint-disable react-hooks/exhaustive-deps */
import {
    useEventListener,
    useMountEffect,
    useUnmountEffect,
} from "primereact/hooks";
import React, { useContext, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import AppFooter from "@/Layouts/AppFooter.jsx";
import AppSidebar from "@/Layouts/AppSidebar.jsx";
import AppTopbar from "@/Layouts/AppTopbar.jsx";
import AppConfig from "@/Layouts/AppConfig.jsx";
import { LayoutContext } from "./context/layoutcontext";
import { PrimeReactContext } from "primereact/api";
// import { usePathname, useSearchParams } from "next/navigation";
const AuthenticatedLayout = ({ header, children }) => {
    PrimeReactContext.ripple = true;
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const { setRipple } = useContext(PrimeReactContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);

    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
        useEventListener({
            type: "click",
            listener: (event) => {
                const isOutsideClicked = !(
                    sidebarRef.current?.isSameNode(event.target) ||
                    sidebarRef.current?.contains(event.target) ||
                    topbarRef.current?.menubutton?.isSameNode(event.target) ||
                    topbarRef.current?.menubutton?.contains(event.target)
                );

                if (isOutsideClicked) {
                    hideMenu();
                }
            },
        });

    const pathname = route().current();
    // const searchParams = useSearchParams();
    useEffect(() => {
        hideMenu();
        hideProfileMenu();
    }, [pathname]);

    const [
        bindProfileMenuOutsideClickListener,
        unbindProfileMenuOutsideClickListener,
    ] = useEventListener({
        type: "click",
        listener: (event) => {
            const isOutsideClicked = !(
                topbarRef.current?.topbarmenu?.isSameNode(event.target) ||
                topbarRef.current?.topbarmenu?.contains(event.target) ||
                topbarRef.current?.topbarmenubutton?.isSameNode(event.target) ||
                topbarRef.current?.topbarmenubutton?.contains(event.target)
            );

            if (isOutsideClicked) {
                hideProfileMenu();
            }
        },
    });

    const hideMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
        }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };

    const hideProfileMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: false,
        }));
        unbindProfileMenuOutsideClickListener();
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add("blocked-scroll");
        } else {
            document.body.className += " blocked-scroll";
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove("blocked-scroll");
        } else {
            document.body.className = document.body.className.replace(
                new RegExp(
                    "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
                    "gi"
                ),
                " "
            );
        }
    };

    useMountEffect(() => {
        setRipple(layoutConfig.ripple);
    });

    useEffect(() => {
        if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
            bindMenuOutsideClickListener();
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [layoutState.profileSidebarVisible]);

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });

    const containerClass = classNames("layout-wrapper", {
        "layout-overlay": layoutConfig.menuMode === "overlay",
        "layout-static": layoutConfig.menuMode === "static",
        "layout-static-inactive":
            layoutState.staticMenuDesktopInactive &&
            layoutConfig.menuMode === "static",
        "layout-overlay-active": layoutState.overlayMenuActive,
        "layout-mobile-active": layoutState.staticMenuMobileActive,
        "p-input-filled": layoutConfig.inputStyle === "filled",
        "p-ripple-disabled": !layoutConfig.ripple,
    });

    return (
        <React.Fragment>
            <div className={containerClass}>
                <AppTopbar ref={topbarRef} />
                <div ref={sidebarRef} className="layout-sidebar">
                    <AppSidebar />
                </div>
                <div className="layout-main-container">
                    {header && (
                        <header className="bg-white">
                            <div className="px-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}
                    <div className="layout-main">{children}</div>
                    <AppFooter />
                </div>
                <AppConfig />
                <div className="layout-mask"></div>
            </div>
        </React.Fragment>
    );
};

export default AuthenticatedLayout;
