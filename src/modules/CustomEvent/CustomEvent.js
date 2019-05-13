import React, {
  useMemo,
  useEffect,
  useCallback,
  useState
} from "react";
import ReactDom from "react-dom";

const createCustomEvent = (type, details) => {
  return new CustomEvent(type, details);
};

export const CustomEventHookTest = () => {
  const evt = useMemo(() => {
    console.info("创建example--event");
    return createCustomEvent("example");
  }, []);
  const eventHandler = useCallback(
    e => console.info("CustomEvent-----", e),
    []
  );

  const [count, setCount] = useState(0);

  const div = useMemo(() => {
    console.info("创建div");
    const el = document.createElement("div");
    return el;
  }, []);

  div.onclick = () => {
    console.info("点击事件");
    div.dispatchEvent(evt);
    setCount(count + 1);
  };

  useEffect(() => {
    div.addEventListener("example", eventHandler);
    document.getElementById("view").appendChild(div);
    return () => {
      console.info("移除example事件-----");
      document.getElementById("view").removeChild(div);
    };
  }, [div, eventHandler]);

  console.info("CustomEvent-----", { count });
  return ReactDom.createPortal(<p>example事件----clicked-{count}</p>, div);
};

class CustomEventTest extends React.PureComponent {
  state = {
    count: 0
  };
  div = document.createElement("div");

  componentDidMount() {
    this.div.addEventListener("example", e =>
      console.info("CustomEvent-----", e)
    );
    const evt = createCustomEvent("example");
    this.div.onclick = () => {
      this.setState({ count: this.state.count + 1 });
      this.div.dispatchEvent(evt);
    };
    document.getElementById("view").appendChild(this.div);
  }

  componentWillUnmount() {
    document.getElementById("view").removeChild(this.div);
  }

  render() {
    return ReactDom.createPortal(
      <p>example事件----clicked-{this.state.count}</p>,
      this.div
    );
  }
}

// export default CustomEventTest;
export default CustomEventHookTest;
