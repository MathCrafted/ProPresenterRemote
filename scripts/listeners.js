document.querySelector("#btnNextSlide").addEventListener("click", async () => {
    await goToNextSlide()
    await new Promise(r => setTimeout(r, intDelay))
    await update()
})

document.querySelector("#btnPrevSlide").addEventListener("click", async () => {
    await goToPrevSlide()
    await new Promise(r => setTimeout(r, intDelay))
    await update()
})

document.querySelector("#btnNextPresentation").addEventListener("click", async () => {
    await goToNextPresentation()
    await new Promise(r => setTimeout(r, intDelay))
    await update()
})

document.querySelector("#btnPrevPresentation").addEventListener("click", async () => {
    await goToPrevPresentation()
    await new Promise(r => setTimeout(r, intDelay))
    await update()
})

document.querySelector("#btnConnect").addEventListener("click", async () => {
    strRemoteIP = document.querySelector("#ipAddress").value
    intRemotePort = document.querySelector("#intPort").value
    await update()
})