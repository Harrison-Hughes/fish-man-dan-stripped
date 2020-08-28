import React, { useState } from "react";
import ItemCardInteractive from "./item-card/ItemCardInteractive";
import { Card } from "semantic-ui-react";

const Items = ({ filteredItems, basket, setBasket, listLayout }) => {
  const [selectedItemID, setSelectedItemID] = useState(null);

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
};

export default Items;
