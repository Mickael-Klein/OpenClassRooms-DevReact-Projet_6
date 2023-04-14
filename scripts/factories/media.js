//eslint-disable-next-line
function mediaFactory(data) {
  //eslint-disable-next-line
  const { id, photographerId, title, likes, date, price } = data;

  const mediaType = data.image ? "image" : "video"; //spécifie type média et attribue son nom à une constante
  const mediaName = data.image ? data.image : data.video;

  const photographerMediasFilePathName = {
    //permettra de specifier le path des medias via ID key
    243: "Mimi",
    930: "Ellie Rose",
    82: "tracy",
    527: "Nabeel",
    925: "Rhode",
    195: "Marcel",
  };

  function getMediaDom() {
    const article = document.createElement("article");
    article.setAttribute("data-photographerId", photographerId);
    article.setAttribute("data-date", date);

    const mediaContainerLink = document.createElement("div"); // Modifier pour div clickable
    mediaContainerLink.classList.add("mediaContainerLink");
    mediaContainerLink.setAttribute("data-id", id);
    mediaContainerLink.setAttribute("aria-label", `${title}, closeup view`); //eslint-disable-next-line
    mediaContainerLink.addEventListener("click", () => carouselDom(id)); // Ajout event listener pour lightBox
    mediaContainerLink.addEventListener("keydown", (event) => {
      // Ajout event listener pour ouvrir lightbox sur enter on focus
      if (event.code === "Enter") {
        //eslint-disable-next-line
        carouselDom(id);
      }
    });

    const media =
      mediaType === "image"
        ? document.createElement("img")
        : document.createElement("video");
    media.setAttribute(
      "src",
      `assets/Medias/${photographerMediasFilePathName[photographerId]}/${mediaName}`
    );
    media.setAttribute("alt", title);
    mediaContainerLink.appendChild(media);

    const textContainer = document.createElement("div");
    textContainer.classList.add("textContainer");

    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("mediaTitle");
    mediaTitle.textContent = title;

    textContainer.appendChild(mediaTitle);

    const likesButtonContainer = document.createElement("button");
    likesButtonContainer.classList.add("likesButtonContainer");
    likesButtonContainer.setAttribute("data-id", id);
    likesButtonContainer.innerHTML = `<span class="likesCount">${likes}</span aria-label="likes"><i class="fa-solid fa-heart"></i>`;

    textContainer.appendChild(likesButtonContainer);

    article.appendChild(mediaContainerLink);
    article.appendChild(textContainer);

    return article;
  }
  return { getMediaDom };
}
