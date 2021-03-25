// Recursion

function nodesToArr(element = document.body) {
  return [element.tagName, [...element.children].map(nodesToArr)];
}

