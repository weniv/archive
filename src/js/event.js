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

// 입력창 리셋 버튼
const $searchInp = document.querySelector(".search-inp");
const $resetBtn = document.querySelector(".reset-btn");
$resetBtn.addEventListener("click", () => {
  $searchInp.value = "";
  console.log($searchInp.value);
});
