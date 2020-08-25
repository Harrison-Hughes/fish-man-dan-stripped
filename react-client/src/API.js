import { API_ROOT, HEADERS } from "./Constants";

const jsonify = (resp) => {
  if (resp.ok) {
    return resp.json();
  } else {
    throw resp.json();
  }
};

const getItems = () =>
  fetch(`${API_ROOT}/items`, {
    method: "GET",
    headers: HEADERS,
  }).then(jsonify);

const validateAddress = (address) =>
  fetch(`${API_ROOT}/validate_address`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(address),
  }).then(jsonify);

const placeOrder = (order) =>
  fetch(`${API_ROOT}/orders`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(order),
  }).then(jsonify);

export default {
  getItems,
  validateAddress,
  placeOrder,
};
