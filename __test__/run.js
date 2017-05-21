/* global describe */
import describeConnectLib from './describeConnectLib';
import describeFormatLib from './describeFormatLib';

describe('Maeva', () => {
  describe('connect', () => {
    describeConnectLib();
  });

  describe('format', () => {
    describeFormatLib();
  });
});
