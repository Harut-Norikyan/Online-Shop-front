import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

class DropdownMenu extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { open, children } = this.props;
    return (
      <CSSTransitionGroup
        component="div"
        // transitionName="dropdownOpen"
        transitionName="example"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {open ? (
          <div className="dropdown-menu open">
            {children}
          </div>
        ) : null}
      </CSSTransitionGroup>
    );
  }
}

export default DropdownMenu;
