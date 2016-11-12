/* global describe it */
import 'babel-polyfill';
import should from 'should';
import MaevaError from '../../lib/Error';
import Model from '../../lib/Model';

class Foo extends Model {
  static schema = {
    foo: Number,
  };
}

function checkError(error, attrs) {
  it('should be an error', () => {
    should(error).be.an.instanceOf(Error);
  });
  for (const attr in attrs) {
    if (('is' in attrs[attr])) {
      it(`${attr} should be the correct value`, () => {
        should(error[attr]).eql(attrs[attr].is);
      });
    }
    if (('match' in attrs[attr])) {
      it(`${attr} should match the correct value`, () => {
        should(error[attr]).match(attrs[attr].match);
      });
    }
  }
}

describe('Mungo Error', () => {
  describe('Unit', () => {
    it('should be a function', () => {
      should(MaevaError).be.a.Function();
    });
  });
  describe('Message', () => {
    describe('Error with just a message', () => {
      checkError(new MaevaError('Oops!'), {
        message: {is: 'Oops! {}'},
      });
    });
    describe('Error with just an error', () => {
      checkError(new MaevaError(new Error('Ouch!')), {
        message: {match: new RegExp(
          '^\\[Error\\] Ouch! at Suite\\.<anonymous> ' +
          '\\(\\/.+\\/maeva\\/dist\\/test\\/0\\-utils\\/Error\\.js:\\d+:\\d+\\)'
        )},
      });
    });
    describe('Error with message and error', () => {
      checkError(new MaevaError('Oops!', new Error('Ouch!')), {
        message: {match: new RegExp(
          '^\\[Error\\] Oops! at Suite\\.<anonymous> ' +
          '\\(\\/.+\\/maeva\\/dist\\/test\\/0\\-utils\\/Error\\.js:\\d+:\\d+\\)'
        )},
      });
    });
    describe('Error with context', () => {
      describe('And with personalized message', () => {
        checkError(new MaevaError('Ouch!'), {
          message: {is: 'Ouch! {}'},
        });
      });
      describe('And with error', () => {
        checkError(new MaevaError(new Error('Ouch!')), {
          message: {match: new RegExp(
            '^\\[Error\\] Ouch! at Suite\\.<anonymous> ' +
            '\\(\\/.+\\/maeva\\/dist\\/test\\/0\\-utils\\/Error\\.js' +
            ':\\d+:\\d+\\)'
          )},
        });
      });
      describe('With both', () => {
        checkError(new MaevaError(new Error('Ouch!'), 'Ay!', checkError), {
          message: {match: new RegExp(
            '^\\[Error\\] Ay! at Suite\\.<anonymous> ' +
            '\\(\\/.+\\/maeva\\/dist\\/test\\/0\\-utils\\/Error\\.js' +
            ':\\d+:\\d+\\)'
          )},
        });
      });
    });
  });
  describe('Code', () => {
    checkError(
      new MaevaError(22),
      {
        message: {is: ' {"code":22}'}
      }
    );
  });
  describe('Type', () => {
    checkError(
      new MaevaError(String),
      {
        message: {is: ' {"type":"String"}'}
      }
    );
  });
  describe('Document', () => {
    checkError(
      new MaevaError(new Foo({foo: 1})),
      {
        message: {is: ' {"document":{"foo":1}}'}
      }
    );
  });
  describe('Model', () => {
    checkError(
      new MaevaError(Foo),
      {
        message: {is: ' ' + JSON.stringify({
          model: {
            name: 'Foo',
            version: 0,
            collectionName: 'foos',
            schema: {
              foo: {
                type: 'Number',
              },
            },
          }
        })}
      }
    );
  });
});
