export const getShowByKey = (key) => {
  return fetch(`http://api.tvmaze.com/singlesearch/shows?q=${key}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
export const getShowById = (id) => {
  return fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

