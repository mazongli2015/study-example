import React from "react";
import WithContext from "./WithContext";
import WithoutContext from "./WithoutContext";

export default React.memo(props => (
  <>
    <h3>use props</h3>
    <WithoutContext />
    <h3>use context</h3>
    <WithContext />
  </>
));
