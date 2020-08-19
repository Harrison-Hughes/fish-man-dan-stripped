import React, { useState, useEffect } from "react";
import API from "../API";
import StepStrip from "./StepStrip";
import Items from "./Items";
import { Grid, Segment, Button } from "semantic-ui-react";
import BrowseFilter from "./BrowseFilter";
import PlaceholderItemCardGrid from "./item-card/PlaceholderItemCardGrid";

const Browse = ({ basket, setBasket }) => {
  const [itemsLoading, setItemsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemFilter, setItemFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    API.getItems()
      .then((resp) => {
        return resp;
      })
      .then((resp) => {
        setItemsLoading(false);
        setItems(resp);
      })
      .catch(() => {
        console.log("Server is currently offline. Please try later");
      });
  }, []);

  useEffect(() => setFilteredItems(filterItems()), [items, itemFilter]);

  const filterItems = () => {
    // console.log(items);
    return items;
  };

  const CheckoutButton = () => {
    return (
      <Button primary disabled={basket.length === 0}>
        Proceed to checkout
      </Button>
    );
  };

  return (
    <div className="browse">
      <Segment vertical>
        <StepStrip currStep={"browse"} />
      </Segment>
      <Segment vertical>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <BrowseFilter />
            </Grid.Column>
            <Grid.Column>
              <CheckoutButton />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment vertical>
        {itemsLoading ? (
          <PlaceholderItemCardGrid />
        ) : (
          <Items
            filteredItems={filteredItems}
            basket={basket}
            setBasket={setBasket}
          />
        )}
      </Segment>
    </div>
  );
};

export default Browse;
