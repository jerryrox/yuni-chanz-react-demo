import { AwsModelConverter } from "yuni-chanz-react-aws";
import IClickerProfile from "../features/clicker/IClickerProfile";

export default class AWSClickerProfileConverter extends AwsModelConverter<IClickerProfile> {
    
    toModel(item: any): IClickerProfile {
        return {
            id: this.decodeString(item.id) ?? "",
            createdAt: this.decodeDate(item.createdAt) ?? new Date(),
            points: this.decodeInt(item.points) ?? 0,
        };
    }
    
    toPlain(model: IClickerProfile): Record<string, any> {
        return {
            createdAt: this.encodeDate(model.createdAt),
            points: this.encodeNumber(model.points),
        };
    }
}