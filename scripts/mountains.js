"use strict"


window.onload = () => {

    initMountainSelect();

    let mountainSelection = document.querySelector("#mountainInfo");

    mountainSelection.addEventListener("change", displayMountainCard)

}
function initMountainSelect() {

    let mountainSelection = document.querySelector("#mountainInfo");

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select A Mountain";

    mountainSelection.appendChild(defaultOption);

    //write a loop to work with each individual category and build an option for it
    mountainsArray.forEach((name) => {

        //create the new option for the category we are on in the loop
        let newOption = document.createElement("option");

        //set the value for the option
        newOption.value = name.name;

        //set what the user sees 
        newOption.textContent = name.name;

        mountainSelection.appendChild(newOption);


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

let footer1= document.createElement("div")
footer1.classList.add("card-footer", "bg-secondary");

footer1.innerText = `Elevation : ${mountain.elevation}`;

let footer2= document.createElement("div")
footer2.classList.add("card-footer", "bg-secondary");

footer2.innerText = `Effort : ${mountain.effort}`;

wholeCard.appendChild(cardHeader);
wholeCard.appendChild(cardBody);
wholeCard.appendChild(footer1);
wholeCard.appendChild(footer2);

mountainDiv.appendChild(wholeCard);


}
