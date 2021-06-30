var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";
var heartContainer = document.querySelector("#hearcontianer");
var publicApi = "5676e7d9c3a3777b9fb6a77f56ea448c";
//var searchword = "Iron man";

//var submitButton = document.querySelector("#submit-button");
//var heroInput = document.querySelector("#hero-input");
var heroActualNames = [
    {
        heroname: "Iron man",
        realname: "Tony Stark"
    },
    {
        heroname: "Captain America",
        realname: "Steve Rodgers"
    },
    {
        heroname: "Spider-man",
        realname: "Tony Stark"
    },
    {
        heroname: "Thor",
        realname: "Thor Odinson"
    },
    {
        heroname: "Ant-man",
        realname: "Scott Lang"
    },
    {
        heroname: "Black Widow",
        realname: "Natasha Romanoff"
    },
    {
        heroname: "Hawkeye",
        realname: "Clint Barton"
    },
    {
        heroname: "Hulk",
        realname: "Bruce Banner"
    },
    {
        heroname: "Captain Marvel",
        realname: "Carol Danvers"
    },
    {
        heroname: "Black Panther",
        realname: "T'Challa"
    },
]


function searchHero(searchword) {
    if (searchword) {
        //console.log(searchword);
        baseUrl = "https://gateway.marvel.com:443/v1/public/characters?name=" + searchword + "&apikey=5676e7d9c3a3777b9fb6a77f56ea448c";
    }
    //console.log(baseUrl);
    fetch(baseUrl)
    .then(function(response){
        if (!response.ok) {
            throw response.json();
            }
            return response.json();
            })
    .then(function(data){
        
        heroPage(data);        
           
        // 
    })

}

function heroPage(data) {
    // showing data
    console.log(data);
    console.log(data.data.results);
    console.log(data.data.results[0].id);
    console.log(data.data.results[0].name);
    console.log(data.data.results[0].description);
    console.log(data.data.results[0].thumbnail.path + "/standard_fantastic.jpg");
    console.log(data.data.results[0].urls[2].type)
    console.log(data.data.results[0].urls[2].url);
    //console.log(data.data.results[0].thumbnail[0].path);
    //console.log(data.data.results[0].thumbnail[0].extension);

    //var heroid = data.data.results[0].id;
    var heroname = data.data.results[0].name;
    var heroDescription = data.data.results[0].description;
    var thumbnail = data.data.results[0].thumbnail.path + "/standard_fantastic.jpg";
    //var heroThumbnail = data.data.results[0].thumbnail[0].path + data.data.results[0].thumbnail[0].extension;

    var appendBlock = 
        `
        <div class="card" style="width: 300px;">
            <div id="heroname" class="card-divider">${heroname}</div>
            <img id="heroThumbnail" src=${thumbnail}>
            <div class="card-section">
                <h4 id="realName"></h4>
                <p id="heroDescription">${heroDescription}</p>
                <div id="embeddedVideo" class="responsive-embed">
                    <iframe width="420" height="315" 
                        src="https://www.youtube.com/embed/PAWjr7qo6Ds" 
                        frameborder="0" allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>`;

    for (var i=0; i<heroActualNames.length; i++) {
        if (heroname === heroActualNames[i].heroname) {
            $("#realName").text() = heroActualNames[i].realname;
        }
    }

    $("#recommended-hero").append(appendBlock);

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