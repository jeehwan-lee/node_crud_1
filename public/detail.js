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

const deleteBtn = (btnType, id) => {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");

  const modalSubmitBtn = document.getElementById("modalSubmitBtn");

  if (btnType === "reflyDel") {
    modalSubmitBtn.addEventListener("click", () => {
      modalReflyDelete(id);
    });
  } else if (btnType === "postDel") {
    modalSubmitBtn.addEventListener("click", () => {
      modalPostDelete(id);
    });
  }
};

const modalPostDelete = (postId) => {
  const passwordValidationText = document.getElementById("passwordValidation");
  const password = document.getElementById("modalPassword").value;

  passwordValidationText.classList.add("hidden");

  if (password.trim().length === 0) {
    passwordValidationText.classList.remove("hidden");
    return;
  }

  fetch(`/post/postPasswordCheck/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.result) {
        passwordValidationText.classList.add("hidden");
        window.location.href = `/post/delete/${postId}`;
      } else {
        passwordValidationText.classList.remove("hidden");
      }
    });
};

const modalReflyDelete = (reflyId) => {
  const passwordValidationText = document.getElementById("passwordValidation");
  const password = document.getElementById("modalPassword").value;

  passwordValidationText.classList.add("hidden");

  if (password.trim().length === 0) {
    passwordValidationText.classList.remove("hidden");
    return;
  }

  fetch(`/refly/reflyPasswordCheck/${reflyId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.result) {
        passwordValidationText.classList.add("hidden");
        window.location.href = `/refly/delete/${reflyId}`;
      } else {
        passwordValidationText.classList.remove("hidden");
      }
    });
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
};
