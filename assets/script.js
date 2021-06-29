var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";
var publicApi = "5676e7d9c3a3777b9fb6a77f56ea448c";
var searchword = "Iron man";

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
        console.log(data);
        // showing data
        console.log(data.results[0]);
        // hero id
        console.log(data.results[2]);
        // hero description
        console.log()
        // 
    })

    }

searchHero(searchword);

