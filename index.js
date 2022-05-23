let basketList = [];
let total = 0;
fetch("./book.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then(getData);

function getData(data) {
  let bookWrapperSelector = document.getElementsByClassName("book-catalog")[0];
  const list = document.createElement("ul");

  //Main Header
  let mainHeader = document.createElement("h1");
  let navigationSelector = document.getElementsByClassName("navigation")[0];
  mainHeader.textContent = "Welcome To BookShop!";
  navigationSelector.appendChild(mainHeader);

  let shoppingBasket = document.createElement("img");
  shoppingBasket.src = "./Assets/shopping-basket-svgrepo-com.svg";
  navigationSelector.appendChild(shoppingBasket);

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
    <p class="book-item-author"><span>Author:</span> ${bookItem.author}</p>
    <p class="book-item-price">${bookItem.price + "$"}</p>
    <div class="book-item-basket-wrapper">
        <button class="book-item-basket item-${index}">
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
      if (elem.textContent === "Show More") {
        elem.textContent = "Show Less";
      } else {
        elem.textContent = "Show More";
      }
    });
  });

  let basketListSelector = document.getElementsByClassName("basket")[0];
  let basketFooter = document.createElement("div");
  basketFooter.classList.add("basket-footer");
  basketListSelector.appendChild(basketFooter);

  function updatingBasketFooter(total, length) {
    basketFooter.innerHTML = `
    <p class = "basket-footer-total">Total:${total}$</p>
    <p class = "basket-footer-qty">QTY:${length}</p>
    <button class="basket-footer-button">Confrim Order</button>
  `;
  }

  //basket
  let addToBasketSelector = Array.from(
    document.getElementsByClassName("book-item-basket")
  );

  addToBasketSelector.forEach((elem, index) => {
    elem.addEventListener("click", (elemMetaData) => {
      const index = elemMetaData.path[1].classList[1].split("-")[1];
      let itemAuthor =
        document.getElementsByClassName("book-item-author")[index].textContent;
      let itemTitle =
        document.getElementsByClassName("book-item-title")[index].textContent;
      let itemPrice =
        document.getElementsByClassName("book-item-price")[index].textContent;
      let itemImg = document.getElementsByClassName("book-item-img")[index];

      basketList.push({
        author: itemAuthor,
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
      });

      let li = document.createElement("li");
      li.innerHTML = `
      <div class="basket-item">
          <img src="${itemImg.src}" alt="" class="book-item-img-basket item-${index}"/>
          <div>
            <p class = "book-item-title-basket">${itemTitle}</p>
            <p class = "book-item-author-basket">${itemAuthor}</p>
            <p class = "book-item-price-basket">Price: ${itemPrice}</p>
          </div>
          <img src="./Assets/Xsymbol.svg" class="book-item-basket-x">
        </div>
    `;
      fragment.appendChild(li);
      basketListSelector.appendChild(fragment);
      basketListSelector.style.display = "block";

      total = 0;
      basketList.forEach((elem) => {
        total = total + parseInt(elem.price);
      });
      updatingBasketFooter(total, basketList.length);

      let shoppingBasketX =
        document.getElementsByClassName("book-item-basket-x");
      Array.from(shoppingBasketX).forEach((elem) => {
        elem.addEventListener("click", (elemMetaData) => {
          elemMetaData.path[1].style.display = "none";

          basketList.forEach((elem, index) => {
            if (
              elem.title ==
              elemMetaData.path[1].children[1].children[0].textContent
            ) {
              total = total - parseInt(elem.price);
              basketList.splice(index, 1);
              updatingBasketFooter(total, basketList.length);
            }
          });
        });
      });
    });
  });

  //shopping basket
  shoppingBasket.addEventListener("click", () => {
    if (basketListSelector.style.display == "block") {
      basketListSelector.style.display = "none";
    } else if (basketListSelector.style.display == "none") {
      basketListSelector.style.display = "block";
    }
  });
}
