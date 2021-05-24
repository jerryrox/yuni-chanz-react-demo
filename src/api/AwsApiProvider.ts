import ApiProvider from "./ApiProvider";
import IUpdateClickerProfileApiParam from "./updateClickerProfile/IUpdateClickerProfileApiParam";
import ILoadClickerProfileApiParam from "./loadClickerProfile/ILoadClickerProfileApiParam";
import { IApi } from "yuni-chanz-react";
import IClickerProfile from "../features/clicker/IClickerProfile";
import { IAwsApiConfig } from "yuni-chanz-react-aws";
import Config from "./aws-config.json";
import AWSLoadClickerProfileApi from "./loadClickerProfile/AWSLoadClickerProfileApi";
import AWSUpdateClickerProfileApi from "./updateClickerProfile/AWSUpdateClickerProfileApi";

const awsConfig: IAwsApiConfig = {
    dynamoDB: {
        region: "ap-southeast-2",
        credentials: Config,
    },
};

export default class AwsApiProvider extends ApiProvider {

    loadClickerProfile(param: ILoadClickerProfileApiParam): IApi<IClickerProfile> {
        return new AWSLoadClickerProfileApi(awsConfig, param);
    }

    updateClickerProfile(param: IUpdateClickerProfileApiParam): IApi {
        return new AWSUpdateClickerProfileApi(awsConfig, param);
    }
}