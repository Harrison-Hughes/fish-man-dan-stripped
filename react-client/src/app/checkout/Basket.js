import React from "react";
import { withRouter } from "react-router-dom";
import BasketList from "./BasketList";
import { Segment, Header, Button, Icon } from "semantic-ui-react";

const Basket = ({ basket, setStage }) => {
  const BackToBrowseButton = withRouter(({ history }) => (
    <Button
      onClick={() => {
        history.push("/");
      }}
    >
      Back to browse
    </Button>
  ));

  return (
    <div className="basket">
      <Segment vertical>
        <Header as="h2">Your current basket:</Header>
      </Segment>
      {basket.length === 0 ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="exclamation" />
            Your basket is empty!
          </Header>
        </Segment>
      ) : (
        <Segment vertical>
          <BasketList basket={basket} />
        </Segment>
      )}
      <Segment vertical>
        <BackToBrowseButton />
        <Button
          floated="right"
          disabled={basket.length === 0}
          onClick={() => setStage("delivery")}
          positive
        >
          Proceed with order
        </Button>
      </Segment>
    </div>
  );
};

export default Basket;
