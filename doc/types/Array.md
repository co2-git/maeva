Maeva / Type / Array
===

Declare an array of type.

# Model

```js
import * as data from 'mavea';

const collection = data.model('data', {numbers: data.type.array(Number)});
```

# Insert

```javascript
import * as data from 'maeva';

const numbers = [4, 5, 6];

data.insertOne(collection, {numbers});
```

# Find

## Find by deep equal

```javascript
import * as data from 'maeva';

data.findOne(collection, {numbers});
```

## Find by not deep equal

```javascript
import * as data from 'maeva';

data.findOne(collection, {numbers: data.not(numbers)});
```

## Find by inclusion

```javascript
import * as data from 'maeva';

data.findOne(collection, {numbers: data.includes(4, 5)});
```

## Find by exclusion

```javascript
import * as data from 'maeva';

data.findOne(collection, {numbers: data.includes.not(4, 5)});
```

## Find by filter in

```javascript
import * as data from 'maeva';

data.findOne(collection, {
  numbers: data.predicate((numbers) => numbers.every(number => number < 10))
});
```

## Find by filter out

```javascript
import * as data from 'maeva';

data.findOne(collection, {
  numbers: data.predicate.not((numbers) => numbers.every(number => number < 10))
});
```
