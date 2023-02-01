var submit = document.querySelector("#submit");
var clear = document.querySelector("#clear")

function addPhoto(event){
    event.preventDefault();
    
    const photoEl = document.querySelector("#url");
    const locationEl = document.querySelector("#location");
    const ratingEl = document.querySelector("#rating");

    const url = photoEl.value;
    const location = locationEl.value;
    const rating = ratingEl.value;

    
    let  image = {
        url: url,
        location: location,
        rating: rating
    }
    
    let imageData = window.localStorage.getItem("image-list") || [];

    if(imageData.length == 0){
        imageData.push(image);
        localStorage.setItem("image-list", JSON.stringify(imageData));
        renderImages()
    } else {
        let imageArray = JSON.parse(imageData);
        imageArray.push(image);
        localStorage.setItem("image-list", JSON.stringify(imageArray));
        renderImages()
    }

}

function renderImages(){
    const imageDisplay = document.querySelector("#photo-container");

    //clear table before rendering
    const frames = document.querySelectorAll(".image-frame");
    for(let j = 0; j<frames.length; j++){
        let element = frames[j];
        element.remove();
    }

    //render images
    const imageData = window.localStorage.getItem("image-list");
    if(imageData){
        const imageArray = JSON.parse(imageData);
        for (let i = 0; i<imageArray.length; i++){
            imageObj = imageArray[i];
            const url = imageObj.url;
            const location = imageObj.location;
            const rating = imageObj.rating;
            const captionText = location + " - " + rating;

            if(url.length > 5){
                //create elements
                const frame = document.createElement("div");
                const img = document.createElement("img");
                const caption = document.createElement("h6");

                //add classes
                frame.setAttribute("class", "image-frame");
                caption.setAttribute("class", "caption");
                img.setAttribute("src", url);
                img.setAttribute("alt", "surf-photo");

                //set content to image data
                caption.textContent = captionText;

                //build and append
                imageDisplay.appendChild(frame)
                frame.appendChild(img);
                frame.appendChild(caption)
            }
        }
    }
}

const clearPhotos = ()=> {
    const emptyArray = [];
    window.localStorage.setItem("image-list", emptyArray);
    location.reload();
}

window.addEventListener("DOMContentLoaded", renderImages)
submit.addEventListener("click", addPhoto)
clear.addEventListener("click", clearPhotos)