//Mettre le code JavaScript lié à la page photographer.html

let medias;

async function init() {
  let params = new URL(document.location).searchParams;
  let id = parseInt(params.get("id"));

  async function fetchData() {
    try {
      const response = await fetch("./data/photographers.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const data = await fetchData();

  function getPhotographerWithUrlParameter() {
    const photographer = data.photographers.filter((elem) => elem.id === id);

    if (photographer.length === 0) {
      const main = document.querySelector("main");
      main.innerHTML = "";
      main.innerHTML =
        "<div id='wrongPhotographerContainer'><p>Nous n'avons malheureusement pas réussi à retrouver ce photographe !<br />Nous vous invitons à aller consulter les travaux des autres artistes en attendant que nous réglions cet incident</p><a href='/index.html' aria-label='Link to main page'>Page d' accueil</a><div class='timer'></div>";
      let timeLeft = 15;
      const timer = setInterval(function () {
        timeLeft--;
        document.querySelector(".timer").innerHTML =
          "Redirection dans <span class='timeLeft'>" +
          timeLeft +
          "</span> secondes...";
        if (timeLeft <= 5) {
          document.querySelector(".timeLeft").style.color = "red";
          document.querySelector(".timeLeft").style.fontSize = "3.5rem";
        }
        if (timeLeft === 0) {
          clearInterval(timer);
          window.location.href = "/index.html";
        }
      }, 1000);
    }

    const modalTitle = document.querySelector("#modalTitle"); // Ajout photographer.name dans modal de contact
    modalTitle.innerHTML = `Contactez-moi<br />${photographer[0].name}`;

    return photographer;
  }

  function displayPhotographerData(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    //eslint-disable-next-line
    const photographerProfileArticle = photographerFactory(
      photographer[0]
    ).getUserCardDOMForPhotographerPage();
    photographerSection.appendChild(photographerProfileArticle);
  }

  async function filterMediaByPhotographerId() {
    return data.media.filter((elem) => elem.photographerId === id);
  }

  //Attribution données à variable globale medias initilialisée en haut de page pour le photographe séléctionné
  medias = await filterMediaByPhotographerId();

  //Initialisation des trois tableaux qui recevront les medias triés pour eviter d effectuer la fonction de tri à chaque fois
  let mediasSortedByPopularityArr = [];
  let mediasSortedByDateArr = [];
  let mediasSortedByTitleArr = [];

  //Fonction qui itère sur le tableau de medias et les affiches dans le DOM
  function displayDatasToDom(mediasArr) {
    const mediaSection = document.querySelector(".workGrid");
    mediaSection.innerHTML = "";
    mediasArr.forEach((media, index) => {
      //eslint-disable-next-line
      const mediaCardDom = mediaFactory(media).getMediaDom();
      mediaCardDom // Ajout des tabindex
        .querySelector(".mediaContainerLink")
        .setAttribute("tabindex", index + 4);
      mediaCardDom.querySelector("button").setAttribute("tabindex", index + 4);
      mediaSection.appendChild(mediaCardDom);
    });
  }

  //Fonction callback sur click on likes buttons listeners
  function handleLikesClick(index) {
    //ajoute +1 count span, ajoute +1 medias.target.likes, ajoute +1 mediasArr.target.likes et ajoute elem aux mediasObject pour indiquer already modified
    const likesCountNodeList = document.querySelectorAll(".likesCount");
    const targetedLikesCounter = likesCountNodeList[index]; //eslint-disable-next-line
    const targetedLikesCounterValue = parseInt(targetedLikesCounter.innerText);

    // Stocker le data-id dans une constante mediaId
    const mediaLinkNodeList = document.querySelectorAll(".mediaContainerLink");
    const targetedMediaLink = mediaLinkNodeList[index];
    const mediaId = parseInt(targetedMediaLink.getAttribute("data-id"));

    //Modifie medias et mediasArr + ajoute alreadyModified
    function handleMediasArrays(mediaId) {
      const totalLikes = document.querySelector(".totalLikes");
      const totalLikesValue = parseInt(totalLikes.innerText);
      medias.forEach((media) => {
        if (media.id === mediaId && !media.hasBeenLiked) {
          media.likes = media.likes + 1;
          totalLikes.innerText = totalLikesValue + 1;
          media.hasBeenLiked = true;
        } else if (media.id === mediaId && media.hasBeenLiked) {
          media.likes = media.likes - 1;
          totalLikes.innerText = totalLikesValue - 1;
          media.hasBeenLiked = false;
        }
      });
    }

    handleMediasArrays(mediaId);

    const newLikesValue = medias
      .filter((media) => media.id === mediaId)
      .map((media) => media.likes)[0];
    targetedLikesCounter.innerText = `${newLikesValue}`;
  }

  //Fonction qui ajoute les eventListeners sur les boutons likes
  function addListenersOnLikesButtons() {
    const likesButtonNodeList = document.querySelectorAll(
      ".likesButtonContainer"
    );
    likesButtonNodeList.forEach((button, index) => {
      button.addEventListener("click", () => handleLikesClick(index));
    });
  }

  function displayMediasData(medias, sortedBy) {
    // Dom elements pour gestion du menu select
    const optionPopularity = document.querySelector("#optionPopularity");
    const optionDate = document.querySelector("#optionDate");
    const optionTitle = document.querySelector("#optionTitle");

    switch (sortedBy) {
      case "Popularity":
        optionPopularity.style.display = "none";
        optionDate.style.display = "inline-block";
        optionTitle.style.display = "inline-block";
        if (mediasSortedByPopularityArr.length === 0) {
          //si Popularity et première exécution de la fonction avec ce case
          medias.sort((a, b) => b.likes - a.likes);
          medias.forEach((media) => mediasSortedByPopularityArr.push(media)); //passe par référence donc conserve data modifiée dans like
          displayDatasToDom(mediasSortedByPopularityArr);
        } else {
          //si Popularity déja éxécuté une fois, utiliser tableau avec valeurs déjà stockées
          displayDatasToDom(mediasSortedByPopularityArr);
        }
        break;
      case "Date":
        optionPopularity.style.display = "inline-block";
        optionDate.style.display = "none";
        optionTitle.style.display = "inline-block";
        if (mediasSortedByDateArr.length === 0) {
          //si Date et première exécution de la fonction avec ce case
          medias.sort((a, b) => new Date(b.date) - new Date(a.date));
          medias.forEach((media) => mediasSortedByDateArr.push(media)); //passe par référence donc conserve data modifiée dans like
          displayDatasToDom(mediasSortedByDateArr);
        } else {
          //si Date déja éxécuté une fois, utiliser tableau avec valeurs déjà stockées
          displayDatasToDom(mediasSortedByDateArr);
        }
        break;
      case "Title":
        optionPopularity.style.display = "inline-block";
        optionDate.style.display = "inline-block";
        optionTitle.style.display = "none";
        if (mediasSortedByTitleArr.length === 0) {
          //si Title et première exécution de la fonction avec ce case
          medias.sort((a, b) => a.title.localeCompare(b.title));
          medias.forEach((media) => mediasSortedByTitleArr.push(media)); //passe par référence donc conserve data modifiée dans like
          displayDatasToDom(mediasSortedByTitleArr);
        } else {
          //si Title déja éxécuté une fois, utiliser tableau avec valeurs déjà stockées
          displayDatasToDom(mediasSortedByTitleArr);
        }
        break;
      default:
        console.log("Invalid sorting parameter");
    }

    addListenersOnLikesButtons();
  }

  // Récupère les datas du photographe display
  const photographer = await getPhotographerWithUrlParameter();
  displayPhotographerData(photographer);

  // Récupère la valeur de select (userSortSelection) et ajoute eventListener onChange sur le select
  const selectMenu = document.getElementById("userSortSelection");

  selectMenu.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    displayMediasData(medias, selectedOption);
    selectMenu.blur();
  });

  let focus = false;
  const chevron = document.querySelector(".chevron");

  selectMenu.addEventListener("focus", () => {
    focus = true;
    chevron.classList.add("chevron--after");
  });

  selectMenu.addEventListener("click", () => {
    if (!focus) {
      chevron.classList.remove("chevron--after");
    }
  });

  selectMenu.addEventListener("blur", () => {
    chevron.classList.remove("chevron--after");
  });

  // Effectue le premier rendu des medias du photographer
  displayMediasData(medias, "Popularity");

  //Affiche l'encadré de bas de page et verouille sa taille
  let totalLikes = medias.reduce((a, b) => a + b.likes, 0);
  const fixedInfoContainer = document.createElement("div");
  fixedInfoContainer.classList.add("fixedInfoContainer");
  fixedInfoContainer.innerHTML = `<p class="totalLikesTextContainer"><span class="totalLikes">${totalLikes}</span><i class="fa-solid fa-heart"></i></p><span class="price">${photographer[0].price}€ / jour</span>`;
  const main = document.querySelector("main");
  main.appendChild(fixedInfoContainer);
}

init();
