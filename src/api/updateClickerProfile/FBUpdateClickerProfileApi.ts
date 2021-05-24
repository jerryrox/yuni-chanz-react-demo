import IUpdateClickerProfileApiParam from "./IUpdateClickerProfileApiParam";
import FirestorePaths from "../../utils/FirestorePaths";
import FBClickerProfileConverter from "../../converters/FBClickerProfileConverter";
import { FirebaseApi } from "yuni-chanz-react-firebase";

export default class FBUpdateClickerProfileApi extends FirebaseApi {
    
    private param: IUpdateClickerProfileApiParam;

    private converter = new FBClickerProfileConverter();
    
    constructor(param: IUpdateClickerProfileApiParam) {
        super();
        this.param = param;
    }

    async request(): Promise<void> {
        const {
            profile,
        } = this.param;

        const doc = this.firestore.doc(FirestorePaths.clickerProfile(profile.id));
        await doc.update(this.converter.toPlain(profile));
    }
}