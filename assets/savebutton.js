var heart = document.querySelector('#heart'); 
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
function storeHero (searchword) {
    var heartedHeroes = JSON.parse(localStorage.getItem("heartedHeroes", []))
    localStorage.setItem("heartedHeroes", JSON.stringify(searchword))
}
