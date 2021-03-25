const main = document.getElementsByTagName('main')[0]
const firstHeader = document.getElementsByTagName('header')[1]

document.body.insertBefore(firstHeader, main);

const mySiteH1 = document.getElementsByTagName('h1')[0];

firstHeader.insertBefore(mySiteH1, firstHeader.firstChild);

const photos = document.getElementsByTagName('img')
let babyPhoto = photos[0];
let chinPhoto = photos[1];

document.getElementById('content').childNodes[3].replaceChild(chinPhoto, babyPhoto);

document.getElementById('content').childNodes[5].insertBefore(babyPhoto, document.getElementById('content').childNodes[5].firstChild);

let figures = document.getElementsByTagName('figure');
let article = document.getElementById('content').childNodes[1]
article.appendChild(figures[0]);
article.appendChild(figures[1]);
