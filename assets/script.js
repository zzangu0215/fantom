var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";
var publicApi = "ca005abda60b0404cf146a9cb51c1cce40fb094d";
var heartContainer = document.querySelector("#hearcontianer");
// var searchword = $('#search-hero');

var searchword = "Iron man";
// var queryUrl = "https://gateway.marvel.com:443/v1/public/characters?";
function searchHero(searchword) {
    if (searchword) {
        var queryUrl = "https://gateway.marvel.com:443/v1/public/characters?name=" + searchword+ "&apikey=ca005abda60b0404cf146a9cb51c1cce40fb094d";
        console.log(queryUrl);
    }
    
    fetch(queryUrl)
    .then(function(response){
        if (!response.ok) {
            throw response.json();
            }
            return response.json();
            })
    .then(function(data){
        console.log(data);
    })

    }

searchHero();



function addToHeartedList(){
    var heartedHero = document.createElement('<a>');

    heartedHero.classList.add("button expanded", "btn");

    heartedHero.setAttribute("data-hero", searchword);
    heartedHero.textContent = searchword;
    heartContainer.appendChild(searchword)

}