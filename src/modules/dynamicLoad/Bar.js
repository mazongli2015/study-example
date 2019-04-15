import React from "react";

const LazyFoo = React.lazy(() => import("./Foo"));

export default class Bar extends React.PureComponent {
  render() {
    return (
      /**
       ** fallback表示LazyFoo未加载完时显示的组件,这里直接使用字符串，使用React.lazy时必须和React.Suspense组合使用
       **/
      <React.Suspense fallback={"loading"}>
        <LazyFoo />
      </React.Suspense>
    );
  }
}
