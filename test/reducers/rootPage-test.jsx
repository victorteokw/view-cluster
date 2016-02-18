import createRootPage from '../../src/reducers/createRootPage';
import {setPageProps, replacePageProps} from '../../src/action/creators';
import assert from 'assert';

suite('createRootPage', function() {

  suite('setPageProps', function() {

    test('it should work for simplest case', function() {
      let rootPage = createRootPage({
        page: 'SomePage',
        props: {
          showTopBar: true,
          hideBottomBar: true
        }
      });
      assert.deepEqual(rootPage(undefined, setPageProps([], {hideBottomBar: false})), {
        page: 'SomePage',
        props: {
          showTopBar: true,
          hideBottomBar: false
        }
      });
    });

    test('it should work for nested case', function() {
      let rootPage = createRootPage({
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
      assert.deepEqual(rootPage(undefined, setPageProps(['tab2', 'tab2'], {c:3})), {
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
        page: 'SomePage',
        props: {
          showTopBar: true,
          hideBottomBar: true
        }
      });
      assert.deepEqual(rootPage(undefined, replacePageProps([], {hideBottomBar: false})), {
        page: 'SomePage',
        props: {
          hideBottomBar: false
        }
      });
    });


    test('it should work for nested case', function() {
      let rootPage = createRootPage({
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
      assert.deepEqual(rootPage(undefined, replacePageProps(['tab2', 'tab2'], {c:3})), {
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