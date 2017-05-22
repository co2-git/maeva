Type
===

Types have a convert and a validate method used to verify a value.

```javascript
// Example of creating an "email" type
const emailType = data.type({
  convert: (value) => value,
  validate: (value) => typeof value === 'string' && /^.+@.+$/.test(value),
})

// You can now pass this as a type in models
data.model('users', {email: emailType});
```

# Interface

A `type` is a class that implements following interface:

```javascript
declare interface Type {
  convert: (value: any) => any;
  validate: (value: any) => boolean;
}
```

# String

```javascript
const string = Type.string();
string.convert(1); // returns string "1"
string.validate('1'); // returns true
string.validate(1); // returns false
```

# Number

```javascript
const number = Type.number();
number.convert('1'); // returns number 1
number.validate(1); // returns true
number.validate('1'); // returns false
```

# Boolean

```javascript
const boolean = Type.boolean();
boolean.convert(1); // returns boolean true
boolean.validate(true); // returns true
boolean.validate(1); // returns false
```

# Date

```javascript
const date = Type.date();
date.convert(Date.now()); // returns Date
date.validate(new Date()); // returns true
```
