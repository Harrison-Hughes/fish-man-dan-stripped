import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "semantic-ui-react";

const ProductFilter = ({ items, setFilteredItems }) => {
  const [frozen, setFrozen] = useState("---");
  const [species, setSpecies] = useState("---");
  const [fresh, setFresh] = useState("---");

  const hypotheticalFilteredItemsLength = (filterType, filterValue) => {
    const frozenFilteredItems = () => {
      if (filterType === "frozen") {
        return items.filter((item) => {
          if (filterValue === "---") return true;
          else if (filterValue === "not frozen")
            return item.is_frozen === false;
          else return item.is_frozen === true;
        });
      } else {
        return items.filter((item) => {
          if (frozen === "---") return true;
          else if (frozen === "not frozen") return item.is_frozen === false;
          else return item.is_frozen === true;
        });
      }
    };

    const speciesFilteredItems = () => {
      if (filterType === "species") {
        return frozenFilteredItems().filter((item) => {
          if (filterValue === "---") return true;
          if (item.species.toLowerCase() === filterValue) return true;
          else return false;
        });
      } else {
        return frozenFilteredItems().filter((item) => {
          if (species === "---") return true;
          if (item.species.toLowerCase() === species) return true;
          else return false;
        });
      }
    };

    const freshFilteredItems = () => {
      if (filterType === "fresh") {
        return speciesFilteredItems().filter((item) => {
          if (filterValue === "---") return true;
          if (item.fresh.toLowerCase() === filterValue) return true;
          else return false;
        });
      } else {
        return speciesFilteredItems().filter((item) => {
          if (fresh === "---") return true;
          if (item.fresh.toLowerCase() === fresh) return true;
          else return false;
        });
      }
    };

    return freshFilteredItems().length;
  };

  const frozenOptions = [
    {
      key: "---",
      text: "--- (" + hypotheticalFilteredItemsLength("frozen", "---") + ")",
      value: "---",
    },
    {
      key: "not frozen",
      text:
        "not frozen (" +
        hypotheticalFilteredItemsLength("frozen", "not frozen") +
        ")",
      value: "not frozen",
    },
    {
      key: "frozen",
      text:
        "frozen (" + hypotheticalFilteredItemsLength("frozen", "frozen") + ")",
      value: "frozen",
    },
  ];

  const speciesOptions = () => {
    if (items.length === 0) return [];
    let options = ["---"];
    items.map((item) => {
      if (
        !options.includes(item.species.toLowerCase()) &&
        item.species !== ""
      ) {
        options.push(item.species.toLowerCase());
      }
      return null;
    });
    let optionsKey = options.map((species) => {
      return {
        key: species,
        text:
          species + ` (${hypotheticalFilteredItemsLength("species", species)})`,
        value: species,
      };
    });
    return optionsKey.filter(
      (option) =>
        option.text[option.text.length - 2] !== "0" ||
        option.text[option.text.length - 3] !== "("
    );
  };

  const freshOptions = () => {
    if (items.length === 0) return [];
    let options = ["---"];
    items.map((item) => {
      if (!options.includes(item.fresh.toLowerCase()) && item.fresh !== "") {
        options.push(item.fresh.toLowerCase());
      }
      return null;
    });
    let optionsKey = options.map((fresh) => {
      return {
        key: fresh,
        text: fresh + ` (${hypotheticalFilteredItemsLength("fresh", fresh)})`,
        value: fresh,
      };
    });
    return optionsKey.filter(
      (option) =>
        option.text[option.text.length - 2] !== "0" ||
        option.text[option.text.length - 3] !== "("
    );
  };

  useEffect(() => {
    const filterItems = () => {
      let frozenFilteredItems = items.filter((item) => {
        if (frozen === "---") return true;
        else if (frozen === "not frozen") return item.is_frozen === false;
        else return item.is_frozen === true;
      });
      let speciesFilteredItems = frozenFilteredItems.filter((item) => {
        if (species === "---") return true;
        if (item.species.toLowerCase() === species) return true;
        else return false;
      });
      let freshFilteredItems = speciesFilteredItems.filter((item) => {
        if (fresh === "---") return true;
        if (item.fresh.toLowerCase() === fresh) return true;
        else return false;
      });
      return freshFilteredItems;
    };

    setFilteredItems(filterItems());
  }, [items, frozen, fresh, species, setFilteredItems]);

  const handleFrozenChange = (e, { value }) => {
    if (value === "frozen") {
      setFrozen(value);
      setSpecies("---");
      setFresh("---");
    } else {
      setFrozen(value);
    }
  };

  const handleSpeciesChange = (e, { value }) => setSpecies(value);

  const handleFreshChange = (e, { value }) => setFresh(value);

  return (
    <div className="product-filter">
      <Button
        basic
        active
        onClick={() => {
          setFrozen("---");
          setSpecies("---");
          setFresh("---");
        }}
      >
        Filters:
      </Button>
      <Button.Group basic color="grey">
        <Button>{frozen}</Button>
        <Dropdown
          direction="right"
          className="button icon"
          floating
          header={"Frozen?"}
          options={frozenOptions}
          onChange={handleFrozenChange}
          trigger={<></>}
        />
      </Button.Group>
      <Button.Group basic color="grey">
        <Button disabled={speciesOptions().length === 1}>{species}</Button>
        <Dropdown
          scrolling
          direction="right"
          disabled={speciesOptions().length === 1}
          className="button icon"
          header={"Species"}
          floating
          options={speciesOptions()}
          onChange={handleSpeciesChange}
          trigger={<></>}
        />
      </Button.Group>
      <Button.Group basic color="grey">
        <Button disabled={freshOptions().length === 1}>{fresh}</Button>
        <Dropdown
          direction="right"
          disabled={freshOptions().length === 1}
          className="button icon"
          header={"State"}
          floating
          options={freshOptions()}
          onChange={handleFreshChange}
          trigger={<></>}
        />
      </Button.Group>
    </div>
  );
};

export default ProductFilter;
