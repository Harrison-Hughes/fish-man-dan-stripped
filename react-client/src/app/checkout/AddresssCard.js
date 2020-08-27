import React from "react";
import { Card, Feed } from "semantic-ui-react";

const AddressCard = ({ address }) => {
  return (
    <Card>
      <Card.Content>
        <Feed>
          <Feed.Event>
            {/* <Feed.Content> */}
            <Feed.Summary>{address.recipient_name}</Feed.Summary>
            {/* </Feed.Content> */}
          </Feed.Event>
          <Feed.Event>{address.line_one}</Feed.Event>
          {!!address.line_two ? (
            <Feed.Event>{address.line_two}</Feed.Event>
          ) : null}
          <Feed.Event>
            {address.town_city}, {address.county}
          </Feed.Event>
          <Feed.Event>{address.postcode}</Feed.Event>
          <Feed.Event>Contact number: {address.contact_number}</Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
    // <Card>
    //   <Card.Content>
    //     <Feed>
    //       <Feed.Event>
    //         <Feed.Content>
    //           <Feed.Summary>{address.recipient_name}</Feed.Summary>
    //           <Feed.Extra>{address.line_one}</Feed.Extra>
    //           {!!address.line_two ? (
    //             <Feed.Extra>{address.line_two}</Feed.Extra>
    //           ) : null}
    //           <Feed.Extra>
    //             {address.town_city}, {address.county}
    //           </Feed.Extra>
    //           <Feed.Extra>{address.postcode}</Feed.Extra>
    //           <Feed.Extra>Contact number: {address.contact_number}</Feed.Extra>
    //         </Feed.Content>
    //       </Feed.Event>
    //     </Feed>
    //   </Card.Content>
    // </Card>
  );
};

export default AddressCard;
