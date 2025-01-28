const liXi = document.getElementById("li-xi");
const liXiImage = document.getElementById("li-xi-image");
const moneyImage = document.getElementById("money-image");
const instruction = document.querySelector(".instruction");
const reopenButton = document.getElementById("reopen-button");
const happyNewYearText = document.querySelector("h2");
const music = document.getElementById("music"); // Tham chiếu đến thẻ audio

// Mảng chứa thông tin về các lì xì, bao gồm hình ảnh, xác suất, thông báo và bài hát
const moneyImages = [
  { image: "10k.png", probability: 0.34, message: "Bạn đã trúng 10.000 VNĐ! 🎉", song: "sounds/10kSong.mp3" }, // 34%
  { image: "20k.png", probability: 0.3, message: "Bạn đã trúng 20.000 VNĐ! 🎉", song: "sounds/20kSong.mp3" }, // 30%
  { image: "50k.png", probability: 0.2, message: "Bạn đã trúng 50.000 VNĐ! 🎉", song: "sounds/50kSong.mp3" }, // 20%
  { image: "100k.png", probability: 0.1, message: "Bạn đã trúng 100.000 VNĐ! 🎉", song: "sounds/100kSong.mp3" }, // 10%
  { image: "200k.png", probability: 0.05, message: "Bạn đã trúng 200.000 VNĐ! 🎉", song: "sounds/200kSong.mp3" }, // 5%
  { image: "500k.png", probability: 0.01, message: "Bạn đã trúng 500.000 VNĐ! 🎉", song: "sounds/500kSong.mp3" }, // 1%
];

let isLiXiOpen = false;

// Hàm chọn ngẫu nhiên một lì xì từ mảng moneyImages
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

// Hàm mở lì xì
function openLiXi() {
  if (isLiXiOpen) return;

  isLiXiOpen = true;

  const selectedMoney = getRandomMoneyImage();

  // Ẩn hình ảnh lì xì đóng
  liXiImage.style.animation = "none";
  liXiImage.style.animation = "fadeOut 0.5s ease forwards";

  setTimeout(() => {
    liXiImage.classList.add("hidden");
    moneyImage.src = selectedMoney.image; // Hiển thị hình ảnh tiền
    moneyImage.classList.remove("hidden");
    moneyImage.style.animation = "fadeIn 0.5s ease forwards";

    // Hiển thị thông báo
    happyNewYearText.textContent = selectedMoney.message;

    // Ẩn hướng dẫn và hiển thị nút mở lại
    instruction.classList.add("hidden");
    reopenButton.classList.remove("hidden");

    // Phát bài hát tương ứng
    music.src = selectedMoney.song; // Cập nhật đường dẫn bài hát
    music.play(); // Phát nhạc
  }, 500);
}

// Hàm đóng lì xì
function closeLiXi() {
  isLiXiOpen = false;

  // Ẩn hình ảnh tiền và hiển thị lại hình ảnh lì xì đóng
  moneyImage.classList.add("hidden");
  liXiImage.classList.remove("hidden");
  liXiImage.style.animation = "shake 4s infinite";

  // Đặt lại thông báo
  happyNewYearText.textContent = "Happy New Year";

  // Ẩn nút mở lại và hiển thị hướng dẫn
  reopenButton.classList.add("hidden");
  instruction.classList.remove("hidden");

  // Dừng bài hát và đặt lại thời gian phát
  music.pause();
  music.currentTime = 0;
}

// Gán sự kiện click cho lì xì và nút mở lại
liXi.addEventListener("click", openLiXi);
reopenButton.addEventListener("click", closeLiXi);