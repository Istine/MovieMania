export const scrollPageBy = (from = "top", distance = 0) => {
  window.scrollTo({
    [from]: distance,
    behavior: "smooth",
  });
};

export const localStore = {
  valueOf(key = "") {
    return JSON.parse(localStorage.getItem(key));
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export const ERROR_MESSAGES = {
  SERVICE_UNAVAILABLE:
    "We apologize for the inconvenience, but our service is currently undergoing maintenance. Thank you for your patience.",
  EMPTY_SET:
    "Sorry, your search did not find any results. Please try again later or check  if the words are spelt correctly.",
};

export const ERROR_HEADINGS = {
  SERVICE_UNAVAILABLE: "We are Sorry",
  EMPTY_SET: "Not Result found",
};
