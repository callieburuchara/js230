/*
Implement a funtion
- tracks events on a web page
  - by wrapping a callback function in a function
    - that adds each event to a tracker object before invoking the callback

In other words...
- My function should take a callback function as an argument 
- and return a new function that
  - records the event
  - executes the original callback function

*/

//document.addEventListener('DOMContentLoaded', () => {
  const divRed = document.querySelector('#red');
  const divBlue = document.querySelector('#blue');
  const divOrange = document.querySelector('#orange');
  const divGreen = document.querySelector('#green');
  
  const tracker = (() => {
    const events = [];
    return {
      list() {
        return events.slice();
      },
      elements() {
        return this.list().map(({target}) => target);
      },
      add(event) {
        events.push(event);
      },
      clear() {
        events.length = 0;
        return events.length;
      },
    };
  })();
  
  function track(callback) {
    function isEventTracked(events, event) {
      return events.includes(event);
    }
  
  return event => {
    if (!isEventTracked(tracker.list(), event)) {
      tracker.add(event);
    }
      callback(event);
    };
  }

  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
  }));
  
  divBlue.addEventListener('click', track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));
  
  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
  }));
  
  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
  }));
  debugger;
//});
