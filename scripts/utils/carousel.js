//eslint-disable-next-line
async function carouselDom(dataId) {
  const lightBox = document.querySelector(".lightbox");

  lightBox.setAttribute("tabindex", "0");

  const main = document.querySelector("main");
  main.setAttribute("tabindex", "-1");

  let lightBoxActive = true;

  lightBox.style.display = "block"; // Affiche lightbox lors de l'appel de la fonction carouselDom()
  const modalBg = document.querySelector(".modalBg");
  modalBg.style.display = "block";

  const oldList = lightBox.querySelector("ul"); // Supression ancienne liste pour nouvel si user a cliqué plusieurs fois sur une session
  oldList ? oldList.remove() : null;

  const mediaList = document.createElement("ul");

  //eslint-disable-next-line
  medias.forEach((media) => {
    // Création des li contenant les medias
    //eslint-disable-next-line
    const mediaElem = carouselFactory(media).getLightboxMediaDom();
    mediaList.appendChild(mediaElem);
  });

  function focusMediaIfVideoType() {
    const currentLi = document.querySelector(".mediaLi--visible");
    const media = currentLi.querySelector(".mediaContainer");
    if (media.querySelector("video")) {
      media.querySelector("video").focus();
    }
  }

  lightBox.appendChild(mediaList);

  let liNodeList = document.querySelectorAll("li");

  // Affiche dans lightbox le premier li cible
  liNodeList.forEach((li) => {
    if (li.dataset.id == dataId) {
      li.classList.add("mediaLi--visible");
      li.classList.remove("mediaLi--notVisible");
      focusMediaIfVideoType();
    }
  });
  //eslint-disable-next-line
  let mediaIdArr = medias.map((media) => media.id); // Tableau des id dans ordre pour attribuer class visible au li cible

  // Défini target à afficher, et attribu les cibles des boutons previous et next en fonction de l'index
  let indexOfTarget = mediaIdArr.findIndex((elem) => elem === dataId);
  let indexOfNextTarget = (indexOfTarget + 1) % mediaIdArr.length;
  let indexOfPreviousTarget =
    (indexOfTarget - 1 + mediaIdArr.length) % mediaIdArr.length;

  function goToNext() {
    const currentLi = liNodeList[indexOfTarget];
    const nextLi = liNodeList[indexOfNextTarget];
    currentLi.classList.add("mediaLi--notVisible");
    currentLi.classList.remove("mediaLi--visible");
    nextLi.classList.remove("mediaLi--notVisible");
    nextLi.classList.add("mediaLi--visible");
    indexOfTarget = indexOfNextTarget;
    indexOfNextTarget = (indexOfTarget + 1) % mediaIdArr.length;
    indexOfPreviousTarget =
      (indexOfTarget - 1 + mediaIdArr.length) % mediaIdArr.length;
    focusMediaIfVideoType();
  }

  function goToPrevious() {
    const currentLi = liNodeList[indexOfTarget];
    const previousLi = liNodeList[indexOfPreviousTarget];
    currentLi.classList.add("mediaLi--notVisible");
    currentLi.classList.remove("mediaLi--visible");
    previousLi.classList.remove("mediaLi--notVisible");
    previousLi.classList.add("mediaLi--visible");
    indexOfTarget = indexOfPreviousTarget;
    indexOfNextTarget = (indexOfTarget + 1) % mediaIdArr.length;
    indexOfPreviousTarget =
      (indexOfTarget - 1 + mediaIdArr.length) % mediaIdArr.length;
    focusMediaIfVideoType();
  }

  // Fonction fermeture Lightbox via onclick button
  //eslint-disable-next-line
  function closeLightbox() {
    const lightBox = document.querySelector(".lightbox");
    lightBox.style.display = "none";
    const modalBg = document.querySelector(".modalBg");
    modalBg.style.display = "none";
    lightBox.setAttribute("tabindex", "0");
    lightBoxActive = false;
    main.setAttribute("tabindex", "0");
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightBoxActive === true) {
      closeLightbox();
    }
  });

  const closeBtn = document.querySelector(".closeLightbox");
  closeBtn.addEventListener("click", closeLightbox);

  const prevBtn = document.querySelector("#leftArrow");
  prevBtn.addEventListener("click", goToPrevious);

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" && lightBoxActive === true) {
      goToPrevious();
    }
  });

  const nextBtn = document.querySelector("#rightArrow");
  nextBtn.addEventListener("click", goToNext);

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" && lightBoxActive === true) {
      goToNext();
    }
  });
}
