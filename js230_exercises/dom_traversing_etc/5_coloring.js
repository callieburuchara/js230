function colorGeneration(num) {
  if (num < 1) return undefined;

  let generation = [...document.body.children];
  
  for (let idx = 1; idx < num; idx += 1) {
    generation = generation.map(n => [...n.children]).flat();
  }

  return generation.forEach(n => n.classList.add('generation-color'));
}
