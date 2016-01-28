import viewCluster from '../../src/reducers/viewCluster';
import {
  presentModal, dismissModal,
  addTab, removeTab, setTabs, selectTab,
  pushStack, popStack, setStack
} from '../../src/action/creators.jsx';
import assert from 'assert';

suite.skip('reducers', function() {

  suite('viewCluster', function() {

    let state = {
      tabs: [
        {
          key: 'songs',
          title: 'Songs',
          selected: true,
          icon: 'icon-songs.png',
          stack: [
            {
              key: 'song-list-page',
              page: 'SongListPage',
              props: {}
            },
            {
              key: 'song-page',
              page: 'SongPage',
              props: {id: 2}
            }
          ]
        },
        {
          key: 'artists',
          title: 'Artists',
          selected: false,
          icon: 'icon-artists.png',
          stack: [
            {
              key: 'artist-list-page',
              page: 'ArtistListPage',
              props: {}
            },
            {
              key: 'artist-page',
              page: 'ArtistPage',
              props: {id: 10}
            }
          ]
        }
      ],
      modals: [
        {
          key: 'addArtist',
          viewCluster: {
            key: 'addArtist',
            stack: [
              {
                key: 'add-artist-page',
                page: 'AddArtistPage',
                props: {}
              }
            ]
          }
        }
      ]
    };

    test('presentModal', function() {
      assert.deepEqual(viewCluster(state, presentModal('modals', {
        key: 'selectGenre',
        page: {
          key: 'select-genre-page',
          page: 'SelectGenrePage',
          props: {}
        }
      })), {
        tabs: [
          {
            key: 'songs',
            title: 'Songs',
            selected: true,
            icon: 'icon-songs.png',
            stack: [
              {
                key: 'song-list-page',
                page: 'SongListPage',
                props: {}
              },
              {
                key: 'song-page',
                page: 'SongPage',
                props: {id: 2}
              }
            ]
          },
          {
            key: 'artists',
            title: 'Artists',
            selected: false,
            icon: 'icon-artists.png',
            stack: [
              {
                key: 'artist-list-page',
                page: 'ArtistListPage',
                props: {}
              },
              {
                key: 'artist-page',
                page: 'ArtistPage',
                props: {id: 10}
              }
            ]
          }
        ],
        modals: [
          {
            key: 'addArtist',
            viewCluster: {
              key: 'addArtist',
              stack: [
                {
                  key: 'add-artist-page',
                  page: 'AddArtistPage',
                  props: {}
                }
              ]
            }
          },
          {
            key: 'selectGenre',
            page: {
              page: 'SelectGenrePage',
              props: {}
            }
          }
        ]
      });
    });

    test('dismissModal', function() {
      assert.deepEqual(viewCluster(state, dismissModal('modals.addArtist')), {
        tabs: [
          {
            key: 'songs',
            title: 'Songs',
            selected: true,
            icon: 'icon-songs.png',
            stack: [
              {
                key: 'song-list-page',
                page: 'SongListPage',
                props: {}
              },
              {
                key: 'song-page',
                page: 'SongPage',
                props: {id: 2}
              }
            ]
          },
          {
            key: 'artists',
            title: 'Artists',
            selected: false,
            icon: 'icon-artists.png',
            stack: [
              {
                key: 'artist-list-page',
                page: 'ArtistListPage',
                props: {}
              },
              {
                key: 'artist-page',
                page: 'ArtistPage',
                props: {id: 10}
              }
            ]
          }
        ],
        modals: []
      });
    });

    test('addTab', function() {
      assert.deepEqual(viewCluster(state, addTab('tabs.0', {
        key: 'albums',
        title: 'Albums',
        page: {
          key: 'albums-page',
          page: 'AlbumsPage',
          props: {}
        }
      })), {
        tabs: [
          {
            key: 'albums',
            title: 'Albums',
            page: {
              page: 'AlbumsPage',
              props: {}
            }
          },
          {
            key: 'songs',
            title: 'Songs',
            selected: true,
            icon: 'icon-songs.png',
            stack: [
              {
                key: 'song-list-page',
                page: 'SongListPage',
                props: {}
              },
              {
                key: 'song-page',
                page: 'SongPage',
                props: {id: 2}
              }
            ]
          },
          {
            key: 'artists',
            title: 'Artists',
            selected: false,
            icon: 'icon-artists.png',
            stack: [
              {
                key: 'artist-list-page',
                page: 'ArtistListPage',
                props: {}
              },
              {
                key: 'artist-page',
                page: 'ArtistPage',
                props: {id: 10}
              }
            ]
          }
        ],
        modals: [
          {
            key: 'addArtist',
            viewCluster: {
              key: 'addArtist',
              stack: [
                {
                  key: 'add-artist-page',
                  page: 'AddArtistPage',
                  props: {}
                }
              ]
            }
          }
        ]
      });

    });

    test('removeTab', function() {
      assert.deepEqual(viewCluster(state, removeTab('tabs.0')), {
        tabs: [
          {
            key: 'artists',
            title: 'Artists',
            icon: 'icon-artists.png',
            stack: [
              {
                page: 'ArtistListPage',
                props: {}
              },
              {
                page: 'ArtistPage',
                props: {id: 10}
              }
            ]
          }
        ],
        modals: [
          {
            key: 'addArtist',
            viewCluster: {
              key: 'addArtist',
              stack: [
                {
                  page: 'AddArtistPage',
                  props: {}
                }
              ]
            }
          }
        ]
      });
    });

    test('setTabs', function() {
      assert.deepEqual(viewCluster(state, setTabs('tabs', [
        {
          key: 'worldClock',
          title: 'World Clock',
          page: {
            key: 'world-clock-page',
            props: {},
            page: 'WorldClockPage'
          }
        }
      ])), {
        tabs: [
          {
            key: 'worldClock',
            title: 'World Clock',
            page: {
              key: 'world-clock-page',
              props: {},
              page: 'WorldClockPage'
            }
          }
        ],
        modals: [
          {
            key: 'addArtist',
            viewCluster: {
              key: 'addArtist',
              stack: [
                {
                  page: 'AddArtistPage',
                  props: {}
                }
              ]
            }
          }
        ]
      });
    });

    test('selectTab', function() {
      assert.deepEqual(viewCluster(state, selectTab('tabs.artists')), {
        tabs: [
          {
            key: 'songs',
            title: 'Songs',
            selected: false,
            icon: 'icon-songs.png',
            stack: [
              {
                page: 'SongListPage',
                props: {}
              },
              {
                page: 'SongPage',
                props: {id: 2}
              }
            ]
          },
          {
            key: 'artists',
            title: 'Artists',
            selected: true,
            icon: 'icon-artists.png',
            stack: [
              {
                page: 'ArtistListPage',
                props: {}
              },
              {
                page: 'ArtistPage',
                props: {id: 10}
              }
            ]
          }
        ],
        modals: [
          {
            key: 'addArtist',
            viewCluster: {
              key: 'addArtist',
              stack: [
                {
                  page: 'AddArtistPage',
                  props: {}
                }
              ]
            }
          }
        ]
      });
    });

    test('pushStack', function() {
      assert.deepEqual(viewCluster(state, pushStack('tabs.songs.stack', {
        page: 'PhotosPage',
        props: {id: 2}
      })), {
        tabs: [
          {
            key: 'songs',
            title: 'Songs',
            icon: 'icon-songs.png',
            stack: [
              {
                page: 'SongListPage',
                props: {}
              },
              {
                page: 'SongPage',
                props: {id: 2}
              },
              {
                page: 'PhotosPage',
                props: {id: 2}
              }
            ]
          },
          {
            key: 'artists',
            title: 'Artists',
            icon: 'icon-artists.png',
            stack: [
              {
                page: 'ArtistListPage',
                props: {}
              },
              {
                page: 'ArtistPage',
                props: {id: 10}
              }
            ]
          }
        ],
        modals: [
          {
            key: 'addArtist',
            viewCluster: {
              key: 'addArtist',
              stack: [
                {
                  page: 'AddArtistPage',
                  props: {}
                }
              ]
            }
          }
        ]
      });
    });

    test('popStack', function() {
      assert.deepEqual(viewCluster(state, popStack('tabs.songs.stack')), {
        tabs: [
          {
            key: 'songs',
            title: 'Songs',
            icon: 'icon-songs.png',
            stack: [
              {
                page: 'SongListPage',
                props: {}
              }
            ]
          },
          {
            key: 'artists',
            title: 'Artists',
            icon: 'icon-artists.png',
            stack: [
              {
                page: 'ArtistListPage',
                props: {}
              },
              {
                page: 'ArtistPage',
                props: {id: 10}
              }
            ]
          }
        ],
        modals: [
          {
            key: 'addArtist',
            viewCluster: {
              key: 'addArtist',
              stack: [
                {
                  page: 'AddArtistPage',
                  props: {}
                }
              ]
            }
          }
        ]
      });

    });

    test('setStack', function() {
      assert.deepEqual(viewCluster(state, setStack('tabs.artists.stack', [
        {
          key: 'rock-artists-page',
          page: 'RockArtistsPage',
          props: {}
        }
      ])), {
        tabs: [
          {
            key: 'songs',
            title: 'Songs',
            selected: true,
            icon: 'icon-songs.png',
            stack: [
              {
                page: 'SongListPage',
                props: {}
              },
              {
                page: 'SongPage',
                props: {id: 2}
              }
            ]
          },
          {
            key: 'artists',
            title: 'Artists',
            selected: false,
            icon: 'icon-artists.png',
            stack: [
              {
                key: 'rock-artists-page',
                page: 'RockArtistsPage',
                props: {}
              }
            ]
          }
        ],
        modals: [
          {
            key: 'addArtist',
            viewCluster: {
              key: 'addArtist',
              stack: [
                {
                  page: 'AddArtistPage',
                  props: {}
                }
              ]
            }
          }
        ]
      });
    });

  });
});