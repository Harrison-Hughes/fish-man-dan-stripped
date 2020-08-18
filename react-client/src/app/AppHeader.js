import React from "react";
import { Segment, Header } from "semantic-ui-react";

const AppHeader = () => {
  return (
    <div className="header">
      <Segment attached inverted padded="very">
        <Header
          as="h1"
          inverted
          // color="teal"
          style={{
            fontSize: "3em",
            fontWeight: "bold",
            marginBottom: 0,
            // marginTop: "0.5em",
          }}
        >
          fish man dan
        </Header>
        <Header
          as="h4"
          inverted
          color="teal"
          style={{
            fontSize: "1em",
            fontWeight: "normal",
            marginBottom: 0,
          }}
        >
          how much fish would a fish man dan if a fish dan could fish man?
        </Header>
      </Segment>
    </div>
  );
};

export default AppHeader;
