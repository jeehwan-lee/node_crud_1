const handleFilesClick = () => {
  const filesInput = document.getElementById("selectedFilesInput");
  filesInput.click();
};

const handleFilesChange = (event) => {
  const selectedFiles = event.target.files;
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
