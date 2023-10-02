var selectedFiles = [];

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

const submitPost = () => {
  const formData = new FormData();

  for (var i = 0; i < selectedFiles.length; i++) {
    formData.append("files", selectedFiles[i]);
  }

  fetch("/post/file", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((data) => console.log(data));

  if (validationCheck()) {
    fetch("/post/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        writer: document.getElementById("writer").value,
        password: document.getElementById("password").value,
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
      }),
    }).then(() => {
      window.location.href = "/post";
    });
  }
};

const handleFilesClick = () => {
  const filesInput = document.getElementById("selectedFilesInput");
  filesInput.click();
};

const handleFilesChange = (event) => {
  selectedFiles = event.target.files;
  const selectedFilesContainer = document.getElementById(
    "selectedFilesContainer"
  );

  for (var i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    const selectedFile = `
        <li class="mt-2" id=selectedFileNo${i}>
        <div
        class="justify-between flex py-2 px-4 border border-gray-300"
        >
        <p>${file.name}</p>
        <button onclick="deleteFileBtn(event)">
            <i class="fa-solid fa-xmark"></i>
        </button>
        </div>
    </li>
    `;
    selectedFilesContainer.innerHTML += selectedFile;
  }
};

const deleteFileBtn = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const selectedFilesContainer = document.getElementById(
    "selectedFilesContainer"
  );
  const removeFile = document.getElementById(
    event.currentTarget.parentNode.parentNode.id
  );

  selectedFilesContainer.removeChild(removeFile);

  //console.log(event.currentTarget.parentNode.parentNode.id);
};
