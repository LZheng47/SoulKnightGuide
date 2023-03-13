function init(){
  $.ajaxSetup({async: false});
  let link = "https://mp4-project-database-soulknight.lilyzheng7.repl.co/weapons";
  weaponsDB = $.getJSON(link).responseJSON;
  buildCards();
}

function buildCards(){
  // Build Weapon Cards List (Default)
  let build = "";
  let output = document.getElementById("cardsDiv");
  let countOutput = document.getElementById("searchCount");
  let currWeapon = [];
  for(let i = 0; i < weaponsDB.length; i++){
    currWeapon =  weaponsDB[i];
    build += buildCard(currWeapon); 
  }

  countOutput.innerHTML = `${weaponsDB.length} SEARCHES FOUND`;
  output.innerHTML = build;  
}


function buildCard(weapon){
  let build = "";
  let borderColor = "";
  if(weapon.Rarity == "Common"){
    borderColor = "rgba(255,255,255,0.85)";
  }else if(weapon.Rarity == "Uncommon"){
    borderColor = "rgba(64, 255, 89,0.85)";
  }else if(weapon.Rarity == "Rare"){
    borderColor = "rgba(80, 64, 255,0.85)";
  }else if(weapon.Rarity == "Very Rare"){
    borderColor = "rgba(141, 0, 222,0.85)";
  }else if(weapon.Rarity == "Epic"){
    borderColor = "rgba(224, 127, 0,0.85)";
  }else{
    borderColor = "rgba(224, 0, 0,0.85)";
  }
  
  build += `<div style="border-color: ${borderColor};" class="flipCard center">`;
  build += `  <div class="flipCardPos">`;
  build += `    <div class="flipCardFront">`;
  build += `      <img src="${weapon.Image}">`;
  build += `    </div>`;
  build += `    <div class="flipCardBack center container flexDirC">`;
  build += `      <h2> ${weapon.Name} </h2> <hr>`;
  build += `      <img src="${weapon.ImgPath}"> <p> ${weapon.Type} </p>`;
  build += `      <hr class="flipCardHr">`;
  if(weapon.MaxAttack == ""){
    build += `      <h4> ATTACK: ${weapon.MinAttack} </h4>`;
  }else{
    build += `      <h4> ATTACK: ${weapon.MinAttack} - ${weapon.MaxAttack} </h4>`; 
  }
  build += `      <h4> ENERGY COST: ${weapon.EnergyCost} </h4>`;
  if(weapon.MaxCrit == ""){
    build += `      <h4> CRIT: ${weapon.MinCrit} </h4>`;
  }else{
    build += `      <h4> CRIT: ${weapon.MinCrit} - ${weapon.MaxCrit} </h4>`; 
  }
  build += `      <h4> INACCURACY: ${weapon.Inaccuracy} </h4>`;
  build += `    </div>`;
  build += `  </div>`;
  build += `</div>`;
  return build;
}

function selectCategory(obj){
  let key = obj.parentElement.parentElement.children[0].dataset.key;
  console.log(key);

  // Build Hero List Cards (With Condition)
  let build = "";
  let count = 0;
  let output = document.getElementById("cardsDiv");
  let countOutput = document.getElementById("searchCount");
  let currWeapon = [];
  
  for(let i = 0; i < weaponsDB.length; i++){
    currWeapon =  weaponsDB[i];
    console.log(currWeapon);
    if(currWeapon[key] == obj.value){
      build += buildCard(currWeapon);
      count++ 
    }
  }

  output.innerHTML = build;  
  countOutput.innerHTML = `${count} SEARCHES FOUND`;
}