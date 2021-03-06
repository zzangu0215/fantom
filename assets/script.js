$(".main-page").show();
$(".menu-dropdown").show();
fetchYouTube();

$(".home-button").hide();
$(".not-main-page").hide();

var currentHero = "";
var heroList = [];

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

  $(".not-main-page").empty();

  var marvelAPI = "5676e7d9c3a3777b9fb6a77f56ea448c";

  if (searchword) {

    var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?name="
      + searchword
      + "&apikey="
      + marvelAPI;
  }
  fetch(baseUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {

      goToHeroPage(data);

    })

}

function fetchYouTube() {

  var youtubeAPI = "AIzaSyDmeU2kSK82oXY2ERxxqvcizBkALMtH_k4";
  var youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCvC4D8onUfXzvjTOM-dBfEA&key=" + youtubeAPI;
  var srcUrl = "https://www.youtube.com/embed/";

  fetch(youtubeUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      data.items.forEach(function (element, index) {
        var recommendedVideoBlock =
          `
          <iframe class="cell large-auto" src="${srcUrl}/${element.id.videoId}" frameborder="0" allowfullscreen></iframe>
          `;

        $("#hero-trailer").append(recommendedVideoBlock);
      })
    })

}

function goToHome() {

  $(".home-button").hide();
  $(".not-main-page").empty();
  $(".main-page").show();
  $("#hero-input").val("");
  $('.small-8').removeClass("small-8").addClass("small-10");

}

function goToHeroPage(data) {

  $(".not-main-page").empty();
  $(".home-button").show();

  var heroname = data.data.results[0].name;
  var heroDescription = data.data.results[0].description;

  var thumbnail = data.data.results[0].thumbnail.path + "/standard_fantastic.jpg";

  var appendBlock =
    `
      <div class="card">
          <h2 id="heroname" class="card-divider">${heroname}</h2>
          <div id="herocard"></div>
          <img id="heroThumbnail" src=${thumbnail}>
          <div class="card-section">
              <p id="heroDescription">${heroDescription}</p>
              <div id="embeddedVideo" class="responsive-embed">

              </div>
          </div>
          <button id="heart" type="button" class="success button">Save</button>
      </div>
    `;

  $(".hero-page").append(appendBlock);

  for (var i = 0; i < heroActualNames.length; i++) {
    if (heroname === heroActualNames[i].heroname) {
      var realnameBlock = `
                          <h4 id="realName">
                              \n${heroActualNames[i].realname}
                          </h4>
                          `;
      $("#herocard").append(realnameBlock);

      var youtubeBlock =
        `
        <iframe width="420" height="315"
            src="https://www.youtube.com/embed/${heroActualNames[i].herovideoId}" frameborder="0" allowfullscreen>
        </iframe>
        `;

      $("#embeddedVideo").append(youtubeBlock);
    }
  }

  $(".hero-page").show();
}

