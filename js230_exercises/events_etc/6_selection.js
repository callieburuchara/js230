const linkedOptions = {
  classifications: {
    Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    Mammal: ['Bear', 'Whale'],
    Bird: ['Ostrich'],
    Classifications: ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  },
  animals: {
    Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle: ['Vertebrate', 'Cold-blooded'],
    Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon: ['Vertebrate', 'Cold-blooded'],
    Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const classifications = document.querySelector('#animal-classifications');
  const animals = document.querySelector('#animals');
  const bothFilters = document.querySelector('#selection-filters');
  const clearBtn = document.querySelector('#clear');

  function deleteOptions(id) {
    const allOptions = document.querySelectorAll(`#${id} option`);
    allOptions.forEach(option => option.remove());
  }

  function createOptions(list, parentElement) {
    list.forEach(option => {
      let newOption = document.createElement('option');
      newOption.value = option;
      newOption.textContent = option;
      parentElement.appendChild(newOption);
    });
  }
  
  function filterByClassification() {
    deleteOptions('animals');
    const animalOptions = linkedOptions.classifications[classifications.value];
    createOptions(animalOptions, animals);
  }

  function filterByAnimal() {
    deleteOptions('animal-classifications');
    const classOptions = linkedOptions.animals[animals.value];
    createOptions(classOptions, classifications);
  }

  bothFilters.addEventListener('input', (event) => {
    if (event.target === classifications) {
      filterByClassification();
    } else if (event.target === animals) {
      filterByAnimal();
    }
  });

  clearBtn.addEventListener('click', (event) => {
    event.preventDefault();
    deleteOptions('animals');
    deleteOptions('animal-classifications');
    createOptions(linkedOptions.classifications['Classifications'], animals);
    createOptions(linkedOptions.animals['Animals'], classifications);
  });
});


