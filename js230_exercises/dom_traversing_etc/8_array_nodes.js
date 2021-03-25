function arrayToNodes([nodeName, children]) {
  let element = document.createElement(nodeName);
  children.forEach(child => element.appendChild(arrayToNodes(child)))

  return element; 
}
