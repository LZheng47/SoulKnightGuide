function init(){
  $.ajaxSetup({async: false});
  let link = "https://mp4-project-database-soulknight.lilyzheng7.repl.co/heroes/skills";
  skillsDB = $.getJSON(link).responseJSON;
  buildCards();
}

function buildCards(){
  // Build Skills List (Default)
  let build = "";
  let output = document.getElementById("skillsList");
  let countOutput = document.getElementById("searchCount");
  let currHero = [];
  for(let i = 0; i < skillsDB.length; i++){
    currHero =  skillsDB[i];
    build += buildCard(currHero); 
  }

  countOutput.innerHTML = `${skillsDB.length} SEARCHES FOUND`;
  output.innerHTML = build;  
}

function buildCard(hero){
  let build = "";
  build += `<div class="rowsDiv">`;
  build += `  <div onclick="collapse(this)" class="row container">`;
  build += `    <div> <img src="${hero.HeroImage}"> <h2> ${hero.HeroName} </h2> </div>`;
  build += `    <div> <img src="${hero.ActiveImage}"> <h2> ${hero.Name} </h2> </div>`;
  build += `    <div> <img src="${hero.PassiveImage}"> <h2> ${hero.Category} </h2> </div>`;
  build += `  </div>`;
  build += `  <div class="content container">`;
  build += `    <div class="container center flexDirC">`;
  build += `      <div class="heroImgDiv1 heroImgDiv"> <img src="${hero.HeroImage}"> </div>`;
  build += `      <h2 class="heading"> ${hero.HeroName} </h2>`;
  build += `    </div>`;
  build += `    <div>`;
  build += `      <h3 class="subtitle"> ACTIVE </h3>`;
  build += `      <div class="heroImgDiv"> <img src="${hero.ActiveImage}"> </div>`;
  build += `      <h4> ${hero.Name} </h4>`;
  build += `      <p> ${hero.ActiveDescription} <br> <br> COOLDOWN: ${hero.Cooldown} SEC </p>`;
  build += `    </div>`;
  build += `    <div>`;
  build += `      <h3 class="subtitle"> PASSIVE </h3>`;
  build += `      <div class="heroImgDiv"> <img src="${hero.PassiveImage}"> </div>`;
  build += `      <h4> CATEGORY: ${hero.Category} </h4>`;
  build += `      <p> ${hero.PassiveDesc} </p>`;
  build += `    </div>`;
  build += `  </div>`;
  build += `</div>`;
  return build;
}


function collapse(obj){
  let content = obj.parentElement.children[1];
  if(content.style.display === "flex") {
    content.style.display = "none";
    obj.parentElement.style.backgroundImage = "linear-gradient(45deg, rgba(19, 145, 107, 0.8), rgba(98, 50, 209, 0.8))";
  }else{
    content.style.display = "flex";
    obj.parentElement.style.backgroundImage = "linear-gradient(45deg, rgba(255, 87, 72, 0.9), rgba(0, 3, 190, 0.9))";
  }
}

function selectCategory(obj){
  // Build Skills List (With Condition)
  let build = "";
  let count = 0;
  let output = document.getElementById("skillsList");
  let countOutput = document.getElementById("searchCount");
  let currHero = [];
  
  for(let i = 0; i < skillsDB.length; i++){
    currHero =  skillsDB[i];
    if(currHero.Category == obj.value){
      build += buildCard(currHero);
      count++;
    }
  }

  output.innerHTML = build;  
  countOutput.innerHTML = `${count} SEARCHES FOUND`;

}


function searchHero(){
  let heroName = document.getElementById("nameSearch").value.toLowerCase();
  let skillName = document.getElementById("skillSearch").value.toLowerCase();
  let output = document.getElementById("skillsList");
  let build = "";
  let count = 0;
  let currHero = [];
  
  for(let i = 0; i < skillsDB.length; i++){
    currHero =  skillsDB[i];
    if(currHero.HeroName.toLowerCase() == heroName || currHero.Name.toLowerCase() == skillName){
      build += buildCard(currHero);
      count++
    }
  }

  output.innerHTML = build;
  document.getElementById("searchCount").innerHTML = `${count} SEARCH FOUND`;
  
}