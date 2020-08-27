import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Header, Segment } from "semantic-ui-react";

import StepStrip from "./StepStrip";
import API from "../API";

const Receipt = ({ match }) => {
  const [receiptLoading, setReceiptLoading] = useState(false);
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

  const renderReceiptPlaceholer = () => {
    return <div className="render-receipt-placeholer"></div>;
  };

  const renderReceipt = () => {
    return (
      <div className="render-receipt">
        <Segment vertical>
          <Header as="h4">Order reference: {receipt_code}</Header>
          <Header as="h4">Status: {order.status}</Header>
        </Segment>
      </div>
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
        </Segment>
        {receiptLoading ? renderReceiptPlaceholer() : renderReceipt()}
      </div>
    </div>
  );
};

export default withRouter(Receipt);
