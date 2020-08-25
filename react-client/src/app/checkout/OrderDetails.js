import React, { useState } from "react";
import API from "../../API";
import { Button, Form, Header, Segment } from "semantic-ui-react";

const OrderDetails = ({ setOrderDetails, setStage }) => {
  const [invalidAddressFormFields, setInvalidAddressFormFields] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    recipient_name: "",
    line_one: "",
    line_two: "",
    town_city: "",
    county: "",
    postcode: "",
    contact_number: "",
  });
  const OrderForm = () => {
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

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            // required
            label="Recipient"
            name="recipient_name"
            onChange={handleChange}
            error={errorObj("recipient_name")}
            value={formData["recipient_name"]}
          />
          <Form.Input
            // required
            label="Contact number"
            name="contact_number"
            onChange={handleChange}
            error={errorObj("contact_number")}
          />
        </Form.Group>
        <Form.Input
          // required
          label="Address line 1"
          name="line_one"
          onChange={handleChange}
          error={errorObj("line_one")}
        />
        <Form.Input
          label="Address line 2 (optional)"
          name="line_two"
          onChange={handleChange}
          error={errorObj("line_two")}
        />
        <Form.Group widths="equal">
          <Form.Input
            // required
            label="Town/City"
            name="town_city"
            onChange={handleChange}
            error={errorObj("town_city")}
          />
          <Form.Input
            // required
            label="County"
            name="county"
            onChange={handleChange}
            error={errorObj("county")}
          />
          <Form.Input
            // required
            label="Postcode"
            name="postcode"
            onChange={handleChange}
            error={errorObj("postcode")}
          />
        </Form.Group>
      </Form>
    );
  };

  const handleSubmit = () => {
    setFormSubmitting(true);
    // let address = { address: `${JSON.stringify(formData)}` };
    // console.log({ address });
    API.validateAddress({ address: formData }).then((resp) => {
      if (resp.error === "invalid form fields") {
        console.log("invalid form fields detected");
        setFormSubmitting(false);
        setInvalidAddressFormFields(resp.invalid_fields);
      } else {
        setFormSubmitting(false);
        setOrderDetails(formData);
      }
    });
  };

  return (
    <div className="order-details">
      <Segment vertical>
        <Header as="h2">Please enter delivery details below:</Header>
        <OrderForm />
      </Segment>
      <Segment vertical>
        <Button onClick={() => setStage("basket")}>Back to basket</Button>
        <Button floated="right" onClick={() => handleSubmit()} positive>
          Submit information
        </Button>
      </Segment>
    </div>
  );
};

export default OrderDetails;
