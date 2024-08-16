const word = document.getElementById('word');
const wrongletter = document.getElementById('wrong-letters');
const playagainbtn = document.getElementById('play-button');
const popupmsg = document.getElementById('popup-messages');
const notification = document.getElementById('notification-messages');
const finalmsg = document.getElementById('final-message');
const figureparts = document.querySelectorAll('.figure-parts');//queryselector all is used to select multiple css selector all at once 

const words = [
  'grateful',
'generate',
'splendid',
'constant',
'creative',
'approval',
'solution',
'friendly',
'disclose',
'festival',
'excitement',
'recovery',
'momentum',
'accuracy',
'adventure',

];
let randomword = words[Math.floor(Math.random() * words.length)];

const correctletters = [];
const wrongletters = [];

function displayword() {
  word.innerHTML = `
 ${randomword.split('') /*.split is used to a word into arrays of letters */
      .map(
        letter => `
 <span class = "letter">
 ${correctletters.includes(letter) ? letter : ''}
 </span>
 `

      )
      .join('')}
 `;
  const innerword = word.innerText.replace(/\n/g, '');
  if (innerword === randomword) {
    finalmsg.innerText = ' congrats ! you saved him';
    popupmsg.style.display = 'flex';
  }
}
// update the wornd letters 
function updatewrongletter() {
  //display wrong letters
  wrongletter.innerHTML = `
 ${wrongletters.length > 0 ? '<p>wrong</p>' : ''}
 ${wrongletters.map(letter => `<span>${letter}</span>`)}
 `;
  //display parts
  figureparts.forEach((part, index) => {
    const errors = wrongletters.length;

    if (index < errors) {
      part.style.display = 'block'
    }
    else {
      part.style.display = 'none';
    }
  });
  //check if lost 
  if (wrongletters.length === figureparts.length) {
    finalmsg.innerText = 'unfortunately you lost';
    popupmsg.style.display = 'flex';
  }
}

//show notification
function shownotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}
//keydown letter press
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (randomword.includes(letter)) {
      if (!correctletters.includes(letter)) {
        correctletters.push(letter);

        displayword();
      } else {
        shownotification();
      }
    } else {
      if (!wrongletters.includes(letter)) {
        wrongletters.push(letter);

        updatewrongletter();
      } else {
        shownotification();
      }
    }
  }
});

//restart game and play again 
playagainbtn.addEventListener('click', () => {
  //empty arrays
  correctletters.splice(0);
  wrongletters.splice(0);

  randomword = words[Math.floor(Math.random() * words.length)];

  displayword();
  updatewrongletter();
  popupmsg.style.display = 'none';
});

displayword();
