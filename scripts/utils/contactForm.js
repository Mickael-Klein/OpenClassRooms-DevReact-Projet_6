// eslint-disable-next-line
function displayModal() {
  const modal = document.getElementById("contact_modal");
  const modalBg = document.querySelector(".modalBg");
  modal.style.display = "block";
  modalBg.style.display = "block";
  const firstName = document.querySelector("#first");
  const main = document.querySelector("main");
  main.setAttribute("tabindex", "-1");
  modal.setAttribute("tabindex", "0");
  firstName.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const modalBg = document.querySelector(".modalBg");
  modal.style.display = "none";
  modalBg.style.display = "none";
  const main = document.querySelector("main");
  main.setAttribute("tabindex", "0");
  modal.setAttribute("tabindex", "-1");
}

// DOM Elements
const modalBody = document.querySelector("dialog");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const message = document.querySelector("#message"); // eslint-disable-next-line
const formDataNodeList = document.querySelectorAll(".formData"); // eslint-disable-next-line
const btnSubmit = document.querySelector(".btn-submit");

// Tableau des éléments sur lesquels itérer pour form verif
const domElemArr = [firstName, lastName, email, message];

// Liste des regex requises
const regexName = new RegExp(/^[a-zA-Z]{2,}$/);
const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
const regexMessage = new RegExp(/^.{10,}$/);

// Tableau des éléments à comparer et msg d'erreur associés
const errorMessages = [
  { msg: "Veuillez saisir un prénom au format valide", regex: regexName },
  { msg: "Veuillez saisir un nom au format valide", regex: regexName },
  { msg: "Veuillez saisir un email au format valide", regex: regexEmail },
  {
    msg: "Veuillez saisir un message d'au moins 10 caractères",
    regex: regexMessage,
  },
];

// fonction pour affichage erreur (max 1 msg par element)
const putErrorMsg = (index, parentElement) => {
  let textAlreadyExist = parentElement.querySelector(".errorMsg");
  if (textAlreadyExist) {
    return;
  }
  const text = document.createElement("p");
  text.classList.add("errorMsg");
  text.textContent = errorMessages[index].msg;
  parentElement.appendChild(text);
  parentElement.querySelector("input")
    ? (parentElement.querySelector("input").style.border = "solid red 4px")
    : null;
  parentElement.querySelector("textarea")
    ? (parentElement.querySelector("textarea").style.border = "solid red 4px")
    : null;
};

//fonction pour supprimer affichage erreur si réctifiée
const removeErrorMsg = (parentElement) => {
  let textAlreadyExist = parentElement.querySelector(".errorMsg");
  if (textAlreadyExist) {
    textAlreadyExist.remove();
  }
  parentElement.querySelector("input")
    ? (parentElement.querySelector("input").style.border = "none")
    : null;
  parentElement.querySelector("textarea")
    ? (parentElement.querySelector("textarea").style.border = "none")
    : null;
};

// Form check function
function validate() {
  const datas = {}; // initialisation de l'objet à envoyer au backend

  let containError = false; //variable de check d'erreur final pour le return
  domElemArr.forEach((elem, index) => {
    //pour chaque élément, on check via regex et si erreur, on affiche le msg d'erreur correspondant et passe variable check à true(err)
    if (!elem.value.match(errorMessages[index].regex)) {
      putErrorMsg(index, elem.parentElement);
      containError = true;
    } else {
      removeErrorMsg(elem.parentElement);
    }
  });
  if (containError) {
    return false;
  } else {
    datas.firstName = firstName.value; //constitution fichier a envoyer au backend
    datas.lastName = lastName.value;
    datas.email = email.value;
    datas.message = message.value;

    return datas; // retourne le fichier complété pour transmission
  }
}

// fonction qui affiche le message de validation d'inscription si form validate ok (pourrait aussi envoyer form au backend)
const sendDatas = () => {
  const validateResult = validate();
  if (validateResult !== false) {
    const jsonValidateResult = JSON.stringify({ validateResult });
    console.log(jsonValidateResult);
    // //Si envoie form au backend, fonction qui envoie les datas
    // sendToBackend(jsonValidateResult);
    modalBody.innerHTML = "";
    modalBody.innerHTML =
      '<div class="modalBody--after__textContent"><p>Votre message a bien été envoyé</p></div><button class="btn-submit modalBody--after__btn-submit" id="btn-closeModal">Fermer</button>';
    modalBody.classList.add("modalBody--after");
    const closeModalBtn = document.querySelector("#btn-closeModal");
    closeModalBtn.addEventListener("click", closeModal);
  } else {
    return false;
  }
};

// Fonction pour envoi futur au backend
// eslint-disable-next-line
const sendToBackend = (jsonObject) => {
  fetch("http://something.com/api/endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonObject),
  }) // eslint-disable-next-line
    .then((response) => {
      // traitement de la réponse
    }) // eslint-disable-next-line
    .catch((error) => {
      // traitement de l'erreur
    });
};

// ajout du prevent default et validation du form
document
  .querySelector("form[name='contact']")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    sendDatas();
  });
