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

// const getOrder = (order_reference) =>
//   fetch(`${API_ROOT}/order/${order_reference}`, {
//     method: "GET",
//     header: HEADERS,
//   }).then(jsonify);

const showAndConfirmOrder = (order_reference) =>
  fetch(`${API_ROOT}/order_confirm/${order_reference}`, {
    method: "GET",
    header: HEADERS,
  }).then(jsonify);

const updateOrderStatus = (order_reference, status) =>
  fetch(`${API_ROOT}/order/update_order_status/${order_reference}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({ order: { status: status } }),
  }).then(jsonify);

export default {
  getItems,
  validateAddress,
  placeOrder,
  // getOrder,
  showAndConfirmOrder,
  updateOrderStatus,
};
