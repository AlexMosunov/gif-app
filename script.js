// 20191129123742
// http://api.giphy.com/v1/gifs/search?q=cats&api_key=O3iJIz4KNHqyrwfM88y7Abn9WA2607z0&limit=8
//images.original.url
//
const numOfEl = 8;

class DataFromAPI {
  constructor(query, limit) {
    this.query = query;
    this.limit = limit;
  }
async getResults () {
  try {
    const res = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${this.query}&api_key=O3iJIz4KNHqyrwfM88y7Abn9WA2607z0&limit=${this.limit}`
    );
    const result = await res.json();
    //const data = result.data;
    //console.log(result.data);
    return result.data;
  } catch (error) {
    alert(error);
  }
}};

(async () => {
  const catsData = new DataFromAPI('cats', 40);
  try {
    const myData = await catsData.getResults();
    pasteElements(myData);

    document.querySelector('.refresh__btn').addEventListener('click', e => {
      clearReasults();
      pasteElements(myData);
    });

  } catch (error) {
    alert(error);
  }
})();

function clearReasults() {
  document.querySelector('.image-grid').innerHTML = "";
}

// getResults("cats", 40).then(data => {
//   pasteElements(data);
//   // data.forEach(renderCard);
//   // document.querySelector('.refresh__btn').addEventListener('click', pasteElements(data));
// });

const pasteElements= data => {
  let randomNum;
  for (let i = 0; i < numOfEl; i++) {
    randomNum = Math.floor(Math.random() * 40);
    renderCard(data[randomNum]);
  }
  // data.forEach(renderCard);
};




//console.log(catGifsEight)

// catGifsEight.map(obj=>{
//   return {
//   gif: obj.images.original.url,
//   jpg: obj.images[w_still].url
//   }
//   });

function renderCard(obj) {
  const markup = `
  <figure>
  <img src="${obj.images["480w_still"].url}" class= "hidden jpg__js" alt="${obj.title}">
  <img src="${obj.images.original.url}" class="gif__js" alt="${obj.title}">
  <figcaption>
      <span class='caption'>${obj.title}</span>
      <button class="info-icon"><i>i</i></button>
  </figcaption>
</figure>
`;
  document.querySelector('.image-grid').insertAdjacentHTML("afterbegin", markup);
  // document.querySelector(".jpg__js").addEventListener("mouseover", () => {
  //   document.querySelector(".gif__js").classList.remove("hidden");
  //   document.querySelector(".jpg__js").classList.add("hidden");
  // });
  
  // document.querySelector(".gif__js").addEventListener("mouseleave", () => {
  //   document.querySelector(".gif__js").classList.add("hidden");
  //   document.querySelector(".jpg__js").classList.remove("hidden");
  // });
}

// const renderResults = data => {
//       data.forEach(renderCard);
// };

//renderCard(catGifsEight);

// const renderResults = data => {
//     data.forEach(renderAd);
//   };

// document.querySelector(".jpg__js").addEventListener("mouseover", () => {
//   document.querySelector(".gif__js").classList.remove("hidden");
//   document.querySelector(".jpg__js").classList.add("hidden");
// });

// document.querySelector(".gif__js").addEventListener("mouseleave", () => {
//   document.querySelector(".gif__js").classList.add("hidden");
//   document.querySelector(".jpg__js").classList.remove("hidden");
// });
