import { assert } from 'chai';
import createStates, { computeStyles, mix, TRANSPARENT } from './createStates';

describe('createStates module', () => {
  describe('TRANSPARENT', () => {
    it('has zero opacity', () => {
      assert.strictEqual(TRANSPARENT.opacity, 0);
    });

    it('has any color', () => {
      assert.strictEqual(typeof TRANSPARENT.backgroundColor, 'string');
    });
  });
      
  describe('computeStyles', () => {
    it('can add a `hover` overlay', () => {
      
    })
  });
  describe('createStates', () => {});
});
