const searchHandler = (e) => {
  if (e.keyCode === 13) {
    window.location.href = `/post/searchPosts?searchParam=${e.target.value}`;
  }
};

const handleClickPost = (postId) => {
  window.location.href = `/post/updateHits/${postId}`;
};
