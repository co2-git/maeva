/* globals describe it */
import should from 'should';

import formatFindQueryValue from './formatFindQueryValue';
import getType from '../types/getType';
import values from '../test/values';
import * as data from '..';

describe('Format find query value', () => {
  describe('Primitive values', () => {
    describe('String', () => {
      it('should format string', async () => {
        const value = 'hello';
        const expectedValue = value;
        const type = getType(String);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
      it('should format non string', async () => {
        const value = 1;
        const expectedValue = '1';
        const type = getType(String);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
    describe('Number', () => {
      it('should format number', async () => {
        const value = 1;
        const expectedValue = value;
        const type = getType(Number);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
      it('should format non number', async () => {
        const value = '1';
        const expectedValue = 1;
        const type = getType(Number);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
    describe('Boolean', () => {
      it('should format boolean', async () => {
        const value = true;
        const expectedValue = value;
        const type = getType(Boolean);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
      it('should format non boolean', async () => {
        const value = 1;
        const expectedValue = true;
        const type = getType(Boolean);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
    describe('Date', () => {
      it('should format dates', async () => {
        const value = new Date();
        const expectedValue = value;
        const type = getType(Date);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
      it('should format non dates', async () => {
        const date = new Date();
        const value = date.getTime();
        const expectedValue = date;
        const type = getType(Date);
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
  });
  describe('Complex values', () => {
    describe('Any', () => {
      for (const {name, value} of values) {
        it(`should format ${name}`, async () => {
          const expectedValue = value;
          const type = getType(data.any());
          const formattedValue = await formatFindQueryValue(value, type);
          should(formattedValue).eql(expectedValue);
        });
      }
    });
    describe('Array', () => {
      describe('data.array syntax', () => {
        describe('Primitive types', () => {
          it('should format array of strings', async () => {
            const value = [1, '1'];
            const expectedValue = ['1', '1'];
            const type = getType(data.array(String));
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
          it('should format array of numbers', async () => {
            const value = [1, '1'];
            const expectedValue = [1, 1];
            const type = getType(data.array(Number));
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
          it('should format array of booleans', async () => {
            const value = [1, true, false, 0];
            const expectedValue = [true, true, false, false];
            const type = getType(data.array(Boolean));
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
          it('should format array of dates', async () => {
            const date = new Date();
            const value = [date, date.getTime(), 'hello'];
            const expectedValue = [date, date, 'hello'];
            const type = getType(data.array(Date));
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
        });
        describe('Complex types', () => {
          describe('Any', () => {
            it('should format array of dates', async () => {
              const value = values;
              const expectedValue = values;
              const type = getType(data.array(data.any()));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Array', () => {
            it('should format array of primitive types', async () => {
              const value = [[1]];
              const expectedValue = [['1']];
              const type = getType(data.array(data.array(String)));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of any types', async () => {
              const value = [[1, 'hello']];
              const expectedValue = [[1, 'hello']];
              const type = getType(data.array(data.array(data.any())));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of links', async () => {
              const value = [[{id: 1}], ['1']];
              const expectedValue = [[1], [1]];
              const type = getType(data.array(data.array(data.link())));
              const formattedValue = await formatFindQueryValue(value, type, {
                connection: {
                  connector: {
                    id: {
                      name: 'id',
                      type: Number,
                    }
                  },
                },
              });
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of mixed', async () => {
              const value = [[22]];
              const expectedValue = [[22]];
              const type = getType(
                data.array(
                  data.array(
                    data.mixed(Number, Date)
                  )
                )
              );
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of shape', async () => {
              const value = [[{text: 22}]];
              const expectedValue = [[{text: '22'}]];
              const type = getType(
                data.array(
                  data.array(
                    data.shape({text: String})
                  )
                )
              );
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of tuple', async () => {
              const value = [[[22, '22']]];
              const expectedValue = [[['22', 22]]];
              const type = getType(
                data.array(
                  data.array(
                    data.tuple(String, Number)
                  )
                )
              );
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Link', () => {
            describe('Link with full document', () => {
              it('should format link', async () => {
                const value = [{id: 1, name: 'Barca'}];
                const expectedValue = [1];
                const type = getType(data.array(data.link()));
                const formattedValue = await formatFindQueryValue(value, type, {
                  connection: {
                    connector: {
                      id: {
                        name: 'id',
                        type: Number,
                      }
                    },
                  },
                });
                should(formattedValue).eql(expectedValue);
              });
            });
            describe('Link with id', () => {
              it('should format link', async () => {
                const value = ['1'];
                const expectedValue = [1];
                const type = getType(data.array(data.link()));
                const formattedValue = await formatFindQueryValue(value, type, {
                  connection: {
                    connector: {
                      id: {
                        name: 'id',
                        type: Number,
                      }
                    },
                  },
                });
                should(formattedValue).eql(expectedValue);
              });
            });
          });
          describe('Mixed', () => {
            it('should format mixed', async () => {
              const value = [22];
              const expectedValue = [22];
              const type = getType(data.array(data.mixed(Number, String)));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Shape', () => {
            it('should format shape', async () => {
              const value = [{text: 22}];
              const expectedValue = [{text: '22'}];
              const type = getType(data.array(data.shape({text: String})));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Tuple', () => {
            it('should format tuple', async () => {
              const value = [[22, '22']];
              const expectedValue = [['22', 22]];
              const type = getType(data.array(data.tuple(String, Number)));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
        });
      });
      describe('Array of syntax', () => {
        describe('Primitive types', () => {
          it('should format array of strings', async () => {
            const value = [1, '1'];
            const expectedValue = ['1', '1'];
            const type = getType(Array.of(String));
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
          it('should format array of numbers', async () => {
            const value = [1, '1'];
            const expectedValue = [1, 1];
            const type = getType(Array.of(Number));
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
          it('should format array of booleans', async () => {
            const value = [1, true, false, 0];
            const expectedValue = [true, true, false, false];
            const type = getType(Array.of(Boolean));
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
          it('should format array of dates', async () => {
            const date = new Date();
            const value = [date, date.getTime(), 'hello'];
            const expectedValue = [date, date, 'hello'];
            const type = getType(Array.of(Date));
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
        });
        describe('Complex types', () => {
          describe('Any', () => {
            it('should format array of dates', async () => {
              const value = values;
              const expectedValue = values;
              const type = getType(Array.of(data.any()));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Array', () => {
            it('should format array of primitive types', async () => {
              const value = [[1]];
              const expectedValue = [['1']];
              const type = getType(Array.of(Array.of(String)));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of any types', async () => {
              const value = [[1, 'hello']];
              const expectedValue = [[1, 'hello']];
              const type = getType(Array.of(Array.of(data.any())));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of links', async () => {
              const value = [[{id: 1}], ['1']];
              const expectedValue = [[1], [1]];
              const type = getType(Array.of(Array.of(data.link())));
              const formattedValue = await formatFindQueryValue(value, type, {
                connection: {
                  connector: {
                    id: {
                      name: 'id',
                      type: Number,
                    }
                  },
                },
              });
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of mixed', async () => {
              const value = [[22]];
              const expectedValue = [[22]];
              const type = getType(
                Array.of(
                  Array.of(
                    data.mixed(Number, Date)
                  )
                )
              );
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of shape', async () => {
              const value = [[{text: 22}]];
              const expectedValue = [[{text: '22'}]];
              const type = getType(
                Array.of(
                  Array.of(
                    data.shape({text: String})
                  )
                )
              );
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of tuple', async () => {
              const value = [[[22, '22']]];
              const expectedValue = [[['22', 22]]];
              const type = getType(
                Array.of(
                  Array.of(
                    data.tuple(String, Number)
                  )
                )
              );
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Link', () => {
            describe('Link with full document', () => {
              it('should format link', async () => {
                const value = [{id: 1, name: 'Barca'}];
                const expectedValue = [1];
                const type = getType(Array.of(data.link()));
                const formattedValue = await formatFindQueryValue(value, type, {
                  connection: {
                    connector: {
                      id: {
                        name: 'id',
                        type: Number,
                      }
                    },
                  },
                });
                should(formattedValue).eql(expectedValue);
              });
            });
            describe('Link with id', () => {
              it('should format link', async () => {
                const value = ['1'];
                const expectedValue = [1];
                const type = getType(Array.of(data.link()));
                const formattedValue = await formatFindQueryValue(value, type, {
                  connection: {
                    connector: {
                      id: {
                        name: 'id',
                        type: Number,
                      }
                    },
                  },
                });
                should(formattedValue).eql(expectedValue);
              });
            });
          });
          describe('Mixed', () => {
            it('should format mixed', async () => {
              const value = [22];
              const expectedValue = [22];
              const type = getType(Array.of(data.mixed(Number, String)));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Shape', () => {
            it('should format shape', async () => {
              const value = [{text: 22}];
              const expectedValue = [{text: '22'}];
              const type = getType(Array.of(data.shape({text: String})));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Tuple', () => {
            it('should format tuple', async () => {
              const value = [[22, '22']];
              const expectedValue = [['22', 22]];
              const type = getType(Array.of(data.tuple(String, Number)));
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
        });
      });
      describe('[Array] syntax', () => {
        describe('Primitive types', () => {
          it('should format array of strings', async () => {
            const value = [1, '1'];
            const expectedValue = ['1', '1'];
            const type = getType([String]);
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
          it('should format array of numbers', async () => {
            const value = [1, '1'];
            const expectedValue = [1, 1];
            const type = getType([Number]);
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
          it('should format array of booleans', async () => {
            const value = [1, true, false, 0];
            const expectedValue = [true, true, false, false];
            const type = getType([Boolean]);
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
          it('should format array of dates', async () => {
            const date = new Date();
            const value = [date, date.getTime(), 'hello'];
            const expectedValue = [date, date, 'hello'];
            const type = getType([Date]);
            const formattedValue = await formatFindQueryValue(value, type);
            should(formattedValue).eql(expectedValue);
          });
        });
        describe('Complex types', () => {
          describe('Any', () => {
            it('should format array of dates', async () => {
              const value = values;
              const expectedValue = values;
              const type = getType([data.any()]);
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Array', () => {
            it('should format array of primitive types', async () => {
              const value = [[1]];
              const expectedValue = [['1']];
              const type = getType([[String]]);
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of any types', async () => {
              const value = [[1, 'hello']];
              const expectedValue = [[1, 'hello']];
              const type = getType([[data.any()]]);
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of links', async () => {
              const value = [[{id: 1}], ['1']];
              const expectedValue = [[1], [1]];
              const type = getType([[data.link()]]);
              const formattedValue = await formatFindQueryValue(value, type, {
                connection: {
                  connector: {
                    id: {
                      name: 'id',
                      type: Number,
                    }
                  },
                },
              });
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of mixed', async () => {
              const value = [[22]];
              const expectedValue = [[22]];
              const type = getType([[data.mixed(Number, Date)]]);
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of shape', async () => {
              const value = [[{text: 22}]];
              const expectedValue = [[{text: '22'}]];
              const type = getType([[data.shape({text: String})]]);
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
            it('should format array of tuple', async () => {
              const value = [[[22, '22']]];
              const expectedValue = [[['22', 22]]];
              const type = getType([[data.tuple(String, Number)]]);
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Link', () => {
            describe('Link with full document', () => {
              it('should format link', async () => {
                const value = [{id: 1, name: 'Barca'}];
                const expectedValue = [1];
                const type = getType([data.link()]);
                const formattedValue = await formatFindQueryValue(value, type, {
                  connection: {
                    connector: {
                      id: {
                        name: 'id',
                        type: Number,
                      }
                    },
                  },
                });
                should(formattedValue).eql(expectedValue);
              });
            });
            describe('Link with id', () => {
              it('should format link', async () => {
                const value = ['1'];
                const expectedValue = [1];
                const type = getType([data.link()]);
                const formattedValue = await formatFindQueryValue(value, type, {
                  connection: {
                    connector: {
                      id: {
                        name: 'id',
                        type: Number,
                      }
                    },
                  },
                });
                should(formattedValue).eql(expectedValue);
              });
            });
          });
          describe('Mixed', () => {
            it('should format mixed', async () => {
              const value = [22];
              const expectedValue = [22];
              const type = getType([data.mixed(Number, String)]);
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Shape', () => {
            it('should format shape', async () => {
              const value = [{text: 22}];
              const expectedValue = [{text: '22'}];
              const type = getType([data.shape({text: String})]);
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
          describe('Tuple', () => {
            it('should format tuple', async () => {
              const value = [[22, '22']];
              const expectedValue = [['22', 22]];
              const type = getType([data.tuple(String, Number)]);
              const formattedValue = await formatFindQueryValue(value, type);
              should(formattedValue).eql(expectedValue);
            });
          });
        });
      });
    });
    describe('Link', () => {
      describe('Link with full document', () => {
        it('should format link', async () => {
          const value = {id: 1, name: 'Barca'};
          const expectedValue = 1;
          const type = getType(data.link());
          const formattedValue = await formatFindQueryValue(value, type, {
            connection: {
              connector: {
                id: {
                  name: 'id',
                  type: Number,
                }
              },
            },
          });
          should(formattedValue).eql(expectedValue);
        });
      });
      describe('Link with id', () => {
        it('should format link', async () => {
          const value = '1';
          const expectedValue = 1;
          const type = getType(data.link());
          const formattedValue = await formatFindQueryValue(value, type, {
            connection: {
              connector: {
                id: {
                  name: 'id',
                  type: Number,
                }
              },
            },
          });
          should(formattedValue).eql(expectedValue);
        });
      });
    });
    describe('Mixed', () => {
      it('should format mixed', async () => {
        const value = 222;
        const expectedValue = 222;
        const type = getType(data.mixed(String, Number));
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
    describe('Shape', () => {
      it('should format shape', async () => {
        const value = {text: 222};
        const expectedValue = {text: '222'};
        const type = getType(data.shape({text: String}));
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
    describe('Tuple', () => {
      it('should format tuple', async () => {
        const value = [22, '22'];
        const expectedValue = ['22', 22];
        const type = getType(data.tuple(String, Number));
        const formattedValue = await formatFindQueryValue(value, type);
        should(formattedValue).eql(expectedValue);
      });
    });
  });
});
