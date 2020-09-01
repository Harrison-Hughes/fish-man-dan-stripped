import React from "react";
import { Breadcrumb } from "semantic-ui-react";

const CheckoutBreadcrumb = ({ stage }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Section active={stage === "basket"}>
        basket
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section active={stage === "delivery"}>
        delivery
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section active={stage === "confirm"}>
        extra details
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section active={stage === "confirm email"}>
        confirmation
      </Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default CheckoutBreadcrumb;
