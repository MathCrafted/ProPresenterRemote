document.querySelector("#btnNextSlide").addEventListener("click", async () => {
    
    await goToNextSlide()
    urlNextSlideThumnail = await getNextSlideThumbnailUrl(document.querySelector("#btnNextSlide").clientWidth)
    if(urlNextSlideThumnail !== "") {
        document.querySelector("#btnNextSlide").innerHTML = '<img src="' + urlNextSlideThumnail + '" class="col-12">'
        //document.querySelector("#btnNextSlide").height = document.querySelector("#btnNextSlide").clientWidth / 16 * 9
    }
})

document.querySelector("#btnPrevSlide").addEventListener("click", async () => {
    
    await goToPrevSlide()
    urlPrevSlideThumnail = await getPrevSlideThumbnailUrl(document.querySelector("#btnPrevSlide").clientWidth)
    if(urlPrevSlideThumnail !== "") {
        document.querySelector("#btnPrevSlide").innerHTML = '<img src="' + urlPrevSlideThumnail + '" class="col-12">'
        //document.querySelector("#btnNextSlide").height = document.querySelector("#btnNextSlide").clientWidth / 16 * 9
    }
})