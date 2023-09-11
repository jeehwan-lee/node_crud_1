const updateHearts = (postId) => {
  window.location.href = `/post/updateHearts/${postId}`;
};

const validationCheck = () => {
  const writerInput = document.getElementById("writer");
  const passwordInput = document.getElementById("password");
  const commentInput = document.getElementById("comment");

  const writerError = document.getElementById("writerError");
  const passwordError = document.getElementById("passwordError");
  const commentError = document.getElementById("commentError");

  // 작성자 부분 warning 메세지
  if (writerInput.value.trim().length === 0) {
    writerError.classList.remove("hidden");
    writerInput.classList.add("border-red-500");

    return false;
  } else {
    writerError.classList.add("hidden");
    writerInput.classList.remove("border-red-500");
  }

  // 비밀번호 부분 warning 메세지
  if (passwordInput.value.trim().length === 0) {
    passwordInput.classList.add("border-red-500");
    passwordError.classList.remove("hidden");
    return false;
  } else {
    passwordInput.classList.remove("border-red-500");
    passwordError.classList.add("hidden");
  }

  if (commentInput.value.trim().length === 0) {
    commentInput.classList.add("border-red-500");
    commentError.classList.remove("hidden");
    return false;
  } else {
    commentInput.classList.remove("border-red-500");
    commentError.classList.add("hidden");
  }

  return true;
};

const submitRefly = (postId) => {
  if (validationCheck()) {
    fetch("/refly/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        writer: document.getElementById("writer").value,
        password: document.getElementById("password").value,
        comment: document.getElementById("comment").value,
      }),
    }).then((res) => {
      window.location.href = `/post/detail/${postId}`;
    });
  }
};
