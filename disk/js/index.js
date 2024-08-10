// Selectionneer le formulaire et section d'affichage des erreurs
const form = document.querySelector("#form");
const outputSection = document.querySelector("#outputSection");

// Ajouter un ecouteur d'evenement pour le formulaire
form.addEventListener("submit", (event) =>{
    //Effacer les messages d'erreur precedents
    clearOutputSection();
    // Recuperer les elements du formulaire
const input = form.elements ;

//initialiser un drapeau pour verifier si tous les champs requis sont remplis
let allFieldsFilled = true;
let invalidEmail = false;
let invalidPassword = false;

//Parcourir tous les elements du formulaire
for(let input of inputs){
    //Verifier si l'element est requis
    if(input.hasAttribute(required)){
        if(input.value.trim() === ""){
            allFieldsFilled = false;
            input.classList.add("invalid");
        }else{
            input.classList.remove("invalid");
        }
     }
      
}

let email = inputs["email"].value;
let password = inputs["password"].value;

//Verifier si l'email est valide 
const emailRegex = new RegExp(
    "^[A-Za-z0-9._%-]+@ [A-Za-z0-9.-]+. [A-Za-z] {2,4}$"
);
if(!emailRegex.test(email)){
    invalidEmail = true;
    inputs["email"].classList.add("invalid");
}else{
    inputs["email"].classList.remove("invalid");
}
//Verifier si le mot de passe est valide
if(password.length < 8){
    invalidPassword =true;
    inputs ["password"].classList.add("invalid");
}else{
   inputs["password"].classList.remove("invalid");
}

// Afficher les messages d'erreur appropries
if(!allFieldsFilled){
    pushToOutputSection("Veuillez remplir tous les champs obligatoires.");
}
if(invalidEmail){
    pushToOutputSection("Veuillez enter une adresse email valide.")
}
if(invalidPassword){
    pushToOutputSection("le mot de passe doit contenir au moins 8 caracteres.");
    
}
//Empecher soumission du formulaire en cas d'erreur
if(!allFieldsFilled || invalidEmail || invalidPassword){
    event.preventDefault();
}

});

/**
 * Formulaire pour reset la section de message d'erreur
 */

function clearOutputSection(){
    outputSection.innerHTML="";
}

/**
 * Fonction pour ajouter a la section de message 
 * @param {string} message
 */
function pushToOutputSection(message){
    let p = outputSection.querySelector("p") || document.createElement("p");
    let ul = outputSection.querySelector("ul") || document.createElement("ul");
    let li = document.createElement("li");

    p.textContent = "Veullez corriger les erreurs suivantes :";
    li.textContent = message;
    ul.appendChild(li);
    outputSection.appendChild(p)
    outputSection.appendChild(ul);
}