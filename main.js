// main.js

import Bot1 from './bots/bot1.js';
import Bot2 from './bots/bot2.js';

let maxRounds = 0;
let round = 1;
let history = [];
let bot1, bot2;

let manualOverrides = {
  bot1: null,
  bot2: null,
};

function createBot(name, logicFn) {
  return {
    name,
    health: 3,
    ammo: 0,
    logic: logicFn,
    lastChoice: null
  };
}

function generateHealthBar(health) {
  const percent = (health / 3) * 100;
  return `<div class="health-bar" style="width: ${percent}%"></div>`;
}

function updateBotStats() {
  const bot1Stats = document.getElementById("bot1Stats");
  const bot2Stats = document.getElementById("bot2Stats");

  bot1Stats.innerHTML = `
    <img id="bot1Avatar" class="avatar" src="assets/bot1.png" />
    <h2>${bot1.name}</h2>
    ${generateHealthBar(bot1.health)}
    <p>💥 Ammo: ${bot1.ammo}</p>
    <p>🧠 Last Choice: ${bot1.lastChoice || '-'}</p>
  `;

  bot2Stats.innerHTML = `
    <img id="bot2Avatar" class="avatar" src="assets/bot2.png" />
    <h2>${bot2.name}</h2>
    ${generateHealthBar(bot2.health)}
    <p>💥 Ammo: ${bot2.ammo}</p>
    <p>🧠 Last Choice: ${bot2.lastChoice || '-'}</p>
  `;
}

function logMessage(msg) {
  const log = document.getElementById("log");
  log.innerHTML += `<p>${msg}</p>`;
}

function logRound(round, bot1, bot2) {
  const log = document.getElementById("log");
  log.innerHTML += `
    <h3>Round ${round}</h3>
    <p>${bot1.name}: ${bot1.lastChoice} | HP: ${bot1.health} | Ammo: ${bot1.ammo}</p>
    <p>${bot2.name}: ${bot2.lastChoice} | HP: ${bot2.health} | Ammo: ${bot2.ammo}</p>
    <hr />
  `;
}

function resolveActions(botA, actionA, botB, actionB) {
  const aShoots = actionA === "Shoot" && botA.ammo > 0;
  const bShoots = actionB === "Shoot" && botB.ammo > 0;

  if (actionA === "Reload") botA.ammo++;
  if (actionB === "Reload") botB.ammo++;

  if (aShoots) botA.ammo--;
  if (bShoots) botB.ammo--;

  if (aShoots && actionB !== "Block") botB.health--;
  if (bShoots && actionA !== "Block") botA.health--;

  playSound(actionA);
  playSound(actionB);
}

function showActionFX(bot, action) {
  const fx = document.getElementById("actionFx");
  fx.innerText = `${bot.name} ➡️ ${action}!`;
  setTimeout(() => (fx.innerText = ""), 1200);
}

function playSound(action) {
  const sfx = new Audio(`assets/sfx/${action.toLowerCase()}.mp3`);
  sfx.play();
}

function declareWinner() {
  const log = document.getElementById("log");
  const winner =
    bot1.health > bot2.health ? bot1.name :
    bot2.health > bot1.health ? bot2.name :
    "Draw";

  log.innerHTML += `<h2>🏆 Winner: ${winner} 🏆</h2>`;
  document.getElementById("nextRoundBtn").disabled = true;
  document.getElementById("exportBtn").style.display = "inline";
}

function playRound() {
  const choice1 = manualOverrides.bot1 || bot1.logic(history, bot1, bot2);
  const choice2 = manualOverrides.bot2 || bot2.logic(history, bot2, bot1);

  bot1.lastChoice = choice1;
  bot2.lastChoice = choice2;

  manualOverrides.bot1 = null;
  manualOverrides.bot2 = null;

  resolveActions(bot1, choice1, bot2, choice2);

  history.push({
    round,
    results: [
      { name: bot1.name, choice: choice1, health: bot1.health, ammo: bot1.ammo },
      { name: bot2.name, choice: choice2, health: bot2.health, ammo: bot2.ammo }
    ]
  });

  updateBotStats();
  logRound(round, bot1, bot2);
  showActionFX(bot1, choice1);
  setTimeout(() => showActionFX(bot2, choice2), 600);

  round++;

  if (round > maxRounds || bot1.health <= 0 || bot2.health <= 0) {
    declareWinner();
  }
}

window.manualBotAction = function(botId, action) {
  manualOverrides[botId] = action === 'Auto' ? null : action;
  logMessage(`${botId.toUpperCase()} set to: ${action}`);
};

// Event listeners

document.getElementById("startGameBtn").addEventListener("click", () => {
  maxRounds = parseInt(document.getElementById("roundCountInput").value, 10);

  bot1 = createBot("Bot 1", Bot1);
  bot2 = createBot("Bot 2", Bot2);

  round = 1;
  history = [];

  document.getElementById("log").innerHTML = "";
  document.getElementById("nextRoundBtn").disabled = false;
  document.getElementById("exportBtn").style.display = "none";
  document.getElementById("actionFx").innerText = "";

  manualOverrides.bot1 = null;
  manualOverrides.bot2 = null;

  updateBotStats();
  logMessage(`🟢 Game started: ${maxRounds} rounds`);
});

document.getElementById("nextRoundBtn").addEventListener("click", () => {
  playRound();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const data = JSON.stringify(history, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "match-history.json";
  a.click();
  URL.revokeObjectURL(url);
});
