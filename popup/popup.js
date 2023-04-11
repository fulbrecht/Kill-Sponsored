
fetchCount()

async function fetchCount() {
  const response = await chrome.runtime.sendMessage({})
  addTextToPopup(response.killCount);
}

function addTextToPopup(text) {
    document.getElementById("count").innerHTML = `${text}`;
}