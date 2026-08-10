/* =========================================================
   三國志 · 天下
   Alpha 0.3
   장수 + 군사 시스템
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

  selectedGeneral: null,

  attackGeneral: null,
  attackTarget: null,
  attackTroops: 1000

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
   군사 연결망 · Alpha 0.3
========================================================= */

const neighbors = {
  "낙양": ["장안", "업", "허창", "신야"],
  "허창": ["낙양", "업", "신야", "양양"],
  "장안": ["낙양", "성도"],
  "업": ["낙양", "허창", "북해"],
  "신야": ["낙양", "허창", "양양", "건업"],
  "건업": ["신야", "회계"],
  "회계": ["건업"],
  "성도": ["장안", "양양"],
  "양양": ["신야", "허창", "성도", "건업"],
  "북해": ["업"]
};

const PLAYER_FACTION = "조조 세력";

function isPlayerCity(cityName) {
  return !!cities[cityName] && cities[cityName].faction === PLAYER_FACTION;
}

function getFactionClass(faction) {
  if (faction === "조조 세력") return "cao";
  if (faction === "유비 세력") return "liu";
  if (faction === "손견 세력") return "sun";
  return "neutral";
}

function refreshCityMarkers() {
  document.querySelectorAll(".city").forEach(marker => {
    const city = cities[marker.dataset.city];
    if (!city) return;
    marker.classList.remove("cao", "liu", "sun", "neutral");
    marker.classList.add(getFactionClass(city.faction));
  });
}


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

const militaryPanel =
  document.getElementById("militaryPanel");

const attackFromEl =
  document.getElementById("attackFrom");

const targetCityEl =
  document.getElementById("targetCity");

const attackGeneralList =
  document.getElementById("attackGeneralList");

const troopRange =
  document.getElementById("troopRange");

const troopValue =
  document.getElementById("troopValue");

const troopMax =
  document.getElementById("troopMax");

const foodCostEl =
  document.getElementById("foodCost");

const attackPowerPreview =
  document.getElementById("attackPowerPreview");

const defensePowerPreview =
  document.getElementById("defensePowerPreview");

const militaryMessage =
  document.getElementById("militaryMessage");


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

  refreshCityMarkers();

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
   군사 · 출진 시스템
========================================================= */

document
  .getElementById("militaryMenu")
  .addEventListener("click", openMilitaryPanel);

document
  .getElementById("closeMilitaryPanel")
  .addEventListener("click", () => {
    militaryPanel.classList.add("hidden");
  });

troopRange.addEventListener("input", () => {
  game.attackTroops = Number(troopRange.value);
  updateBattlePreview();
});

targetCityEl.addEventListener("change", () => {
  game.attackTarget = targetCityEl.value;
  renderAttackGenerals();
  updateBattlePreview();
});

function openMilitaryPanel() {

  const source =
    game.selectedCity && isPlayerCity(game.selectedCity)
      ? game.selectedCity
      : "낙양";

  game.selectedCity = source;
  game.attackGeneral = null;
  game.attackTarget = null;

  attackFromEl.textContent = source;

  renderTargetCities();
  renderAttackGenerals();
  updateTroopRange();

  militaryMessage.textContent =
    "인접한 적 도시를 선택하고 출진 장수를 정하세요.";

  militaryPanel.classList.remove("hidden");
}

function renderTargetCities() {

  targetCityEl.innerHTML = "";

  const source = game.selectedCity;
  const possible =
    (neighbors[source] || [])
      .filter(name => cities[name] && cities[name].faction !== PLAYER_FACTION);

  if (!possible.length) {
    const option = document.createElement("option");
    option.textContent = "공격 가능한 도시 없음";
    option.value = "";
    targetCityEl.appendChild(option);
    game.attackTarget = null;
    return;
  }

  possible.forEach(name => {
    const option = document.createElement("option");
    const city = cities[name];

    option.value = name;
    option.textContent =
      `${name} · ${city.faction} · 병력 ${city.soldiers.toLocaleString()}`;

    targetCityEl.appendChild(option);
  });

  game.attackTarget = possible[0];
}

