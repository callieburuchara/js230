function nodeSwap(firstID, secondID) {
  let firstNode = document.getElementById(firstID);
  let secondNode = document.getElementById(secondID);

  if (!firstNode || !secondNode || firstNode.contains(secondNode) || secondNode.contains(firstNode)) {
    return undefined;
  }
  
  let placeholder = document.createElement('P');

  firstNode.replaceWith(placeholder);
  secondNode.replaceWith(firstNode);
  placeholder.replaceWith(secondNode);

  return true;
}

/*
- valid first id and second id
- create a placeholder element with an id of placeholder

- find the first element by id -> call it first element
  - find the parent of first element
  - use `replaceChild(placeholder, firstElement)` to replace it in there

- find the second element by id -> secondElement
  - find the parent of the second element
  - use replaceChild(firstElement, secondElement

then use replaceChild again: (secondElement, placeholder)

*/
