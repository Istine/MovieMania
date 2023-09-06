export const getMovies = async (query = "The Mummy") => {
  return await fetch("v1/search", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ Title: query }),
  });
};

export const getLatestSearches = async () => {
  return await fetch("v1/search");
};

export const getDetailsAboutMovie = async (title) => {
  return await fetch(`v1/search/${title}`);
};
