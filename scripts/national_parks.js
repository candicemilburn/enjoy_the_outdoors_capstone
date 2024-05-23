"use strict"

window.onload = () => {

    initLocation();
    initType();

    let locationDropdown = document.querySelector("#aPlace");
    let typeDropdown = document.querySelector("#aType");
    let theRadioType = document.querySelector("#selection")
    locationDropdown.addEventListener("change", locSelected);
    typeDropdown.addEventListener("change", typeSelect);
    theRadioType = document.addEventListener("click", hideOrShowElement);


}


//function to show hide the correct select/dropdown
function hideOrShowElement(event) {
    let chooseLocation = document.querySelector("#aType");
    let chooseType = document.querySelector("#aPlace");
      
   
    if (event.target.value === "radiotype") {
        selectTyp.removeAttribute("style");
        selectLoc.setAttribute("style", "display: none");

        chooseType.selectedIndex = ""; //take us back to index of 0 / choose list

    } if (event.target.value === "radioloc") {
        selectLoc.removeAttribute("style");  //removes the display:none style in the selectLoc ID
        selectTyp.setAttribute("style", "display: none") //set the  display:none  style in the selectTyp ID
        
        chooseLocation.selectedIndex = "";
    }   
}



//function for  
function locSelected(event) {
    // this will help us switch from the table info to the message within the div
    console.log(event.target.value)
    let parkInfo = document.querySelector("#parkInfo")
    let nothing = document.querySelector("#nothing")
   
    // this if test will bring the message with ID nothing back to the div when no parkInfo is selected and vise versa
    if (event.target.value == 0) {
        nothing.removeAttribute("style")
        parkInfo.setAttribute("style", "display: none")

    } else {
        parkInfo.removeAttribute("style")
        nothing.setAttribute("style", "display: none")
    }

       // set dropdown info/ the event.target
    let selectedState = event.target.value;

    //loop thru the natpark array data and filter through to get the information we need in order to match
    let matchingPlace = nationalParksArray.filter((place) => {

        //loop thru and return options that is a state and matches calue in SelectedState 

        return place.State === selectedState;


    })
    //grab table body and add rows/columns for statematch info
    let tableBody = document.querySelector("#tableResults");
    //set the innterHTML to "" to clear it out
    tableBody.innerHTML = "";

    matchingPlace.forEach((place) => {
        //run function with table body with tableBody ID from HTML the "place" paramaeter is going throught the list individually
        buildTableRow(tableBody, place);
    })

    //function to directly display and add data from the nationalParkArray to table 

    function buildTableRow(tableBody, place) {

        //create the rows for all data
        let newRow = tableBody.insertRow(-1);
        //innerHTML indicated text we will take from date
        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = place.LocationID

        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = place.LocationName

        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = `${place.Address}, ${place.City}, ${place.State}, ${place.ZipCode}`

        let cell4 = newRow.insertCell(3)
        cell4.innerHTML = `Phone: ${place.Phone}, Fax: ${place.Fax}`

        // have to create if statement test  for URL bc some dont have it
        let cell5 = newRow.insertCell(4)
        if (!place.Visit) {
            cell5.innerHTML = "N/A"
        } else {
            cell5.innerHTML = place.Visit;
        }

    }

}

function initLocation() {

    let chooseLocation = document.querySelector("#aPlace");
    let defaultOption = document.createElement("option");

    defaultOption.value = ""; // set to 0 index with empty 

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

    //empty list to hold matches
    let theMatch = [];
    //number of places on the info list
    let numPlaces = nationalParksArray.length;

    //loop over the state info to find matches
    for (let i = 0; i < numPlaces; i++) {
        if (nationalParksArray[i].State === state) {
            // attach push that state to matches array
            theMatch.push(nationalParksArray[i]);
        }
    }

    //return all the matching places
    return theMatch;
}



function initType() {

    let chooseType = document.querySelector("#aType");
    let defaultOpt = document.createElement("option");

    defaultOpt.value = "0"; // set to 0 so dropdown can reset

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

    if (event.target.value == 0) {
        nothing.removeAttribute("style")
        parkInfo.setAttribute("style", "display: none")

    } else {
        parkInfo.removeAttribute("style")
        nothing.setAttribute("style", "display: none")
    }

    //function to show hide the correct select/dropdown
    let typeSelected = event.target.value;

    //loop thru the natpark array data and filter through to get the information we need in order to match
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
//run function with table body with tableBody ID from HTML the "picked" paramaeter is going throught the list individually

function buildTableRow(table, picked) {

    //create the rows for all data
    let newRow = table.insertRow(-1);
    //innerHTML indicated text we will take from data
    let cell1 = newRow.insertCell(0);

    cell1.innerHTML = picked.LocationID

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = picked.LocationName

    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = `${picked.Address}, ${picked.City}, ${picked.State}, ${picked.ZipCode}`

    let cell4 = newRow.insertCell(3)
    cell4.innerHTML = `Phone: ${picked.Phone}, Fax: ${picked.Fax}`

    // have to create if statement test for URL bc some dont have it
    let cell5 = newRow.insertCell(4)
    if (!picked.Visit) {
        cell5.innerHTML = "N/A"
    } else {
        cell5.innerHTML = picked.Visit;
    }
}
