var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";
var heartContainer = document.querySelector("#hearcontianer");
var publicApi = "5676e7d9c3a3777b9fb6a77f56ea448c";

//var submitButton = document.querySelector("#submit-button");
//var heroInput = document.querySelector("#hero-input");
var mainPageEl = document.querySelector(".main-page");
var heroPageEl = document.querySelector(".hero-page");

var apiKey = "AIzaSyDulmGtXAtdv2UwgdW8GNIU1V_Bo9xDEv0";
var url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCvC4D8onUfXzvjTOM-dBfEA&key="+apiKey;
var clientId = "106795843179-dolmi6dsd59adguvk0hveoeco1gtaqh4.apps.googleusercontent.com";
var srcUrl = 'https://www.youtube.com/embed/';

mainPageEl.style.display = "block";
heroPageEl.style.display = "none";


var heroActualNames = [
    {
        heroname: "Iron Man",
        realname: "Tony Stark",
        herovideoId: "f_h95mEd4TI"
    },
    {
        heroname: "Captain America",
        realname: "Steve Rodgers",
        herovideoId: "43NWzay3W4s"
    },
    {
        heroname: "Spider-Man",
        realname: "Peter Parker",
        herovideoId: "LFoz8ZJWmPs"
    },
    {
        heroname: "Thor",
        realname: "Thor Odinson",
        herovideoId: "v7MGUNV8MxU"
    },
    {
        heroname: "Ant-man",
        realname: "Scott Lang",
        herovideoId: "8_rTIAOohas"
    },
    {
        heroname: "Black Widow",
        realname: "Natasha Romanoff",
        herovideoId: "Fp9pNPdNwjI"
    },
    {
        heroname: "Hawkeye",
        realname: "Clint Barton"
    },
    {
        heroname: "Hulk",
        realname: "Bruce Banner",
        herovideoId: "xbqNb2PFKKA"
    },
    {
        heroname: "Captain Marvel",
        realname: "Carol Danvers",
        herovideoId: "Z1BCujX3pw8"
    },
    {
        heroname: "Black Panther",
        realname: "T'Challa",
        herovideoId: "xjDjIWPwcPU"
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
            <h2 id="heroname" class="card-divider">${heroname}</h2>
            <img id="heroThumbnail" src=${thumbnail}>
            <div class="card-section">
                <p id="heroDescription">${heroDescription}</p>
                <div id="embeddedVideo" class="responsive-embed">
                    <iframe width="420" height="315" 
                        src="https://www.youtube.com/embed/${herovideoId}" 
                        frameborder="0" allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>`;

    $(".hero-page").append(appendBlock);

    for (var i=0; i<heroActualNames.length; i++) {
        if (heroname === heroActualNames[i].heroname) {
            var realnameBlock = `<h4 id="realName">
                                    \n${heroActualNames[i].realname}
                                </h4>`;
            $("#heroname").append(realnameBlock);
            var heroVideoid = heroActualNames[i].herovideoId;
        }
    }

    heroPageEl.style.display = "block";
}


//searchHero(searchword);
$("#submit-button").on("click", function (event) {
    event.preventDefault();

    var searchword = $("#hero-input").val().trim();

    searchHero(searchword);

    mainPageEl.style.display = "none";
})


fetch(url)
   .then(function(response){
       if (!response.ok) {
           throw response.json();
           }
           return response.json();
           })
   .then(function(data){
       
       console.log(data);
       data.items.forEach(function(element, index) {

        var appendBlock = 
            `
                <iframe width='560' height='315' src="${srcUrl}/${element.id.videoId}" frameborder="0" allowfullscreen></iframe>
            `;
        $('body').append(appendBlock);
       })
   })      
