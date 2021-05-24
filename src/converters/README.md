# Demo ModelConverter usage
The `converters` directory only contains `ModelConverter` subclasses, aimed to convert models for sending/receiving values to/from client and external data stores.

Notice the usage of functions starting with "decode" and "encode". `ModelConverter`, `AwsModelConverter`, and `FirebaseModelConverter` each provides these implementations appropriately. For example:
```
awsConverter.encodeString("asdf");
/*
This will output the following:
{
    S: "asdf"
}
*/

firebaseConverter.encodeString("asdf");
/*
Will output:
"asdf"
*/
```

## Optional practices
It is recommended for `toModel()` and `toPlain()` methods to convert fully the structured/plain data.
On the other hand, you'd often need to convert only a subset of data between different structured/plain forms.

For example, let's say we have this piece of code. Also, let's assume we're using Firebase Firestore.
```
interface IBook {
    name: string;
    authors: string[];
    pages: number;
}

class BookConverter extends ModelConverter<IBook> {
    toModel(data: any): IBook {
        ...
    }
    toPlain(model: IBook): Record<string, any> {
        ...
    }
}
```
If we only want to convert `name` field into plain data object for use in one of APIs, we CAN do this:
```
const book: IBook = { ... };
const plain = {
    name: book.name
};
```
But, let's say the key `name` of plain data needs to be changed to `title` for some reason. This will pose a maintenance issue in case there are many APIs still using the key `name`.

A simple, but effect solution would be to chuck all those conversion methods into our `BookConverter`.
```
class BookConverter extends ModelConverter<IBook> {
    // Existing method
    toModel(data: any): IBook {
        ...
    }

    // Existing method
    toPlain(model: IBook): Record<string, any> {
        ...
    }

    // Additional method just to output title field as plain data.
    titleToPlain(title: string): Record<string, any> {
        return {
            title
        };
    }
}
```
This way, the function can be reused anywhere and is easily changeable.