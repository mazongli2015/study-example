import React from "react";

export default class App extends React.PureComponent {
  state = {
    a: "aaaaaa",
    b: "bbbbbb"
  };
  render() {
    return <A a={this.state.a} b={this.state.b} />;
  }
}

const A = props => {
  return (
    <>
      <B1 a={props.a} />
      <B2 b={props.b} />
    </>
  );
};

const B1 = props => {
  return <C1 a={props.a} />;
};

const B2 = props => {
  return <C2 b={props.b} />;
};

const C1 = props => (
  <div>
    this is without context passs ---- <strong>{props.a}</strong>
  </div>
);
const C2 = props => (
  <div>
    this is without context passs ---- <strong>{props.b}</strong>
  </div>
);
