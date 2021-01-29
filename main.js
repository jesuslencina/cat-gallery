const Main = document.getElementById('main');

const startApp = () => {
  document.getElementById('start').classList.toggle('hidden');
  Main.classList.remove('hidden');
};

const getInitialPictures = () => {
  let randomNum = Math.random();
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('x-api-key', 'DEMO-API-KEY');

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    'https://api.thecatapi.com/v1/images/search?limit=12&page=' +
      randomNum +
      '&order=desc',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(JSON.parse(result)))
    .catch((error) => console.log('error', error));
};
