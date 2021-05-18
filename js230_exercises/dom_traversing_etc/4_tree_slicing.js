/*
PROBLEM
- Function: sliceTree, similar to Array.prototype.slice method
- two arguments: the start index & the end index
  - start: parent node's id attribute
  - end: innermost child node's id attribute
- Output: an array of tagNames
- Our second index should be inclusive (unlike Array..slice)
- Only consider ELEMENT nodes
- Only elements that have body as an ancestor are sliceable
- If the id attribute of the start or end is NOT in the dom,
  return undefined
- If the slice is not feasible (no path connecting the start idx
  to the end idx) return undefined. 


EXAMPLES (from html attached)

> sliceTree(1, 4);
= ["ARTICLE", "HEADER", "SPAN", "A"]
// all of these are nested 1 further in from each other

> sliceTree(1, 76);
= undefined
// there is no id 76

> sliceTree(2, 5);
= undefined
// siblings do not count as paths 

> sliceTree(5, 4);
= undefined
// 4 is not inside of 6 as a eventual child

> sliceTree(1, 23);
= ["ARTICLE", "FOOTER"]
// 23 is a child of 1

> sliceTree(1, 22);
= ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
// it's all connected as children of

> sliceTree(11, 19);
= ["SECTION", "P", "SPAN", "STRONG", "A"]
// same as above


ALGORITHM
- two arguments: startIdx & endIdx
- return undefined if startIdx or endIdx are not in the DOM
- return undefined if startIdx does not contain endIdx

>> now that we have valid input <<

- create an array to keep all node names
- currentNode = endIdx node
- loop
- push the name of currentNode into the array
- reset current node to the parent of current node
- break if the current node is the same as the start idx node

- add the current node name to the array
- reverse the array
- return the array
*/

function sliceTree(startIdx, endIdx) {
  let startNode = document.getElementById(startIdx);
  let endNode = document.getElementById(endIdx);

  if (!startNode || !endNode || !startNode.contains(endNode)) {
    return undefined;
  }
  
  const allNodes = [];
  let currentNode = endNode;

  do {
    allNodes.push(currentNode.tagName);
    currentNode = currentNode.parentNode;

  } while (currentNode !== startNode);

  allNodes.push(currentNode.tagName);

  return allNodes.reverse();
}
