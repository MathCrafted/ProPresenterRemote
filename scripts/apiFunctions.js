// Get current playlist uuid
async function getCurrentPlaylistUUID() {
    try {
        const objResponse = await fetch("http://"+strRemoteIP+":"+intRemotePort+"/v1/playlist/active")
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
        const objData = await objResponse.json()
        return objData.presentation.playlist.uuid
    } catch(objError) {
        console.error("Error fetching current playlist uuid: ", objError)
        return null
    }
}

// Get current playlist uuid
async function getCurrentPresentationIndex() {
    try {
        const objResponse = await fetch("http://"+strRemoteIP+":"+intRemotePort+"/v1/playlist/active")
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
        const objData = await objResponse.json()
        return objData.presentation.item.index
    } catch(objError) {
        console.error("Error fetching current playlist uuid: ", objError)
        return null
    }
}

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
        return null
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
        return null
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
        return null
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
        return null
    }
}

// Retrieves the name of the next presentation
async function getPresentationNameByOffset(intIndexOffset) {
    try {
        const strPlaylistUUID = await getCurrentPlaylistUUID()
        const intIndex = await getCurrentPresentationIndex() + intIndexOffset
        const objResponse = await fetch("http://"+strRemoteIP+":"+intRemotePort+"/v1/playlist/" + strPlaylistUUID)
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
        const objData = await objResponse.json()
        let strNextPresentationName = null
        console.log(objData)
        objData.items.forEach(element => {
            if(element.id.index == intIndex) {
                strNextPresentationName = element.id.name
            }
        });
        return strNextPresentationName
    } catch(objError) {
        console.error("Error fetching next presentation name: ", objError)
        return null
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

// Go to the next presentation
async function goToNextPresentation() {
    try {
        const objResponse = await fetch("http://"+strRemoteIP+":"+intRemotePort+"/v1/playlist/focused/next/trigger")
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
    } catch(objError) {
        console.error("Error fetching next presentation trigger: ", objError)
    }
}

// Go to the previous presentation
async function goToPrevPresentation() {
    try {
        const objResponse = await fetch("http://"+strRemoteIP+":"+intRemotePort+"/v1/playlist/focused/previous/trigger")
        if(!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }
    } catch(objError) {
        console.error("Error fetching previous presentation trigger: ", objError)
    }
}