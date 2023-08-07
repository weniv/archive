// 상단 이동 버튼
const $topBtn = document.querySelector(".top-btn");

$topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 공식 홈페이지 이동 버튼
const $officialLink = document.querySelector(".official-link");
$officialLink.addEventListener("mouseenter", () => {
  $officialLink.querySelector("img").setAttribute("src", "./src/assets/icon-Home-dark.svg");
});
$officialLink.addEventListener("mouseleave", () => {
  $officialLink.querySelector("img").setAttribute("src", "./src/assets/icon-Home.svg");
});

// 리셋 버튼 활성화
const $resetBtn = document.querySelector(".reset-btn");
const $searchInp = document.querySelector(".search-inp");

// resetBtn은 display:none 속성을 가진다.
// searchInp에 focus되거나 마우스가 hover 되었을 때, resetBtn이 보이도록 한다.
// searchInp이 없는 경우에는 resetBtn은 display:none 속성을 가진다.
$searchInp.addEventListener("focus", () => {
  $resetBtn.style.display = "block";
});
$searchInp.addEventListener("blur", () => {
  $resetBtn.style.display = "none";
});
$searchInp.addEventListener("mouseenter", () => {
  $resetBtn.style.display = "block";
});
$searchInp.addEventListener("mouseleave", () => {
  $resetBtn.style.display = "none";
});
