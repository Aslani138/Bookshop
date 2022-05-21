let inforamtion;
fetch("./book.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then(getData);

function getData(data) {
  let bookWrapperSelector = document.getElementsByClassName("book-catalog")[0];
  const list = document.createElement("ul");

  //Book Catalog Header
  let bookCatalogHeader = document.createElement("h2");
  bookCatalogHeader.textContent = "Book Catalog";
  bookWrapperSelector.appendChild(bookCatalogHeader);

  //Book Catalog List
  let bookCatalogList = document.createElement("div");
  bookCatalogList.classList.add("book-list");
  bookWrapperSelector.appendChild(bookCatalogList);

  let fragment = new DocumentFragment();
  data.forEach(function (bookItem, index) {
    let li = document.createElement("li");
    li.innerHTML = `
    <div class="book-item-title-wrapper">
        <p class="book-item-title">${bookItem.title}</p>
    </div>
    <img class="book-item-img" src="${bookItem.imageLink}">
    <p class="book-item-description">${bookItem.description}</p>
    <p class="book-item-author">${bookItem.author}</p>
    <p class="book-item-price">${bookItem.price + "$"}</p>
    <div class="book-item-basket-wrapper">
        <button class="book-item-basket">
        <img src="./Assets/basket.svg" alt="">
        <p>Add To The Basket</p>
        </button>
        <p class="book-item-show-more item-${index}">Show More</p>
    </div>
    `;
    fragment.appendChild(li);
  });

  list.appendChild(fragment);
  bookCatalogList.appendChild(list);

  let bookItemShowMoreSelector = Array.from(
    document.getElementsByClassName("book-item-show-more")
  );
  //Show More
  bookItemShowMoreSelector.forEach((elem) => {
    elem.addEventListener("click", (elemMetaData) => {
      const index = elemMetaData.target.classList[1].split("-")[1];
      let itemDescription = document.getElementsByClassName(
        "book-item-description"
      )[index];
      itemDescription.style.display =
        itemDescription.style.display === "none" ||
        !itemDescription.style.display
          ? "block"
          : "none";
    console.log(elem.textContent);
    if(elem.textContent === "Show More") {
        elem.textContent = "Show Less";
    }else{
        elem.textContent = "Show More";
    }
    });
  });
}
