import { BaseBloc } from "bindable-bloc";
import { IApi } from "yuni-chanz-react";
import IClickerProfile from "../features/clicker/IClickerProfile";
import ILoadClickerProfileApiParam from "./loadClickerProfile/ILoadClickerProfileApiParam";
import IUpdateClickerProfileApiParam from "./updateClickerProfile/IUpdateClickerProfileApiParam";

export default abstract class ApiProvider extends BaseBloc {
    
    abstract loadClickerProfile(param: ILoadClickerProfileApiParam): IApi<IClickerProfile>;

    abstract updateClickerProfile(param: IUpdateClickerProfileApiParam): IApi;
}