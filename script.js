/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert("Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.");
  play();
  while(confirm("Spila annan leik?"))
    play();
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
  var questions = 0; // Fjöldi spurninga spurt
  var correct = 0; // Fjöldi spurninga svarað rétt
  var timerstart = new Date();

  while(GAMES_TO_PLAY>questions){
    var answer = ask();
    if (answer===true)
      correct++;
    if (answer===null){
      alert("Hætt í leik")
      return;
    }
    questions++;
  }

  var timeend = new Date();
  var time = (timeend - timerstart)/1000;
  var timeaverage = time/correct;
  alert("Þú svaraðir " + correct + " af " + GAMES_TO_PLAY + " dæmum rétt á " + time.toFixed(2) + " sekúndum\nMeðarétt svör á sekúndu eru " + timeaverage.toFixed(2));
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
  var question = generateQuestion();
  var realanswer = question.answer;

  var useranswer = prompt(question.qString);
  console.log("Svar notanda: " + useranswer + " Rétt svar " + realanswer);
  if (realanswer === parseInt(useranswer)) // Rétt svar
    return true;
  else if (useranswer === null) // Ekkert svar
    return null;
  else return false; // Rangt svar

}


function generateQuestion(){
  var type =  randomNumber(0,3); // Ákveða hvernig dæmi á að reikna (+ - * /)
  var answer = 0;
  var x = 0;
  var y = 0;
  qString = "Hvað er "; // Strengur fyrir spurninguna sem sett er í prompt
  if (type===0){
    x = randomNumber(1, 100);
    y = randomNumber(1, 100);
    answer = x+y;
    qString += "" + x + " + " + y;
  }
  else if (type===1){
    x = randomNumber(1, 100);
    y = randomNumber(1, 100);
    answer = Math.max(x,y)-Math.min(x,y);
    qString += "" + Math.max(x,y) + " - " + Math.min(x,y);
  }
  else if (type===2){
    x = randomNumber(1, 10);
    y = randomNumber(1, 10);
    answer = x*y;
    qString += "" + x + " * " + y;
  }
  else{
    x = randomNumber(2, 10);
    y = randomNumber(2, 10);
    y *= x; // y margfeldi af x
    answer = y/x;
    qString += "" + y + " / " + x;
  }

  return {answer, qString};
}


/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
