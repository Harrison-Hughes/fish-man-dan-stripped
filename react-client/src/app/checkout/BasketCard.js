import React, { useState, useEffect } from "react";
import { Grid, Header, Segment, Icon } from "semantic-ui-react";
import API from "../../API";

const BasketCard = ({ basket }) => {
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

  const itemQuantity = (item) => {
    let currBasketDetails = basket.find((i) => i.item_id === item.id);
    return currBasketDetails.amount;
  };

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

  const renderBasket = () => {
    return (
      <Grid columns={2} divided="vertically">
        {itemsInBasket.map((item) => {
          return (
            <Grid.Row key={item.id} columns={2}>
              <Grid.Column className="basket-card-grid-column">
                <Header className="basket-card-header" as="h4">
                  {item.name}
                  {item.is_frozen ? " (frozen)" : null}
                </Header>
              </Grid.Column>
              <Grid.Column className="basket-card-grid-column-2">
                <div className="basket-card-item-quantity">
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
    <div className="basket-card">
      <Segment>
        {itemsLoading ? renderBasketPlaceholer() : renderBasket()}
      </Segment>
    </div>
  );
};

export default BasketCard;
