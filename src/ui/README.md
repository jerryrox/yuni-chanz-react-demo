# Demo UI
The `ui` directory contains all the UI components in the project, further organized by sub folders.

## Terms/Concepts
#### React Context API
https://reactjs.org/docs/context.html
#### View
Refers to the component composed of many child components and is associated with a model providing business logics. For example, pages and dialogs can be called "views".

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

## Pages directory
A "page" is a type of "view" which is presented as a result of routing to a particular path. For example, `localhost:3000/login` would display `LoginPage` and `localhost:3000/register` would display `RegisterPage`. This "pages" directory is where all these types of views are placed in.

Typically, pages will have its own viewmodel associated. To initialize and dispose the viewmodels with the pages, simply execute `useViewModel` within the page component with the viewmodel's type as argument.
```
// Assuming we have a viewmodel dependency called "LoginPageVM"
const LoginPage = () => {
    // This will ensure the onMount and onUnmount lifecycle methods will be executed in the viewmodel class.
    useViewModel(LoginPageVM);

    ...
};
```
If you need to retrieve the url path parameter or query parameters in the viewmodel, you should call `useRoutedViewModel` instead. For the sake of consistency, it's better to just call `useRoutedViewModel` for all page-type views.

## Overlays directory
An "overlay" is... quite complicated. It can be of any view that is displayable regardless of the current route. For example, dialogs with "fixed" position can be a good example. Another could be a full screen loading view.

To properly initialize and dispose viewmodels, call `useViewModel` in the overlay.
```
const ConfirmDialog = () => {
    useViewModel(ConfirmDialogVM);

    ...
};
```
As mentioned previously, overlays should be wrapped in `ExplicitViewWrapper`.
```
<ExplicitViewWrapper viewModelType={ConfirmDialogVM}>
    <ConfirmDialog />
</ExplicitViewWrapper>
```

## Components directory
Let's say we have 3 pages and 2 overlays in our application.
- LandingPage
- LoginPage
- RegisterPage
- SelectionDialog
- MessageDialog

The components directory could then look like this:
```
ui
-- components
---- common
------ ...
---- landingPage
------ ...
---- loginPage
------ ...
and so on
```
- All components in the common directory means they can be used anywhere in the tree.
- Components in a particular view's directory means we'll use that component only for that specific view.

There is technically no restriction on what dependency you can use with `useBloc` hook within these componets. Though, I personally like to use this approach:
- Components in common directory are "dumb components" and therefore, shouldn't process business logics when for example, the button has been pressed. Instead, receive callback references from a "smarter component" and let that handle the business logics via its closest viewmodel.
```
// This is a login page "view", and is associated with a viewmodel.
const LoginPage = () => {
    const model = useRoutedViewModel(LoginPageVM);

    const onLoginButton = () => {
        model.requestLogin();
    };

    return (
        <div>
            ...
            <MyCoolButton onClick={onLoginButton}>
                Login
            </MyCoolButton>
            ...
        </div>
    );
};

// This is a component in "common" directory.
const MyCoolButton = ({
    ...
    onClick,
    children,
}) => {
    return (
        <button onclick={onClick}>
            {children}
        </button>
    );
};
```
- Components in each specific view's directory should be able to directly access the viewmodel of the view it's placed in. Also, it should be able to call the viewmodel's methods when for example, the user interacts with it via click or something.
```
// This is a login page "view", and is associated with a viewmodel.
const LoginPage = () => {
    useRoutedViewModel(LoginPageVM);

    return (
        <div>
            ...
            <LoginButton/>
            ...
        </div>
    );
};

// This is a component in "loginPage" directory.
const LoginButton = ({
    ...
}) => {
    const model = useBloc(LoginPageVM);

    const onClick = () => {
        model.requestLogin();
    };

    return (
        <button onclick={onClick}>
            Login
        </button>
    );
};