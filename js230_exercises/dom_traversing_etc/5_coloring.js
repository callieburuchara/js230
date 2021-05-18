/*
PROBLEM
- Function: colors a specific generation of the DOM tree
  - generation = a set of elements on the same level of indentation
- Can assume that only non-negative integers will be arguments
- Use the `.generation-color` class to see the effects. 

THOUGHTS
- Generation does not mean sibling (though it can I guess)
- It means the same level of indentation as the first. 

- The ID does not necessarily match the level of depth, though it can
- But the level of depth is the argument
- 1: 1 level in from Body
- 2: 2 levels in from body (ID 2, ID 5, etc.)

ALGORITHM
- create an empty array of nodes to color in (nodesToChange)
- current generation is 0
- while the generation is less than targetGeneration
  - increase the generation by 1
  - 

*/

function colorGeneration(targetGeneration) {
  let generation = 0;
  let parents = [document.body];
  let elements;

  while (generation < targetGeneration) {
    generation += 1;
    elements = getAllChildrenOf(parents);
    parents = elements;
  }

  if (elements) {
    color(elements)
  }
}

function color(elements) {
  elements.forEach(elem => elem.classList.add("generation-color"));
}

function getAllChildrenOf(parents) {
  return Array.from(parents).map(node => {
    return Array.from(node.children);
  }).flat();

}
