import page from '../../src/reducers/page';
import {setPageProps} from '../../src/action/creators';
import assert from 'assert';

suite('page', function() {

  test('set page props', function() {
    assert.deepEqual(page({
      key: 'page',
      props: {
        animate: false,
        title: true
      },
      page: 'MusicPage'
    }, setPageProps('never.mind.the.path', {animate: true})), {
      key: 'page',
      props: {
        animate: true,
        title: true
      },
      page: 'MusicPage'
    });
  });

});