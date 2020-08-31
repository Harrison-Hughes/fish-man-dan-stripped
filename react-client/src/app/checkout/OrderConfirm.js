import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Header, Segment, Message } from "semantic-ui-react";

import AddressCard from "./AddresssCard";
import BasketCard from "./BasketCard";
import API from "../../API";

const OrderConfirm = ({ setStage, address, basket, setBasket }) => {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [confirmedOrderReference, setConfirmedOrderReference] = useState(null);

  function handleChange(e) {
    setEmail(e.target.value);
  }

  const submitOrder = () => {
    setFormSubmitting(true);
    let order = {
      order: {
        request_objects: basket,
        address: address,
        email: email,
      },
    };

    API.placeOrder(order)
      .then((resp) => {
        if (resp.error === "invalid email field") {
          console.log("invalid email field detected");
          setFormSubmitting(false);
          setEmailError(true);
        } else {
          setFormSubmitting(false);
          localStorage.fishManDanLocalBasket = JSON.stringify([]);
          setConfirmedOrderReference(resp.reference);
          setBasket([]);
        }
      })
      .catch(() => {
        console.log("Server is currently offline. Please try later");
      });
  };

  if (!!confirmedOrderReference)
    return <Redirect push to={"/receipt/" + confirmedOrderReference} />;
  else
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
          {emailError ? (
            <Message warning>
              <Message.Header>
                Please enter a valid e-mail address!
              </Message.Header>
              <p>We need it so we can send you your order receipt!</p>
            </Message>
          ) : null}
          <Header as="h4">Final required information:</Header>
          <Form>
            <Form.Field inline>
              <Form.Input
                error={emailError}
                name="email"
                label="E-mail address:"
                onChange={handleChange}
                value={email}
              />
            </Form.Field>
          </Form>
        </Segment>
        <div className="bottom-segment">
          <Segment vertical>
            <Button onClick={() => setStage("basket")}>Back to basket</Button>
            <Button onClick={() => setStage("delivery")}>
              Back to delivery
            </Button>
            <Button
              floated="right"
              onClick={() => submitOrder()}
              positive
              loading={formSubmitting}
            >
              Place order!
            </Button>
          </Segment>
        </div>
      </div>
    );
};

export default OrderConfirm;
