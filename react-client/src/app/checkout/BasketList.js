import React, { useState, useEffect } from "react";
import API from "../../API";
import {
  Card,
  Grid,
  Placeholder,
  Segment,
  Header,
  List,
} from "semantic-ui-react";

const BasketList = ({ basket }) => {
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsInBasket, setItemsInBasket] = useState([]);

  useEffect(() => {
    const itemInBasket = (item) => {
      return !!basket.find((i) => i.item_id === item.id);
    };

    API.getItems()
      .then((resp) => {
        return resp;
      })
      .then((resp) => {
        setItemsLoading(false);
        setItemsInBasket(resp.filter((item) => itemInBasket(item)));
      })
      .catch(() => {
        console.log("Server is currently offline. Please try later");
      });
  }, [basket]);

  const renderBasketPlaceholer = () => {
    return (
      <Card fluid>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </Grid.Column>
            <Grid.Column>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card>
    );
  };

  const itemPrice = (item) => {
    if (item.price_by_each) {
      return `£${parseFloat(item.price_per).toFixed(2)} each`;
    } else return `£${parseFloat(item.price_per).toFixed(2)} per. kg`;
  };

  const itemQuantity = (item) => {
    let currBasketDetails = basket.find((i) => i.item_id === item.id);
    return currBasketDetails.amount;
  };

  const renderBasket = () => {
    return itemsInBasket.map((item) => {
      return (
        <Grid.Row key={item.id} columns={2}>
          <Grid.Column className="basket-list-grid-column">
            <Header className="basket-list-header" as="h4">
              {item.name}
              {item.is_frozen ? " (frozen)" : null}
            </Header>
            <List className="basket-list-list">
              <List.Item>Price: {itemPrice(item)}</List.Item>
              <List.Item>Size: {item.size}</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column className="basket-list-grid-column-2">
            <div className="basket-list-item-quantity">
              <Header as="h4">
                {item.custom_amount ? null : `Qty:`} {itemQuantity(item)}
              </Header>
            </div>
          </Grid.Column>
        </Grid.Row>
      );
    });
  };

  return (
    <div className="basket-list">
      <Segment>
        <Grid columns={2} divided="vertically">
          {itemsLoading ? renderBasketPlaceholer() : renderBasket()}
        </Grid>
      </Segment>
    </div>
  );
};

export default BasketList;
