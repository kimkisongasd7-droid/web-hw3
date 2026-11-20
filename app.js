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
        card.innerHTML = `
           <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
           <span class="badge">${m.rating}</span>
           <div class="info">
           <h2>${m.title}</h2>
           <p class="year">${m.year}</p>
           <button class="like" type="button">♥</button>
           </div>`;
        board.appendChild(card);
        document.querySelector("#count").textContent = list.length + "편";
        updateLikeCount();
    }
    if (list.length === 0) { board.classList.add("is-empty"); } else { board.classList.remove("is-empty"); }
}


