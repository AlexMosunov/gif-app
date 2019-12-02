// 20191129123742
// http://api.giphy.com/v1/gifs/search?q=cats&api_key=O3iJIz4KNHqyrwfM88y7Abn9WA2607z0&limit=8

const numOfEl = 8;

class DataFromAPI {
  constructor(query, limit) {
    this.query = query;
    this.limit = limit;
  }
  async getResults() {
    try {
      const res = await fetch(
        `http://api.giphy.com/v1/gifs/search?q=${this.query}&api_key=O3iJIz4KNHqyrwfM88y7Abn9WA2607z0&limit=${this.limit}`
      );
      const result = await res.json();
      //const data = result.data;
      //console.log(result.data);
      this.result = result.data;
      return result.data;
    } catch (error) {
      alert(error + " 1");
    }
  }
}

(async () => {
  const catsData = new DataFromAPI("cats", 40);
  try {
    const myData = await catsData.getResults();
    pasteElements(myData);
    console.log(myData);

    document.querySelector(".refresh__btn").addEventListener("click", e => {
      clearInput();
      clearReasults();
      pasteElements(myData);
    });

    infoButton();
  } catch (error) {
    alert(error + "2");
  }
})();

const controlSearch = async () => {
  const query = getInput();
  console.log(query);
  if (query) {
    const search = new DataFromAPI(query, 40);
    try {
      const newData = await search.getResults();
      // console.log(newData);
      clearInput();
      clearReasults();
      pasteElements(newData);
      document.querySelector(".refresh__btn").addEventListener("click", e => {
        clearReasults();
        pasteElements(newData);
      });
      infoButton();
    } catch (error) {
      alert(error + "3");
    }
  }
};

document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

const getInput = () => document.querySelector(".search__field").value;

function clearReasults() {
  document.querySelector(".image-grid").innerHTML = "";
}

const clearInput = () => {
  document.querySelector(".search__field").value = "";
};

const pasteElements = data => {
  let randomNum;
  for (let i = 0; i < numOfEl; i++) {
    randomNum = Math.floor(Math.random() * 40);
    renderCard(data[randomNum]);
  }
};

function renderCard(obj) {
  const markup = `
  <figure class="gif-container">
  <div class="info-image hidden">
  <img src="${obj.images["480w_still"].url}" class= "jpg__js" alt="${
    obj.title
  }">
  <span class="img-resolution">${obj.images["480w_still"].height}x${
    obj.images["480w_still"].width
  }</span>
  <button class="btn btn-source"><a href="${
    obj.url
  }" target="_blank">Оригинал</a></button>
  </div>
  <img src="${obj.images.original.url}" class="gif__js" alt="${obj.title}">
  <figcaption>
      <span class='caption'>${limitTitle(obj.title)}</span>
      <button class="info-icon"><i>i</i></button>
  </figcaption>
</figure>
`;
  document
    .querySelector(".image-grid")
    .insertAdjacentHTML("afterbegin", markup);
}
function infoButton() {
  const gifContainers = document.querySelectorAll(".gif-container");
  gifContainers.forEach(el => {
    el.querySelector(".info-icon").addEventListener("click", e => {
      e.preventDefault();
      el.querySelector(".jpg__js").classList.toggle("tinted");
      el.querySelector(".gif__js").classList.toggle("hidden");
      el.querySelector(".info-image").classList.toggle("hidden");
    });
  });
}

const limitTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // Return the result
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};
