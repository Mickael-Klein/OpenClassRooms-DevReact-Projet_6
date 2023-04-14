//eslint-disable-next-line
function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/Medias/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const mediaContainer = document.createElement("a");
    mediaContainer.setAttribute("href", `photographer.html?id=${id}`);
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    divImg.appendChild(img);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `<span class="localisation">${city}, ${country}</span><br /><span class="tagline">${tagline}</span><br /><span class="price">${price}€/jour</span>`;
    mediaContainer.appendChild(divImg);
    mediaContainer.appendChild(h2);
    article.appendChild(mediaContainer);
    article.appendChild(paragraph);
    return article;
  }

  function getUserCardDOMForPhotographerPage() {
    const article = document.createElement("article");

    const headDiv = document.createElement("div");
    headDiv.classList.add("headDiv");
    const h1 = document.createElement("h1");
    h1.textContent = name;
    const photographerTextInfo = document.createElement("p");
    photographerTextInfo.innerHTML = `<span class="localisation">${city}, ${country}</span><br /><span class="tagline">${tagline}</span>`;
    headDiv.appendChild(h1);
    headDiv.appendChild(photographerTextInfo);

    const elemWrapper = document.createElement("div");
    elemWrapper.classList.add("elemWrapper");
    elemWrapper.appendChild(headDiv);

    const button = document.createElement("button");
    button.classList.add("contact_button");
    button.setAttribute("onclick", "displayModal()");
    button.setAttribute("aria-label", "Contact Me");
    button.setAttribute("tabindex", "2");
    button.textContent = "Contactez-moi";

    const elemWrapper2 = document.createElement("div");
    elemWrapper2.classList.add("elemWrapper");
    elemWrapper2.appendChild(button);

    const divImg = document.createElement("div");
    divImg.classList.add("imgDiv");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    divImg.appendChild(img);

    const elemWrapper3 = document.createElement("div");
    elemWrapper3.classList.add("elemWrapper");
    elemWrapper3.appendChild(divImg);

    article.appendChild(elemWrapper);
    article.appendChild(elemWrapper2);
    article.appendChild(elemWrapper3);

    return article;
  }

  return { getUserCardDOM, getUserCardDOMForPhotographerPage };
}
