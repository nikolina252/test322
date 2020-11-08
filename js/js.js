//rodjendan
// Set the date we're counting down to
var countDownDate = new Date("Apr 3, 2020").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("rodjendan").innerHTML ="Do mog rođendana ostalo je još:<br> "+ days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("rodjendan").innerHTML = "EXPIRED";
  }
}, 1000);


//datum 
var d = new Date();
document.getElementById("dan").innerHTML = "&copy;Nikolina Vranješ " + d.toLocaleDateString();


//slika o grad
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
}



// mapa 
function myMap() {
  //podesavanje koordinata mape na ICBLa ocitane sa Google Maps
  var mapProp= {
    center:new google.maps.LatLng(44.775677, 17.205790),
    zoom:17, //isprobati razne vrijednosti zoom atributa
    panControl: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    overviewMapControl: true,
    rotateControl: true
  };
  
  //kreiranje mape
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  //kreiranje markera za lokaciju koju zelimo naznaciti
  var marker = new google.maps.Marker({position: mapProp.center, animation:google.maps.Animation.BOUNCE});
  marker.setMap(map);
  
  //zumiranje nakon klika na marker
  google.maps.event.addListener(marker,'click',function() {
    map.setZoom(20);
    map.setCenter(marker.getPosition());
  });
  
  //prikaz informacije sta je prikazano na mapi
  var infowindow = new google.maps.InfoWindow({
    content:"Ovdje se nalazi CARPISA!"
  });
  infowindow.open(map,marker);
  
  }

//film
function myFunction(){
  document.getElementById("panel").style.display="block";
}


//kviz
(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "rgb(108, 204, 108)";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} od ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Šta sam po zanimanju?",
      answers: {
        a: "Dipl. inž. Arhitekture",
        b: "Dipl. inž. Poljoprivrede",
        c: "Dipl. Pravnik"
      },
      correctAnswer: "b"
    },
    {
      question: "Šta je moj hobi?",
      answers: {
        a: "Pletenje",
        b: "Šivenje",
        c: "Dekupaž"
      },
      correctAnswer: "c"
    },
    {
      question: "Koja je moja omiljena boja?",
      answers: {
        a: "Crvena",
        b: "Zelena",
        c: "Roza",
      },
      correctAnswer: "c"
    },
    {
      question: "Koji je moj omiljeni grad?",
      answers: {
        a: "Milano",
        b: "Moskva",
        c: "Mumbai"
      },
      correctAnswer: "b"
    },
    {
      question: "Koji je moj omiljeni glumac?",
      answers: {
        a: "Sam Claflin",
        b: "Brad Pitt",
        c: "Leonardo DiCaprio"
      },
      correctAnswer: "a"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();