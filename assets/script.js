//var submitButton = document.querySelector("#submit-button");
//var heroInput = document.querySelector("#hero-input");
// var mainPageEl = document.querySelector(".main-page");
// var heroPageEl = document.querySelector(".hero-page");

// mainPageEl.style.display = "block";
// heroPageEl.style.display = "none";

$(".main-page").show();
$(".menu-dropdown").show();

$(".not-main-page").hide();


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


function searchHero(searchword) {

    var marvelAPI = "5676e7d9c3a3777b9fb6a77f56ea448c";

    if (searchword) {
        //console.log(searchword);
        var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?name=" 
                        + searchword 
                        + "&apikey="
                        + marvelAPI;
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

    //heroPageEl.style.display = "block";
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
//     $(this).parent().hide();
    $(this).parent().hide();
    $(this).parent().empty();
    $(".main-page").show();
    $("#hero-input").val("");

}

$(".not-main-page").on("click", "#home-button", goToHome);

//searchHero(searchword);
$("#submit-button").on("click", function (event) {
    event.preventDefault();

    var searchword = $("#hero-input").val().trim();

    searchHero(searchword);

    //mainPageEl.style.display = "none";
    $(".main-page").hide();
})


// var homeBtnEl = document.querySelector("#home-button")
// homeBtnEl.addEventListener("click", goToHome());


