const $topBtn = document.querySelector(".top-btn");

$topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const $officialLink = document.querySelector(".official-link");
$officialLink.addEventListener("mouseenter", () => {
  $officialLink.querySelector("img").setAttribute("src", "./src/assets/icon-home-dark.svg");
});
$officialLink.addEventListener("mouseleave", () => {
  $officialLink.querySelector("img").setAttribute("src", "./src/assets/icon-home.svg");
});
