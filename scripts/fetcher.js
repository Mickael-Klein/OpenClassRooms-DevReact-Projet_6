async function fetchData() {
  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const data = fetchData();