function renderAttackGenerals() {

  attackGeneralList.innerHTML = "";

  const source = cities[game.selectedCity];

  if (!source || !source.generals.length) {
    attackGeneralList.innerHTML =
      '<div class="empty-message">출진 가능한 장수가 없습니다.</div>';
    return;
  }

  source.generals.forEach(name => {

    const general = generals[name];
    if (!general) return;

    const card = document.createElement("button");
    card.className = "attack-general";
    card.classList.toggle(
      "selected",
      game.attackGeneral === name
    );

    card.innerHTML = `
      <span class="attack-avatar">👤</span>
      <span class="attack-general-info">
        <b>${name}</b>
        <small>통솔 ${general.command} · 무력 ${general.power}</small>
      </span>
      <span class="attack-check">
        ${game.attackGeneral === name ? "✓" : ""}
      </span>
    `;

    card.addEventListener("click", () => {
      game.attackGeneral = name;
      renderAttackGenerals();
      updateBattlePreview();
    });

    attackGeneralList.appendChild(card);
  });

  if (!game.attackGeneral) {
    game.attackGeneral = source.generals[0];
    renderAttackGenerals();
  }
}

function updateTroopRange() {

  const source = cities[game.selectedCity];

  if (!source) return;

  const max = Math.max(
    1000,
    Math.floor(source.soldiers * 0.8 / 500) * 500
  );

  troopRange.max = max;
  troopRange.min = Math.min(1000, max);

  game.attackTroops =
    Math.min(
      Math.max(1000, game.attackTroops),
      max
    );

  troopRange.value = game.attackTroops;
  troopMax.textContent = max.toLocaleString();

  updateBattlePreview();
}

function calculateAttackPower(troops, general) {

  if (!general) return 0;

  const leaderBonus =
    0.65 +
    (general.command / 200) +
    (general.power / 400);

  return Math.floor(troops * leaderBonus);
}

function calculateDefensePower(city) {

  if (!city) return 0;

  const commander =
    getBestCommandGeneral(city);

  const commandBonus =
    commander
      ? commander.command / 100
      : 0.45;

  const securityBonus =
    1 + city.security / 250;

  return Math.floor(
    city.soldiers *
    (0.7 + commandBonus * 0.35) *
    securityBonus
  );
}

function getBestCommandGeneral(city) {

  if (!city.generals || !city.generals.length) {
    return null;
  }

  return city.generals
    .map(name => generals[name])
    .filter(Boolean)
    .sort((a, b) => b.command - a.command)[0] || null;
}

function updateBattlePreview() {

  const source = cities[game.selectedCity];
  const target = cities[game.attackTarget];
  const leader = generals[game.attackGeneral];

  if (!source || !target || !leader) {
    attackPowerPreview.textContent = "0";
    defensePowerPreview.textContent = "0";
    foodCostEl.textContent = "0";
    return;
  }

  const troops = Number(troopRange.value);
  game.attackTroops = troops;

  const foodCost =
    Math.ceil(troops * 0.5);

  troopValue.textContent =
    troops.toLocaleString();

  foodCostEl.textContent =
    foodCost.toLocaleString();

  attackPowerPreview.textContent =
    calculateAttackPower(troops, leader).toLocaleString();

  defensePowerPreview.textContent =
    calculateDefensePower(target).toLocaleString();
}

document
  .getElementById("attackBtn")
  .addEventListener("click", launchAttack);

