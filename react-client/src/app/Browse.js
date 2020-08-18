import React, { useState } from "react";
import StepStrip from "./StepStrip";

const Browse = () => {
  return (
    <div className="browse">
      <StepStrip currStep={"browse"} />
    </div>
  );
};

export default Browse;
