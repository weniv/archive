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
const $searchCont = document.querySelector(".search-cont");
const $searchInp = $searchCont.querySelector(".search-inp");
const $resetBtn = $searchCont.querySelector(".reset-btn");

// $searchInp에 값이 있을 때, $resetBtn의 display를 block으로 변경합니다
$searchInp.addEventListener("keyup", () => {
  if ($searchInp.value) {
    $resetBtn.style.display = "block";
  } else {
    $resetBtn.style.display = "none";
  }
});
