chrome.storage.local.get(["count"]).then((result) => {
    //console.log("Value currently is " + result.count);
    addTextToPopup(result.count)
  });



function addTextToPopup(killCount) {
    document.getElementById("count").innerHTML = `${killCount} sponsored posts killed`;
}