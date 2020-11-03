import React from 'react';

function withHover(WrappedComponent, propName='hovering') {
  return class WithHover extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        hovering: false
      }

      this.onMouseOver = this.onMouseOver.bind(this);
      this.onMouseOut = this.onMouseOut.bind(this);
    }

    onMouseOver() {
      this.setState({
        hovering: true
      })
    }

    onMouseOut() {
      this.setState({
        hovering: false
      })
    }

    render() {
      const { children } = this.props;

      const props = {
        [propName]: this.state.hovering,
        ...this.props
      }

      return (
        <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
          <WrappedComponent {...props}>
            {children}
          </WrappedComponent>
        </div>
      )
    }
  }
}

export default withHover;
