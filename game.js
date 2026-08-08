/* =========================================================
   삼국지: 천하
   Alpha 0.1
========================================================= */


/* =========================
   게임 데이터
========================= */

const game = {

  year: 190,

  season: 0,

  seasons: [
    "봄",
    "여름",
    "가을",
    "겨울"
  ],

  gold: 3200,

  food: 8500,

  selectedCity: null

};


/* =========================
   도시 데이터
========================= */

const cities = {

  "낙양": {
    faction: "조조 세력",
    population: 82000,
    gold: 3200,
    food: 8500,
    soldiers: 12000,
    agriculture: 72,
    commerce: 64,
    security: 81
  },

  "허창": {
    faction: "조조 세력",
    population: 65000,
    gold: 2200,
    food: 6200,
    soldiers: 9000,
    agriculture: 65,
    commerce: 58,
    security: 76
  },

  "장안": {
    faction: "조조 세력",
    population: 58000,
    gold: 1800,
    food: 5000,
    soldiers: 7000,
    agriculture: 60,
    commerce: 45,
    security: 68
  },

  "업": {
    faction: "조조 세력",
    population: 70000,
    gold: 2600,
    food: 7200,
    soldiers: 10000,
    agriculture: 70,
    commerce: 61,
    security: 73
  },

  "신야": {
    faction: "유비 세력",
    population: 42000,
    gold: 1400,
    food: 3900,
    soldiers: 6000,
    agriculture: 55,
    commerce: 42,
    security: 70
  },

  "건업": {
    faction: "손견 세력",
    population: 76000,
    gold: 2900,
    food: 7600,
    soldiers: 11000,
    agriculture: 73,
    commerce: 69,
    security: 82
  },

  "회계": {
    faction: "손견 세력",
    population: 50000,
    gold: 1700,
    food: 5200,
    soldiers: 6500,
    agriculture: 62,
    commerce: 54,
    security: 74
  },

  "성도": {
    faction: "중립",
    population: 60000,
    gold: 2000,
    food: 6800,
    soldiers: 5000,
    agriculture: 77,
    commerce: 49,
    security: 71
  },

  "양양": {
    faction: "중립",
    population: 53000,
    gold: 1600,
    food: 5600,
    soldiers: 4500,
    agriculture: 66,
    commerce: 50,
    security: 67
  },

  "북해": {
    faction: "중립",
    population: 48000,
    gold: 1500,
    food: 4900,
    soldiers: 4200,
    agriculture: 61,
    commerce: 47,
    security: 64
  }

};


/* =========================
   DOM
========================= */

const dateEl = document.getElementById("date");

const goldEl = document.getElementById("gold");

const foodEl = document.getElementById("food");

const cityPanel = document.getElementById("cityPanel");

const closePanel =
  document.getElementById("closePanel");

const panelCity =
  document.getElementById("panelCity");

const panelFaction =
  document.getElementById("panelFaction");

const populationEl =
  document.getElementById("population");

const cityGoldEl =
  document.getElementById("cityGold");

const cityFoodEl =
  document.getElementById("cityFood");

const soldiersEl =
  document.getElementById("soldiers");

const agricultureEl =
  document.getElementById("agriculture");

const commerceEl =
  document.getElementById("commerce");

const securityEl =
  document.getElementById("security");

const agricultureBar =
  document.getElementById("agricultureBar");

const commerceBar =
  document.getElementById("commerceBar");

const securityBar =
  document.getElementById("securityBar");


/* =========================
   도시 선택
========================= */

document.querySelectorAll(".city").forEach(city => {

  city.addEventListener("click", () => {

    const cityName =
      city.dataset.city;

    openCity(cityName);

  });

});


/* =========================
   도시 열기
========================= */

function openCity(cityName) {

  const city = cities[cityName];

  if (!city) return;

  game.selectedCity = cityName;

  panelCity.textContent =
    cityName;

  panelFaction.textContent =
    city.faction;

  populationEl.textContent =
    city.population.toLocaleString();

  cityGoldEl.textContent =
    city.gold.toLocaleString();

  cityFoodEl.textContent =
    city.food.toLocaleString();

  soldiersEl.textContent =
    city.soldiers.toLocaleString();

  agricultureEl.textContent =
    city.agriculture;

  commerceEl.textContent =
    city.commerce;

  securityEl.textContent =
    city.security;

  agricultureBar.style.width =
    `${city.agriculture}%`;

  commerceBar.style.width =
    `${city.commerce}%`;

  securityBar.style.width =
    `${city.security}%`;

  cityPanel.classList.remove("hidden");

}


/* =========================
   패널 닫기
========================= */

closePanel.addEventListener("click", () => {

  cityPanel.classList.add("hidden");

});


/* =========================
   개발 명령
========================= */

document
  .getElementById("farmBtn")
  .addEventListener("click", () => {

    developCity("agriculture");

  });


document
  .getElementById("commerceBtn")
  .addEventListener("click", () => {

    developCity("commerce");

  });


document
  .getElementById("securityBtn")
  .addEventListener("click", () => {

    developCity("security");

  });


function developCity(type) {

  if (!game.selectedCity) return;

  const city =
    cities[game.selectedCity];

  if (game.gold < 100) {

    alert("금이 부족합니다.");

    return;

  }

  if (city[type] >= 100) {

    alert("이미 최대치입니다.");

    return;

  }

  game.gold -= 100;

  city[type] += 3;

  if (city[type] > 100) {
    city[type] = 100;
  }

  updateResources();

  openCity(game.selectedCity);

}


/* =========================
   자원 갱신
========================= */

function updateResources() {

  goldEl.textContent =
    game.gold.toLocaleString();

  foodEl.textContent =
    game.food.toLocaleString();

}


/* =========================
   다음 턴
========================= */

document
  .getElementById("nextTurn")
  .addEventListener("click", nextTurn);


function nextTurn() {

  /* 계절 변경 */

  game.season++;

  if (game.season >= 4) {

    game.season = 0;

    game.year++;

  }


  /* 생산 */

  let goldIncome = 0;

  let foodIncome = 0;


  Object.values(cities).forEach(city => {

    if (city.faction === "조조 세력") {

      goldIncome +=
        Math.floor(city.commerce / 10);

      foodIncome +=
        Math.floor(city.agriculture / 5);

    }

  });


  game.gold += goldIncome;

  game.food += foodIncome;


  updateResources();

  updateDate();


  /* 현재 도시 화면 갱신 */

  if (game.selectedCity) {

    openCity(game.selectedCity);

  }

}


/* =========================
   날짜 표시
========================= */

function updateDate() {

  dateEl.textContent =
    `${game.year}년 ${game.seasons[game.season]}`;

}


/* =========================
   초기화
========================= */

updateResources();

updateDate();
