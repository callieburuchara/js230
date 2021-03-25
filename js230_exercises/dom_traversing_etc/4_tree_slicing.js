function sliceTree(startID, endID) {
  let startElement = document.getElementById(startID);
  let endElement = document.getElementById(endID);
  if (!startElement || !endElement) return undefined;

  const slicedTree = [];

  let currentElement;

  do {
    currentElement = endElement;
    slicedTree.unshift(currentElement.tagName);
    endElement = endElement.parentNode;
  } while (currentElement.id !== String(startID) && endElement.tagName !== 'BODY');

  return (endElement.tagName === 'BODY' && currentElement.id !== String(startID) ? undefined : slicedTree);

}
