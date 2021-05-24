import { FBDocumentSnapshot, FirebaseModelConverter } from "yuni-chanz-react-firebase";
import IClickerProfile from "../features/clicker/IClickerProfile";

export default class FBClickerProfileConverter extends FirebaseModelConverter<IClickerProfile> {
    
    toModel(snapshot: FBDocumentSnapshot): IClickerProfile {
        const data = snapshot.data()!;

        return {
            id: snapshot.id,
            createdAt: this.decodeDate(data.createdAt) ?? new Date(),
            points: this.decodeInt(data.points) ?? 0,
        };
    }

    toPlain(model: IClickerProfile): Record<string, any> {
        return {
            createdAt: this.encodeDate(model.createdAt),
            points: model.points,
        };
    }
}