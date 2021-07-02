var heart = document.querySelector('#heart'); 
var recentSearchList = [];


heart.addEventListener('click', function() {
    var searchword = $("#hero-input").val().trim();
    storeHero(searchword);
    addToHeartedList(searchword);
})
function addToHeartedList(){
    var heartedHero = document.createElement('<a>');
    heartedHero.classList.add("button expanded", "btn");
    heartedHero.setAttribute("data-hero", searchword);
    heartedHero.textContent = searchword;
    heartContainer.appendChild(searchword)
} 

function storeRecentSearch () {
    recentSearchList = JSON.parse(localStorage.getItem("recentlySearched")) || [];
    recentSearchList.push(currentHero);
    localStorage.setItem("recentlySearched", JSON.stringify(recentSearchList))
}