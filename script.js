const searchBook = document.querySelector(".searchBook");
const inputEl = searchBook.querySelector("input");
const bookList = document.querySelector(".book-list");

const URL = "https://openlibrary.org/search.json?q=";

searchBook.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = inputEl.value;
  const searchFormatted = inputValue.replaceAll(" ", "+");
  const apiURL = `${URL}/${searchFormatted}`;

  console.log("sto chiamando:", apiURL);

  fetch(apiURL)
    .then((response) => {
      //   console.log({ response });
      const data = response.json();
      //   console.log({ data });
      return data;
    })
    .then((data) => {
      //   console.log(data);
      bookList.innerHTML = data.docs
        .map((el) => {
          return `<div class="bookCard"> <img
          src="https://picsum.photos/300/280?${el.key}"
          alt=""
        />  <h2>${el.title}</h2> <h4> ${el.author_name}</h4> <p>Anno di pubblicazione: ${el.first_publish_year}</p></div>`;
        })
        .join("");
    })
    .catch((err) => {
      bookList.innerHTML = `<div class="errorText">Ops. Qualcosa non va come previsto.</div>`;
      return console.error(err); // array vuoto
    })
    .finally(() => {
      console.log("Benvenuto nel book store");
    });
});
