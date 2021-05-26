import IUpdateClickerProfileApiParam from "./IUpdateClickerProfileApiParam";
import { AwsApi, IAwsApiConfig, DdbUtils, AttributeExpression } from "yuni-chanz-react-aws";
import AWSClickerProfileConverter from "../../converters/AWSClickerProfileConverter";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import DdbTables from "../../utils/DdbTables";
import { ApiResponse } from "yuni-chanz-react";

export default class AWSUpdateClickerProfileApi extends AwsApi {
    
    private param: IUpdateClickerProfileApiParam;

    private converter = new AWSClickerProfileConverter();
    
    constructor(config: IAwsApiConfig, param: IUpdateClickerProfileApiParam) {
        super(config);
        this.param = param;
    }

    async request(): Promise<ApiResponse> {
        try {
            const expression = AttributeExpression.setFromPlain(this.converter.toPlain(this.param.profile));
    
            const command = new UpdateItemCommand({
                TableName: DdbTables.clickerProfile,
                Key: {
                    id: DdbUtils.getStringAV(this.param.profile.id),
                },
                ...expression.build(),
            });
            await this.dynamoDB.send(command);
            return ApiResponse.success();
        }
        catch(e) {
            return ApiResponse.failed(e, "Failed to update clicker profile.");
        }
    }
}