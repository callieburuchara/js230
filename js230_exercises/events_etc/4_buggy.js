/*
The code uses event.stopPropagation instead of event.preventDefault. event.stopPropagation prevents subsequent listeners from firing, but it doesn't prevent the default behavior. Thus, when the user clicks the link, the browser executes the default action of trying to visit the named URL.

 * 
