# Demo ViewModels
The usage of ViewModels is quite straightforward. Let's look at HomePageVM as an example.
```
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
```
To break down what the code represents:
1. `HomePageVM` receives a parameter object upon construction. Usually, this should only include other dependencies required to handle business logics. For example, `Navigation` can be one.
2. `onShow()` is called during initialization of ViewModel (and is supported by `useViewModel`).
3. `onHide()` is called during disposal of ViewModel (and is supported by `useViewModel`).
4. `toClicker()` is a business logic function called from the UI side.

Becuase `HomePageVM` derives from `RoutedViewModel`, you can also receive url path/query parameters with the lifecycle method `onRouteParams`. For this method, just ensure the viewmodel is assisted by `useRoutedViewModel`, not `useViewModel`.