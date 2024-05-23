"use strict"

window.onload = () => {
    
    initLocation();
    initType();

    let locationDropdown = document.querySelector("#aPlace");
    let typeDropdown = document.querySelector("#aType");
   
    locationDropdown.addEventListener("change", locSelected);
    typeDropdown.addEventListener("change", typeSelect);
    theRadioType = document.addEventListener("click", hideOrShowElement);
    theRadioLoc = document.addEventListener("click", hideOrShowElement2);

    
}

function hideOrShowElement(event){
    console.log(event.target.value)
    let selectTyp = document.querySelector("#selectTyp");

    if (event.target.value === "radiotype"){
        selectTyp.removeAttribute("style");
        
}if (event.target.value === "radioloc"){
    selectLoc.removeAttribute("style")
}
}



function locSelected(event) {
    console.log(event.target.value)
    let parkInfo = document.querySelector("#parkInfo")


    let nothing = document.querySelector("#nothing")

    if (event.target.value == 0){
        nothing.removeAttribute("style")
        parkInfo.setAttribute("style", "display: none")

    }else{
        parkInfo.removeAttribute("style")
        nothing.setAttribute("style", "display: none")
    }

    //get the selected information from the dropdown which is also the event.target
    let selectedState = event.target.value;

    //Here we are looping through the national park array an filtering through to get the information we need in order to match
    let matchingPlace = nationalParksArray.filter((place) => {

        //returning the every single option that it goes through and choosing the 
        //state and if it mathes the value in the selectedState then it returns it.
        return place.State === selectedState;


    })
    //getting a hold of the table body so we can add rows to it for all the matching state info
    let tableBody = document.querySelector("#tableResults");
    //set the innterHTML to "" which clear it out
    tableBody.innerHTML = "";

    matchingPlace.forEach((place) => {

        //running the function with the table that we grabbed from the HTML 
        //now the "place" is going throught the list individually
        buildTableRow(tableBody, place);


    })

    //function we are running to add the information from the nationalParkArray to the table
    //tablebody is the html table we grabbed earlier
    //place is a parameter that we run what we choose in it
    function buildTableRow(tableBody, place) {

        //create the row to hold the data
        let newRow = tableBody.insertRow(-1);

        let cell1 = newRow.insertCell(0);
        //this is us displaying the text on the page that is collected from the data in JS
        cell1.innerHTML = place.LocationID

        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = place.LocationName

        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = `${place.Address}, ${place.City}, ${place.State}, ${place.ZipCode}`

        let cell4 = newRow.insertCell(3)
        cell4.innerHTML = `Phone: ${place.Phone}, Fax: ${place.Fax}`

        //creating an if statement for the url section as some dont have any and I dont wanna show "undefined"
        let cell5 = newRow.insertCell(4)
        if (place.Visit) {
            cell5.innerHTML = "N/A"
        } else {
            cell5.innerHTML = place.Visit;
        }
    }

}



function initLocation() {

    let chooseLocation = document.querySelector("#aPlace");
    let defaultOption = document.createElement("option");

    defaultOption.value = "0";

    defaultOption.textContent = "Choose Park Location";

    chooseLocation.appendChild(defaultOption);

    locationsArray.forEach((state) => {

        let newOption = document.createElement("option");

        newOption.value = state;

        newOption.textContent = state;

        chooseLocation.appendChild(newOption);
    })
}

function matchingStateName(nationalParksArray, state) {

    //start by creating an empty list to hold our matches
    let theMatch = [];
    //number of items on the info list
    let numItems = nationalParksArray.length;

    //loop over the state info to find matches
    for (let i = 0; i < numItems; i++) {
        if (nationalParksArray[i].State === state) {
            //add that state to our matches array
            theMatch.push(nationalParksArray[i]);
        }
    }

    //return all the matching menu items
    return theMatch;
}



function initType(){

       let chooseType = document.querySelector("#aType");
       let defaultOpt = document.createElement("option");
   
       defaultOpt.value = "0";
   
       defaultOpt.textContent = "Choose Park Type";
   
       chooseType.appendChild(defaultOpt);
   
       parkTypesArray.forEach((park) => {
   
           let newOpt = document.createElement("option");

           newOpt.value = park;

           newOpt.textContent = park;

           chooseType.appendChild(newOpt);
   
 })
}
function typeSelect(event) {
    console.log(event.target.value)
    let parkInfo = document.querySelector("#parkInfo")

    let nothing = document.querySelector("#nothing")

    if (event.target.value == 0){
        nothing.removeAttribute("style")
        parkInfo.setAttribute("style", "display: none")

    }else{
        parkInfo.removeAttribute("style")
        nothing.setAttribute("style", "display: none")
    }

    //get the selected information from the dropdown which is also the event.target
    let typeSelected = event.target.value;

    //here we are running a function to match the park types and the national park type
    let matchingTypes = nationalParksArray.filter((type) => {

        //running a loop through the parktypes to get the individual strings
        for (let i = 0; i < parkTypesArray.length; i++) {
            //if the nationalparks locationName has a matching index with the selectedType(The dropdown choices) then return true
            //the negative one is basically saying "not present" but the "!" is saying "not"
            if (type.LocationName.indexOf(typeSelected) !== -1) {

                return true
            }
            return false
        };



    });

    //getting a hold of the table body so we can add rows to it for all the matching parktype info
    let table = document.querySelector("#tableResults");
    //set the innterHTML to "" which clear it out
    table.innerHTML = "";

    matchingTypes.forEach((type) => {

        //running the function with the table that we grabbed from the HTML 
        //now the "type" is going throught the list individually
        buildTableRow(table, type);

    })
}
//function we are running to add the information from the nationalParkArray to the table
//tablebody is the html table we grabbed earlier
//chosen is a parameter that we run what we choose in it
function buildTableRow(table, picked) {

    //create the row to hold the data
    let newRow = table.insertRow(-1);

    let cell1 = newRow.insertCell(0);
    //this is us displaying the text on the page that is collected from the data in JS
    cell1.innerHTML = picked.LocationID

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = picked.LocationName

    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = `${picked.Address}, ${picked.City}, ${picked.State}, ${picked.ZipCode}`

    let cell4 = newRow.insertCell(3)
    cell4.innerHTML = `Phone: ${picked.Phone}, Fax: ${picked.Fax}`

    //creating an if statement for the url section as some dont have any and I dont wanna show "undefined"
    let cell5 = newRow.insertCell(4)
    if (picked.Visit) {
        cell5.innerHTML = "N/A"
    } else {
        cell5.innerHTML = picked.Visit;

   }
}
