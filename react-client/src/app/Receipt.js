import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Header, Segment, Tab, Placeholder, Table } from "semantic-ui-react";

import StepStrip from "./StepStrip";
import AddressCard from "./checkout/AddresssCard";
import API from "../API";
import BasketList from "./checkout/BasketList";

const Receipt = ({ match }) => {
  const [receiptLoading, setReceiptLoading] = useState(true);
  const [order, setOrder] = useState({});
  const receipt_code = match.params.receipt_code;

  useEffect(() => {
    API.getOrder(receipt_code)
      .then((resp) => {
        console.log("resp", resp);
        setOrder(resp);
        setReceiptLoading(false);
      })
      .catch(console.log("server offline"));
  }, [receipt_code]);

  const receiptPanes = () => {
    return [
      {
        menuItem: { key: "info", icon: "info circle", content: "Information" },
        render: () => <Tab.Pane>{infoPane()}</Tab.Pane>,
      },
      {
        menuItem: { key: "items", icon: "list", content: "Items" },
        render: () => <Tab.Pane>{itemsPane()}</Tab.Pane>,
      },
      {
        menuItem: {
          key: "delivery",
          icon: "shipping fast",
          content: "Delivery",
        },
        render: () => <Tab.Pane>{deliveryPane()}</Tab.Pane>,
      },
    ];
  };

  const infoPane = () => {
    return (
      <div className="info-pane">
        {/* <Segment vertical>
          <Header as="h3">Order status: {order.status}</Header>
        </Segment>
        <Segment vertical>
          <Header as="h3">Order reference: {order.reference}</Header>
        </Segment> */}
        <Table basic="very" celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">Order status:</Header>
              </Table.Cell>
              <Table.Cell warning={order.status === "pending confirmation"}>
                {order.status}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">Order reference:</Header>
              </Table.Cell>
              <Table.Cell>{order.reference}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">Order status:</Header>
              </Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  };

  const itemsPane = () => {
    return (
      <div className="items-pane">
        <Segment vertical>
          <Header as="h3">Items requested:</Header>
        </Segment>
        <Segment vertical>
          <BasketList basket={order.requests} />
        </Segment>
      </div>
    );
  };

  const deliveryPane = () => {
    return (
      <div className="delivery-pane">
        <Segment vertical>
          <Header as="h3">Address:</Header>
        </Segment>
        <Segment vertical>
          <AddressCard address={order.address} />
        </Segment>
      </div>
    );
  };

  const loadingPanes = () => {
    return [
      {
        menuItem: { key: "info", icon: "info circle", content: "Information" },
        render: () => <Tab.Pane>{placeholderPlanes()}</Tab.Pane>,
      },
      {
        menuItem: { key: "items", icon: "list", content: "Items" },
        render: () => <Tab.Pane>{placeholderPlanes()}</Tab.Pane>,
      },
      {
        menuItem: {
          key: "delivery",
          icon: "shipping fast",
          content: "Delivery",
        },
        render: () => <Tab.Pane>{placeholderPlanes()}</Tab.Pane>,
      },
    ];
  };

  const placeholderPlanes = () => {
    const placeholderLines = (times) => {
      let output = [];
      for (let i = 0; i < times; i++) {
        output.push(<Placeholder.Line key={i} />);
      }
      return output.map((i) => i);
    };

    return (
      <Placeholder>
        <Placeholder.Header image>{placeholderLines(2)}</Placeholder.Header>
        <Placeholder.Paragraph>{placeholderLines(8)}</Placeholder.Paragraph>
      </Placeholder>
    );
  };

  return (
    <div className="receipt">
      <Segment vertical>
        <StepStrip currStep={"receipt"} />
      </Segment>
      <div className="receipt-body">
        <Segment vertical>
          <Header as="h2">Order Receipt:</Header>
          <Tab panes={receiptLoading ? loadingPanes() : receiptPanes()} />
        </Segment>
      </div>
    </div>
  );
};

export default withRouter(Receipt);
