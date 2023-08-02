document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "/src/data/data.json";
  const contentList = document.querySelector(".content-list");
  let storedData = [];
  let totalData = [];
  let category = "전체";
  let search = "";

  // JSON 파일에서 데이터 가져오기
  async function fetchData() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      storedData = data;
      Object.keys(data).map((key) => {
        totalData.push(...data[key]);
        renderContent(totalData);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // 화면에 컨텐츠를 렌더링
  function renderContent(data) {
    contentList.innerHTML = "";

    // pubData가 없는 경우에는 id 기준으로 정렬
    data.sort((a, b) => {
      if (a.pubDate === "" && b.pubDate === "") {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      } else if (a.pubDate === "") {
        return 1;
      } else if (b.pubDate === "") {
        return -1;
      } else {
        return b.pubDate < a.pubDate ? -1 : b.pubDate > a.pubDate ? 1 : 0;
      }
    });

    const datafragment = document.createDocumentFragment();
    data.forEach((item) => {
      const li = document.createElement("li");
      li.className = "content-item";

      const thumb = document.createElement("img");
      thumb.className = "thumbnail";
      thumb.setAttribute("src", item.thumbnailImg);
      thumb.setAttribute("alt", "썸네일");

      const info = document.createElement("div");
      info.className = "info-cont";
      const tit = document.createElement("strong");
      tit.className = "tit sl-ellipsis";
      tit.innerHTML = item.title;
      const desc = document.createElement("p");
      desc.className = "description multi-ellipsis";
      desc.innerHTML = item.description;

      const addition = document.createElement("div");
      addition.className = "addition-cont";
      const category = document.createElement("p");
      category.className = "category sl-ellipsis";
      category.innerText = item.category;

      const link = document.createElement("a");
      link.className = "link";
      link.setAttribute("href", item.link);
      link.setAttribute("target", "_blank");
      const img = document.createElement("img");
      img.setAttribute("src", "./src/assets/icon-Shar.svg");
      img.setAttribute("alt", "링크로 이동");
      link.appendChild(img);

      addition.appendChild(category);
      addition.appendChild(link);

      info.appendChild(tit);
      info.appendChild(desc);
      info.appendChild(addition);

      li.appendChild(thumb);
      li.appendChild(info);

      datafragment.appendChild(li);
    });
    contentList.appendChild(datafragment);
  }

  // category-btn 을 갖는 모든 label 요소에 이벤트 추가
  const labels = document.querySelectorAll("label");

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      const inputId = label.getAttribute("for");
      const inputElement = document.getElementById(inputId);
      category = inputElement.value;
      setCategory(inputElement.value);
    });
  });

  // 필터 적용 시 화면 재렌더링
  function setCategory(category) {
    const contTitle = document.querySelector(".list-tit");
    if (category === "전체") {
      contTitle.innerText = "전체 컨텐츠 목록";
      renderContent(totalData);
    } else {
      contTitle.innerText = `${category} 컨텐츠 목록`;
      renderContent(storedData[category]);
    }
  }

  function searchData(data, target) {
    const searchedContent = [];
    search = target;

    data.map((item) => {
      if (item.title.includes(target) || item.description.includes(target)) {
        const searched = { ...item };
        searched.title = highlight(searched.title, target);
        searched.description = highlight(searched.description, target);
        searchedContent.push(searched);
      }
    });
    renderContent(searchedContent);
  }

  // 검색 이벤트
  const $searchBtn = document.querySelector(".search-btn");
  const $searchInp = document.querySelector(".search-inp");
  $searchBtn.addEventListener("click", () => {
    if (category == "전체") {
      searchData(totalData, $searchInp.value);
    } else {
      searchData(storedData[category], $searchInp.value);
    }
  });
  $searchInp.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      if (category == "전체") {
        searchData(totalData, $searchInp.value);
      } else {
        searchData(storedData[category], $searchInp.value);
      }
    }
  });

  // Initialize
  fetchData();
});

const $topBtn = document.querySelector(".top-btn");

$topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function highlight(string, target) {
  return string.split(target).join(`<span class="txt-highlight">${target}</span>`);
}
