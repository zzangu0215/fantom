var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";
var heartContainer = document.querySelector("#hearcontianer");
var publicApi = "5676e7d9c3a3777b9fb6a77f56ea448c";
var searchword = "Iron man";

//var submitButton = document.querySelector("#submit-button");
//var heroInput = document.querySelector("#hero-input");

function searchHero(searchword) {
    if (searchword) {
        console.log(searchword);
        baseUrl = "https://gateway.marvel.com:443/v1/public/characters?name=" + searchword + "&apikey=5676e7d9c3a3777b9fb6a77f56ea448c";
    }console.log(baseUrl);
    fetch(baseUrl)
    .then(function(response){
        if (!response.ok) {
            throw response.json();
            }
            return response.json();
            })
    .then(function(data){
        // showing data
        console.log(data);
        console.log(data.data.results);
        console.log(data.data.results[0].id);
        console.log(data.data.results[0].name);
        console.log(data.data.results[0].description);
        //console.log(data.data.results[0].thumbnail[0].path);
        //console.log(data.data.results[0].thumbnail[0].extension);

        var heroid = data.data.results[0].id;
        var heroname = data.data.results[0].name;
        var heroDescription = data.data.results[0].description;
        var heroThumbnail = data.data.results[0].thumbnail[0].path + data.data.results[0].thumbnail[0].extension;
        

        
        
        // 
    })

    }

//searchHero(searchword);
$("#submit-button").on("click", function (event) {
    event.preventDefault();

    var searchword = $("#hero-input").val().trim();

    searchHero(searchword);
})



function addToHeartedList(){
    var heartedHero = document.createElement('<a>');

    heartedHero.classList.add("button expanded", "btn");

    heartedHero.setAttribute("data-hero", searchword);
    heartedHero.textContent = searchword;
    heartContainer.appendChild(searchword)

}