const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

// Unsplash API
const count = 10;
const apiKey = "";
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get Photos
async function getPhotos() {
  try {
    const response = await fetch(url);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

getPhotos();

// Function for setting attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Make image container and appending it to image container
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //Create an anchor tag
    let item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //Create an image tag
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);
    // Attach this to parent components
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Infinite Scrolling function
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//After image loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
  }
}
