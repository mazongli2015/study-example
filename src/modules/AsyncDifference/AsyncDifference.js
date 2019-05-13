import React from "react";

const aysncTest = async () => {
  console.info("async only");
};

const callAsync = async () => {
  console.info("async before await");
  await aysncTest();
  console.info("async after await");
};

const setTimeoutTest = () => {
  setTimeout(() => console.info("setTimeout"), 0);
};

const setImmediateTest = () => {
  setImmediate(() => console.info("setImmediate"));
};

const promiseTest = () => {
  new Promise(resolve => {
    console.info("before promise  resolve");
    resolve();
    console.info("after promise  resolve");
  })
    .then(() => {
      console.info("in promise then");
    })
    .finally(() => {
      console.info("in promise finally");
    });
};

const promiseCatchTest = () => {
  new Promise((resolve, reject) => {
    console.info("before promise  reject");
    reject();
    console.info("after promise  reject");
  })
    .catch(() => {
      console.info("in promise catch");
    })
    .finally(() => {
      console.info("in promise finally");
    });
};

const test1 = () => {
  callAsync();
  setTimeoutTest();
  setImmediateTest();
  promiseTest();
  // promiseCatchTest();
};

const test2 = () => {
  setImmediateTest();
  setTimeoutTest();
  promiseTest();
  callAsync();
  // promiseCatchTest();
};

export default () => {
  return (
    <div>
      <button onClick={test1}>test1</button>
      <button onClick={test2}>test2</button>
    </div>
  );
};
