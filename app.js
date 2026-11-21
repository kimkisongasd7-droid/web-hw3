const dialog = document.getElementById("detail");

// 배열, 속성명, 내림차순 여부 => 정렬된 새 배열
function sortBy(list, key, desc) {
    return [...list].sort((a, b) => {
        let result = 0;
        if (typeof a[key] === "string") {
            result = a[key].localeCompare(b[key]);
        } else {
            result = a[key] - b[key];
        }
        const sign = desc ? -1 : 1;
        return result * sign;
    });
}


//배열, 문자열 => 새 배열
function search(list, keyword) {
    keyword = keyword.trim().toLowerCase();
    return list.filter(m => m.title.toLowerCase().includes(keyword));
}

// 경로, 크기 => TMDB 포스터 이미지 URL 문자열
function posterUrl(path, size) {
    return "https://image.tmdb.org/t/p/" + size + path;
}


// 영화 배열 => 없음(보드 DOM 렌더링 및 개수 갱신)
const renderCards = (list) => {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        if (m.rating >= 8) {
            card.classList.add("hot");
        }


        card.setAttribute("data-type", m.type);
        card.setAttribute("data-title", m.title);
        let rank = "";
        if (m.type === "boxoffice") {
            rank = `<span class="rank">${m.rank}</span>`;
        }
        let poster = `<img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">`;
        if (m.poster === null) {
            card.classList.add("no-poster");
            poster = `<div class="poster-fallback">${m.title[0]}</div>`;
        }
        let heart = "like";
        if (liked.includes(m.title)) {
            heart = "like liked";
        }

        card.innerHTML = `
           ${poster}
           ${rank}
           <span class="badge">${m.rating}</span>
           <div class="info">
           <h3>${m.title}</h3>
           <p class="year">${m.year}</p>
           <button class="${heart}" type="button">♥</button>
           </div>`;
        board.appendChild(card);
     
        //updateLikeCount();
    }
    document.querySelector("#count").textContent = list.length + "편";
    document.getElementById("likeCount").textContent = liked.length;
    if (list.length === 0) { board.classList.add("is-empty"); } else { board.classList.remove("is-empty"); }
}
// 없음 => 검색·필터·정렬이 적용된 영화 배열
function getView() {
    const keyword = document.getElementById("q").value;
    const type = document.querySelector("input[name='type']:checked").value;
    const key = document.getElementById("sort").value;
    let list = search(movies, keyword);
    if (type !== "all") {
        list = list.filter(m => m.type === type);
    }
    return sortBy(list, key, key !== "title");
}
// 없음 => 없음(현재 조건으로 화면 다시 그리기)
function refresh() { 
    renderCards(getView()); 
}

// 찜한 제목 배열을 브라우저에 저장하고 불러오기(교재에 없는 문법: localStorage, JSON)
const liked = JSON.parse(localStorage.getItem("liked") || "[]");
function saveLiked() {
 localStorage.setItem("liked", JSON.stringify(liked));
}

// 영화 제목 => 없음(상세 대화상자 내용 채우고 열기)
function openDetail(title) {
    const movie = movies.find(m => m.title === title);
    if (!movie) return;
    document.getElementById("detailBody").innerHTML = `
        <img src="${posterUrl(movie.poster, "w500")}" alt="${movie.title} 포스터">
        <h2>${movie.title}</h2>
        <p>개봉일 ${movie.date}, 평점 ${movie.rating}</p>
        <p>${movie.overview}</p>`;
    dialog.showModal();
}

renderCards(movies);






document.getElementById("q").addEventListener("input", refresh);
document.getElementById("sort").addEventListener("change", refresh);
document.getElementById("typeFilter").addEventListener("change", refresh);
refresh();




document.querySelector(".board").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const title = card.getAttribute("data-title");
    if (e.target.closest(".like")) {
        const i = liked.indexOf(title);
        if (i === -1) {
            liked.push(title);
        } else {
            liked.splice(i, 1);
        }
        saveLiked();
        refresh();
        return;
    }
    openDetail(title);
});
document.getElementById("closeDetail").addEventListener("click", () => {
    dialog.close();
});





