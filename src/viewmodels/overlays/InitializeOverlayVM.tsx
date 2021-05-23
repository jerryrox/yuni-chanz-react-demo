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
        await PromiseUtils.wait(1000);
    }

    async onShow() {}

    onHide() {}
}