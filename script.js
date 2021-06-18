//**DOM Elements and Other variables
let squares = document.querySelectorAll(".square");
let container = document.querySelector('.container')
let count = 1;
let XArray = [];
let OArray = [];
let chance = document.querySelector(".chance");
let Xchance = "X-Player Chance";
let Ochance = "O-Player Chance";
let btn = document.querySelector(".btn");
let winnerOptions = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [7,5,3]
];

//**Game Logic */
squares.forEach((item, index) => {
  item.addEventListener(
    "click",
    (PlayGame = () => {
      if (!item.classList.contains("O") && !item.classList.contains("X")) {

        if (count % 2 == 0) {
          item.classList.add("O");
          item.classList.remove('Ohover');
          OArray.push(index + 1);
          chance.innerHTML = Xchance;
        }
        
        else {
          item.classList.add("X");
          item.classList.remove("Xhover");
          XArray.push(index + 1);
          chance.innerHTML = Ochance;
        }


        count++;
        item.style.opacity = 1;


        if (checkWinner(XArray, OArray) === "O") {
          chance.innerHTML = "O-Player is Winner";
          chance.style.color = "green";
          disableAll();
          btn.style.display = "block";
          ColorSquare(OArray);
        }
        
        else if (checkWinner(XArray, OArray) === "X") {
          chance.innerHTML = "X-Player is Winner";
          chance.style.color = "green";
          disableAll();
          btn.style.display = "block";
          ColorSquare(XArray);
          
        }
      }
    })
  );
});

// Function used To check Winner
function checkArray(arr) {
  return (
    (arr.includes(1) && arr.includes(2) && arr.includes(3)) ||
    (arr.includes(4) && arr.includes(5) && arr.includes(6)) ||
    (arr.includes(7) && arr.includes(8) && arr.includes(9)) ||
    (arr.includes(1) && arr.includes(4) && arr.includes(7)) ||
    (arr.includes(2) && arr.includes(5) && arr.includes(8)) ||
    (arr.includes(3) && arr.includes(6) && arr.includes(9)) ||
    (arr.includes(1) && arr.includes(5) && arr.includes(9)) ||
    (arr.includes(7) && arr.includes(5) && arr.includes(3))
  );
}

// Main Function to check winner
function checkWinner(XArray, OArray) {
  if (XArray.length >= 3 || OArray.length >= 3) {

    if (checkArray(XArray)) {
      return "X";
    }
    
    else if (checkArray(OArray)) {
      return "O";
    }

  }
}

// When someone wins so this is used to disable click events
function disableAll() {
 container.style.pointerEvents = "none";
}

// MouseOver Effect
squares.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (!item.classList.contains("X") && !item.classList.contains("O")) {


      if (count % 2 == 0) {
        item.classList.add("Ohover");
      } 
      
      else {
        item.classList.add("Xhover");
      }
    }
  });
});

// MouseLeave Effect
squares.forEach((item) => {
  item.addEventListener("mouseleave", () => {
    if (!item.classList.contains("X") && !item.classList.contains("O")) {
      if (count % 2 == 0) {
        item.classList.remove("Ohover");
      } else {
        item.classList.remove("Xhover");
      }
    }
  });
});

// Game Draw Function
function GameDraw(){
  let c=1;
  squares.forEach(item=>{
    if(item.classList.contains('X') || item.classList.contains('O')){
      c++;
    }
  })

  if(c==10){
   if(chance.innerHTML != "X-Player is Winner" && chance.innerHTML != "O-Player is Winner"){
     chance.innerHTML = "Game-Draw💩💩";
     chance.style.color = "red";
     btn.style.display = "block";
     container.style.pointerEvents = "";
   }
  }
}

// Game Loop for Draw Function
setInterval(()=>{
  GameDraw();
},100);


// Reset the Game
btn.addEventListener('click',()=>{
  count=1;
  chance.innerHTML = Xchance;
  chance.style.color = "black";
  squares.forEach(item=>{
    item.className = "square"
  })

  XArray.length =0;
  OArray.length=0;
  btn.style.display = "none";
  squares.forEach(item=>{
    item.style.backgroundColor = "";
  })
  container.style.pointerEvents = "";
})

// When someone wins so this function is used to highlight the Squares
function ColorSquare(arr){
  let color = "rgb(50,205,50)";
 for(let i=0;i<winnerOptions.length;i++){
     if(arr.includes(winnerOptions[i][0]) && arr.includes(winnerOptions[i][1]) && arr.includes(winnerOptions[i][2])){
       squares[winnerOptions[i][0]-1].style.backgroundColor = color;
       squares[winnerOptions[i][1]-1].style.backgroundColor = color;
       squares[winnerOptions[i][2]-1].style.backgroundColor = color;
     }

 }
}