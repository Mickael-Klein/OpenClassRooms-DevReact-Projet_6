async function getPhotographers() {
  let photographers = [];
  try {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    data.photographers.forEach((photographer) => {
      photographers.push(photographer);
    });
  } catch (error) {
    console.log(error);
  }

  // bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers: [...photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    //eslint-disable-next-line
    const userCardDOM = photographerFactory(photographer).getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
