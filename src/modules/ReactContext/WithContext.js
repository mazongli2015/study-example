import React from "react";

// 初始化Context，并赋予是默认值
const myContext = React.createContext({ a: "默认值a", b: "默认值b" });
const myContext2 = React.createContext("使用多重context");
export default class App extends React.PureComponent {
  state = {
    a: "aaaaaa",
    b: "bbbbbb"
  };
  render() {
    return (
      <myContext.Provider value={this.state}>
        <div
          style={{
            margin: "20px 20px",
            padding: "10px 10px",
            border: "1px solid red"
          }}
        >
          <h4>修改b的值</h4>
          <input onChange={e => this.setState({ b: e.target.value })} />
        </div>
        <A />
        <div
          style={{
            margin: "20px 20px",
            padding: "10px 10px",
            border: "1px solid red"
          }}
        >
          <h4>多重context</h4>
          <myContext2.Provider value="mutiple context--- myContext2">
            <A2 />
          </myContext2.Provider>
        </div>
      </myContext.Provider>
    );
  }
}

const A = () => {
  return (
    <>
      <B1 />
      <B2 />
      <C3 />
      <C4 />
    </>
  );
};

const A2 = () => <B3 />;

const B1 = () => {
  return (
    <myContext.Provider value={{ a: "from B1 Provider" }}>
      <C1 />
    </myContext.Provider>
  );
};

const B2 = () => {
  return <C2 />;
};

const B3 = () => <C5 />;

class C1 extends React.Component {
  // 接收最近的父元素的myContext.Provider中的值，因此这里将接收到B1的值
  static contextType = myContext;
  render() {
    return (
      <div
        style={{
          margin: "20px 20px",
          padding: "10px 10px",
          border: "1px solid gray"
        }}
      >
        <h4>从最近的父元素的Provider取值</h4>
        this is with context pass ----
        <strong>{(this.context || {}).a || ""}</strong>
      </div>
    );
  }
}

class C2 extends React.Component {
  // 接收最近的父元素的myContext.Provider中的值，因此这里将接收到App的值
  // 这里不能随意命名，使用context里的值时，用this.context
  static contextType = myContext;
  render() {
    return (
      <div
        style={{
          margin: "20px 20px",
          padding: "10px 10px",
          border: "1px solid green"
        }}
      >
        <h4>以contextType方式从context中取值</h4>
        this is with context pass ----
        <strong>{(this.context || {}).b || ""}</strong>
      </div>
    );
  }
}

const C3 = () => {
  // 我们也可以通过context.Consumer的方式来接收context里面的value
  // 这时候需要用render prop的方式来使用
  return (
    <div
      style={{
        margin: "20px 20px",
        padding: "10px 10px",
        border: "1px solid green"
      }}
    >
      <h4>以Consumer方式从context中取值</h4>
      <myContext.Consumer>
        {value => (
          <div>
            this is with context pass and accept the value with
            myContext.Consumer----
            <strong>{(value || {}).b || ""}</strong>
          </div>
        )}
      </myContext.Consumer>
    </div>
  );
};

class C4 extends React.Component {
  // 若子组件接收了context，则一旦contex的value发生变化，
  //即使子组件用shouldComponentUpdate限制了更新操作，子组件依然会发生更新
  static contextType = myContext;
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div
        style={{
          margin: "20px 20px",
          padding: "10px 10px",
          border: "1px solid blue"
        }}
      >
        <h4>验证使用contex对子组件的更新的影响</h4>
        <p>Call shouldComponentUpdate will always return false.</p>
        <p>But the value updated.</p>
        <div>
          this is with context pass ----
          <strong>{(this.context || {}).b || ""}</strong>
        </div>
      </div>
    );
  }
}

class C5 extends React.Component {
  // 在一个子组件中接收多个contex中的value时，由于一个类只能有一个contextType，所以不能用contextType方式接收
  render() {
    return (
      <myContext.Consumer>
        {context1 => (
          <>
            <div>
              This is the 1st context --- <strong>{(context1 || {}).b}</strong>
            </div>
            <myContext2.Consumer>
              {context2 => (
                <div>
                  This is the 2nd context --- <strong>{context2}</strong>
                </div>
              )}
            </myContext2.Consumer>
          </>
        )}
      </myContext.Consumer>
    );
  }
}
