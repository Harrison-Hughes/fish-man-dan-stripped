import React, { useState, useEffect } from "react";
import API from "../../API";
import { Grid, Segment, Header, List, Icon } from "semantic-ui-react";

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
      <Segment placeholder>
        <Header icon>
          <Icon loading name="spinner" />
          Loading items
        </Header>
      </Segment>
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
    return (
      <Grid columns={2} divided="vertically">
        {itemsInBasket.map((item) => {
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
        })}
      </Grid>
    );
  };

  return (
    <div className="basket-list">
      <Segment>
        {itemsLoading ? renderBasketPlaceholer() : renderBasket()}
      </Segment>
    </div>
  );
};

export default BasketList;
