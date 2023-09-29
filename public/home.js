const searchHandler = (e) => {
  if (e.keyCode === 13) {
    window.location.href = `/post?searchParam=${e.target.value}`;
  }
};

const handleClickPost = (postId) => {
  window.location.href = `/post/updateHits/${postId}`;
};

const getQueryParam = (param) => {
  var queryString = window.location.search;
  var searchParams = new URLSearchParams(queryString);
  return searchParams.get(param);
};

const paginationHandler = (number) => {
  if (getQueryParam("searchParam")) {
    window.location.href = `/post/?page=${number}&searchParam=${getQueryParam(
      "searchParam"
    )}`;
  } else {
    window.location.href = `/post/?page=${number}`;
  }
};
