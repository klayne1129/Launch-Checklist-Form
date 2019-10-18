// Write your JavaScript code here!
window.addEventListener("load", function() {
   
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelLevelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus")
   let faultyItemsDiv = document.getElementById("faultyItems");
   let launchStatus = document.getElementById("launchStatus");

   faultyItemsDiv.style.visibility = "hidden";

   
   let missionTargetElement = document.getElementById("missionTarget");
   let form = document.querySelector("form");

   // fetch desired json elements
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json){  
         missionTargetElement.innerHTML = `
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[2].name}</li>
               <li>Diameter: ${json[2].diameter}</li>
               <li>Star: ${json[2].star}</li>
               <li>Distance from Earth: ${json[2].distance}</li>
               <li>Number of Moons: ${json[2].moons}</li>
            </ol>
            <img src="${json[2].image}">
         `;
      });
   });
   // submit handler
   form.addEventListener("submit", function() {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      
      // Validation: checks that all fields are not empty.
      if(pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
            
         // Validation: checks that all fields have the right input. 
      } else if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert("Make sure to enter valid information for each field!");
       
      } else {
         faultyItemsDiv.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Pilot ${copilotNameInput.value} is ready for launch`;

         // conditional for low fuel
         if(fuelLevelInput.value < 10000) {
            fuelLevelStatus.innerHTML = 'Fuel level too low for launch'
            launchStatus.innerHTML = `Shuttle not ready for launch`
            launchStatus.style.color = 'red';
         // condition for cargo mass
         } else if (cargoMassInput.value > 10000) {   
            cargoStatus.innerHTML = 'Cargo mass too large for launch'
            launchStatus.innerHTML = `Shuttle not ready for launch`
            launchStatus.style.color = 'red';
         } else { 
            launchStatus.innerHTML = `Shuttle is ready for launch`
            launchStatus.style.color = 'green'; 
         } 
      }
   });
});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
