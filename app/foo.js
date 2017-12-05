const isPrimitive = value => (
  value === null ||
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean' ||
  typeof value === 'function'
);

const isObject = value => (
  !isPrimitive(value) &&
  typeof value === 'object' &&
  !Array.isArray(value)
);

const isArray = value => Array.isArray(value);

const isSame = (a1: any, a2: any): {message: string, values: any[]}[] => {
  const changes = [];
  if (isPrimitive(a1)) {
    if (!isPrimitive(a2)) {
      const a2is = isObject(a2) ? 'object' : 'array';
      changes.push({
        message: `a1 is primitive, a2 is ${a2is}`,
        values: [a1, a2],
      });
    } else if (a1 !== a2) {
      changes.push({
        message: 'primitive a1 does not equal primitive a2',
        values: [a1, a2]
      });
    }
  } else if (isObject(a1)) {
    if (!isObject(a2)) {
      const a2is = isPrimitive(a2) ? 'primtive' : 'array';
      changes.push({
        message: `a1 is object, a2 is ${a2is}`,
        values: [a1, a2]
      });
    } else {
      for (const key in a1) {
        if (!(key in a2)) {
          changes.push({
            message: `a1 has key ${key}, a2 has not`,
            values: [a1, a2],
          });
        } else {
          changes.push(...isSame(a1[key], a2[key]));
        }
      }
      for (const key in a2) {
        if (!(key in a1)) {
          changes.push({
            message: `a2 has key ${key}, a1 has not`,
            values: [a1, a2],
          });
        }
      }
    }
  } else if (isArray(a1)) {
    if (!isArray(a2)) {
      const a2is = isPrimitive(a2) ? 'primtive' : 'object';
      changes.push({
        message: `a1 is array, a2 is ${a2is}`,
        values: [a1, a2],
      });
    } else {
      a1.forEach((item, index) => {
        if (typeof a2[index] === 'undefined') {
          changes.push({
            message: `a1 has key #${index}, a2 has not`,
            values: [a1, a2],
          });
        } else {
          changes.push(...isSame(a1[index], a2[index]));
        }
      });
      a2.forEach((item, index) => {
        if (typeof a1[index] === 'undefined') {
          changes.push({
            message: `a2 has key #${index}, a1 has not`,
            values: [a1, a2],
          });
        }
      });
    }
  }
  return changes;
};

console.log(isSame(1, 2));
console.log('...');

console.log(isSame(1, '1'));
console.log('...');

console.log(isSame([1], [2]));
console.log('...');

console.log(isSame({f: 1}, {f: 2}));
console.log('...');

console.log(isSame(
  [{f: 1}, {f: 2}],
  [{f: 1}, {f: 3}],
));
console.log('...');
