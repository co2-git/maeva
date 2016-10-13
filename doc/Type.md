Types
===

Types are the corner store of models. Models are made up of a schema, which is a list of fields, which are mainly defined by type. Field can have other optional attributes, such as required, default values or their own validators.

## Converters and validators

Each type have two static functions:

- `validate` that can validate if a given value match its type and returns true or false
- `convert` that will try to convert a given value to the type - or return said value otherwise
- `set` that will convert a value and return it only if it's then valid - otherwise it will throw an error.

```javascript
import {Type} from 'maeva';

Type.RegExp.validate(/a/); // true
Type.String.convert(1); // "1"
Type.Number.set("1"); // 1
Type.Number.set([1, 2, 3]); // throws error because value could not be converted to a valid value
```

## Native types

- Boolean
- String
- Number
- Date
- RegExp
- Error

## Special types

- Model
- Embed (embedded schema)
- Mixed
- Any

## Customize types

Any class/function that has a `validate`, a `convert` and a `set` function.

# Any type

You could set a field to accept any type. In this case, you would use `Type.Any`.

```javascript
Type.Any.validate(a); // whatever a's type is, this will always return true
```

# Mixed type

Sometimes you just want to accept some types. Use `Type.Mixed` then.

```javascript
const mixed = Type.Mixed(String, Number);
mixed.validate('hello'); // true
mixed.validate(42); // true
mixed.validate(true); // false
```
