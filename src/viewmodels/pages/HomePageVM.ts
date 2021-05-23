import { Navigation, RoutedViewModel } from "yuni-chanz-react";
import NavPaths from "../../utils/NavPaths";

interface IHomePageVMParam {
    navigation: Navigation;
}

export default class HomePageVM extends RoutedViewModel {
    
    private param: IHomePageVMParam;
    
    constructor(param: IHomePageVMParam) {
        super();
        this.param = param;
    }

    async onShow() {}

    onHide() {}

    /**
     * Navigates to the clicker game page.
     */
    toClicker() {
        this.param.navigation.pushPath(NavPaths.clicker());
    }
}