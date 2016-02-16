import React from 'react';
import ReactTransitionGroup from '../ReactTransitionGroup';
import Page from '../Page';
import ModalView from './ModalView';

class ModalsPage extends Page {

  static propTypes = {
    modals: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        page: React.PropTypes.shape({
          page: React.PropTypes.string.isRequired,
          props: React.PropTypes.object
        })
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
        this.props.modals.map((m) => {
          return <ModalView key={m.key}>
            {this.pageRender(m.page, m.key)}
          </ModalView>
        })
      }
    </ReactTransitionGroup>
  }
}