import IUpdateClickerProfileApiParam from "./IUpdateClickerProfileApiParam";
import FirestorePaths from "../../utils/FirestorePaths";
import FBClickerProfileConverter from "../../converters/FBClickerProfileConverter";
import { FirebaseApi } from "yuni-chanz-react-firebase";
import { ApiResponse } from "yuni-chanz-react";

export default class FBUpdateClickerProfileApi extends FirebaseApi {
    
    private param: IUpdateClickerProfileApiParam;

    private converter = new FBClickerProfileConverter();
    
    constructor(param: IUpdateClickerProfileApiParam) {
        super();
        this.param = param;
    }

    async request(): Promise<ApiResponse> {
        try {
            const {
                profile,
            } = this.param;
    
            const doc = this.firestore.doc(FirestorePaths.clickerProfile(profile.id));
            await doc.update(this.converter.toPlain(profile));
            return ApiResponse.success();
        }
        catch(e) {
            return ApiResponse.failed(e, "Failed to update clicker profile.");
        }
    }
}