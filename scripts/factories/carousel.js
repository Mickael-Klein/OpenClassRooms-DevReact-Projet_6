// eslint-disable-next-line
function carouselFactory(data) {
  const { id, photographerId, title } = data;

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

  function getLightboxMediaDom() {
    //Creation dynamic Dom Elements
    const mediaLi = document.createElement("li");

    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("mediaContainer");
    const media =
      mediaType === "image"
        ? document.createElement("img")
        : document.createElement("video");
    media.setAttribute(
      "src",
      `assets/Medias/${photographerMediasFilePathName[photographerId]}/${mediaName}`
    );
    media.setAttribute("alt", title);
    mediaType === "video" ? media.setAttribute("controls", "") : null;
    mediaType === "video" ? media.classList.add("videoType") : null;
    media.classList.add("lightboxMedia");
    mediaContainer.appendChild(media);

    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("mediaTitle");
    mediaTitle.textContent = title;

    mediaLi.appendChild(mediaContainer);
    mediaLi.appendChild(mediaTitle);
    mediaLi.classList.add("mediaLi--notVisible");
    mediaLi.setAttribute("data-id", id);

    return mediaLi;
  }

  return { getLightboxMediaDom };
}
