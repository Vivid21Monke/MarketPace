const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const preview = document.getElementById("preview");
const clearBtn = document.getElementById("clear-btn");
const createBtn = document.getElementById("createBtn");

let selectedFiles = [];

dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("drag-over");
  e.dataTransfer.dropEffect = "copy";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
  handleFiles(files);
});

fileInput.addEventListener("change", () => {
  const files = Array.from(fileInput.files).filter(f => f.type.startsWith("image/"));
  handleFiles(files);
});

function handleFiles(files) {
  for (const file of files) {
    selectedFiles.push(file);
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    img.style.width = "100px";
    li.appendChild(img);
    li.appendChild(document.createTextNode(file.name));
    preview.appendChild(li);
  }
}

clearBtn.addEventListener("click", () => {
  selectedFiles = [];
  fileInput.value = "";
  preview.innerHTML = "";
});

createBtn.addEventListener("click", () => {
  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value;
  const description = document.getElementById("itemDescription").value.trim();

  if (!name || !price || !description || selectedFiles.length === 0) {
    alert("Please fill all fields and add at least one image.");
    return;
  }

  const promises = selectedFiles.map(file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  });

  Promise.all(promises).then(images => {
    const newItem = {
      id: Date.now(),
      name,
      price,
      description,
      images
    };

    const items = JSON.parse(sessionStorage.getItem("marketItems")) || [];
    items.push(newItem);
    sessionStorage.setItem("marketItems", JSON.stringify(items));

    window.location.href = "../index.html";
  });
});
