import setIt from '../../obsolete/utils/setIt';

import assert from 'assert';

suite('utils', function(){

  suite('setIt', function() {

    test('set it on object', function() {
      assert.deepEqual(setIt({}, 'key', 'value'), {
        key: 'value'
      });
    });

    test('set it on nested object', function() {
      assert.deepEqual(setIt({a:{b:{c:'d', e:{f:'g'}}}}, 'a.b.e.h', {i:'j'}),
        {a:{b:{c: 'd', e:{f: 'g', h: {i: 'j'}}}}}
      );
    });

    test('set it on array', function() {
      assert.deepEqual(setIt([0,1,2,3,4,5], '6', {a:'1'}),
        [0,1,2,3,4,5,{a:'1'}]
      );
    });

    test('set it on nested array', function() {
      assert.deepEqual(setIt([0,1,2,3,4,5,[0,1,2,[3,4,5]]], '6.3.0', 7),
        [0,1,2,3,4,5,[0,1,2,[7,4,5]]]
      );
    });

    test('set it on array with key', function() {
      assert.deepEqual(setIt([
        {
          key: 'title',
          value: {
            someVal: 'abc',
            value: {
              someVal: 'def'
            }
          }
        },
        {
          key: 'title2'
        }
      ], 'title.value.value.otherVal', 'ghi'),
        [
          {
            key: 'title',
            value: {
              someVal: 'abc',
              value: {
                someVal: 'def',
                otherVal: 'ghi'
              }
            }
          },
          {
            key: 'title2'
          }
        ]
      );
    });

    test('set it on array with nested key', function() {
      assert.deepEqual(setIt([
        {key: 'song1', stack: [{key: 'artist1'}, {key: 'artist2'}, {key: 'artist3'}]}
      ], 'song1.stack.artist3.title', 'Artist3'), [
        {key: 'song1', stack: [{key: 'artist1'}, {key: 'artist2'}, {key: 'artist3', title: 'Artist3'}]}
      ]);
    });

    test('set it on array with number keys and string keys', function() {
      assert.deepEqual(setIt([0,1,2,[{key:'a', val: [{key:'c', a: 1}]}, {key:'b'}]], '3.a.val.c', {key: 'c', a:1, b:2}), [
        0,1,2,[{key:'a', val: [{key:'c', a: 1, b:2}]}, {key:'b'}]
      ]);
    });

  });

});