/* =========================================================
   三國志 · 天下
   Alpha 0.2
   장수 시스템
========================================================= */


/* =========================================================
   게임 상태
========================================================= */

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

  selectedCity: null,

  selectedGeneral: null

};


/* =========================================================
   도시 데이터
========================================================= */

const cities = {

  "낙양": {
    faction: "조조 세력",
    population: 82000,
    gold: 3200,
    food: 8500,
    soldiers: 12000,
    agriculture: 72,
    commerce: 64,
    security: 81,
    generals: ["조조", "순욱", "하후돈"]
  },

  "허창": {
    faction: "조조 세력",
    population: 65000,
    gold: 2200,
    food: 6200,
    soldiers: 9000,
    agriculture: 65,
    commerce: 58,
    security: 76,
    generals: ["곽가", "조인"]
  },

  "장안": {
    faction: "조조 세력",
    population: 58000,
    gold: 1800,
    food: 5000,
    soldiers: 7000,
    agriculture: 60,
    commerce: 45,
    security: 68,
    generals: ["하후연"]
  },

  "업": {
    faction: "조조 세력",
    population: 70000,
    gold: 2600,
    food: 7200,
    soldiers: 10000,
    agriculture: 70,
    commerce: 61,
    security: 73,
    generals: ["장료"]
  },

  "신야": {
    faction: "유비 세력",
    population: 42000,
    gold: 1400,
    food: 3900,
    soldiers: 6000,
    agriculture: 55,
    commerce: 42,
    security: 70,
    generals: ["유비", "관우", "장비"]
  },

  "건업": {
    faction: "손견 세력",
    population: 76000,
    gold: 2900,
    food: 7600,
    soldiers: 11000,
    agriculture: 73,
    commerce: 69,
    security: 82,
    generals: ["손견", "손책"]
  },

  "회계": {
    faction: "손견 세력",
    population: 50000,
    gold: 1700,
    food: 5200,
    soldiers: 6500,
    agriculture: 62,
    commerce: 54,
    security: 74,
    generals: []
  },

  "성도": {
    faction: "중립",
    population: 60000,
    gold: 2000,
    food: 6800,
    soldiers: 5000,
    agriculture: 77,
    commerce: 49,
    security: 71,
    generals: []
  },

  "양양": {
    faction: "중립",
    population: 53000,
    gold: 1600,
    food: 5600,
    soldiers: 4500,
    agriculture: 66,
    commerce: 50,
    security: 67,
    generals: []
  },

  "북해": {
    faction: "중립",
    population: 48000,
    gold: 1500,
    food: 4900,
    soldiers: 4200,
    agriculture: 61,
    commerce: 47,
    security: 64,
    generals: []
  }

};


/* =========================================================
   장수 데이터
========================================================= */

const generals = {

  "조조": {
    faction: "조조 세력",
    city: "낙양",
    age: 35,
    command: 72,
    power: 72,
    intelligence: 91,
    politics: 84,
    charisma: 96,
    loyalty: 100,
    description:
      "뛰어난 군주형 인재. 정치와 전략 모두에 능하다."
  },

  "순욱": {
    faction: "조조 세력",
    city: "낙양",
    age: 32,
    command: 68,
    power: 34,
    intelligence: 95,
    politics: 92,
    charisma: 88,
    loyalty: 96,
    description:
      "탁월한 정치가. 내정과 인재 관리에 매우 뛰어나다."
  },

  "하후돈": {
    faction: "조조 세력",
    city: "낙양",
    age: 31,
    command: 86,
    power: 88,
    intelligence: 61,
    politics: 52,
    charisma: 74,
    loyalty: 98,
    description:
      "조조를 오랫동안 섬긴 맹장. 전투 지휘에 강하다."
  },

  "곽가": {
    faction: "조조 세력",
    city: "허창",
    age: 28,
    command: 60,
    power: 30,
    intelligence: 97,
    politics: 78,
    charisma: 72,
    loyalty: 94,
    description:
      "천재적인 전략가. 계략과 군사 판단에 특화되어 있다."
  },

  "조인": {
    faction: "조조 세력",
    city: "허창",
    age: 30,
    command: 89,
    power: 81,
    intelligence: 63,
    politics: 58,
    charisma: 70,
    loyalty: 97,
    description:
      "수비전과 성곽 방어에 뛰어난 장수."
  },

  "하후연": {
    faction: "조조 세력",
    city: "장안",
    age: 29,
    command: 90,
    power: 84,
    intelligence: 65,
    politics: 48,
    charisma: 68,
    loyalty: 97,
    description:
      "빠른 기동과 공격에 능한 장수."
  },

  "장료": {
    faction: "조조 세력",
    city: "업",
    age: 30,
    command: 93,
    power: 92,
    intelligence: 72,
    politics: 55,
    charisma: 82,
    loyalty: 90,
    description:
      "뛰어난 통솔력을 가진 맹장."
  },

  "유비": {
    faction: "유비 세력",
    city: "신야",
    age: 28,
    command: 76,
    power: 60,
    intelligence: 78,
    politics: 71,
    charisma: 98,
    loyalty: 100,
    description:
      "높은 덕망과 매력을 가진 군주."
  },

  "관우": {
    faction: "유비 세력",
    city: "신야",
    age: 30,
    command: 96,
    power: 98,
    intelligence: 75,
    politics: 55,
    charisma: 94,
    loyalty: 100,
    description:
      "무력과 통솔력이 뛰어난 최고의 맹장."
  },

  "장비": {
    faction: "유비 세력",
    city: "신야",
    age: 27,
    command: 89,
    power: 99,
    intelligence: 48,
    politics: 40,
    charisma: 77,
    loyalty: 100,
    description:
      "압도적인 무력을 가진 장수."
  },

  "손견": {
    faction: "손견 세력",
    city: "건업",
    age: 36,
    command: 91,
    power: 93,
    intelligence: 71,
    politics: 60,
    charisma: 88,
    loyalty: 100,
    description:
      "강력한 군사력을 가진 군주."
  },

  "손책": {
    faction: "손견 세력",
    city: "건업",
    age: 17,
    command: 94,
    power: 95,
    intelligence: 70,
    politics: 61,
    charisma: 92,
    loyalty: 100,
    description:
      "젊고 뛰어난 재능을 가진 후계자."
  }

};


