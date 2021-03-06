import React, { useState } from "react";
import StepStrip from "./StepStrip";
import { Segment } from "semantic-ui-react";
import CheckoutBreadcrumb from "./checkout/CheckoutBreadcrumb";
import Basket from "./checkout/Basket";
import OrderDetails from "./checkout/OrderDetails";
import OrderConfirm from "./checkout/OrderConfirm";
import ConfirmEmail from "./checkout/ConfirmEmail";

const Checkout = ({ basket, setBasket }) => {
  const [stage, setStage] = useState("basket");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [address, setAddress] = useState({
    recipient_name: "",
    line_one: "",
    line_two: "",
    town_city: "",
    county: "",
    postcode: "",
    contact_number: "",
  });

  const renderStage = () => {
    if (stage === "basket")
      return <Basket setStage={setStage} basket={basket} />;
    else if (stage === "delivery") {
      return (
        <OrderDetails
          setStage={setStage}
          address={address}
          setAddress={setAddress}
        />
      );
    } else if (stage === "confirm")
      return (
        <OrderConfirm
          setStage={setStage}
          address={address}
          basket={basket}
          setBasket={setBasket}
          setRegisteredEmail={setRegisteredEmail}
        />
      );
    else return <ConfirmEmail registeredEmail={registeredEmail} />;
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
