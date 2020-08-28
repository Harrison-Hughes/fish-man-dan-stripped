import React, { useState, useEffect } from "react";
import API from "../API";
import StepStrip from "./StepStrip";
import Items from "./Items";
import {
  Grid,
  Segment,
  Button,
  Container,
  Header,
  Icon,
} from "semantic-ui-react";
import PlaceholderItemCardGrid from "./item-card/PlaceholderItemCardGrid";
import { withRouter } from "react-router-dom";
import ProductFilter from "./ProductFilter";

const Browse = ({ basket, setBasket }) => {
  const [itemsLoading, setItemsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [welcomePanel, setWelcomePanel] = useState(true);
  const [listLayout, setListLayout] = useState(false);

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

  // useEffect(() => setItemFilter(""), []);

  useEffect(() => {
    let filteredItems = items;
    setFilteredItems(filteredItems);
  }, [items]);

  const CheckoutButton = withRouter(({ history }) => (
    <Button
      primary
      disabled={basket.length === 0}
      onClick={() => {
        history.push("/checkout");
      }}
    >
      My basket ({basket.length === 0 ? "empty" : basket.length})
    </Button>
  ));

  return (
    <div className="browse">
      <Segment vertical>
        <StepStrip currStep={"browse"} />
      </Segment>
      {welcomePanel ? (
        <Segment vertical>
          <Container>
            <Header as="h2">Welcome to the fish-man-dan order portal!</Header>
            <Header as="h4">
              This portal has been designed to create a streamlined and
              easy-to-use seafood ordering service! On this page, you can see
              all the produce on offer, complete with information regarding it's
              pricing, sizing, and quality. To add an item to you basket, simply
              click on the item's card, then toggle the controls to select how
              much you want. (Some items can be requested in custom amounts - if
              this is the case, simply write how much you'd like!)
            </Header>
            <Header as="h4">
              Once you have selected all the items you'd like, click 'My
              basket', and follow the steps provided to place your order. Once
              you have given all the required information, a virtual receipt
              will become available to help you track or cancel your order.
              Happy fishing!
            </Header>
            <Button positive onClick={() => setWelcomePanel(false)}>
              Got it, thanks!
            </Button>
          </Container>
        </Segment>
      ) : null}
      <Segment vertical>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column width={7}>
              <ProductFilter
                items={items}
                setFilteredItems={setFilteredItems}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button basic active>
                Layout:
              </Button>
              <Button.Group>
                <Button
                  icon
                  active={!listLayout}
                  onClick={() => setListLayout(false)}
                >
                  <Icon name="grid layout" />
                </Button>
                <Button
                  icon
                  active={listLayout}
                  onClick={() => setListLayout(true)}
                >
                  <Icon name="list" />
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={4}>
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
            listLayout={listLayout}
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
