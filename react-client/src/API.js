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

const validateAddress = () =>
  fetch(`${API_ROOT}/validate_address`, {
    method: "GET",
    headers: HEADERS,
  }).then(jsonify);

export default {
  getItems,
  validateAddress,
};
