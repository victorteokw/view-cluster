let {
  presentModal, dismissModal,
  pushStack, popStack, setStack
} = actionCreators;

import assert from 'assert';

suite('reducers', function() {

  suite('tabs', function() {

    let state = [
      {
        slug: 'artists',
        title: 'Artists',
        selected: true,
        icon: 'artists-icon.png',
        stack: [{page: 'ArtistsPage', props: {}}]
      },
      {
        slug: 'songs',
        title: 'Songs',
        selected: false,
        icon: 'songs-icon.png',
        stack: [{page: 'SongsPage', props: {}}]
      },
      {
        slug: 'albums',
        title: 'Albums',
        selected: false,
        icon: 'albums-icon.png',
        stack: [{page: 'AlbumsPage', props: {}}]
      },
      {
        slug: 'search',
        title: 'Search',
        selected: false,
        icon: 'search-icon.png',
        page: {page: 'SearchPage', props: {}}
      }
    ];

    suite('selectTab', function() {

      test('with a number', function() {
        assert.deepEqual(tabs(state, selectTab('tabs.2')), [
          {
            slug: 'artists',
            title: 'Artists',
            selected: false,
            icon: 'artists-icon.png',
            stack: [{page: 'ArtistsPage', props: {}}]
          },
          {
            slug: 'songs',
            title: 'Songs',
            selected: false,
            icon: 'songs-icon.png',
            stack: [{page: 'SongsPage', props: {}}]
          },
          {
            slug: 'albums',
            title: 'Albums',
            selected: true,
            icon: 'albums-icon.png',
            stack: [{page: 'AlbumsPage', props: {}}]
          },
          {
            slug: 'search',
            title: 'Search',
            selected: false,
            icon: 'search-icon.png',
            page: {page: 'SearchPage', props: {}}
          }
        ]);
      });

      test('with a key', function() {
        assert.deepEqual(tabs(state, selectTab('tabs.songs')), [
          {
            slug: 'artists',
            title: 'Artists',
            selected: false,
            icon: 'artists-icon.png',
            stack: [{page: 'ArtistsPage', props: {}}]
          },
          {
            slug: 'songs',
            title: 'Songs',
            selected: true,
            icon: 'songs-icon.png',
            stack: [{page: 'SongsPage', props: {}}]
          },
          {
            slug: 'albums',
            title: 'Albums',
            selected: false,
            icon: 'albums-icon.png',
            stack: [{page: 'AlbumsPage', props: {}}]
          },
          {
            slug: 'search',
            title: 'Search',
            selected: false,
            icon: 'search-icon.png',
            page: {page: 'SearchPage', props: {}}
          }
        ]);
      });

    });

    suite('addTab', function() {

      test('with a number', function() {
        assert.deepEqual(tabs(state, addTab('tabs.2', {
          slug: 'fans',
          title: 'Fans',
          selected: false,
          icon: 'fans-icon.png',
          page: {page: 'FansPage', props: {}}
        })), [
          {
            slug: 'artists',
            title: 'Artists',
            selected: true,
            icon: 'artists-icon.png',
            stack: [{page: 'ArtistsPage', props: {}}]
          },
          {
            slug: 'songs',
            title: 'Songs',
            selected: false,
            icon: 'songs-icon.png',
            stack: [{page: 'SongsPage', props: {}}]
          },
          {
            slug: 'fans',
            title: 'Fans',
            selected: false,
            icon: 'fans-icon.png',
            page: {page: 'FansPage', props: {}}
          },
          {
            slug: 'albums',
            title: 'Albums',
            selected: false,
            icon: 'albums-icon.png',
            stack: [{page: 'AlbumsPage', props: {}}]
          },
          {
            slug: 'search',
            title: 'Search',
            selected: false,
            icon: 'search-icon.png',
            page: {page: 'SearchPage', props: {}}
          }
        ]);
      });

    });

    suite('removeTab', function() {

      test('with a number', function() {
        assert.deepEqual(tabs(state, removeTab('tabs.2')), [
          {
            slug: 'artists',
            title: 'Artists',
            selected: true,
            icon: 'artists-icon.png',
            stack: [{page: 'ArtistsPage', props: {}}]
          },
          {
            slug: 'songs',
            title: 'Songs',
            selected: false,
            icon: 'songs-icon.png',
            stack: [{page: 'SongsPage', props: {}}]
          },
          {
            slug: 'search',
            title: 'Search',
            selected: false,
            icon: 'search-icon.png',
            page: {page: 'SearchPage', props: {}}
          }
        ]);
      });

      test('with a key', function() {
        assert.deepEqual(tabs(state, removeTab('tabs.albums')), [
          {
            slug: 'artists',
            title: 'Artists',
            selected: true,
            icon: 'artists-icon.png',
            stack: [{page: 'ArtistsPage', props: {}}]
          },
          {
            slug: 'songs',
            title: 'Songs',
            selected: false,
            icon: 'songs-icon.png',
            stack: [{page: 'SongsPage', props: {}}]
          },
          {
            slug: 'search',
            title: 'Search',
            selected: false,
            icon: 'search-icon.png',
            page: {page: 'SearchPage', props: {}}
          }
        ]);
      });

    });

    test('setTabs', function() {
      assert.deepEqual(tabs(state, setTabs('tabs', [
        {
          key: 'nice',
          title: 'Nice',
          icon: 'nice-icon.png',
          stack: [{page: 'NicePage', props: {}}]
        },
        {
          key: 'show',
          title: 'Show',
          icon: 'show-icon.png',
          page: {page: 'ShowPage', props: {'show-id': 28}}
        }
      ])), [
        {
          key: 'nice',
          title: 'Nice',
          icon: 'nice-icon.png',
          stack: [{page: 'NicePage', props: {}}]
        },
        {
          key: 'show',
          title: 'Show',
          icon: 'show-icon.png',
          page: {page: 'ShowPage', props: {'show-id': 28}}
        }
      ]);
    });
  });

  suite('stack', function() {

    suite('pushStack', function() {

    });

    suite('popStack', function() {

    });

    suite('setStack', function() {

    });

  });

  suite('modals', function() {

    suite('presentModal', function() {

    });

    suite('dismissModal', function() {

    });

  });

  suite('viewCluster', function() {

  });

});
