import React, { useState } from "react";
import API from "../../API";
import { Button, Form, Header, Segment } from "semantic-ui-react";

const OrderDetails = ({ address, setAddress, setStage }) => {
  const [invalidAddressFormFields, setInvalidAddressFormFields] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const errorObj = (fieldName) => {
    if (!!invalidAddressFormFields[fieldName]) {
      let content = invalidAddressFormFields[fieldName];
      return {
        content: `${content}`,
        pointing: "above",
      };
    }
  };

  const orderForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            label="Recipient"
            name="recipient_name"
            onChange={handleChange}
            error={errorObj("recipient_name")}
            value={address["recipient_name"]}
          />
          <Form.Input
            label="Contact number"
            name="contact_number"
            onChange={handleChange}
            error={errorObj("contact_number")}
            value={address["contact_number"]}
          />
        </Form.Group>
        <Form.Input
          label="Address line 1"
          name="line_one"
          onChange={handleChange}
          error={errorObj("line_one")}
          value={address["line_one"]}
        />
        <Form.Input
          label="Address line 2 (if necessary)"
          name="line_two"
          onChange={handleChange}
          error={errorObj("line_two")}
          value={address["line_two"]}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Town/City"
            name="town_city"
            onChange={handleChange}
            error={errorObj("town_city")}
            value={address["town_city"]}
          />
          <Form.Input
            label="County"
            name="county"
            onChange={handleChange}
            error={errorObj("county")}
            value={address["county"]}
          />
          <Form.Input
            label="Postcode"
            name="postcode"
            onChange={handleChange}
            error={errorObj("postcode")}
            value={address["postcode"]}
          />
        </Form.Group>
      </Form>
    );
  };

  const handleSubmit = () => {
    setFormSubmitting(true);
    API.validateAddress({ address: address })
      .then((resp) => {
        if (resp.error === "invalid form fields") {
          console.log("invalid form fields detected");
          setFormSubmitting(false);
          setInvalidAddressFormFields(resp.invalid_fields);
        } else {
          setFormSubmitting(false);
          setStage("confirm");
        }
      })
      .catch(() => {
        console.log("Server is currently offline. Please try later");
      });
  };

  return (
    <div className="order-details">
      <Segment vertical>
        <Header as="h2">Please enter delivery details below:</Header>
        {orderForm()}
      </Segment>
      <Segment vertical>
        <Button onClick={() => setStage("basket")}>Back to basket</Button>
        <Button
          floated="right"
          onClick={() => handleSubmit()}
          positive
          loading={formSubmitting}
        >
          Submit delivery information
        </Button>
      </Segment>
    </div>
  );
};

export default OrderDetails;
