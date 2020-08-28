import React from "react";
import { Icon, Step } from "semantic-ui-react";

const StepStrip = ({ currStep }) => {
  const isActive = (step) => {
    if (step === currStep) {
      return true;
    } else return false;
  };

  const isDisabled = (step) => {
    if (
      currStep === "browse" ||
      (step === "receipt" && currStep === "checkout")
    ) {
      return true;
    } else return false;
  };

  return (
    <div className="step-strip">
      <Step.Group size="small">
        <Step active={isActive("browse")}>
          <Icon name="shop" />
          <Step.Content>
            <Step.Title>Select</Step.Title>
          </Step.Content>
        </Step>
        <Step active={isActive("checkout")} disabled={isDisabled("checkout")}>
          <Icon name="list" />
          <Step.Content>
            <Step.Title>Checkout</Step.Title>
          </Step.Content>
        </Step>
        <Step active={isActive("receipt")} disabled={isDisabled("receipt")}>
          <Icon name="file alternate outline" />
          <Step.Content>
            <Step.Title>Receipt</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    </div>
  );
};

export default StepStrip;
