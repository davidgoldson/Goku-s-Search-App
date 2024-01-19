const accessKey = "GDFadb5OSvfyV37y-sjbOIYxorJqRXDv03pjJiIIkVk";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search");
const searchResults = document.querySelector(".results");
const showMore = document.getElementById("show-more-button");
const previewImages = document.querySelector(".preview-images");

let inputData = "";
let page = 1;

async function fetchImagePreviews(query) {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}&per_page=5`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }
  
async function updateImagePreviews() {
    const query = inputEl.value;
    const previews = await fetchImagePreviews(query);
  
    previewImages.innerHTML = "";
  
    previews.forEach((preview) => {
      const previewImage = document.createElement("img");
      previewImage.src = preview.urls.thumb; 
      previewImage.alt = preview.alt_description;
  
      previewImages.appendChild(previewImage);
    });
  }

  inputEl.addEventListener("input", updateImagePreviews);

  
  
async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1)  {
    searchResults.innerHTML = "";
  }

  results.map((result) =>{
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("result");
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  } 
}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();  
});

showMore.addEventListener("click", () =>{
    searchImages(); 
});

updateImagePreviews();