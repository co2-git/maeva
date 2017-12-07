import getType from './getType';

const mixed = (...types) => ({
  convert: value => value,
  validate: value => {
    let passed = 0;
    for (const type of types) {
      const $type = getType(type);
      try {
        $type.validate(value);
        passed++;
      } catch (error) {}
    }
    if (!passed) {
      throw new Error('Expected value to match at least one of mixed type');
    }
  },
});

export default mixed;
