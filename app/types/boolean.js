const boolean = {
  name: 'boolean',
  convert: (value) => Boolean(value),
  validate: (value) => {
    if (typeof value !== 'boolean') {
      throw new Error('Expected a boolean value');
    }
  },
};

export default boolean;
