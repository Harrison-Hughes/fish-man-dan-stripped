import React, { useState } from "react";
import StepStrip from "./StepStrip";
import { Segment } from "semantic-ui-react";
import CheckoutBreadcrumb from "./checkout/CheckoutBreadcrumb";
import BasketList from "./checkout/BasketList";
import OrderDetails from "./checkout/OrderDetails";
import OrderConfirm from "./checkout/OrderConfirm";

const Checkout = ({ basket }) => {
  const [stage, setStage] = useState("basket");
  const [orderDetails, setOrderDetails] = useState({});

  const renderStage = () => {
    if (stage === "basket")
      return <BasketList setStage={setStage} basket={basket} />;
    else if (stage === "delivery") {
      return (
        <OrderDetails setStage={setStage} setOrderDetails={setOrderDetails} />
      );
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
    </div>
  );
};

export default Checkout;
