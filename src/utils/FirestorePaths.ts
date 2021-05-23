import { PathUtils } from "yuni-chanz-react";


class FirestorePaths {
    
    clickerProfile(id?: string) {
        return PathUtils.combineNonNull(["clickerProfiles", id]);
    }
}
export default new FirestorePaths();