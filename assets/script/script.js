let divbtn = document.querySelector("#divbtn");
let btncommencer = document.querySelector("#btncommencer");
let divjeu = document.querySelector("#divjeu");
let pseudo = document.querySelector(".label");
let inputPseudo = document.querySelector("#input1");

let ammo1 = document.querySelector("#ammo1");
let ammo2 = document.querySelector("#ammo2");
let ammo3 = document.querySelector("#ammo3");
let ammo4 = document.querySelector("#ammo4");
let ammo5 = document.querySelector("#ammo5");
let ammo6 = document.querySelector("#ammo6");
let ammo7 = document.querySelector("#ammo7");
let ammo8 = document.querySelector("#ammo8");
let ammo9 = document.querySelector("#ammo9");
let ammo10 = document.querySelector("#ammo10");

let audioMario = new Audio("./assets/img/Mario.mp3");
let audioMario64 = new Audio("./assets/img/Mario64.mp3");
let audioShot = new Audio("./assets/img/shot.mp3");
let audioElevator = new Audio("./assets/img/elevator.mp3");
let audioOutro = new Audio("./assets/img/outro.mp3");
let audioNul = new Audio("./assets/img/null.mp3");
let audioFrog = new Audio("./assets/img/crazyfrog.mp3");
let audioseagull = new Audio("./assets/img/seagull.mp3");

// active la musique d'attente lorsque l'utilisateur appui sur l'input pour rentrer son pseudo
pseudo.addEventListener("click", () => {
    audioElevator.play();
    pseudo.style.display = "none";
})



// l'interatcion avec le bouton fais disparaitre la div acev le bouton et fais apparaitre la div de jeu
btncommencer.addEventListener("click", () => {
    if (inputPseudo.value !== "")  {
        divbtn.style.display = "none";
        divjeu.style.display = "flex";
        startGame();
    }
})


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// let randomInt = getRandomInt(10, 250);

// setInterval(getRandomInt(50, 725), 1);
// setInterval(getRandomInt(0, 75), 1);


// générer des valeur X et Y
// setInterval(() => {
//     console.log("Position en X :" + getRandomInt(50, 725));
// }, 1000)

// setInterval(() => {
//     console.log("Position en Y :" + getRandomInt(0, 75));
// }, 1000)

function spawnDuck() {
    let duckelement = document.createElement("img")
    duckelement.src = "./assets/img/duck.gif";
    duckelement.className = "duck"
    //duckelement.style.bottom = "150px";
    //animate the duck
    let positionX = getRandomInt(0, 1000);
    let positionY = 450;
    let duration = getRandomInt(2000, 5000);
    duckelement.animate([
        // keyframes
        {
            transform: 'translateY(' + positionY + 'px' + ') translateX(' + positionX + 'px' + ') ',
        },
        {
            transform: 'translateY(' + getRandomInt(-800, -450) + 'px) translateX(' + getRandomInt(-300, 300) + 'px)'
        }
    ], {
        // timing options
        duration: duration,
        iterations: 1
    });



    //remove les canards quand ils sortent de la frame
    setTimeout(() => {
        duckelement.remove();
      }, duration)


    divjeu.insertAdjacentElement("beforeend", duckelement);

}


function spawnSuperDuck() {
    audioseagull.load();
    audioseagull.play();
    let superduckelement = document.createElement("img")
    superduckelement.src = "./assets/img/duck.png";
    superduckelement.className = "superduck"
    let positionX = getRandomInt(0, 1000);
    let positionY = 450;
    let duration = getRandomInt(2000, 5000);
    superduckelement.animate([
        // keyframes
        {
            transform: 'translateY(' + positionY + 'px' + ') translateX(' + positionX + 'px' + ') ',
        },
        {
            transform: 'translateY(' + getRandomInt(-800, -450) + 'px) translateX(' + getRandomInt(-300, 300) + 'px)'
        }
    ], {
        // timing options
        duration: duration,
        iterations: 1
    });


    //remove les canards quand ils sortent de la frame
    setTimeout(() => {
        superduckelement.remove();
        }, duration)
       

    divjeu.insertAdjacentElement("beforeend", superduckelement);
    
}

function startGame() {
    audioElevator.pause();
    audioFrog.play();
    setInterval(() => {
        spawnDuck()
    }, 1000)

    setInterval(() => {
        spawnSuperDuck()
    }, 10000)

    addglobalListener()
    


}

function addglobalListener() {
    divjeu.addEventListener("click", (e) => {
        audioShot.load();
        audioShot.play();
        if (e.target.className == "duck") {
            e.target.src = "assets/img/2a9n.gif"
            setTimeout(() => {
                e.target.remove();
            }, 1000);
        updateScore();
        

    }   else if (e.target.className == "superduck") {
                e.target.src = "assets/img/2a9n.gif"
                setTimeout(() => {
                    e.target.remove();
                }, 1000);
            updateSuperScore();


    }
    else {
        audioNul.load();
        audioNul.play();
        let ammos = [...document.querySelectorAll(".ammo")];
        console.log(ammos);

        multiplicateur.innerHTML = 1;
        
        if (ammos.length != 1){
            ammos[0].remove();

        } else {
            endGame();
        }



    }

    });
}

let score = document.querySelector("#score1")
let multiplicateur = document.querySelector("#multiplicateur1")

function updateScore() {
    let number = parseInt(score.innerHTML);
    let multipli = parseInt(multiplicateur.innerHTML);
    number = number + (2 * multipli);
    multipli = multipli + 1;
    score.innerHTML = number;
    multiplicateur.innerHTML = multipli;
}

function updateSuperScore() {
    let number = parseInt(score.innerHTML);
    let multipli = parseInt(multiplicateur.innerHTML);
    number = number + (20 * multipli);
    multipli = multipli + 1;
    score.innerHTML = number;
    multiplicateur.innerHTML = multipli;
}

function endGame() {
    audioFrog.pause();
    audioOutro.play();
    divjeu.style.display = "none";
    divfin.style.display = "flex";
    let final = parseInt(score.innerHTML)
    let span = document.querySelector("#spanfinal");
    span.innerHTML = final;

}

let objet = {
    name1: inputPseudo.value,
    score1: score.value,
}

let objetencode = JSON.stringify(objet);

localStorage.setItem("total", objetencode);

let recup = localStorage.getItem("total");
let recupdecode = JSON.parse(recup);


// localStorage.setItem("toto","tata");

// let objet = {
//     name: "cyprien", 
//     score: 10,
// }
// console.log(objet);
// let objetencode = JSON.stringify(objet);
// console.log(objetencode);

// localStorage.setItem("key1", objetencode);


// let toto123 = localStorage.getItem("key1");
// console.log(toto123);
// let toto456 = JSON.parse(toto123);
// console.log(toto456);
