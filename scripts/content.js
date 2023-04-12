// This script kills sponsored posts on facebook marketplace.
addMutationObserver();
let killCount = 0;

//Relationship variables to update if FB layout changes in the future.
const inlineParents = 12;
const inlineDepth = 31;
const headerParents = 7;
const headerDepth = 36;


function killPost(textNode) {
  const depth = getNodeDepth(textNode)
  let sponsoredNode
  
  //kill inline sponsored posts 
  if(depth === inlineDepth) {
    removeNode(parentNodes(textNode,inlineParents));
    // sponsoredNode = parentNodes(textNode, inlineParents)
    // sponsoredNode.style.display = "none";
    killCount ++
    sendCount(killCount);
  }
  //kill sponsored header posts
  else if(depth === headerDepth){
    removeNode(parentNodes(textNode,headerParents).lastChild.firstChild)
    // sponsoredNode = parentNodes(textNode, headerParents).lastChild.firstChild
    // sponsoredNode.style.display = "none";
    killCount ++
    textNode.nodeValue = "😎";
    sendCount(killCount);
  }
  
}

function removeNode(node){
  node.style.display = "none"
  //node.style.backgroundColor = "red"
}

function addMutationObserver() {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if(location.href.includes("facebook.com/marketplace")){
            mutation.target.querySelectorAll("*").forEach(findSponsored);
          }
        });
      });
      observer.observe(document.body, { subtree: true, childList: true });
}

function findSponsored(e) {
  e.childNodes.forEach((child) => {
    if (child && !isUserInput(child) && /\bSponsored\b/g.test(child.nodeValue)) {
      killPost(child);
    }
  });
}

// Helper functions
function isUserInput(node) {
  const tagName = node.tagName ? node.tagName.toLowerCase() : "";
  return (
    tagName == "input" || tagName == "textarea" || isInsideContentEditable(node)
  );
}

function isInsideContentEditable(node) {
  while (node.parentNode) {
    if (node.contentEditable === "true") {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function getNodeDepth(node) {
  var depth = 0;
  while (node.parentNode) {
    depth++;
    node = node.parentNode;
  }
  return depth;
}

function parentNodes(node, num){
    let resultNode = node
    for (let i = 0; i < num; i++) {
        resultNode = resultNode.parentNode
    }
    return resultNode
}

async function sendCount(count){
  const countString = count.toString()
  chrome.runtime.sendMessage({countString});
}