/* =========================================================
   DOM
========================================================= */

const dateEl =
  document.getElementById("date");

const goldEl =
  document.getElementById("gold");

const foodEl =
  document.getElementById("food");

const cityPanel =
  document.getElementById("cityPanel");

const generalPanel =
  document.getElementById("generalPanel");

const generalsPanel =
  document.getElementById("generalsPanel");

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

const cityGenerals =
  document.getElementById("cityGenerals");


/* =========================================================
   도시 선택
========================================================= */

document
  .querySelectorAll(".city")
  .forEach(city => {

    city.addEventListener("click", () => {

      openCity(
        city.dataset.city
      );

    });

  });


/* =========================================================
   도시 열기
========================================================= */

function openCity(cityName) {

  const city =
    cities[cityName];

  if (!city) return;

  game.selectedCity =
    cityName;

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


  renderCityGenerals(city);


  cityPanel.classList.remove(
    "hidden"
  );

}


/* =========================================================
   도시 장수 표시
========================================================= */

function renderCityGenerals(city) {

  cityGenerals.innerHTML = "";

  if (!city.generals.length) {

    cityGenerals.innerHTML = `
      <div class="general-mini">
        <span style="color:#958871;font-size:11px;">
          주둔한 장수가 없습니다.
        </span>
      </div>
    `;

    return;
  }


  city.generals.forEach(name => {

    const general =
      generals[name];

    const element =
      document.createElement("button");

    element.className =
      "general-mini";

    element.innerHTML = `

      <div class="general-mini-left">

        <div class="general-mini-avatar">
          👤
        </div>

        <div>

          <div class="general-mini-name">
            ${name}
          </div>

          <div class="general-mini-role">
            ${getGeneralRole(general)}
          </div>

        </div>

      </div>

      <div class="general-mini-politics">
        정치 ${general.politics}
      </div>

    `;

    element.addEventListener(
      "click",
      () => openGeneral(name)
    );

    cityGenerals.appendChild(
      element
    );

  });

}


/* =========================================================
   장수 역할
========================================================= */

function getGeneralRole(general) {

  if (
    general.politics >= 85
  ) {
    return "내정형";
  }

  if (
    general.command >= 90
  ) {
    return "통솔형";
  }

  if (
    general.intelligence >= 90
  ) {
    return "책략형";
  }

  return "장수";

}


/* =========================================================
   장수 상세
========================================================= */

function openGeneral(name) {

  const general =
    generals[name];

  if (!general) return;

  game.selectedGeneral =
    name;

  document.getElementById(
    "generalName"
  ).textContent = name;

  document.getElementById(
    "generalFaction"
  ).textContent =
    general.faction;

  document.getElementById(
    "generalCity"
  ).textContent =
    `현재 위치 · ${general.city}`;

  document.getElementById(
    "generalLoyalty"
  ).textContent =
    general.loyalty;

  document.getElementById(
    "loyaltyBar"
  ).style.width =
    `${general.loyalty}%`;

  document.getElementById(
    "generalCommand"
  ).textContent =
    general.command;

  document.getElementById(
    "generalPower"
  ).textContent =
    general.power;

  document.getElementById(
    "generalIntelligence"
  ).textContent =
    general.intelligence;

  document.getElementById(
    "generalPolitics"
  ).textContent =
    general.politics;

  document.getElementById(
    "generalCharisma"
  ).textContent =
    general.charisma;

  document.getElementById(
    "generalAge"
  ).textContent =
    general.age;

  document.getElementById(
    "generalDescription"
  ).textContent =
    general.description;


  generalPanel.classList.remove(
    "hidden"
  );

}


