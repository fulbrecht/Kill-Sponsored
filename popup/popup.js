
fetchCount()

async function fetchCount() {
  const response = await chrome.runtime.sendMessage({})
  addTextToPopup(response.killCount);
}

function addTextToPopup(text) {
    document.getElementById("count").innerHTML = text
    if(text === "1"){
      document.getElementById("message").innerHTML = "sponsored post killed"
    } else {
      document.getElementById("message").innerHTML = "sponsored posts killed"
    }
}