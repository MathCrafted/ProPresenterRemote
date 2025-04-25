// Get current presentation uuid
async function getCurrentPresentationUUID() {
    try {
        const objResponse = await fetch("http://"+strRemoteIP+":"+intRemotePort+"/v1/presentation/active")
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
        const objData = await objResponse.json()
        return objData.presentation.id.uuid
    } catch(objError) {
        console.error("Error fetching current presentation uuid: ", objError)
        return ""
    }
}

// Get active slide index
async function getCurrentSlideIndex() {
    try {
        const objResponse = await fetch("http://"+strRemoteIP+":"+intRemotePort+"/v1/presentation/slide_index")
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
        const objData2 = await objResponse.json()
        return objData2.presentation_index.index
    } catch(objError) {
        console.error("Error fetching current slide index: ", objError)
        return -1
    }
}

// Retrieves the URL of the next slide's thumbnail
async function getNextSlideThumbnailUrl(intWidth) {
    try {
        const strUUID = await getCurrentPresentationUUID()
        const intIndex = await getCurrentSlideIndex() + 1
        const urlNextSlideThumnail = "http://" + strRemoteIP + ":" + intRemotePort +"/v1/presentation/" + strUUID + "/thumbnail/" + intIndex + "?quality=" + intWidth

        const objResponse = await fetch(urlNextSlideThumnail)
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
        return urlNextSlideThumnail

    } catch(objError) {
        console.error("Error fetching active slide information: ", objError)
        return ""
    }
}

// Retrieves the URL of the prev slide's thumbnail
async function getPrevSlideThumbnailUrl(intWidth) {
    try {
        const strUUID = await getCurrentPresentationUUID()
        const intIndex = await getCurrentSlideIndex() - 1
        const urlPrevSlideThumnail = "http://" + strRemoteIP + ":" + intRemotePort +"/v1/presentation/" + strUUID + "/thumbnail/" + intIndex + "?quality=" + intWidth

        const objResponse = await fetch(urlPrevSlideThumnail)
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
        return urlPrevSlideThumnail

    } catch(objError) {
        console.error("Error fetching active slide information: ", objError)
        return ""
    }
}

// Go to the next slide
async function goToNextSlide() {
    try {
        const objResponse = await fetch("http://"+strRemoteIP+":"+intRemotePort+"/v1/presentation/active/next/trigger")
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
    } catch(objError) {
        console.error("Error fetching next slide trigger: ", objError)
    }
}

// Go to the previous slide
async function goToPrevSlide() {
    try {
        const objResponse = await fetch("http://"+strRemoteIP+":"+intRemotePort+"/v1/presentation/active/previous/trigger")
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
    } catch(objError) {
        console.error("Error fetching previous slide trigger: ", objError)
    }
}