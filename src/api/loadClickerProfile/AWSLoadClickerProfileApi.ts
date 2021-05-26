import { AwsApi, IAwsApiConfig } from "yuni-chanz-react-aws";
import ILoadClickerProfileApiParam from "./ILoadClickerProfileApiParam";
import IClickerProfile from "../../features/clicker/IClickerProfile";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import DdbTables from "../../utils/DdbTables";
import AWSClickerProfileConverter from "../../converters/AWSClickerProfileConverter";
import { ApiResponse } from "yuni-chanz-react";

export default class AWSLoadClickerProfileApi extends AwsApi<IClickerProfile> {
    
    private param: ILoadClickerProfileApiParam;

    private converter = new AWSClickerProfileConverter;

    constructor(config: IAwsApiConfig, param: ILoadClickerProfileApiParam) {
        super(config);
        this.param = param;
    }

    async request(): Promise<ApiResponse<IClickerProfile>> {
        try {
            const command = new GetItemCommand({
                TableName: DdbTables.clickerProfile,
                Key: {
                    id: {
                        S: this.param.id,
                    },
                },
            });
            const response = await this.dynamoDB.send(command);
            return ApiResponse.success(this.converter.toModel(response.Item));
        }
        catch(e) {
            return ApiResponse.failed(e, "Failed to retrieve clicker profile");
        }
    }
}