import React, { useState } from "react";
import StepStrip from "./StepStrip";
import { Segment, Grid, Button } from "semantic-ui-react";
import CheckoutBreadcrumb from "./checkout/CheckoutBreadcrumb";
import BasketList from "./checkout/BasketList";
import { withRouter } from "react-router-dom";
import OrderDetails from "./checkout/OrderDetails";

const Checkout = ({ basket }) => {
  const [stage, setStage] = useState("basket");

  const ContinueButton = () => {
    if (stage === "basket") {
      return (
        <Button onClick={() => setStage("delivery")} positive>
          Proceed with order
        </Button>
      );
    } else if (stage === "delivery") {
      return (
        <Button onClick={() => setStage("delivery")} positive>
          Submit information
        </Button>
      );
    }
  };

  const BackToBrowseButton = withRouter(({ history }) => (
    <Button
      onClick={() => {
        history.push("/");
      }}
    >
      Back to browse
    </Button>
  ));

  const renderStage = () => {
    if (stage === "basket") return <BasketList basket={basket} />;
    else if (stage === "delivery") return <OrderDetails />;
  };

  return (
    <div className="checkout">
      <Segment vertical>
        <StepStrip currStep={"checkout"} />
      </Segment>
      <Segment vertical>
        <CheckoutBreadcrumb stage={stage} />
      </Segment>
      <Segment vertical>{renderStage()}</Segment>
      <Segment vertical>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <BackToBrowseButton />
            </Grid.Column>
            <Grid.Column>
              <ContinueButton />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Checkout;
