# ------------------------------ Problem -------------------------------------
- Create a Contact Manager

## Features (functionality focus)
- Contacts
  - Full name (not blank)
  - Email address (validation & not blank)
  - Phone Number (not blank)
  - Tags (optional)
- Search for Contact
  - Only searches by name (not email)
  - Letter can be anywhere in the name, not necessarily first letter
  - Search is updated asynchronously by each character typed
  - Typing in a space doesn't do anything, same with punctuation
  - Numbers do something though
  - If there is no match, no contacts are displayed and a message with
    "There is no contacts starting with <search term>" is shown. Also
    updated with each keypress
- Add Contact
  - Has spots for the three parts of a contact
  - Two buttons: submit and cancel
  - Upon submit, we're taken back to the main display page w all contacts, add contact button, and a search bar
  - Cancel takes us back to the same place, too, just nothing was added
- Edit Contact
  - Taken to the same create contact page, but it's now called
    Edit contact and all of the blank spaces are populated with the
    former information. 
  - Submit and Cancel do the same thing they do for Add Contact
- Delete Contact
  - When clicked, I get an alert asking if I'm sure
  - When I click okay, there's an async update where the deleted
    contact was removed and remaining contacts are displayed

## Displays
- Home
  - Contact Manager title (stays the same throughout all pages)
  - Add Contact Button
  - Search Bar (no button, due to async update I think)
  - All contacts [ below is the format for each contact individually ] 
    - Full name [ larger type ]
    - Blank space
    - Phone number: (bold)
    - < phone number > (not bold)
    - Email: (bold)
    - < email > (not bold)
    - Edit button
    - Delete button
- Search
  - Same exact as home, just the contact section gets updated/changed
- Add Contact
  - Create Contact sub-title
  - Full name: < bar to write in >
  - Email address: < bar to write in >
  - Telephone number: < bar to write in >
  - Submit button
  - Cancel button
- Edit Contact
  - Exact same as Add Contact display except...
  - Edit Contact sub-title
  - Information is already in the input bars

## Additional to Consider
- Allow the creation of tags (sounds like a separate thing)
- When adding/editing a contact, allow a tag to be selected (just one? Or more?)
- Allow a tag to be clicked and show all the contacts with that tag (sounds like
it's separate from the search bar feature, so that one can still focus on name)
- Difference from example: my application will have an API server to store and
  retrieve contacts
  - They gave me the API server to download and use, so I don't have to make it.
- To see all operations supported by the API, see the documentation at http://localhost:3000/doc. Here you'll see all API endpoints listed along with example requests and responses.

# ------------------------------ Tools -------------------------------------
- HTML
- Minimal CSS (just want it to work first)
- Vanilla JS 
- Fetch for XHR
- http://localhost:3000/doc/ for endpoints

# ---------------------- Technique Observations -------------------------------
- There's just one homepage
- There's a main div under the title
- Its contents change based on what we're displaying (home or edit/add)
  - It almost looks like it's being re-created each time but? Not sure. 

# -------------------------- High Level Steps ---------------------------------
## Create the HTML skeleton
DIV
  Title at top
  Add Contact button
  Search Bar
  Place to Display Contact Information
    Each contact has the info and their respective 2 buttons
    Put filler contact info for now, will replace with Handlebars later

Overlay Div
  Format for the add/edit contact page (just call it add contact for now)

## CSS
- Minimal
- Make title centered
- Make the Add Contact and Search Bar next to each other
- Display the contacts next to each other (inline block)
- Give the different DIVs slight background color difference to differentiate

## How to go about Tagging?
- Have a "Create Tag" button next to add contact
  - Have it get a value with a pop up/alert screen I'm thinking
- On the add/edit contact page, have a drop down to select a tag
  - If no tags have been created, have it simply say to create a tag first
- Add a drop down on the main page to allow the selection of a tag
  - When a tag is selected, filter the displayed contacts on the page

## JavaScript
√ Render contacts dynamically 
- Play around with contact objects
- Made line 34 on index.html to try to make it change with the appropriate verb
  Maybe wait on this for later...?
