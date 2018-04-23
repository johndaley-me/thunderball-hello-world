// import serializer from 'enzyme-to-json/serializer';

expect.extend({
  toBeDivisibleBy(received, argument) {
    const pass = received % argument === 0;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be divisible by ${argument}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be divisible by ${argument}`,
      pass: false,
    };
  },

  toBeAnInteger(received) {
    const pass = Number.isInteger(received);
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be an integer`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be an integer`,
      pass: false,
    };
  },
});

// normally would go in jest.config.js
// expect.addSnapshotSerializer(serializer);
