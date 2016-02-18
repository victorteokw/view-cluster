//import viewCluster from '../../src/reducers/viewCluster';
//import {
//  presentModal, dismissModal,
//  addTab, removeTab, setTabs, selectTab,
//  pushStack, popStack, setStack,
//  setPageProps
//} from '../../src/action/creators';
//import assert from 'assert';
//
//suite('reducers', function() {
//
//  suite('viewCluster', function() {
//
//    let state = {
//      tabs: [
//        {
//          key: 'songs',
//          title: 'Songs',
//          selected: true,
//          icon: 'icon-songs.png',
//          stack: [
//            {
//              key: 'song-list-page',
//              page: 'SongListPage',
//              props: {}
//            },
//            {
//              key: 'song-page',
//              page: 'SongPage',
//              props: {id: 2}
//            }
//          ]
//        },
//        {
//          key: 'artists',
//          title: 'Artists',
//          selected: false,
//          icon: 'icon-artists.png',
//          stack: [
//            {
//              key: 'artist-list-page',
//              page: 'ArtistListPage',
//              props: {}
//            },
//            {
//              key: 'artist-page',
//              page: 'ArtistPage',
//              props: {id: 10}
//            }
//          ]
//        }
//      ],
//      modals: [
//        {
//          key: 'addArtist',
//          viewCluster: {
//            key: 'addArtist',
//            stack: [
//              {
//                key: 'add-artist-page',
//                page: 'AddArtistPage',
//                props: {}
//              }
//            ]
//          }
//        }
//      ]
//    };
//
//    test('presentModal', function() {
//      assert.deepEqual(viewCluster(state, presentModal('modals', {
//        key: 'selectGenre',
//        page: {
//          key: 'select-genre-page',
//          page: 'SelectGenrePage',
//          props: {}
//        }
//      })), {
//        tabs: [
//          {
//            key: 'songs',
//            title: 'Songs',
//            selected: true,
//            icon: 'icon-songs.png',
//            stack: [
//              {
//                key: 'song-list-page',
//                page: 'SongListPage',
//                props: {}
//              },
//              {
//                key: 'song-page',
//                page: 'SongPage',
//                props: {id: 2}
//              }
//            ]
//          },
//          {
//            key: 'artists',
//            title: 'Artists',
//            selected: false,
//            icon: 'icon-artists.png',
//            stack: [
//              {
//                key: 'artist-list-page',
//                page: 'ArtistListPage',
//                props: {}
//              },
//              {
//                key: 'artist-page',
//                page: 'ArtistPage',
//                props: {id: 10}
//              }
//            ]
//          }
//        ],
//        modals: [
//          {
//            key: 'addArtist',
//            viewCluster: {
//              key: 'addArtist',
//              stack: [
//                {
//                  key: 'add-artist-page',
//                  page: 'AddArtistPage',
//                  props: {}
//                }
//              ]
//            }
//          },
//          {
//            key: 'selectGenre',
//            page: {
//              key: 'select-genre-page',
//              page: 'SelectGenrePage',
//              props: {}
//            }
//          }
//        ]
//      });
//    });
//
//    test('dismissModal', function() {
//      assert.deepEqual(viewCluster(state, dismissModal('modals.addArtist')), {
//        tabs: [
//          {
//            key: 'songs',
//            title: 'Songs',
//            selected: true,
//            icon: 'icon-songs.png',
//            stack: [
//              {
//                key: 'song-list-page',
//                page: 'SongListPage',
//                props: {}
//              },
//              {
//                key: 'song-page',
//                page: 'SongPage',
//                props: {id: 2}
//              }
//            ]
//          },
//          {
//            key: 'artists',
//            title: 'Artists',
//            selected: false,
//            icon: 'icon-artists.png',
//            stack: [
//              {
//                key: 'artist-list-page',
//                page: 'ArtistListPage',
//                props: {}
//              },
//              {
//                key: 'artist-page',
//                page: 'ArtistPage',
//                props: {id: 10}
//              }
//            ]
//          }
//        ],
//        modals: []
//      });
//    });
//
//    test('addTab', function() {
//      assert.deepEqual(viewCluster(state, addTab('tabs.0', {
//        key: 'albums',
//        title: 'Albums',
//        page: {
//          key: 'albums-page',
//          page: 'AlbumsPage',
//          props: {}
//        }
//      })), {
//        tabs: [
//          {
//            key: 'albums',
//            title: 'Albums',
//            page: {
//              key: 'albums-page',
//              page: 'AlbumsPage',
//              props: {}
//            }
//          },
//          {
//            key: 'songs',
//            title: 'Songs',
//            selected: true,
//            icon: 'icon-songs.png',
//            stack: [
//              {
//                key: 'song-list-page',
//                page: 'SongListPage',
//                props: {}
//              },
//              {
//                key: 'song-page',
//                page: 'SongPage',
//                props: {id: 2}
//              }
//            ]
//          },
//          {
//            key: 'artists',
//            title: 'Artists',
//            selected: false,
//            icon: 'icon-artists.png',
//            stack: [
//              {
//                key: 'artist-list-page',
//                page: 'ArtistListPage',
//                props: {}
//              },
//              {
//                key: 'artist-page',
//                page: 'ArtistPage',
//                props: {id: 10}
//              }
//            ]
//          }
//        ],
//        modals: [
//          {
//            key: 'addArtist',
//            viewCluster: {
//              key: 'addArtist',
//              stack: [
//                {
//                  key: 'add-artist-page',
//                  page: 'AddArtistPage',
//                  props: {}
//                }
//              ]
//            }
//          }
//        ]
//      });
//
//    });
//
//    test('removeTab', function() {
//      assert.deepEqual(viewCluster(state, removeTab('tabs.0')), {
//        tabs: [
//          {
//            key: 'artists',
//            title: 'Artists',
//            selected: false,
//            icon: 'icon-artists.png',
//            stack: [
//              {
//                key: 'artist-list-page',
//                page: 'ArtistListPage',
//                props: {}
//              },
//              {
//                key: 'artist-page',
//                page: 'ArtistPage',
//                props: {id: 10}
//              }
//            ]
//          }
//        ],
//        modals: [
//          {
//            key: 'addArtist',
//            viewCluster: {
//              key: 'addArtist',
//              stack: [
//                {
//                  key: 'add-artist-page',
//                  page: 'AddArtistPage',
//                  props: {}
//                }
//              ]
//            }
//          }
//        ]
//      });
//    });
//
//    test('setTabs', function() {
//      assert.deepEqual(viewCluster(state, setTabs('tabs', [
//        {
//          key: 'worldClock',
//          title: 'World Clock',
//          selected: false,
//          page: {
//            key: 'world-clock-page',
//            props: {},
//            page: 'WorldClockPage'
//          }
//        }
//      ])), {
//        tabs: [
//          {
//            key: 'worldClock',
//            title: 'World Clock',
//            selected: false,
//            page: {
//              key: 'world-clock-page',
//              props: {},
//              page: 'WorldClockPage'
//            }
//          }
//        ],
//        modals: [
//          {
//            key: 'addArtist',
//            viewCluster: {
//              key: 'addArtist',
//              stack: [
//                {
//                  key: 'add-artist-page',
//                  page: 'AddArtistPage',
//                  props: {}
//                }
//              ]
//            }
//          }
//        ]
//      });
//    });
//
//    test('selectTab', function() {
//      assert.deepEqual(viewCluster(state, selectTab('tabs.artists')), {
//        tabs: [
//          {
//            key: 'songs',
//            title: 'Songs',
//            selected: false,
//            icon: 'icon-songs.png',
//            stack: [
//              {
//                key: 'song-list-page',
//                page: 'SongListPage',
//                props: {}
//              },
//              {
//                key: 'song-page',
//                page: 'SongPage',
//                props: {id: 2}
//              }
//            ]
//          },
//          {
//            key: 'artists',
//            title: 'Artists',
//            selected: true,
//            icon: 'icon-artists.png',
//            stack: [
//              {
//                key: 'artist-list-page',
//                page: 'ArtistListPage',
//                props: {}
//              },
//              {
//                key: 'artist-page',
//                page: 'ArtistPage',
//                props: {id: 10}
//              }
//            ]
//          }
//        ],
//        modals: [
//          {
//            key: 'addArtist',
//            viewCluster: {
//              key: 'addArtist',
//              stack: [
//                {
//                  key: 'add-artist-page',
//                  page: 'AddArtistPage',
//                  props: {}
//                }
//              ]
//            }
//          }
//        ]
//      });
//    });
//
//    test('pushStack', function() {
//      assert.deepEqual(viewCluster(state, pushStack('tabs.songs.stack', {
//        key: 'photos-page',
//        page: 'PhotosPage',
//        props: {id: 2}
//      })), {
//        tabs: [
//          {
//            key: 'songs',
//            title: 'Songs',
//            selected: true,
//            icon: 'icon-songs.png',
//            stack: [
//              {
//                key: 'song-list-page',
//                page: 'SongListPage',
//                props: {}
//              },
//              {
//                key: 'song-page',
//                page: 'SongPage',
//                props: {id: 2}
//              },
//              {
//                key: 'photos-page',
//                page: 'PhotosPage',
//                props: {id: 2}
//              }
//            ]
//          },
//          {
//            key: 'artists',
//            title: 'Artists',
//            selected: false,
//            icon: 'icon-artists.png',
//            stack: [
//              {
//                key: 'artist-list-page',
//                page: 'ArtistListPage',
//                props: {}
//              },
//              {
//                key: 'artist-page',
//                page: 'ArtistPage',
//                props: {id: 10}
//              }
//            ]
//          }
//        ],
//        modals: [
//          {
//            key: 'addArtist',
//            viewCluster: {
//              key: 'addArtist',
//              stack: [
//                {
//                  key: 'add-artist-page',
//                  page: 'AddArtistPage',
//                  props: {}
//                }
//              ]
//            }
//          }
//        ]
//      });
//    });
//
//    test('popStack', function() {
//      assert.deepEqual(viewCluster(state, popStack('tabs.songs.stack')), {
//        tabs: [
//          {
//            key: 'songs',
//            title: 'Songs',
//            selected: true,
//            icon: 'icon-songs.png',
//            stack: [
//              {
//                key: 'song-list-page',
//                page: 'SongListPage',
//                props: {}
//              }
//            ]
//          },
//          {
//            key: 'artists',
//            title: 'Artists',
//            selected: false,
//            icon: 'icon-artists.png',
//            stack: [
//              {
//                key: 'artist-list-page',
//                page: 'ArtistListPage',
//                props: {}
//              },
//              {
//                key: 'artist-page',
//                page: 'ArtistPage',
//                props: {id: 10}
//              }
//            ]
//          }
//        ],
//        modals: [
//          {
//            key: 'addArtist',
//            viewCluster: {
//              key: 'addArtist',
//              stack: [
//                {
//                  key: 'add-artist-page',
//                  page: 'AddArtistPage',
//                  props: {}
//                }
//              ]
//            }
//          }
//        ]
//      });
//
//    });
//
//    test('setStack', function() {
//      assert.deepEqual(viewCluster(state, setStack('tabs.artists.stack', [
//        {
//          key: 'rock-artists-page',
//          page: 'RockArtistsPage',
//          props: {}
//        }
//      ])), {
//        tabs: [
//          {
//            key: 'songs',
//            title: 'Songs',
//            selected: true,
//            icon: 'icon-songs.png',
//            stack: [
//              {
//                key: 'song-list-page',
//                page: 'SongListPage',
//                props: {}
//              },
//              {
//                key: 'song-page',
//                page: 'SongPage',
//                props: {id: 2}
//              }
//            ]
//          },
//          {
//            key: 'artists',
//            title: 'Artists',
//            selected: false,
//            icon: 'icon-artists.png',
//            stack: [
//              {
//                key: 'rock-artists-page',
//                page: 'RockArtistsPage',
//                props: {}
//              }
//            ]
//          }
//        ],
//        modals: [
//          {
//            key: 'addArtist',
//            viewCluster: {
//              key: 'addArtist',
//              stack: [
//                {
//                  key: 'add-artist-page',
//                  page: 'AddArtistPage',
//                  props: {}
//                }
//              ]
//            }
//          }
//        ]
//      });
//    });
//
//  });
//
//  suite('nested viewCluster in a modal', function() {
//
//    let state = {
//      stack: [
//        {
//          key: 'first-page',
//          page: 'FirstPage',
//          props: {}
//        }
//      ],
//      modals: [
//        {
//          key: 'first-modal',
//          viewCluster: {
//            key: 'first-modal-cluster',
//            tabs: [
//              {
//                key: 'first-tab',
//                title: "First Tab",
//                selected: true,
//                stack: [
//                  {
//                    key: 'first-page',
//                    page: 'FirstPage',
//                    props: {}
//                  },
//                  {
//                    key: 'second-page',
//                    page: 'SecondPage',
//                    props: {}
//                  }
//                ]
//              }
//            ],
//            modals: []
//          }
//        }
//      ]
//    };
//
//    test('presentModal', function() {
//      assert.deepEqual(viewCluster(state, presentModal('modals.first-modal.viewCluster.modals', {
//        key: 'new-modal-1',
//        page: {
//          key: 'new-page-key',
//          page: 'NewPage',
//          props: {}
//        }
//      })), {
//        stack: [
//          {
//            key: 'first-page',
//            page: 'FirstPage',
//            props: {}
//          }
//        ],
//        modals: [
//          {
//            key: 'first-modal',
//            viewCluster: {
//              key: 'first-modal-cluster',
//              tabs: [
//                {
//                  key: 'first-tab',
//                  title: "First Tab",
//                  selected: true,
//                  stack: [
//                    {
//                      key: 'first-page',
//                      page: 'FirstPage',
//                      props: {}
//                    },
//                    {
//                      key: 'second-page',
//                      page: 'SecondPage',
//                      props: {}
//                    }
//                  ]
//                }
//              ],
//              modals: [
//                {
//                  key: 'new-modal-1',
//                  page: {
//                    key: 'new-page-key',
//                    page: 'NewPage',
//                    props: {}
//                  }
//                }
//              ]
//            }
//          }
//        ]
//      });
//    });
//
//    test('dismissModal', function() {
//      let newState = {
//        stack: [
//          {
//            key: 'first-page',
//            page: 'FirstPage',
//            props: {}
//          }
//        ],
//        modals: [
//          {
//            key: 'first-modal',
//            viewCluster: {
//              key: 'first-modal-cluster',
//              tabs: [
//                {
//                  key: 'first-tab',
//                  title: "First Tab",
//                  selected: true,
//                  stack: [
//                    {
//                      key: 'first-page',
//                      page: 'FirstPage',
//                      props: {}
//                    },
//                    {
//                      key: 'second-page',
//                      page: 'SecondPage',
//                      props: {}
//                    }
//                  ]
//                }
//              ],
//              modals: [
//                {
//                  key: 'new-modal-1',
//                  page: {
//                    key: 'new-page-key',
//                    page: 'NewPage',
//                    props: {}
//                  }
//                }
//              ]
//            }
//          }
//        ]
//      };
//      assert.deepEqual(viewCluster(newState,
//        dismissModal('modals.first-modal.viewCluster.modals.new-modal-1')), state);
//    });
//
//    test('addTab', function() {
//      assert.deepEqual(viewCluster(state, addTab('modals.first-modal.viewCluster.tabs.0', {
//        key: 'new-tab-1',
//        title: 'New Tab 1',
//        page: { page: 'APage', props: {}}
//      })), {
//        stack: [
//          {
//            key: 'first-page',
//            page: 'FirstPage',
//            props: {}
//          }
//        ],
//        modals: [
//          {
//            key: 'first-modal',
//            viewCluster: {
//              key: 'first-modal-cluster',
//              tabs: [
//                {
//                  key: 'new-tab-1',
//                  title: 'New Tab 1',
//                  page: { page: 'APage', props: {}}
//                },
//                {
//                  key: 'first-tab',
//                  title: "First Tab",
//                  selected: true,
//                  stack: [
//                    {
//                      key: 'first-page',
//                      page: 'FirstPage',
//                      props: {}
//                    },
//                    {
//                      key: 'second-page',
//                      page: 'SecondPage',
//                      props: {}
//                    }
//                  ]
//                }
//              ],
//              modals: []
//            }
//          }
//        ]
//      });
//    });
//
//    test('pushStack', function() {
//      assert.deepEqual(viewCluster(state, pushStack('modals.first-modal.viewCluster.tabs.first-tab.stack', {
//        key: 'third-page',
//        page: 'ThirdPage',
//        props: {}
//      })), {
//        stack: [
//          {
//            key: 'first-page',
//            page: 'FirstPage',
//            props: {}
//          }
//        ],
//        modals: [
//          {
//            key: 'first-modal',
//            viewCluster: {
//              key: 'first-modal-cluster',
//              tabs: [
//                {
//                  key: 'first-tab',
//                  title: "First Tab",
//                  selected: true,
//                  stack: [
//                    {
//                      key: 'first-page',
//                      page: 'FirstPage',
//                      props: {}
//                    },
//                    {
//                      key: 'second-page',
//                      page: 'SecondPage',
//                      props: {}
//                    },
//                    {
//                      key: 'third-page',
//                      page: 'ThirdPage',
//                      props: {}
//                    }
//                  ]
//                }
//              ],
//              modals: []
//            }
//          }
//        ]
//      });
//    });
//
//  });
//
//  suite('set page props', function() {
//
//    test('works in a tab', function() {
//
//      let state = {
//        tabs: [
//          {
//            key: 'firstTab',
//            title: 'First Tab',
//            page: {
//              page: 'FirstPage',
//              key: 'firstPage',
//              props: {showBar: true}
//            }
//          }
//        ]
//      };
//
//      assert.deepEqual(viewCluster(state, setPageProps('tabs.firstTab.page', {animateBar: true})), {
//        tabs: [
//          {
//            key: 'firstTab',
//            title: 'First Tab',
//            page: {
//              page: 'FirstPage',
//              key: 'firstPage',
//              props: {showBar: true, animateBar: true}
//            }
//          }
//        ]
//      });
//
//    });
//
//    test('works in a stack', function() {
//
//      let state = {
//        tabs: [
//          {
//            key: 'firstTab',
//            title: 'First Tab',
//            stack: [
//              {
//                page: 'FirstPage',
//                key: 'firstPage',
//                props: {showBar: true}
//              }
//            ]
//          }
//        ]
//      };
//
//      assert.deepEqual(viewCluster(state, setPageProps('tabs.firstTab.stack.firstPage', {animateBar: true})), {
//        tabs: [
//          {
//            key: 'firstTab',
//            title: 'First Tab',
//            stack: [
//              {
//                page: 'FirstPage',
//                key: 'firstPage',
//                props: {showBar: true, animateBar: true}
//              }
//            ]
//          }
//        ]
//      });
//
//    });
//
//    test('works in a view cluster', function() {
//
//      let state = {
//        page: {
//          page: 'SomePage',
//          key: 'first'
//        },
//        modals: []
//      };
//
//      assert.deepEqual(viewCluster(state, setPageProps('page', {animateBar: true})), {
//        page: {
//          page: 'SomePage',
//          key: 'first',
//          props: {animateBar: true}
//        },
//        modals: []
//      });
//
//    });
//
//    test('works in a modal', function() {
//
//      let state = {
//        tabs: [],
//        modals: [
//          {
//            page: 'SomePage',
//            key: 'some',
//            props: {}
//          }
//        ]
//      };
//
//      assert.deepEqual(viewCluster(state, setPageProps('modals.some', {animateBar: true})), {
//        tabs: [],
//        modals: [
//          {
//            page: 'SomePage',
//            key: 'some',
//            props: {animateBar: true}
//          }
//        ]
//      });
//
//    });
//
//  });
//});
