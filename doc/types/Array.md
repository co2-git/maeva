## Arrays

Enclose type in array brackets to declare an array:

```js
import {array, findOne, model} from 'mavea';

const collection = model({
  fields: {
    numbers: [Number],
  }
});
```

## Array

```javascript
import {findOne} from 'maeva';

findOne(collection, {field: {is: Array}});
findOne(collection, {field: {size: 0}});
findOne(collection, {field: {not: {size: 0}}});
findOne(collection, {field: {has: 1}});
findOne(collection, {field: {not: {has: 1}}});
findOne(collection, {field: {1: 'foo'});
```
