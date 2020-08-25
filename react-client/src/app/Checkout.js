import React, { useState } from "react";
import StepStrip from "./StepStrip";
import { Segment } from "semantic-ui-react";
import CheckoutBreadcrumb from "./checkout/CheckoutBreadcrumb";
import BasketList from "./checkout/BasketList";
import OrderDetails from "./checkout/OrderDetails";
import OrderConfirm from "./checkout/OrderConfirm";

const Checkout = ({ basket }) => {
  const [stage, setStage] = useState("basket");
  const [address, setAddress] = useState({});

  const renderStage = () => {
    if (stage === "basket")
      return <BasketList setStage={setStage} basket={basket} />;
    else if (stage === "delivery") {
      return (
        <OrderDetails
          setStage={setStage}
          address={address}
          setAddress={setAddress}
        />
      );
    } else
      return (
        <OrderConfirm setStage={setStage} address={address} basket={basket} />
      );
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
