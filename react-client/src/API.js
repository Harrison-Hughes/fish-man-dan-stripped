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

export default {
  getItems,
};
