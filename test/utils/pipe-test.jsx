import pipe from '../../src/utils/pipe';

import assert from 'assert';

suite('utils', function() {

  suite('pipe', function() {

    test('should work', function() {
      assert.equal(pipe(3, (n) => n+1, (n) => n+2), 6);
    });

  });

});