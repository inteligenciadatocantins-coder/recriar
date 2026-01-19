const bins = Array.from(document.querySelectorAll(".bin"));
const scoreEl = document.getElementById("score");
const missesEl = document.getElementById("misses");
const targetEl = document.getElementById("target");
const fallingItem = document.getElementById("falling-item");
const playfield = document.querySelector(".game__playfield");

const trashTypes = [
  {
    type: "papel",
    label: "Papel",
    color: "#1a4dff",
    icon: "📰",
  },
  {
    type: "plastico",
    label: "Plástico",
    color: "#ff3d3d",
    icon: "🥤",
  },
  {
    type: "vidro",
    label: "Vidro",
    color: "#1da45a",
    icon: "🍾",
  },
  {
    type: "metal",
    label: "Metal",
    color: "#f6d500",
    icon: "🥫",
  },
  {
    type: "organico",
    label: "Orgânico",
    color: "#8a5b46",
    icon: "🥬",
  },
];

let selectedBin = "papel";
let score = 0;
let misses = 0;
let currentTrash = trashTypes[0];
let itemY = 140;
let speed = 1.2;
let animationFrame = null;

const selectBin = (type) => {
  selectedBin = type;
  bins.forEach((bin) => {
    bin.classList.toggle("is-selected", bin.dataset.type === type);
  });
};

const updateScoreboard = () => {
  scoreEl.textContent = score;
  missesEl.textContent = misses;
  targetEl.textContent = currentTrash.label;
};

const spawnTrash = () => {
  currentTrash = trashTypes[Math.floor(Math.random() * trashTypes.length)];
  itemY = 140;
  speed = 1.1 + Math.random() * 1.2;
  fallingItem.style.background = currentTrash.color;
  fallingItem.innerHTML = `<div>${currentTrash.icon}<br /><span>${currentTrash.label}</span></div>`;
  updateScoreboard();
};

const dropStep = () => {
  const limit = playfield.clientHeight - 150;
  itemY += speed;
  fallingItem.style.top = `${itemY}px`;

  if (itemY >= limit) {
    if (selectedBin === currentTrash.type) {
      score += 1;
    } else {
      misses += 1;
    }
    spawnTrash();
  }

  animationFrame = requestAnimationFrame(dropStep);
};

bins.forEach((bin) => {
  bin.addEventListener("click", () => selectBin(bin.dataset.type));
});

selectBin(selectedBin);
spawnTrash();
updateScoreboard();
animationFrame = requestAnimationFrame(dropStep);

window.addEventListener("beforeunload", () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
