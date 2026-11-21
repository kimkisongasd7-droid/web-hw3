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


function posterUrl(path, size) {
    return "https://image.tmdb.org/t/p/" + size + path;
}



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
function refresh() { 
    renderCards(getView()); 
}

// 찜한 제목 배열을 브라우저에 저장하고 불러오기(교재에 없는 문법: localStorage, JSON)
const liked = JSON.parse(localStorage.getItem("liked") || "[]");
function saveLiked() {
 localStorage.setItem("liked", JSON.stringify(liked));
}






document.getElementById("q").addEventListener("input", refresh);
document.getElementById("sort").addEventListener("change", refresh);
document.getElementById("typeFilter").addEventListener("change", refresh);
refresh();

renderCards(movies);


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

});





