///VARIABLE INITIALIZATION
const Main = document.getElementById('main');
const PicList = document.getElementById('picList');
const BreedSelect = document.getElementById('breedSelect');

let breedList = [];

///DOM LISTENERS
document.getElementById('agreement').addEventListener('change', () => {
  if ((document.getElementById('agreement').checked = true)) {
    document.getElementById('agreement-button').disabled = false;
  } else {
    document.getElementById('agreement-button').disabled = true;
  }
});

///FUNCTIONS
const startApp = () => {
  document.getElementById('start').classList.toggle('hidden');
  getInitialPictures();
  getBreeds();
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
    .then((result) => renderPictures(JSON.parse(result)))
    .catch((error) => console.log('error', error));
};

const renderPictures = (array) => {
  for (let i = 0; i < array.length; i++) {
    //FISRT CONTAINER
    let element = document.createElement('div');
    element.classList.add('cat-pic-container');
    element.innerHTML = `<img class="cat-pic-img" src=${array[i].url} alt="A Cat."> <br> <b>CLICK ON PIC TO LOVE THIS CAT</b>`;
    //OVERLAY
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.classList.add('hidden');
    overlay.innerHTML = `<p>CLICK TO LOVE THIS CAT</p>`;
    element.append(overlay);
    //LISTENERS
    element.addEventListener('mouseenter', () =>
      showOverlay(element.getElementsByClassName('overlay')[0])
    );

    element.addEventListener('mouseleave', () =>
      hideOverlay(element.getElementsByClassName('overlay')[0])
    );
    //APPEND
    PicList.appendChild(element);
  }
};

const showOverlay = (overlay) => {
  overlay.classList.remove('hidden');
};

const hideOverlay = (overlay) => {
  overlay.classList.add('hidden');
};

const getBreeds = async () => {
  let completeArray = [];

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  await fetch('https://api.thecatapi.com/v1/breeds', requestOptions)
    .then((response) => response.text())
    .then((result) => (completeArray = JSON.parse(result)))
    .catch((error) => console.log('error', error));

  for (let index = 0; index < completeArray.length; index++) {
    let breedObject = {
      id: completeArray[index].id,
      name: completeArray[index].name,
    };
    breedList.push(breedObject);

    let breedOption = document.createElement('option');
    breedOption.innerHTML = completeArray[index].name;
    BreedSelect.appendChild(breedOption);
  }
};
