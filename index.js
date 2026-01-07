const items = JSON.parse(sessionStorage.getItem("marketItems")) || [];
const container = document.getElementById("itemsContainer");

if (items.length === 0) {
  container.innerHTML = "<p>No items yet.</p>";
}

items.forEach(item => {
  const wrapper = document.createElement("div");
  wrapper.className = "Container--Main--In--Items";

  const card = document.createElement("div");
  card.className = "Item--Card";

  const img = document.createElement("img");
  img.src = item.images[0];
  img.alt = item.name;
  img.className = "Item--Image";

  const info = document.createElement("div");
  info.className = "Item--Info";

  const nameDiv = document.createElement("div");
  nameDiv.className = "Item--name";
  nameDiv.textContent = item.name;

  const priceDiv = document.createElement("div");
  priceDiv.className = "Item--price";
  priceDiv.textContent = "€" + item.price;

  const viewLink = document.createElement("a");
  viewLink.href = "FullPage/FullPage.html";
  viewLink.className = "View--Button";
  viewLink.textContent = "View more";
  viewLink.onclick = () => {
    sessionStorage.setItem("selectedItemId", item.id);
  };

  info.appendChild(nameDiv);
  info.appendChild(priceDiv);
  info.appendChild(viewLink);

  card.appendChild(img);
  card.appendChild(info);

  wrapper.appendChild(card);
  container.appendChild(wrapper);
});
