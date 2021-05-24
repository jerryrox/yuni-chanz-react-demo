# Demo UI
The `ui` directory contains all the UI components in the project, further organized by sub folders.

## Structure
### UIRoot
#### Dependency setup
This is the root component of all UI elements. Here, we not only render the other views but also, initialize the dependencies and send them down to the tree using `DependencyContext`.

Before the function component declaration, notice how the dependencies deriving from `BaseBloc` are instantiated and passed into a `DependencyContainer` instance. Then, the container's `initialize()` method is called, which then internally calls the `initialize()` method declared by `BaseBloc` class.
```
const dependencyContainer = new DependencyContainer({
    navigation,
    apiProvider,

    initializeOverlayVM,

    homePageVM,
    clickerPageVM,
});
dependencyContainer.initialize();
```
#### Hooks
In this example, I just wanted to display an "initializing screen" when the dependencies are being initialized. The dependency container's `isInitializing` flag has been listened by the UIRoot component and when it changes, it will toggle the initializing screen on/off.
```
const isInitializing = useBindable(dependencyContainer.isInitializing);

useEffect(() => {
    if(isInitializing) {
        initializeOverlayVM.show();
    }
    else {
        initializeOverlayVM.hide();
    }
}, [isInitializing]);
```
#### Component tree
Within the root `Box` component, the `DependencyContext` has been placed with the value provided by the dependency container's `contextValue` field. To understand this bit, it is recommend to learn more about React Context API.
```
<DependencyContext.Provider value={dependencyContainer.contextValue}>
```
The way you'd build the tree isn't too much of a concern. However, special consideration should be made for views that persist in the tree (such as overlays like dialogs, full screen loader, etc.).

yuni-chanz-react provides `ExplicitViewWrapper` to ensure the intuitive lifecycle methods of the viewmodels to be called correctly. The types of views mentioned above should be wrapped under these wrappers, while passing the relevant viewmodel type as parameter.
```
<ExplicitViewWrapper viewModelType={InitializeOverlayVM}>
    <InitializeOverlay />
</ExplicitViewWrapper>
```
To learn more about this, see [this link](https://github.com/jerryrox/yuni-chanz-react/wiki/ViewModels).

## Components directory

## Overlays directory

## Pages directory