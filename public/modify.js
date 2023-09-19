const validationCheck = () => {
  const writerInput = document.getElementById("writer");
  const passwordInput = document.getElementById("password");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  const writerError = document.getElementById("writerError");
  const passwordError = document.getElementById("passwordError");
  const titleError = document.getElementById("titleError");
  const contentError = document.getElementById("contentError");

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

  // 제목 부분 warning 메세지
  if (titleInput.value.trim().length === 0) {
    titleInput.classList.add("border-red-500");
    titleError.classList.remove("hidden");
    return false;
  } else {
    titleInput.classList.remove("border-red-500");
    titleError.classList.add("hidden");
  }

  // 내용 부분 warning 메세지
  if (contentInput.value.trim().length === 0) {
    contentInput.classList.add("border-red-500");
    contentError.classList.remove("hidden");
    return false;
  } else {
    contentInput.classList.remove("border-red-500");
    contentError.classList.add("hidden");
  }

  return true;
};

const modifyPost = () => {
  if (validationCheck()) {
    fetch("/post/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        writer: document.getElementById("writer").value,
        password: document.getElementById("password").value,
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
        postId: document.getElementById("postId").value,
      }),
    }).then((res) => {
      console.log(res);
      window.location.href = "/post";
    });
  }
};
