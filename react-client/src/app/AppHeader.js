import React from "react";
import { Segment, Header } from "semantic-ui-react";

const AppHeader = () => {
  return (
    <div className="header">
      <Segment attached inverted>
        <Header
          as="h1"
          inverted
          style={{
            fontSize: "3em",
            fontWeight: "normal",
            marginBottom: 0,
            // marginTop: "0.5em",
          }}
        >
          fish man dan
        </Header>
      </Segment>
    </div>
  );
};

export default AppHeader;
