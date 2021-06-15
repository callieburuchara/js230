document.addEventListener('DOMContentLoaded', () => {
  const element1 = document.querySelector('table');
  const element2 = document.querySelector('main h1');
  const element3 = document.querySelector('main');

  const callback = ({target, currentTarget}) => {
    alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
  };

  function delegateEvent(parentElement, selector, eventType, callback) {
    if (!parentElement || !(parentElement instanceof Element)) return undefined;
        
    parentElement.addEventListener(eventType, event => {
      let elements = document.querySelectorAll(selector);
      if ([...elements].includes(event.target)) callback(event);
    });

    return true;
  }

  
  console.log(delegateEvent(element2, 'p', 'click', callback));
  const newP = document.createElement('P');
  const newContent = document.createTextNode('New Paragraph');
  newP.appendChild(newContent);

  element2.appendChild(newP);

});

/*
SCENARIO 1
- Returns undefined because there is no table element in this HTML

SCENARIO 2
- Returns true because you can attach that event listener to the main h1
  element and have it listen for clicks on p elements
- The callback function is not triggered, though, because there are
  no p elements within the main h1 element

SCENARIO 3
- returns true for same reason as scenario 2
- it does not trigger the callback function at any point though because
  there are no children h1 elements of the main h1 element

SCENARIO 4
- returns true because the main element exists and can have an event
  listener added to it
- the callback IS triggered whenever the h1 element with textcontent of
  'Header' is clicked

SCENARIO 5
- returns true because the main element exists & can have an event list.
- if you click a p element inside of the aside element inside of the
  main element, the callback is triggered

SCENARIO 6
- returns true because main h1 exists and can have an event list.
- nothing happens though, because it still doesn't have any p elem.

SCENARIO 7
- But if you add in a p element, then it'll trigger the callback.

*/
