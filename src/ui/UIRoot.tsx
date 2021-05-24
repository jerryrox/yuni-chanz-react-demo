import { Box } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InitializeOverlayVM from "../viewmodels/overlays/InitializeOverlayVM";
import InitializeOverlay from "./overlays/InitializeOverlay";
import { useEffect } from "react";
import HomePageVM from "../viewmodels/pages/HomePageVM";
import NavPaths from "../utils/NavPaths";
import ApiProvider from "../api/ApiProvider";
import FirebaseApiProvider from "../api/FirebaseApiProvider";
import ClickerPageVM from "../viewmodels/pages/ClickerPageVM";
import ClickerPage from "./pages/ClickerPage";
import { DependencyContainer, Navigation, DependencyContext, ExplicitViewWrapper, NavigationService } from "yuni-chanz-react";
import AwsApiProvider from "../api/AwsApiProvider";

const navigation = new Navigation();
// const apiProvider: ApiProvider = new FirebaseApiProvider();
const apiProvider: ApiProvider = new AwsApiProvider();

const initializeOverlayVM = new InitializeOverlayVM({
});

const homePageVM = new HomePageVM({
    navigation,
});
const clickerPageVM = new ClickerPageVM({
    apiProvider,
    navigation,
});

const dependencyContainer = new DependencyContainer({
    navigation,
    apiProvider,

    initializeOverlayVM,

    homePageVM,
    clickerPageVM,
});
dependencyContainer.initialize();

const UIRoot = () => {
    const isInitializing = useBindable(dependencyContainer.isInitializing);

    useEffect(() => {
        if(isInitializing) {
            initializeOverlayVM.show();
        }
        else {
            initializeOverlayVM.hide();
        }
    }, [isInitializing]);

    return (
        <Box style={{
            width: "100vw",
            height: "100vh",
            overflowX: "hidden",
            overflowY: "hidden",
            backgroundColor: "#000",
        }}>
            <DependencyContext.Provider value={dependencyContainer.contextValue}>
                {
                    !isInitializing &&
                    <HashRouter>
                        <NavigationService/>

                        <Switch>
                            <Route exact path={NavPaths.home()}>
                                <HomePage/>
                            </Route>
                            <Route path={NavPaths.clicker()}>
                                <ClickerPage/>
                            </Route>
                        </Switch>
                    </HashRouter>
                }

                <ExplicitViewWrapper viewModelType={InitializeOverlayVM}>
                    <InitializeOverlay />
                </ExplicitViewWrapper>
            </DependencyContext.Provider>
        </Box>
    );
};
export default UIRoot;