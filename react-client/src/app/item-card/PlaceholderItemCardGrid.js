import React from "react";
import { Card, Placeholder, Header, Segment } from "semantic-ui-react";

const PlaceholderItemCardGrid = () => {
  const placeholderCards = () => {
    let arr = [...Array(12).keys()];
    return arr.map((i) => {
      return (
        <Card key={i}>
          <Card.Content>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line length="short" />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="short" />
                <Placeholder.Line length="long" />
                <Placeholder.Line length="medium" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Card.Content>
        </Card>
      );
    });
  };

  return (
    <div className="items">
      <div className="wakeup-header">
        <Segment vertical>
          <Header as="h2">
            We're just waking up the server, this might take a few seconds!
          </Header>
        </Segment>
      </div>
      <Segment vertical>
        <Card.Group centered>{placeholderCards()}</Card.Group>
      </Segment>
    </div>
  );
};

export default PlaceholderItemCardGrid;
