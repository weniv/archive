document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://weniv.github.io/weniv_portfolio/src/data/data.json";
  // const apiUrl = "/src/data/data.json"; // 개발용

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
    setInfoMsg(category);

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
      const a = document.createElement("a");
      a.setAttribute("href", item.link);
      a.setAttribute("target", "_blank");

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

      const link = document.createElement("button");
      link.className = "share-btn";
      link.setAttribute("href", item.link);
      link.setAttribute("target", "_blank");
      const img = document.createElement("img");
      img.setAttribute("src", "./src/assets/icon-Shar.svg");
      img.setAttribute("alt", "링크 복사");
      link.appendChild(img);

      link.addEventListener("click", (e) => {
        e.preventDefault();
        copyUrl(item.link);
      });

      addition.appendChild(category);
      addition.appendChild(link);

      info.appendChild(tit);
      info.appendChild(desc);
      info.appendChild(addition);

      a.appendChild(thumb);
      a.appendChild(info);
      li.appendChild(a);

      datafragment.appendChild(li);
    });
    contentList.appendChild(datafragment);
  }
  function copyUrl(link) {
    navigator.clipboard.writeText(link).then((res) => {
      alert("주소가 클립보드에 복사되었습니다.");
    });
  }

  // 카테고리 별로 info-msg 관리
  function setInfoMsg(category) {
    const infoMsg = document.querySelector(".info-msg");
    if (category === "전자책") {
      infoMsg.style.display = "block";
      infoMsg.innerHTML = `
      사도출판의 전자책은 
      <a class='book-link' href="https://ridibooks.com/search?q=%EC%B6%9C%ED%8C%90%EC%82%AC%3A%EC%82%AC%EB%8F%84%EC%B6%9C%ED%8C%90" target="_blank">리디북스</a>, 
      <a class='book-link' href="https://search.kyobobook.co.kr/search?keyword=%EC%82%AC%EB%8F%84%EC%B6%9C%ED%8C%90&gbCode=&target=total&pbcmCode=PB37545" target="_blank">교보문고</a>, 
      <a class='book-link' href="https://www.aladin.co.kr/search/wsearchresult.aspx?PublisherSearch=%ec%82%ac%eb%8f%84%ec%b6%9c%ed%8c%90@269611&BranchType=9" target="_blank">알라딘</a>, 
      <a class='book-link' href="https://www.yes24.com/Product/Search?&domain=ALL&company=%ec%82%ac%eb%8f%84%ec%b6%9c%ed%8c%90&query=%ec%82%ac%eb%8f%84%ec%b6%9c%ed%8c%90" target="_blank">YES24</a>, 
      <a class='book-link' href="https://www.millie.co.kr/v3/search/result/%EC%82%AC%EB%8F%84%EC%B6%9C%ED%8C%90?type=total&contentcode=0&searchBack=y&nav_hidden=y&category=1&order=popular" target="_blank">밀리의서재</a>
      에서 확인하실 수 있습니다.
      `;
    } else {
      infoMsg.style.display = "none";
      infoMsg.innerHTML = "";
    }
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
      if (search) {
        searchData(totalData, search);
      } else {
        renderContent(totalData);
      }
    } else {
      contTitle.innerText = `${category} 컨텐츠 목록`;
      if (search) {
        searchData(storedData[category], search);
      } else {
        renderContent(storedData[category]);
      }
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
    // searchedContent가 빈 배열일 때
    renderContent(searchedContent);
    const msgContent = document.querySelector(".msg-content");
    if (!searchedContent.length) {
      msgContent.innerHTML = `<span class='txt-highlight'>${target}</span> 에 대한 검색 결과가 없습니다.`;
      msgContent.style.display = "block";
    } else {
      msgContent.innerHTML = "";
      msgContent.style.display = "none";
    }
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

  // 입력창 리셋 버튼
  const $resetBtn = document.querySelector(".reset-btn");
  $resetBtn.addEventListener("click", () => {
    $searchInp.value = "";
    search = "";
    if (category === "전체") {
      searchData(totalData, "");
    } else {
      searchData(storedData[category], "");
    }
  });

  // Initialize
  fetchData();
});

function highlight(string, target) {
  return string.split(target).join(`<span class="txt-highlight">${target}</span>`);
}
