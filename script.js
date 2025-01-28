const liXi = document.getElementById("li-xi");
const liXiImage = document.getElementById("li-xi-image");
const moneyImage = document.getElementById("money-image");
const instruction = document.querySelector(".instruction");
const reopenButton = document.getElementById("reopen-button");
const happyNewYearText = document.querySelector("h2"); 

const moneyImages = [
    { image: "10k.png", probability: 0.34, message: "Bạn đã trúng 10.000 VNĐ! 🎉" }, // 34%
    { image: "20k.png", probability: 0.3, message: "Bạn đã trúng 20.000 VNĐ! 🎉" }, // 30%
    { image: "50k.png", probability: 0.2, message: "Bạn đã trúng 50.000 VNĐ! 🎉" }, // 20%
    { image: "100k.png", probability: 0.1, message: "Bạn đã trúng 100.000 VNĐ! 🎉" }, // 10%
    { image: "200k.png", probability: 0.05, message: "Bạn đã trúng 200.000 VNĐ! 🎉" }, // 5%
    { image: "500k.png", probability: 0.01, message: "Bạn đã trúng 500.000 VNĐ! 🎉" }, // 1%
];

let isLiXiOpen = false;

function getRandomMoneyImage() {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const money of moneyImages) {
    cumulativeProbability += money.probability;
    if (random < cumulativeProbability) {
      return money;
    }
  }
}

function openLiXi() {
  if (isLiXiOpen) return;

  isLiXiOpen = true;

  const selectedMoney = getRandomMoneyImage(); 

  liXiImage.style.animation = "none";
  liXiImage.style.animation = "fadeOut 0.5s ease forwards";

  setTimeout(() => {
    liXiImage.classList.add("hidden");
    moneyImage.src = selectedMoney.image; 
    moneyImage.classList.remove("hidden");
    moneyImage.style.animation = "fadeIn 0.5s ease forwards";

   
    happyNewYearText.textContent = selectedMoney.message;

    instruction.classList.add("hidden");
    reopenButton.classList.remove("hidden");
  }, 500);
}

function closeLiXi() {
  isLiXiOpen = false;

  moneyImage.classList.add("hidden");
  liXiImage.classList.remove("hidden");
  liXiImage.style.animation = "shake 4s infinite";

 
  happyNewYearText.textContent = "Happy New Year";

  reopenButton.classList.add("hidden");
  instruction.classList.remove("hidden");
}

liXi.addEventListener("click", openLiXi);
reopenButton.addEventListener("click", closeLiXi);