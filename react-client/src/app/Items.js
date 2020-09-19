import React, { useState } from "react";
import ItemCardInteractive from "./item-card/ItemCardInteractive";
import { Card, Segment, Header, Icon } from "semantic-ui-react";

const Items = ({ filteredItems, basket, setBasket, listLayout }) => {
  const [selectedItemID, setSelectedItemID] = useState(null);

  if (filteredItems.length !== 0) {
    return (
      <div className={listLayout ? "items-restricted" : "items"}>
        <Card.Group centered>
          {filteredItems.map((i) => (
            <ItemCardInteractive
              listLayout={listLayout}
              item={i}
              key={i.id}
              basket={basket}
              setBasket={setBasket}
              selectedItemID={selectedItemID}
              setSelectedItemID={setSelectedItemID}
            />
          ))}
        </Card.Group>
      </div>
    );
  } else {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="exclamation" />
          No items found - if you are running the server locally, please make
          sure you have seeded the database!
        </Header>
      </Segment>
    );
  }
};

export default Items;
