import createRootPage from '../../src/reducers/createRootPage';
import {setPageProps, replacePageProps} from '../../src/action/creators';
import assert from 'assert';

suite('createRootPage', function() {

  suite('setPageProps', function() {

    test('it should work for simplest case', function() {
      let rootPage = createRootPage({
        key: 'some',
        page: 'SomePage',
        props: {
          showTopBar: true,
          hideBottomBar: true
        }
      });
      assert.deepEqual(rootPage(undefined, setPageProps(['some'], {hideBottomBar: false})), {
        key: 'some',
        page: 'SomePage',
        props: {
          showTopBar: true,
          hideBottomBar: false
        }
      });
    });

    test('it should work for nested case', function() {
      let rootPage = createRootPage({
        key: 'some',
        page: 'SomePage',
        props: {
          childPages: [
            {
              key: 'tab1',
              title: 'Tab 1',
              page: 'StackPage',
              props: {
                childPages: [
                  {
                    key: 'tab1',
                    page: 'Tab1Page',
                    props: {a:1, b:2}
                  }
                ]
              }
            },
            {
              key: 'tab2',
              title: 'Tab 2',
              page: 'StackPage',
              props: {
                childPages: [
                  {
                    key: 'tab2',
                    page: 'Tab2Page',
                    props: {a:1, b:2}
                  }
                ]
              }
            }
          ]
        }
      });
      assert.deepEqual(rootPage(undefined, setPageProps(['some', 'tab2', 'tab2'], {c:3})), {
        key: 'some',
        page: 'SomePage',
        props: {
          childPages: [
            {
              key: 'tab1',
              title: 'Tab 1',
              page: 'StackPage',
              props: {
                childPages: [
                  {
                    key: 'tab1',
                    page: 'Tab1Page',
                    props: {a:1, b:2}
                  }
                ]
              }
            },
            {
              key: 'tab2',
              title: 'Tab 2',
              page: 'StackPage',
              props: {
                childPages: [
                  {
                    key: 'tab2',
                    page: 'Tab2Page',
                    props: {a:1, b:2, c:3}
                  }
                ]
              }
            }
          ]
        }
      });
    });
  });

  suite('replacePageProps', function() {

    test('it should work for simplest case', function() {
      let rootPage = createRootPage({
        key: 'some',
        page: 'SomePage',
        props: {
          showTopBar: true,
          hideBottomBar: true
        }
      });
      assert.deepEqual(rootPage(undefined, replacePageProps(['some'], {hideBottomBar: false})), {
        key: 'some',
        page: 'SomePage',
        props: {
          hideBottomBar: false
        }
      });
    });


    test('it should work for nested case', function() {
      let rootPage = createRootPage({
        key: 'some',
        page: 'SomePage',
        props: {
          childPages: [
            {
              key: 'tab1',
              title: 'Tab 1',
              page: 'StackPage',
              props: {
                childPages: [
                  {
                    key: 'tab1',
                    page: 'Tab1Page',
                    props: {a:1, b:2}
                  }
                ]
              }
            },
            {
              key: 'tab2',
              title: 'Tab 2',
              page: 'StackPage',
              props: {
                childPages: [
                  {
                    key: 'tab2',
                    page: 'Tab2Page',
                    props: {a:1, b:2}
                  }
                ]
              }
            }
          ]
        }
      });
      assert.deepEqual(rootPage(undefined, replacePageProps(['some', 'tab2', 'tab2'], {c:3})), {
        key: 'some',
        page: 'SomePage',
        props: {
          childPages: [
            {
              key: 'tab1',
              title: 'Tab 1',
              page: 'StackPage',
              props: {
                childPages: [
                  {
                    key: 'tab1',
                    page: 'Tab1Page',
                    props: {a:1, b:2}
                  }
                ]
              }
            },
            {
              key: 'tab2',
              title: 'Tab 2',
              page: 'StackPage',
              props: {
                childPages: [
                  {
                    key: 'tab2',
                    page: 'Tab2Page',
                    props: {c:3}
                  }
                ]
              }
            }
          ]
        }
      });
    });
  });
});