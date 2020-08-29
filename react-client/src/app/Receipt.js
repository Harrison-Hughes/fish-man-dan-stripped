import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import {
  Header,
  Segment,
  Tab,
  Placeholder,
  Table,
  Button,
  Container,
  Grid,
  Form,
} from "semantic-ui-react";

import StepStrip from "./StepStrip";
import AddressCard from "./checkout/AddresssCard";
import API from "../API";
import BasketList from "./checkout/BasketList";

const Receipt = ({ match }) => {
  const [orderNotFound, setOrderNotFound] = useState(false);
  const [receiptLoading, setReceiptLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [cancelCheckbox, setCancelCheckbox] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const receipt_code = match.params.receipt_code;

  useEffect(() => {
    API.getOrder(receipt_code)
      .then((resp) => {
        console.log("resp", resp);
        if (resp.error === "order not found") {
          setOrderNotFound(true);
        } else {
          setOrder(resp);
          setReceiptLoading(false);
        }
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
    let createDate = new Date(order.created_at);
    let updateDate = new Date(order.updated_at);
    return (
      <div className="info-pane">
        <Segment vertical>
          <Header as="h3">Order information:</Header>
        </Segment>
        <Segment vertical>
          <div className="table-padding">
            <Table basic="very" celled>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4">Order reference:</Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Header as="h4">{order.reference.toUpperCase()}</Header>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4">Order status:</Header>
                  </Table.Cell>
                  {orderStatusCell()}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4">Order placed at:</Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Header as="h4">{niceDate(createDate)}</Header>
                  </Table.Cell>
                </Table.Row>
                {order.status !== "pending" ? (
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4">Order status updated at:</Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as="h4">{niceDate(updateDate)}</Header>
                    </Table.Cell>
                  </Table.Row>
                ) : null}
              </Table.Body>
            </Table>
          </div>
        </Segment>
      </div>
    );
  };

  const cancelOrder = () => {
    setCancelLoading(true);
    API.updateOrderStatus(order.reference, "cancelled")
      .then((resp) => {
        setCancelConfirm(false);
        setCancelCheckbox(false);
        setCancelLoading(false);
        if (!!resp.error) {
          console.log(resp.error);
        } else setOrder(resp);
      })
      .catch(() => {
        setCancelConfirm(false);
        setCancelCheckbox(false);
        setCancelLoading(false);
        console.log("server offline");
      });
  };

  const BackToBrowseButton = withRouter(({ history }) => (
    <Button
      onClick={() => {
        history.push("/");
      }}
    >
      Back to homepage
    </Button>
  ));

  const cancelOrderBar = () => {
    if (order.status !== "denied" && order.status !== "cancelled") {
      if (cancelConfirm) {
        return (
          <Segment vertical>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Header sub as="h4">
                    Are you sure you want to cancel this order?{" "}
                  </Header>
                  <Form>
                    <Form.Checkbox
                      required
                      label="I understand that this cannot be undone"
                      onChange={() => setCancelCheckbox(!cancelCheckbox)}
                      checked={cancelCheckbox}
                    />
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Container textAlign="right">
                    <Button
                      color="red"
                      loading={cancelLoading}
                      disabled={!cancelCheckbox}
                      onClick={() => {
                        cancelOrder();
                      }}
                    >
                      Yes, cancel order!
                    </Button>
                    <Button
                      primary
                      onClick={() => {
                        setCancelConfirm(false);
                        setCancelCheckbox(false);
                      }}
                    >
                      Don't cancel order!
                    </Button>
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        );
      } else {
        return (
          <Segment vertical>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Container textAlign="left">
                    <BackToBrowseButton />
                  </Container>
                </Grid.Column>
                <Grid.Column>
                  <Container textAlign="right">
                    <Button onClick={() => setCancelConfirm(true)} color="red">
                      Cancel Order
                    </Button>
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        );
      }
    } else {
      return (
        <Segment vertical>
          <Container textAlign="left">
            <BackToBrowseButton />
          </Container>
        </Segment>
      );
    }
  };

  const orderStatusCell = () => {
    if (order.status === "confirmed") {
      return (
        <Table.Cell positive>
          <Header as="h4">Confirmed</Header>
        </Table.Cell>
      );
    } else if (order.status === "denied") {
      return (
        <Table.Cell negative>
          <Header as="h4">Denied</Header>
        </Table.Cell>
      );
    } else if (order.status === "cancelled") {
      return (
        <Table.Cell negative>
          <Header as="h4">Cancelled</Header>
        </Table.Cell>
      );
    } else {
      return (
        <Table.Cell warning>
          <Header as="h4">Pending confirmation from vendor</Header>
        </Table.Cell>
      );
    }
  };

  const niceDate = (date) => {
    let niceDate = date
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/");
    let niceTime = date.toLocaleTimeString().split(":").slice(0, -1).join(":");
    return niceTime + ", " + niceDate;
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

  if (!!orderNotFound) return <Redirect push to={"/receipt/not_found"} />;
  else
    return (
      <div className="receipt">
        <Segment vertical>
          <StepStrip currStep={"receipt"} />
        </Segment>
        <div className="receipt-body">
          <Segment vertical>
            <Header as="h2">Order Receipt:</Header>
          </Segment>
          <Segment vertical>
            <Tab panes={receiptLoading ? loadingPanes() : receiptPanes()} />
          </Segment>
          {cancelOrderBar()}
        </div>
      </div>
    );
};

export default withRouter(Receipt);
