$(".main-page").show();
$(".menu-dropdown").show();

$(".not-main-page").hide();

var currentHero = "";
var heroList = JSON.parse(localStorage.getItem(currentHero)) || [];


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
        heroname: "Black Panther",
        realname: "T'Challa",
        herovideoId: "xjDjIWPwcPU"
    },
]

var heroDescription = [ 
    {
        name: "Black Widow",
        description: "Deadly one-woman fighting force. An expert in many forms of martial arts, she is also a skilled gymnast and possesses superhuman strength, speed, agility, and endurance."
    },
    {
        name: "Black Panther",
        description: "The title held by T'Challa, a member of the royal family of the fictional African country of Wakanda. After the death of his father, T'Challa claimed the throne and the role of Black Panther. He was exposed to a mystical herb that enhanced his strength and agility to near-superhuman levels."
    },
    {
        name: "Hawkeye",
        description: "The man who would become known as Hawkeye was born Clint Barton. Orphaned at an early age, he joined the circus and apprenticed himself to the Swordsman, a performer who specialized in tricks with blades."
    } 
]

function searchHero(searchword) {

    var marvelAPI = "5676e7d9c3a3777b9fb6a77f56ea448c";

    if (searchword) {

        var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?name=" 
                        + searchword 
                        + "&apikey="
                        + marvelAPI;
    }
    fetch(baseUrl)
    .then(function(response){
        if (!response.ok) {
            throw response.json();
            }
            return response.json();
            })
    .then(function(data){
        
        heroPage(data);        
           
    })

}

function heroPage(data) {
    
    createHomeButton();

    var heroname = data.data.results[0].name;
    var heroDescription = data.data.results[0].description;

    var thumbnail = data.data.results[0].thumbnail.path + "/standard_fantastic.jpg";

    var appendBlock = 
        `
        <div class="card" style="width: 300px;">
            <h2 id="heroname" class="card-divider">${heroname}</h2>
            <img id="heroThumbnail" src=${thumbnail}>
            <div class="card-section">
                <p id="heroDescription">${heroDescription}</p>
                <div id="embeddedVideo" class="responsive-embed">
                    
                </div>
            </div>
            <button id="heart" type="button" class="success button">Save</button>
        </div>`;

    $(".hero-page").append(appendBlock);

    for (var i=0; i<heroActualNames.length; i++) {
        if (heroname === heroActualNames[i].heroname) {
            var realnameBlock = `<h4 id="realName">
                                    \n${heroActualNames[i].realname}
                                </h4>`;
            $("#heroname").append(realnameBlock);

            var youtubeBlock = 
            `
            <iframe width="420" height="315" 
                src="https://www.youtube.com/embed/${heroActualNames[i].herovideoId}" 
                frameborder="0" allowfullscreen>
            </iframe>`

            $("#embeddedVideo").append(youtubeBlock);
        }
    }

    $(".hero-page").show();
}

function createHomeButton() {

    var homeButtonBlock = 
        `
        <button type="button" class="button secondary" id="home-button">HOME</button>
        `;

    $(".not-main-page").append(homeButtonBlock);

}

function goToHome() {
    
    console.log("1");

    $(this).parent().hide();
    $(this).parent().empty();
    $(".main-page").show();
    $("#hero-input").val("");

}

function goToMyHeroes() {

    createHomeButton();

    $(".main-page").hide();
    $(".hero-page").hide();
    $(".recent-searches").hide();
    $(".popular-series").hide();

    var myHeroPageBlock = 
        `
            <header>
                <div class="grid-x grid-padding-x">
                    <h1 class="main-header">MY HERO</h1>
                </div>
            </header>
            <body>
                <div id="heartContainer" class="flex-container flex-dir-column heartedContainer">
                    <a href="#0" class="button expanded btn">Spider-Man</a>
                    <a href="#0" class="button expanded btn">Black Panther</a>
                    <a href="#0" class="button expanded btn">Iron Man</a>
                </div>
            </body>
        `;

    $(".hearted-heroes").append(myHeroPageBlock);
    
    $(".hearted-heroes").show();
}

function storeHero () {
    var heroList = JSON.parse(localStorage.getItem("savedHeroes")) || [];
    heroList.push(currentHero);
    localStorage.setItem("savedHeroes", JSON.stringify(heroList))
}

$(".hero-page").on("click", "#heart", storeHero);

$(".not-main-page").on("click", "#home-button", goToHome);

$("#goto-myheroes").on("click", goToMyHeroes);

$("#submit-button").on("click", function (event) {
    event.preventDefault();

    currentHero = $("#hero-input").val().trim();

    searchHero(currentHero);

    $(".main-page").hide();
})



