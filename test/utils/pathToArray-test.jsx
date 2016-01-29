import pathToArray from '../../src/utils/pathToArray';

import assert from 'assert';

suite('utils', function(){

  suite('pathToArray', function() {

    test('do not touch it when argument is array', function() {
      assert.deepEqual(pathToArray(['tabs', 'music', 'stack', 'artist']), ['tabs', 'music', 'stack', 'artist']);
    });

    test('separate string by dot into an array when argument is array', function() {
      assert.deepEqual(pathToArray('tabs.music.stack.artist'), ['tabs', 'music', 'stack', 'artist']);
    });

    test('behave same with number', function() {
      assert.deepEqual(pathToArray('tabs.2.stack.2'), ['tabs', '2', 'stack', '2']);
    });

  });

});