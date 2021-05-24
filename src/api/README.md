# Demo API module usage
## Structure
Two cloud services have been used in this example, including Firebase and AWS.

### ApiProvider
- The `ApiProvider` class extends from BaseBloc class so it can be accessed through the `DependencyContext`.
- The provider simply contains functions that return implementations of `IApi`.
- In normal cases where you won't redundantly implement the same API logics for two different cloud services, this isn't necessary. However, it can be of an option if it is the case.

### AwsApiProvider
- Derived from `ApiProvider` class to provide instances of `IApi` in each abstract function.
- Also, injects AWS SDK configuration object to each AWS API instances upon instantiation.

### FirebaseApiProvider
- Derived from `ApiProvider` class to provide instances of `IApi` in each abstract function.

### ./loadClickerProfile and ./updateClickerProfile
- Contains an interface defining the parameters required to make the API request. The param interface is also shared between different implementations of this API.
- Contains two different implementations of the same API logic, each for Firebase and AWS.

## Process
1. In `src/ui/UIRoot.tsx`, an instance of `ApiProvider` is created and included in the `DependencyContainer`.
2. In `src/viewmodels/pages/ClickerPageVM.ts`, it receives that reference via constructor and calls the `ApiProvider`'s abstract methods.
```
/**
 * Loads clicker profile from the server.
 */
private async loadProfile() {
    this.profile.value = null;

    const api = this.param.apiProvider.loadClickerProfile({
        id: "defaultUser",
    });
    this.profile.value = await api.request();
}
```
3. Depending on the specific type of `ApiProvider` instantiated, it'll instantiate an `IApi` object with either Firebase or AWS implementation.
4. Awaiting on the `request()` call of `IApi` will start the request and respond with the result.

The workload of practice demonstrated here may be too much. There is no standard trying to be enforced here, so it's completely fine to neglect `ApiProvider`-like concept and just instantiate the API directly as such.
```
const api = new MyBestApi({
    param1: 1,
    param2: "2"
});
await api.request();
```