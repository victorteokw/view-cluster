import stack from '../../src/reducers/stack';
import {pushStack, popStack, setStack} from '../../src/action/creators.jsx';
import assert from 'assert';

suite('reducers', function() {

  suite('stack', function() {

    let state = [
      {page: 'HomePage', props: {}},
      {page: 'MovieListPage', props: {'movie-list': 23}},
      {page: 'MoviePage', props: {'movie-id': 45}}
    ];

    test('pushStack', function() {
      assert.deepEqual(stack(state, pushStack('tabs.home.stack', {
        page: 'BuyPage',
        props: {'movie-id': 45}
      })), [
        {page: 'HomePage', props: {}},
        {page: 'MovieListPage', props: {'movie-list': 23}},
        {page: 'MoviePage', props: {'movie-id': 45}},
        {page: 'BuyPage', props: {'movie-id': 45}}
      ]);
    });

    test('popStack', function() {
      assert.deepEqual(stack(state, popStack('tabs.home.stack')), [
        {page: 'HomePage', props: {}},
        {page: 'MovieListPage', props: {'movie-list': 23}}
      ]);
    });

    test('setStack', function() {
      assert.deepEqual(stack(state, setStack('tabs.home.stack', [
        {page: 'CardPage', props: {}},
        {page: 'PlayCardPage', props: {}},
        {page: 'SuccessPage', props: {score: 3000}}
      ])), [
        {page: 'CardPage', props: {}},
        {page: 'PlayCardPage', props: {}},
        {page: 'SuccessPage', props: {score: 3000}}
      ]);
    });

  });

});