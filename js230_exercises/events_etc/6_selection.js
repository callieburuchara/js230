const ANIM_SELECTION = {
  'Bear': ['Vertebrate', 'Warm-blooded', 'Mammal'],
  'Turtle': ['Vertebrate', 'Cold-blooded'],
  'Whale': ['Vertebrate', 'Warm-blooded', 'Mammal'],
  'Salmon': ['Vertebrate', 'Cold-blooded'],
  'Ostrich': ['Vertebrate', 'Warm-blooded', 'Bird'],
}

const classifications = document.querySelector('#animal-classifications');

const animals = document.querySelector('#animals');

classifications.addEventListener('input', (event) => {
  let classToUse = classifications.value;

  let toDisplay = (Object.keys(ANIM_SELECTION).filter(key => {
    return ANIM_SELECTION[key].includes(classToUse);
  }));
  
  
});
