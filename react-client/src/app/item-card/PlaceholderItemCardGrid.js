import React from "react";
import { Grid, Placeholder, Segment } from "semantic-ui-react";

const PlaceholderItemCardGrid = () => {
  const Row = () => {
    let arr = [...Array(6).keys()];
    return arr.map((i) => {
      return (
        <Grid.Column key={i}>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      );
    });
  };

  return <div className="items">{Row()}</div>;
};

export default PlaceholderItemCardGrid;
