//import modals from '../../src/reducers/modals';
//import {presentModal, dismissModal} from '../../src/action/creators';
//import assert from 'assert';
//
//suite('reducers', function() {
//
//  suite('modals', function() {
//
//    let state = [
//      {
//        key: 'signIn', viewCluster: {
//          key: 'signInViewCluster',
//          stack: [{page: 'SignInPage', props: {}}]
//        }
//      },
//      {key: 'signUp', page: 'SignUpPage', props: {}}
//    ];
//
//    test('presentModal', function () {
//      assert.deepEqual(modals(state, presentModal('modals', {
//        key: 'terms',
//        page: 'TermsPage',
//        props: {}
//      })), [
//        {
//          key: 'signIn', viewCluster: {
//            key: 'signInViewCluster',
//            stack: [{page: 'SignInPage', props: {}}]
//          }
//        },
//        {key: 'signUp', page: 'SignUpPage', props: {}},
//        {key: 'terms', page: 'TermsPage', props: {}}
//      ]);
//    });
//
//    test('dismissModal', function () {
//      assert.deepEqual(modals(state, dismissModal('modals.signIn')), [
//        {key: 'signUp', page: 'SignUpPage', props: {}}
//      ]);
//    });
//
//  });
//});