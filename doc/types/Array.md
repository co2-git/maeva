## Arrays

Enclose type in array brackets to declare an array:

```js
class A extends Model {
  static schema = {
    numbers: type.array(Number),
  }
}
```

## Array

```javascript
A.find({numbers: {is: Array}});
A.find({numbers: {size: 0}});
A.find({numbers: {not: {size: 0}}});
A.find({numbers: {has: 1}});
A.find({numbers: {not: {has: 1}}});
A.find({numbers: {1: 'foo'});
```
