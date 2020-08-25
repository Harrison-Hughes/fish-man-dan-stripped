import React, { useState, useEffect } from "react";
import API from "../../API";
import { Button, Form, Header, Segment } from "semantic-ui-react";

const OrderDetails = ({ address, setAddress, setStage }) => {
  const [invalidAddressFormFields, setInvalidAddressFormFields] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    recipient_name: "",
    line_one: "",
    line_two: "",
    town_city: "",
    county: "",
    postcode: "",
    contact_number: "",
  });

  useEffect(() => {
    if (address !== {}) setFormData(address);
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            value={formData["recipient_name"]}
          />
          <Form.Input
            label="Contact number"
            name="contact_number"
            onChange={handleChange}
            error={errorObj("contact_number")}
            value={formData["contact_number"]}
          />
        </Form.Group>
        <Form.Input
          label="Address line 1"
          name="line_one"
          onChange={handleChange}
          error={errorObj("line_one")}
          value={formData["line_one"]}
        />
        <Form.Input
          label="Address line 2 (if necessary)"
          name="line_two"
          onChange={handleChange}
          error={errorObj("line_two")}
          value={formData["line_two"]}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Town/City"
            name="town_city"
            onChange={handleChange}
            error={errorObj("town_city")}
            value={formData["town_city"]}
          />
          <Form.Input
            label="County"
            name="county"
            onChange={handleChange}
            error={errorObj("county")}
            value={formData["county"]}
          />
          <Form.Input
            label="Postcode"
            name="postcode"
            onChange={handleChange}
            error={errorObj("postcode")}
            value={formData["postcode"]}
          />
        </Form.Group>
      </Form>
    );
  };

  const handleSubmit = () => {
    setFormSubmitting(true);
    API.validateAddress({ address: formData })
      .then((resp) => {
        if (resp.error === "invalid form fields") {
          console.log("invalid form fields detected");
          setFormSubmitting(false);
          setInvalidAddressFormFields(resp.invalid_fields);
        } else {
          setFormSubmitting(false);
          setAddress(formData);
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
