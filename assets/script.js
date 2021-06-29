var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";
var publicApi = "5676e7d9c3a3777b9fb6a77f56ea448c";
// var searchword = $('#search-hero');

var searchword = "Iron man";
// var queryUrl = "https://gateway.marvel.com:443/v1/public/characters?";
function searchHero(searchword) {
    if (searchword) {
        var queryUrl = "https://gateway.marvel.com:443/v1/public/characters?name=" + searchword+ "&apikey="+ publicApi;
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

