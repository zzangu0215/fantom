$(".main-page").show();
$(".menu-dropdown").show();
fetchYouTube();

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

function fetchYouTube() {

    var youtubeAPI = "AIzaSyDulmGtXAtdv2UwgdW8GNIU1V_Bo9xDEv0";
    var youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCvC4D8onUfXzvjTOM-dBfEA&key=" + youtubeAPI;
    //var clientId = "106795843179-dolmi6dsd59adguvk0hveoeco1gtaqh4.apps.googleusercontent.com";
    var srcUrl = "https://www.youtube.com/embed/";

    fetch(youtubeUrl)
    .then(function(response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function(data){
        data.items.forEach(function(element, index) {
            var recommendedVideoBlock = 
                `
                    <iframe width="560" height="315" src="${srcUrl}/${element.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `;

            $("#hero-trailer").append(recommendedVideoBlock);
        })
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


function goToPopularSeries() {

    createHomeButton();

    $(".main-page").hide();
    $(".hero-page").hide();
    $(".recent-searches").hide();
    $(".hearted-heroes").hide();

    var popularHeroes = [
        {
            heroname: "The Avengers",
            realname: "The Avengers",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/2/2b/Avengers_%28Marvel_Comics%29_vol_3_num_38.jpg",
            description: "Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle. With a roster that has included Captain America, Iron Man, Ant-Man, Hulk, Thor, Wasp and dozens more over the years, the Avengers have come to be regarded as Earth's No. 1 team.",
            youtube: "https://www.youtube.com/embed/TcMBFSGVi1c"
        },
        {
            heroname: "Spider-Man",
            realname: "Peter Parker",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
            description: "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
            youtube: "https://www.youtube.com/embed/Nt9L1jCKGnE"
        },
        {
            heroname: "Captain America",
            realname: "Steve Rogers",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/91/CaptainAmerica109.jpg",
            description: "Vowing to serve his country any way he could, young Steve Rogers took the super soldier serum to become America's one-man army. Fighting for the red, white and blue for over 60 years, Captain America is the living, breathing symbol of freedom and liberty.",
            youtube: "https://www.youtube.com/embed/dKrVegVI0Us"
        },
        {
            heroname: "Iron Man",
            realname: "Tony Stark",
            thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png",
            description: "Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.",
            youtube: "https://www.youtube.com/embed/Ke1Y3P9D0Bc"
        }
    ]

    var popularSeriesBlock = 
            `
            <div class="row">
                <div class="columns">
                    <h2>Popular Series</h2>
                    <p>These are a few Popular series in the marvel universe.</p>
                </div>
            </div>

            <div class="row">
                <div class="columns">
                    <ul id="popular-lists" class="accordion" data-allow-all-closed="true" data-accordion>
                    </ul>
                </div>
            </div>
            `
    
    $(".popular-series").append(popularSeriesBlock);

    for (var i=0; i<popularHeroes.length; i++) {

        var popularBlock = 
            `
            <li class="accordion-item is-active" data-accordion-item>
                <a href="#" class="accordion-title">${popularHeroes[i].heroname}</a>
                <div class="accordion-content" data-tab-content>
                    <div class="card" style="width: 300px;">
                        <div id="popular-hero${i}" class="card-divider">
                            ${popularHeroes[i].heroname}
                        </div>
                        <img id="popular-thumb${i}"
                            src=${popularHeroes[i].thumbnail}>
                        <div class="card-section">
                            <h4 id="popular-real${i}">${popularHeroes[i].realname}</h4>
                            <p id="popular-descrip${i}">${popularHeroes[i].description}
                            </p>
                            <div id="popular-embed${i}" class="responsive-embed">
                                <iframe width="420" height="315" src=${popularHeroes[i].youtube} frameborder="0"
                                    allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `
        
            $("#popular-lists").append(popularBlock);

    }

    $(".popular-series").show().foundation();

}

$(".hero-page").on("click", "#heart", storeHero);
$(".not-main-page").on("click", "#home-button", goToHome);

$("#goto-myheroes").on("click", goToMyHeroes);
$("#goto-popularseries").on("click", goToPopularSeries);

$("#submit-button").on("click", function (event) {
    event.preventDefault();

    currentHero = $("#hero-input").val().trim();

    searchHero(currentHero);

    $(".main-page").hide();
})