function launchAttack() {

  const sourceName = game.selectedCity;
  const targetName = game.attackTarget;
  const leaderName = game.attackGeneral;

  const source = cities[sourceName];
  const target = cities[targetName];
  const leader = generals[leaderName];

  if (!source || !target || !leader) {
    militaryMessage.textContent =
      "출진 정보를 모두 선택해주세요.";
    return;
  }

  if (!isPlayerCity(sourceName)) {
    militaryMessage.textContent =
      "조조 세력의 도시에서만 출진할 수 있습니다.";
    return;
  }

  if (!(neighbors[sourceName] || []).includes(targetName)) {
    militaryMessage.textContent =
      "인접한 도시만 공격할 수 있습니다.";
    return;
  }

  const troops = Number(troopRange.value);
  const foodCost = Math.ceil(troops * 0.5);

  if (troops <= 0 || troops > source.soldiers) {
    militaryMessage.textContent =
      "출진 병력을 확인해주세요.";
    return;
  }

  if (game.food < foodCost) {
    militaryMessage.textContent =
      `군량이 부족합니다. 필요 군량 ${foodCost.toLocaleString()}.`;
    return;
  }

  if (game.gold < 100) {
    militaryMessage.textContent =
      "출진 준비금으로 금 100이 필요합니다.";
    return;
  }

  const attackPower =
    calculateAttackPower(troops, leader);

  const defensePower =
    calculateDefensePower(target);

  const luck =
    0.88 + Math.random() * 0.24;

  const finalAttack =
    Math.floor(attackPower * luck);

  const finalDefense =
    Math.floor(defensePower * (0.94 + Math.random() * 0.12));

  const attackerLossRatio =
    Math.min(
      0.78,
      0.16 +
      finalDefense / Math.max(finalAttack, 1) * 0.22
    );

  const defenderLossRatio =
    Math.min(
      0.92,
      0.28 +
      finalAttack / Math.max(finalDefense, 1) * 0.48
    );

  const attackerLoss =
    Math.max(
      1,
      Math.floor(troops * attackerLossRatio)
    );

  const defenderLoss =
    Math.max(
      1,
      Math.floor(target.soldiers * defenderLossRatio)
    );

  game.gold -= 100;
  game.food -= foodCost;

  source.soldiers =
    Math.max(
      0,
      source.soldiers - troops
    );

  if (finalAttack > finalDefense) {

    target.faction = PLAYER_FACTION;

    target.soldiers =
      Math.max(
        500,
        target.soldiers - defenderLoss
      );

    const survivors =
      Math.max(
        500,
        troops - attackerLoss
      );

    target.soldiers += survivors;

    source.generals =
      source.generals.filter(
        name => name !== leaderName
      );

    target.generals.push(leaderName);

    leader.city = targetName;

    militaryMessage.innerHTML = `
      <b>🎉 ${targetName} 점령!</b><br>
      ${leaderName}의 부대가 승리했습니다.<br>
      아군 피해 ${attackerLoss.toLocaleString()}명 ·
      적 피해 ${defenderLoss.toLocaleString()}명
    `;

    game.selectedCity = targetName;
    game.attackTarget = null;
    game.attackGeneral = null;

    refreshCityMarkers();
    updateResources();

    setTimeout(() => {
      militaryPanel.classList.add("hidden");
      openCity(targetName);
    }, 900);

  } else {

    const retreat =
      Math.max(
        300,
        troops - attackerLoss
      );

    source.soldiers += retreat;

    target.soldiers =
      Math.max(
        500,
        target.soldiers - Math.floor(defenderLoss * 0.7)
      );

    militaryMessage.innerHTML = `
      <b>⚔️ 공격 실패</b><br>
      ${leaderName} 부대가 퇴각했습니다.<br>
      아군 피해 ${attackerLoss.toLocaleString()}명 ·
      적 피해 ${Math.floor(defenderLoss * 0.7).toLocaleString()}명
    `;

    updateResources();
    openCity(sourceName);
  }

  updateTroopRange();
  updateBattlePreview();
}


/* =========================================================
   적 세력 AI
========================================================= */

function runEnemyAI() {

  const enemies = [
    "유비 세력",
    "손견 세력"
  ];

  enemies.forEach(faction => {

    const enemyCities =
      Object.entries(cities)
        .filter(([name, city]) => city.faction === faction);

    enemyCities.forEach(([name, city]) => {

      if (city.soldiers < 3500) return;
      if (Math.random() > 0.18) return;

      const targets =
        (neighbors[name] || [])
          .filter(targetName =>
            isPlayerCity(targetName)
          );

      if (!targets.length) return;

      const targetName =
        targets[Math.floor(Math.random() * targets.length)];

      const target = cities[targetName];

      const troops =
        Math.min(
          Math.floor(city.soldiers * 0.45 / 500) * 500,
          city.soldiers - 1000
        );

      if (troops < 1000) return;

      const leader =
        getBestCommandGeneral(city);

      const attackPower =
        calculateAttackPower(
          troops,
          leader || {
            command: 55,
            power: 50
          }
        );

      const defensePower =
        calculateDefensePower(target);

      const finalAttack =
        attackPower * (0.9 + Math.random() * 0.2);

      const finalDefense =
        defensePower * (0.9 + Math.random() * 0.2);

      city.soldiers -= troops;

      if (finalAttack > finalDefense) {

        const defenderLoss =
          Math.min(
            target.soldiers,
            Math.floor(target.soldiers * 0.65)
          );

        target.soldiers =
          Math.max(
            500,
            target.soldiers - defenderLoss
          );

        target.faction = faction;

        if (target.generals.length) {
          target.generals = [];
        }

      } else {

        city.soldiers +=
          Math.floor(troops * 0.55);

        target.soldiers =
          Math.max(
            500,
            target.soldiers -
            Math.floor(target.soldiers * 0.18)
          );
      }

    });

  });

}


/* =========================================================
   군사 메뉴용 도시 선택 보조
========================================================= */

document
  .getElementById("cityMenu")
  .addEventListener("click", () => {

    if (game.selectedCity) {
      openCity(game.selectedCity);
    } else {
      openCity("낙양");
    }

  });

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

  runEnemyAI();
  refreshCityMarkers();

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
refreshCityMarkers();