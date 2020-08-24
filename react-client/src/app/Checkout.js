import React, { useState } from "react";
import StepStrip from "./StepStrip";
import { Segment, Grid, Button } from "semantic-ui-react";
import CheckoutBreadcrumb from "./checkout/CheckoutBreadcrumb";
import BasketList from "./checkout/BasketList";
import { withRouter } from "react-router-dom";
import OrderDetails from "./checkout/OrderDetails";
import OrderConfirm from "./checkout/OrderConfirm";

const Checkout = ({ basket }) => {
  const [stage, setStage] = useState("basket");
  const [orderDetails, setOrderDetails] = useState({});

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

  const BackButton = () => {
    if (stage === "basket") {
      return <BackToBrowseButton />;
    } else if (stage === "delivery") {
      return <Button onClick={() => setStage("basket")}>Back to basket</Button>;
    }
  };

  const renderStage = () => {
    if (stage === "basket")
      return <BasketList setStage={setStage} basket={basket} />;
    else if (stage === "delivery") {
      return <OrderDetails setOrderDetails={setOrderDetails} />;
    } else return <OrderConfirm orderDetails={orderDetails} />;
  };

  return (
    <div className="checkout">
      <Segment vertical>
        <StepStrip currStep={"checkout"} />
      </Segment>
      <Segment vertical>
        <CheckoutBreadcrumb stage={stage} />
      </Segment>
      {renderStage()}
      {/* <Segment vertical>{renderStage()}</Segment>
      <Segment vertical>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <BackButton />
            </Grid.Column>
            <Grid.Column>
              <ContinueButton />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment> */}
    </div>
  );
};

export default Checkout;
