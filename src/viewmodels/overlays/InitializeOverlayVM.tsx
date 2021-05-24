import { ExplicitViewModel, PromiseUtils } from "yuni-chanz-react";

interface IInitializeOverlayVMParam {
    
}

export default class InitializeOverlayVM extends ExplicitViewModel {
    
    private param: IInitializeOverlayVMParam;
    
    constructor(param: IInitializeOverlayVMParam) {
        super();
        this.param = param;
    }

    async initialize() {
        // We just want to see the initialization overlay for at least 1 second.
        await PromiseUtils.wait(1000);
    }

    async onShow() {}

    onHide() {}
}