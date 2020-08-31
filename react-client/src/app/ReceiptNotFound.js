import React from "react";
import { Header, Segment, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import StepStrip from "./StepStrip";

const ReceiptNotFound = () => {
  const BackToBrowseButton = withRouter(({ history }) => (
    <Button
      onClick={() => {
        history.push("/");
      }}
    >
      Back to homepage
    </Button>
  ));

  return (
    <div className="receipt-not-found">
      <Segment vertical>
        <StepStrip currStep={"receipt"} />
      </Segment>
      <Segment vertical>
        <Header as="h2">
          Sorry, no receipt was found with that reference code!
        </Header>
      </Segment>
      <Segment vertical>
        <BackToBrowseButton />
      </Segment>
    </div>
  );
};

export default ReceiptNotFound;
