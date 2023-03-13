function init(){
  $.ajaxSetup({async: false});
  let link = "https://mp4-project-database-soulknight.lilyzheng7.repl.co/heroes";
  heroesDB = $.getJSON(link).responseJSON;
  buildCards();
}

function buildCards(){
  // Build Hero List Cards (Default)
  let build = "";
  let output = document.getElementById("cardsDiv");
  let countOutput = document.getElementById("searchCount");
  let currHero = [];
  for(let i = 0; i < heroesDB.length; i++){
    currHero =  heroesDB[i];
    build += buildCard(currHero); 
  }

  countOutput.innerHTML = `${heroesDB.length} SEARCHES FOUND`;
  output.innerHTML = build;  
}

function buildCard(hero){
  let build = "";
  build += `<div onClick="modal(this)" class="flipCard center">`;
  build += `  <div class="flipCardPos">`;
  build += `    <div class="flipCardFront">`;
  build += `      <img src="${hero.HeroImage}">`;
  build += `    </div>`;
  build += `    <div class="flipCardBack center container flexDirC">`;
  build += `      <h2> ${hero.HeroName} </h2> <hr>`;
  build += `      <p> ${hero.Description} </p>`;
  build += `      <hr class="flipCardHr">`;
  build += `      <h4> HP: ${hero.InitHP} (${hero.MaxHP}) </h4>`;
  build += `      <h4> Def: ${hero.InitDef} (${hero.MaxDef}) </h4>`;
  build += `      <h4> MP/Energy: ${hero.InitMana} (${hero.MaxMana}) </h4>`;
  build += `      <img src="${hero.Image}"> <h5 style="margin:0;"> START WEAPON: ${hero.Name} </h5>`;
  build += `    </div>`;
  build += `  </div>`;
  build += `</div>`;
  return build;
}


function selectCategory(obj){
  let key = obj.parentElement.parentElement.dataset.key;

  // Build Hero List Cards (With Condition)
  let build = "";
  let count = 0;
  let output = document.getElementById("cardsDiv");
  let countOutput = document.getElementById("searchCount");
  let currHero = [];
  
  for(let i = 0; i < heroesDB.length; i++){
    currHero =  heroesDB[i];

    if(obj.parentElement.children[0] == obj){ // first selector
      if(currHero[key] < parseInt(obj.dataset.condition1)){
        build += buildCard(currHero); 
        count++;
      }
    }else if(obj.parentElement.children[1] == obj){     // second selector
      if(currHero[key] >= parseInt(obj.dataset.condition1) && currHero[key] <= parseInt(obj.dataset.condition2)){
        build += buildCard(currHero); 
        count++;
      }
    }
    else if(obj.parentElement.children[2] == obj){     // third selector
      if(currHero[key] > parseInt(obj.dataset.condition1)){
        build += buildCard(currHero); 
        count++;
      }
    }
  }

  output.innerHTML = build;  
  countOutput.innerHTML = `${count} SEARCHES FOUND`;
}

function searchHero(){
  let heroName = document.getElementById("nameSearch").value.toLowerCase();
  let output = document.getElementById("cardsDiv");
  let build = "";
  let count = 0;
  let currHero = [];
  
  for(let i = 0; i < heroesDB.length; i++){
    currHero =  heroesDB[i];
    if(currHero.HeroName.toLowerCase() == heroName){
      build += buildCard(currHero);
      count++
      break;
    }
  }

  output.innerHTML = build;
  document.getElementById("searchCount").innerHTML = `${count} SEARCH FOUND`;
  
}