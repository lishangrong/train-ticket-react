import React from "react";
import Demo from './Demo'
import EventDemo from "./EventDemo";
import StateDemo from "./StateDemo";

class BaseUseDemo extends React.Component {
  render() {
    return (
      <div>
        <StateDemo />
        <Demo />
        <EventDemo/>
      </div>
    )
  }
}

export default BaseUseDemo