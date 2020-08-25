import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import AddressCard from "./AddresssCard";
import BasketCard from "./BasketCard";

const OrderConfirm = ({ setStage, address, basket }) => {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  function handleChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="order-confirm">
      <Segment vertical>
        <Header as="h2">Order summary:</Header>
      </Segment>
      <Segment vertical>
        <Header as="h4">Items:</Header>
        <BasketCard basket={basket} />
      </Segment>
      <Segment vertical>
        <Header as="h4">Delivery details:</Header>
        <AddressCard address={address} />
      </Segment>
      <Segment vertical>
        <Header as="h4">Final required information:</Header>
        <Form>
          <Form.Input
            label="E-mail address:"
            name="email"
            onChange={handleChange}
            error={
              emailError
                ? {
                    content: `Please enter a valid e-mail address!`,
                    pointing: "above",
                  }
                : null
            }
            value={email}
          />
        </Form>
      </Segment>
      <Segment vertical>
        <Button onClick={() => setStage("basket")}>Back to basket</Button>
        <Button onClick={() => setStage("delivery")}>Back to delivery</Button>
        <Button
          floated="right"
          onClick={() => console.log("woo")}
          positive
          loading={formSubmitting}
        >
          Place order!
        </Button>
      </Segment>
    </div>
  );
};

export default OrderConfirm;
