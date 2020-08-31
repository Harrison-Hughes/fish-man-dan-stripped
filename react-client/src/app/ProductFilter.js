import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "semantic-ui-react";

const ProductFilter = ({ items, setFilteredItems }) => {
  const [frozen, setFrozen] = useState("---");
  const [grade, setGrade] = useState("---");
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

    const gradeFilteredItems = () => {
      if (filterType === "grade") {
        return frozenFilteredItems().filter((item) => {
          if (filterValue === "---") return true;
          if (item.grade.toLowerCase() === filterValue) return true;
          else return false;
        });
      } else {
        return frozenFilteredItems().filter((item) => {
          if (grade === "---") return true;
          if (item.grade.toLowerCase() === grade) return true;
          else return false;
        });
      }
    };

    const freshFilteredItems = () => {
      if (filterType === "fresh") {
        return gradeFilteredItems().filter((item) => {
          if (filterValue === "---") return true;
          if (item.fresh.toLowerCase() === filterValue) return true;
          else return false;
        });
      } else {
        return gradeFilteredItems().filter((item) => {
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

  const gradeOptions = () => {
    if (items.length === 0) return [];
    let options = ["---"];
    items.map((item) => {
      if (!options.includes(item.grade.toLowerCase()) && item.grade !== "") {
        options.push(item.grade.toLowerCase());
      }
      return null;
    });
    let optionsKey = options.map((grade) => {
      return {
        key: grade,
        text: grade + ` (${hypotheticalFilteredItemsLength("grade", grade)})`,
        value: grade,
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
      let gradeFilteredItems = frozenFilteredItems.filter((item) => {
        if (grade === "---") return true;
        if (item.grade.toLowerCase() === grade) return true;
        else return false;
      });
      let freshFilteredItems = gradeFilteredItems.filter((item) => {
        if (fresh === "---") return true;
        if (item.fresh.toLowerCase() === fresh) return true;
        else return false;
      });
      return freshFilteredItems;
    };

    setFilteredItems(filterItems());
  }, [items, frozen, fresh, grade, setFilteredItems]);

  const handleFrozenChange = (e, { value }) => {
    if (value === "frozen") {
      setFrozen(value);
      setGrade("---");
      setFresh("---");
    } else {
      setFrozen(value);
    }
  };

  const handleGradeChange = (e, { value }) => setGrade(value);

  const handleFreshChange = (e, { value }) => setFresh(value);

  return (
    <div className="product-filter">
      <Button
        basic
        active
        onClick={() => {
          setFrozen("---");
          setGrade("---");
          setFresh("---");
        }}
      >
        Filters:
      </Button>
      <Button.Group color="teal">
        <Button>{frozen}</Button>
        <Dropdown
          direction="right"
          className="button icon"
          floating
          options={frozenOptions}
          onChange={handleFrozenChange}
          trigger={<></>}
        />
      </Button.Group>
      <Button.Group color="orange">
        <Button disabled={gradeOptions().length === 1}>{grade}</Button>
        <Dropdown
          direction="right"
          disabled={gradeOptions().length === 1}
          className="button icon"
          // floating
          options={gradeOptions()}
          onChange={handleGradeChange}
          trigger={<></>}
        />
      </Button.Group>
      <Button.Group color="green">
        <Button disabled={freshOptions().length === 1}>{fresh}</Button>
        <Dropdown
          direction="right"
          disabled={freshOptions().length === 1}
          className="button icon"
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
