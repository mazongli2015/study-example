import React from "react";

const Foo = props => {
  console.info(props.name);
  return <div>props.name={props.name}</div>;
};

const areEqual = (prevProps, nextProps) => {
  /** 与shouldComponentUpdate相似，但是这是用来判断prevProps和nextProps是否相等，相
   **  等返回true,组件不发生重新渲染；反之，组件重新渲染。主要用于性能优化，不要过于依
   **  赖，容易发生bug
   **/
  return prevProps.name === nextProps.name;
};

const MemoFoo = React.memo(Foo, areEqual);

export default class Bar extends React.PureComponent {
  state = { name: "Foo" };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <Foo name="Foo" />
        <MemoFoo name="MemoFo" />
      </div>
    );
  }
}
