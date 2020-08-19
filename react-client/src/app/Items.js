import React, { useState } from "react";
import ItemCardInteractive from "./item-card/ItemCardInteractive";
import { Card } from "semantic-ui-react";

const Items = ({ filteredItems, basket, setBasket }) => {
  const [selectedItemID, setSelectedItemID] = useState(null);

  return (
    <div className="items">
      <Card.Group centered>
        {filteredItems.map((i) => (
          <ItemCardInteractive
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
};

export default Items;
