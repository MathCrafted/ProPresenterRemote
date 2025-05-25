//global variables
var strRemoteIP = "127.0.0.1"
var intRemotePort = 1025
var intSlideButtonDelta = 0
var intDelay = 75

//functions
function swapToPage(idPage) {
    // Hide all pages
    document.querySelectorAll("#pagePresent").forEach(function(element) {element.classList.add("d-none")})
    // Show selected page
    document.querySelectorAll(idPage).forEach(function(element) {element.classList.remove("d-none")})
}

async function update() {
    // Get the current slide index
    // Get the next slide thumbnail URL
    let urlNextSlideThumnail = await getNextSlideThumbnailUrl(document.querySelector("#btnNextSlide").scrollWidth)
    if(urlNextSlideThumnail !== "") {
        document.querySelector("#btnNextSlide div").innerHTML = '<img src="' + urlNextSlideThumnail + '" class="col-12">'
    }

    // Get the previous slide thumbnail URL
    let urlPrevSlideThumnail = await getPrevSlideThumbnailUrl(document.querySelector("#btnPrevSlide").clientWidth)
    console.log(urlPrevSlideThumnail)
    if(urlPrevSlideThumnail !== "") {
        document.querySelector("#btnPrevSlide div").innerHTML = '<img src="' + urlPrevSlideThumnail + '" class="col-12">'
    }

    // Get the next presentation name
    let strNextPresentationName = await getPresentationNameByOffset(1)
    document.querySelector("#btnNextPresentation div").innerHTML = "<p>" + strNextPresentationName + "</p>"

    // Get the previous presentation name
    let strPrevPresentationName = await getPresentationNameByOffset(-1)
    document.querySelector("#btnPrevPresentation div").innerHTML = "<p>" + strPrevPresentationName + "</p>"
}