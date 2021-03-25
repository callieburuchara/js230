function domTreeTracer(id) {
    let fullTree = [];
    let currentElement = document.getElementById(id);
    let currentTree = [];

    while (id > 1) {
      currentTree = getSiblingNames(currentElement);
      fullTree.push(currentTree);

      currentElement = currentElement.parentElement;
      id = currentElement.id;
      currentTree = [];
    }
   
    if (id === '1') {
      currentTree.push(currentElement.nodeName);
      fullTree.push(currentTree);
    }
    
  return fullTree;
  }

function getSiblingNames(node) {
  let siblings = node.parentElement.childNodes;
  siblings = [...siblings];
  siblings = siblings.map(element => element.nodeName);
  siblings = siblings.filter(node => node !== '#text');
  return siblings;    
}

