import ILoadClickerProfileApiParam from "./ILoadClickerProfileApiParam";
import FirestorePaths from "../../utils/FirestorePaths";
import FBClickerProfileConverter from "../../converters/FBClickerProfileConverter";
import IClickerProfile from "../../features/clicker/IClickerProfile";
import { FirebaseApi } from "yuni-chanz-react-firebase";
import { ApiResponse } from "yuni-chanz-react";

export default class FBLoadClickerProfileApi extends FirebaseApi<IClickerProfile> {
    
    private param: ILoadClickerProfileApiParam;

    private converter = new FBClickerProfileConverter();
    
    constructor(param: ILoadClickerProfileApiParam) {
        super();
        this.param = param;
    }

    async request(): Promise<ApiResponse<IClickerProfile>> {
        try {
            const doc = this.firestore.doc(FirestorePaths.clickerProfile(this.param.id));
    
            const response = await doc.get();
            if(response.exists) {
                return ApiResponse.success(this.converter.toModel(response));
            }
    
            const profile: IClickerProfile = {
                id: doc.id,
                points: 0,
                createdAt: new Date(),
            };
            await doc.set(this.converter.toPlain(profile));
            return ApiResponse.success(profile);
        }
        catch(e) {
            return ApiResponse.failed(e, "Failed to load clicker profile");
        }
    }
}