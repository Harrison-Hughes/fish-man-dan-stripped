import React, { useState, useEffect } from "react";
import API from "../API";
import StepStrip from "./StepStrip";

const Browse = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.getItems()
      .then(setItems)
      .catch(() => {
        console.log("Server is currently offline. Please try later");
      });
  }, []);

  return (
    <div className="browse">
      <StepStrip currStep={"browse"} />
    </div>
  );
};

export default Browse;
