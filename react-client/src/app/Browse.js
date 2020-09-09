import React, { useState, useEffect } from "react";
import API from "../API";
import StepStrip from "./StepStrip";
import Items from "./Items";
import {
  Grid,
  Segment,
  Button,
  Container,
  Header,
  Icon,
  Pagination,
} from "semantic-ui-react";
import PlaceholderItemCardGrid from "./item-card/PlaceholderItemCardGrid";
import { withRouter } from "react-router-dom";
import ProductFilter from "./ProductFilter";

const Browse = ({ basket, setBasket }) => {
  const [itemsLoading, setItemsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredPaginatedItems, setFilteredPaginatedItems] = useState([]);
  const [welcomePanel, setWelcomePanel] = useState(true);
  const [listLayout, setListLayout] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    API.getItems()
      .then((resp) => {
        return resp;
      })
      .then((resp) => {
        setItemsLoading(false);
        setTotalPage(Math.ceil(resp.length / itemsPerPage));
        setItems(resp);
      })
      .catch(() => {
        console.log("Server is currently offline. Please try later");
      });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [listLayout, filteredItems]);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredItems.length / itemsPerPage));
  }, [filteredItems, itemsPerPage]);

  useEffect(() => {
    const calcFilteredPaginatedItems = () => {
      return filteredItems.filter(
        (item, i) =>
          i >= (page - 1) * itemsPerPage && i <= page * itemsPerPage - 1
      );
    };

    setFilteredPaginatedItems(calcFilteredPaginatedItems);
  }, [filteredItems, page, itemsPerPage]);

  useEffect(() => {
    let filteredItems = items;
    setFilteredItems(filteredItems);
  }, [items]);

  const pageChange = (e, { activePage }) => {
    setPage(activePage);
  };

  const CheckoutButton = withRouter(({ history }) => (
    <Button
      primary
      disabled={basket.length === 0}
      onClick={() => {
        history.push("/checkout");
      }}
    >
      My basket ({basket.length === 0 ? "empty" : basket.length})
    </Button>
  ));

  return (
    <div className="browse">
      <Segment vertical>
        <StepStrip currStep={"browse"} />
      </Segment>
      {welcomePanel ? (
        <Segment vertical>
          <Container>
            <Header as="h2">Welcome to the fish-man-dan order portal!</Header>
            <Header as="h4">
              This portal has been designed to create a streamlined and
              easy-to-use seafood ordering service! On this page, you can see
              all the produce on offer, complete with information regarding it's
              pricing, sizing, and quality. To add an item to you basket, simply
              click on the item's card, then toggle the controls to select how
              much you want. (Some items can be requested in custom amounts - if
              this is the case, simply write how much you'd like!)
            </Header>
            <Header as="h4">
              Once you have selected all the items you'd like, click 'My
              basket', and follow the steps provided to place your order. Once
              you have given all the required information, a virtual receipt
              will become available to help you track or cancel your order.
              Happy fishing!
            </Header>
            <Button positive onClick={() => setWelcomePanel(false)}>
              Got it!
            </Button>
          </Container>
        </Segment>
      ) : null}
      <Segment vertical>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column width={7}>
              <ProductFilter
                items={items}
                setFilteredItems={setFilteredItems}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button basic active>
                Layout:
              </Button>
              <Button.Group>
                <Button
                  icon
                  active={!listLayout}
                  onClick={() => {
                    // setPage(1);
                    setItemsPerPage(12);
                    setListLayout(false);
                  }}
                >
                  <Icon name="grid layout" />
                </Button>
                <Button
                  icon
                  active={listLayout}
                  onClick={() => {
                    // setPage(1);
                    setItemsPerPage(5);
                    setListLayout(true);
                  }}
                >
                  <Icon name="list" />
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={4}>
              <CheckoutButton />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {itemsLoading ? (
        <PlaceholderItemCardGrid />
      ) : (
        <Segment vertical>
          <Items
            listLayout={listLayout}
            filteredItems={filteredPaginatedItems}
            basket={basket}
            setBasket={setBasket}
          ></Items>
        </Segment>
      )}
      <Segment vertical>
        <Pagination
          activePage={page}
          boundaryRange={0}
          onPageChange={pageChange}
          secondary
          pointing
          // defaultActivePage={1}
          // ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={totalPage}
        />
      </Segment>
    </div>
  );
};

export default Browse;