/* =========================================================
   장수 전체 목록
========================================================= */

function renderGeneralList() {

  const list =
    document.getElementById(
      "generalList"
    );

  list.innerHTML = "";


  Object.entries(generals)
    .filter(
      ([name, general]) =>
        general.faction === "조조 세력"
    )
    .forEach(
      ([name, general]) => {

        const card =
          document.createElement(
            "button"
          );

        card.className =
          "general-card";

        card.innerHTML = `

          <div class="general-card-left">

            <div class="general-card-avatar">
              👤
            </div>

            <div>

              <div class="general-card-name">
                ${name}
              </div>

              <div class="general-card-info">
                ${general.city} ·
                ${getGeneralRole(general)}
              </div>

            </div>

          </div>

          <div class="general-card-stat">
            정치 ${general.politics}<br>
            통솔 ${general.command}
          </div>

        `;

        card.addEventListener(
          "click",
          () => openGeneral(name)
        );

        list.appendChild(card);

      }
    );

}


/* =========================================================
   패널 닫기
========================================================= */

document
  .getElementById("closePanel")
  .addEventListener(
    "click",
    () => {

      cityPanel.classList.add(
        "hidden"
      );

    }
  );


document
  .getElementById("closeGeneralPanel")
  .addEventListener(
    "click",
    () => {

      generalPanel.classList.add(
        "hidden"
      );

    }
  );


document
  .getElementById("closeGeneralsPanel")
  .addEventListener(
    "click",
    () => {

      generalsPanel.classList.add(
        "hidden"
      );

    }
  );


/* =========================================================
   장수 메뉴
========================================================= */

document
  .getElementById("generalMenu")
  .addEventListener(
    "click",
    () => {

      renderGeneralList();

      generalsPanel.classList.remove(
        "hidden"
      );

    }
  );


/* =========================================================
   농업
========================================================= */

document
  .getElementById("farmBtn")
  .addEventListener(
    "click",
    () => {

      developCity(
        "agriculture"
      );

    }
  );


/* =========================================================
   상업
========================================================= */

document
  .getElementById("commerceBtn")
  .addEventListener(
    "click",
    () => {

      developCity(
        "commerce"
      );

    }
  );


/* =========================================================
   치안
========================================================= */

document
  .getElementById("securityBtn")
  .addEventListener(
    "click",
    () => {

      developCity(
        "security"
      );

    }
  );


/* =========================================================
   내정 처리
========================================================= */

function developCity(type) {

  if (!game.selectedCity) return;

  const city =
    cities[game.selectedCity];

  if (game.gold < 100) {

    alert(
      "금이 부족합니다."
    );

    return;

  }


  if (city[type] >= 100) {

    alert(
      "이미 최대치입니다."
    );

    return;

  }


  const bestGeneral =
    getBestPoliticsGeneral(city);


  let improvement = 3;


  /*
    정치력이 높은 장수가 있으면
    내정 효과가 증가한다.
  */

  if (bestGeneral) {

    improvement =
      Math.floor(
        3 +
        bestGeneral.politics / 25
      );

  }


  game.gold -= 100;

  city[type] += improvement;

  if (city[type] > 100) {

    city[type] = 100;

  }


  updateResources();

  openCity(
    game.selectedCity
  );

}


/* =========================================================
   정치력이 가장 높은 장수
========================================================= */

function getBestPoliticsGeneral(city) {

  if (
    !city.generals ||
    city.generals.length === 0
  ) {

    return null;

  }


  let best = null;


  city.generals.forEach(
    name => {

      const general =
        generals[name];

      if (!general) return;

      if (
        !best ||
        general.politics >
        best.politics
      ) {

        best = general;

      }

    }
  );


  return best;

}


/* =========================================================
   자원
========================================================= */

function updateResources() {

  goldEl.textContent =
    game.gold.toLocaleString();

  foodEl.textContent =
    game.food.toLocaleString();

}


/* =========================================================
   다음 턴
========================================================= */

document
  .getElementById("nextTurn")
  .addEventListener(
    "click",
    nextTurn
  );


function nextTurn() {

  game.season++;


  if (
    game.season >= 4
  ) {

    game.season = 0;

    game.year++;

  }


  let goldIncome = 0;

  let foodIncome = 0;


  Object.values(cities)
    .forEach(city => {

      if (
        city.faction ===
        "조조 세력"
      ) {

        goldIncome +=
          Math.floor(
            city.commerce / 10
          );

        foodIncome +=
          Math.floor(
            city.agriculture / 5
          );

      }

    });


  game.gold +=
    goldIncome;

  game.food +=
    foodIncome;


  updateResources();

  updateDate();


  if (game.selectedCity) {

    openCity(
      game.selectedCity
    );

  }

}


/* =========================================================
   날짜
========================================================= */

function updateDate() {

  dateEl.textContent =
    `${game.year}년 ${game.seasons[game.season]}`;

}


/* =========================================================
   초기화
========================================================= */

updateResources();

updateDate();
