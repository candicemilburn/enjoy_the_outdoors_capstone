"use strict"
/*
bootstrap card example:

<div class="card">
  <img src="PET IMAGE PATH GOES HERE" class="card-img-top" alt="ALT TEXT HERE">
  <div class="card-body">
    <h5 class="card-title">PET NAME HERE</h5>
    <p class="card-text">PET DETAILS HERE</p>
  </div>
</div>
*/

window.onload = () => {

    initMountainDropDown();

    let mountainSelect = document.querySelector("#mountainInfo");

    mountainSelect.addEventListener("change", displayMountainCard)

}
function initMountainDropDown() {

    let mountainSelect = document.querySelector("#mountainInfo");

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select A Mountain";
    mountainSelect.appendChild(defaultOption);

    //write a loop to work with each individual category and build an option for it
    mountainsArray.forEach((mount) => {

        //create the new option for the category we are on in the loop
        let newOption = document.createElement("option");

        //set the value for the option
        newOption.value = mount.name;

        //set what the user sees 
        newOption.textContent = mount.name;

        mountainSelect.appendChild(newOption);


    })

}
function displayMountainCard(event) {

    console.log(event.target.value)
    let mountainCards = document.querySelector("#mountainCards")
    let noMountain = document.querySelector("#noMountain")
    // this if test will bring the message with ID nothing back to the div when no mountainInfo is selected and vise versa
    if (event.target.value == 0) {
        noMountain.removeAttribute("style")
        mountainCards.setAttribute("style", "display: none")

    } else {
      mountainCards.removeAttribute("style")
      noMountain.setAttribute("style", "display: none")
    }

    //This si the empty DIV in the HTML to display the card generated in here
    let mountainDiv = document.querySelector("#mountainCards");

    mountainDiv.innerHTML = "";

    //get selected value of the dropdown
    let selectedMountain = event.target.value;

    let mountain = mountainsArray.find((mountain) => {

        if (mountain.name === selectedMountain) {
            return true;
        }
        return false;

    });


 let wholeCard = document.createElement("div");
 wholeCard.classList.add("card", "text-center", "w-25", "mx-auto","mt-4");

 let cardHeader = document.createElement("div");
 cardHeader.classList.add("card-header", "bg-dark", "text-light");

 cardHeader.innerText = mountain.name;

 let cardBody = document.createElement("div")
 cardBody.classList.add("card-body","bg-dark", "text-light");

 let cardImage = document.createElement("img");
 cardImage.classList.add("card-img-top","card-img-fit");


 cardImage.src = `images/${mountain.img}`;


    let cardText = document.createElement("p");
   cardText.classList.add("card-text");
   cardText.innerText = `${mountain.desc}`

cardBody.appendChild(cardImage);
cardBody.appendChild(cardText);

let div1= document.createElement("div")
div1.classList.add("card-footer", "bg-secondary");

div1.innerText = `Elevation : ${mountain.elevation}`;

let div2= document.createElement("div")
div2.classList.add("card-footer", "bg-secondary");

div2.innerText = `Effort : ${mountain.effort}`;

let div3= document.createElement("div")
div3.classList.add("card-footer", "bg-secondary");

div3.innerText = `Lat : ${mountain.coords.lat} Lng : ${mountain.coords.lng}`;


//ppend all this to make the card
wholeCard.appendChild(cardHeader);
wholeCard.appendChild(cardBody);
wholeCard.appendChild(div1);
wholeCard.appendChild(div2);
wholeCard.appendChild(div3);
mountainDiv.appendChild(wholeCard);


}
