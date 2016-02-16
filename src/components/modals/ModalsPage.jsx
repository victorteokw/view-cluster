import React from 'react';
import ReactTransitionGroup from '../ReactTransitionGroup';
import Page from '../Page';
import ModalView from './ModalView';

class ModalsPage extends Page {

  static propTypes = {
    childPages: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        page: React.PropTypes.string.isRequired,
        props: React.PropTypes.object
      })
    )
  };

  constructor(props, context) {
    super(props, context);
    this.noLazyLoading();
  }

  renderPage() {
    return <ReactTransitionGroup component="div" className="modals">
      {
        this.props.childPages.map((m) => {
          return <ModalView key={m.key}>
            {this.pageRender(m)}
          </ModalView>
        })
      }
    </ReactTransitionGroup>
  }
}