function goToMyHeroes() {

  $(".not-main-page").empty();
  $(".home-button").show();

  $(".main-page").hide();
  $('.small-10').removeClass("small-10").addClass("small-8");
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
        </div>
    </body>
    `;

  $(".hearted-heroes").append(myHeroPageBlock);

  var heroList = JSON.parse(localStorage.getItem("savedHeroes")) || [];

  console.log(heroList);

  for (var i = 0; i < heroList.length; i++) {

    var myHeroButtons =
      `
        <button type="button" id="saved-hero" class="button expanded btn">${heroList[i]}</button>
      `;

    $("#heartContainer").append(myHeroButtons);

  }

  $(".hearted-heroes").show();
}

function goToRecentSearchesPage() {

  $(".not-main-page").empty();
  $(".home-button").show();

  $(".main-page").hide();
  $('.small-10').removeClass("small-10").addClass("small-8");
  $(".hero-page").hide();
  $(".hearted-heroes").hide();
  $(".popular-series").hide();

  var recentSearchPageBlock =
    `
      <header>
          <div class="grid-x grid-padding-x">
              <h1 class="main-header">RECENT SEARCHES</h1>
          </div>
      </header>
          <body>
              <div id="recent-hero-search" class="flex-container flex-dir-column heartedContainer">
              </div>
          </body>
    `;

  $(".recent-searches").append(recentSearchPageBlock);

  var recentSearchList = JSON.parse(localStorage.getItem("recentlySearched")) || [];

  console.log(recentSearchList);

  for (var i = 0; i < recentSearchList.length; i++) {

    var searchedHeroButtons =
      `
      <button type="button" id="searched-hero" class="button expanded btn">${recentSearchList[i]}</button>
      `;

    $("#recent-hero-search").append(searchedHeroButtons);

  }

  $(".recent-searches").show();

}

function goToPopularSeries() {

  $(".not-main-page").empty();
  $(".home-button").show();

  $(".main-page").hide();
  $('.small-10').removeClass("small-10").addClass("small-8");
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
          <div class="columns main-header">
              <h2 class="popular-header">Popular Series</h2>
              <p>These are a few Popular series in the marvel universe.</p>
          </div>
      </div>

      <div class="row">
          <div class="columns">
              <ul id="popular-lists" class="accordion" data-allow-all-closed="true" data-accordion>
              </ul>
          </div>
      </div>
    `;

  $(".popular-series").append(popularSeriesBlock);

  for (var i = 0; i < popularHeroes.length; i++) {

    var popularBlock =
      `
        <li class="accordion-item is-active" data-accordion-item>
            <a href="#" class="accordion-title">${popularHeroes[i].heroname}</a>
            <div class="accordion-content" data-tab-content>
                <div class="card">
                    <div id="popular-hero${i}" class="card-divider">
                        ${popularHeroes[i].heroname}
                    </div>
                    <img id="popular-thumb${i}" src=${popularHeroes[i].thumbnail}>
                    <div class="card-section">
                        <h4 id="popular-real${i}">${popularHeroes[i].realname}</h4>
                        <p id="popular-descrip${i}">${popularHeroes[i].description}</p>
                        <div id="popular-embed${i}" class="responsive-embed">
                            <iframe width="420" height="315" src=${popularHeroes[i].youtube} frameborder="0"
                            allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </li>
      `;

    $("#popular-lists").append(popularBlock);

  }

  $(".popular-series").show().foundation();

}

function storeHero() {
  var heroList = JSON.parse(localStorage.getItem("savedHeroes")) || [];

  var saveHero = $(this).siblings("h2").text();
  heroList.push(saveHero);
  localStorage.setItem("savedHeroes", JSON.stringify(heroList))
}

function storeRecentSearch() {
  var recentSearchList = JSON.parse(localStorage.getItem("recentlySearched")) || [];
  recentSearchList.push(currentHero);
  localStorage.setItem("recentlySearched", JSON.stringify(recentSearchList))
}

function getSavedHeroes() {

  var savedHero = $(this).text();

  searchHero(savedHero);
  $(".not-main-page").empty();

}

function getSearchedHeroes() {

  var searchedHero = $(this).text();

  searchHero(searchedHero);
  $(".not-main-page").empty();

}

$(".hero-page").on("click", "#heart", storeHero);
$(".recent-searches").on("click", "#searched-hero", getSavedHeroes);
$(".hearted-heroes").on("click", "#saved-hero", getSearchedHeroes);

$("#home-button").on("click", goToHome);

$("#goto-myheroes").on("click", goToMyHeroes);
$("#goto-popularseries").on("click", goToPopularSeries);
$("#goto-recentsearches").on("click", goToRecentSearchesPage);

$("#submit-button").on("click", function (event) {
  event.preventDefault();

  currentHero = $("#hero-input").val().trim();

  searchHero(currentHero);
  storeRecentSearch();

  $(".main-page").hide();
  $('.small-10').removeClass("small-10").addClass("small-8");
})
