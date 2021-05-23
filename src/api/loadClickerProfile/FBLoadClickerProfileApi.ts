import ILoadClickerProfileApiParam from "./ILoadClickerProfileApiParam";
import FirestorePaths from "../../utils/FirestorePaths";
import FBClickerProfileConverter from "../../features/clicker/FBClickerProfileConverter";
import IClickerProfile from "../../features/clicker/IClickerProfile";
import { FirebaseApi } from "yuni-chanz-react-firebase";

export default class FBLoadClickerProfileApi extends FirebaseApi<IClickerProfile> {
    
    private param: ILoadClickerProfileApiParam;

    private converter = new FBClickerProfileConverter();
    
    constructor(param: ILoadClickerProfileApiParam) {
        super();
        this.param = param;
    }

    async request(): Promise<IClickerProfile> {
        const doc = this.firestore.doc(FirestorePaths.clickerProfile(this.param.id));

        const response = await doc.get();
        if(response.exists) {
            return this.converter.toModel(response);
        }

        const profile: IClickerProfile = {
            id: doc.id,
            points: 0,
            createdAt: new Date(),
        };
        await doc.set(this.converter.toPlain(profile));
        return profile;
    }
}