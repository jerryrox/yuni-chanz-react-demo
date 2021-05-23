import ApiProvider from "./ApiProvider";
import firebase from "firebase";
import FirebaseConfig from "./firebase-config.json";
import ILoadClickerProfileApiParam from "./loadClickerProfile/ILoadClickerProfileApiParam";
import FBLoadClickerProfileApi from "./loadClickerProfile/FBLoadClickerProfileApi";
import IUpdateClickerProfileApiParam from "./updateClickerProfile/IUpdateClickerProfileApiParam";
import FBUpdateClickerProfileApi from "./updateClickerProfile/FBUpdateClickerProfileApi";

export default class FirebaseApiProvider extends ApiProvider {
    
    async initialize() {
        if(firebase.apps.length === 0) {
            firebase.initializeApp(FirebaseConfig);
        }
    }

    loadClickerProfile(param: ILoadClickerProfileApiParam) {
        return new FBLoadClickerProfileApi(param);
    }

    updateClickerProfile(param: IUpdateClickerProfileApiParam) {
        return new FBUpdateClickerProfileApi(param);
    }
}