import ApiProvider from "../../api/ApiProvider";
import { Bindable } from "bindable-bloc";
import IClickerProfile from "../../features/clicker/IClickerProfile";
import NavPaths from "../../utils/NavPaths";
import { Navigation, RoutedViewModel } from "yuni-chanz-react";

interface IClickerPageVMParam {
    apiProvider: ApiProvider;
    navigation: Navigation;
}

export default class ClickerPageVM extends RoutedViewModel {
    
    readonly profile = new Bindable<IClickerProfile | null>(null);
    readonly isSaving = new Bindable<boolean>(false);

    private param: IClickerPageVMParam;
    private lastSaveTime = 0;
    
    constructor(param: IClickerPageVMParam) {
        super();
        this.param = param;
    }

    async onShow() {
        await this.loadProfile();

        this.bindEvents();
    }

    onHide() {
        this.unbindEvents();

        this.profile.value = null;
    }

    /**
     * Navigates to the home page.
     */
    toHome() {
        this.param.navigation.pushPath(NavPaths.home());
    }

    /**
     * Requests saving clicker profile to the server immediately.
     */
    async saveProfile() {
        const profile = this.profile.value;
        if(profile === null || this.isSaving.value) {
            return;
        }

        this.isSaving.value = true;

        const api = this.param.apiProvider.updateClickerProfile({
            profile,
        });
        await api.request();

        this.lastSaveTime = new Date().getTime();
        this.isSaving.value = false;
    }

    /**
     * Performs click action to gain points.
     */
    performClick() {
        const profile = this.profile.value;
        if(profile !== null) {
            this.profile.value = {
                ...profile,
                points: profile.points + 1,
            };

            this.autoSaveProfile();
        }
    }

    private bindEvents() {
    }

    private unbindEvents() {
    }

    /**
     * Saves profile to the server if there's been enough delay since last auto save time.
     */
    private autoSaveProfile() {
        const curTime = new Date().getTime();
        if(curTime - this.lastSaveTime > 5000) {
            this.saveProfile();
        }
    }

    /**
     * Loads clicker profile from the server.
     */
    private async loadProfile() {
        this.profile.value = null;

        const api = this.param.apiProvider.loadClickerProfile({
            id: "defaultUser",
        });
        this.profile.value = await api.request();
    }
}