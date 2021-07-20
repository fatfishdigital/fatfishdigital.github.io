(function() {
  var Memory = {
    init: function(cards) {
      this.$game = $(".game");
      this.cardsArray = cards;
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.binding();
      this.won = false;
    },

    shuffleCards: function(cardsArray) {
      this.$cards = $(this.shuffle(this.cardsArray));
    },

    setup: function() {
      this.html = this.buildHTML();
      this.$game.html(this.html);
      this.$memoryCards = $(".card");
      this.paused = false;
      this.guess = null;
    },

    binding: function() {
      this.$memoryCards.on("click", this.cardClicked);
    },

    cardClicked: function() {
      var memoryobject = Memory;
      var $card = $(this);
      if (
        !memoryobject.paused &&
        !$card.find(".inside").hasClass("matched") &&
        !$card.find(".inside").hasClass("picked")
      ) {
        $card.find(".inside").addClass("picked");
        if (!memoryobject.guess) {
          memoryobject.guess = $(this).attr("data-id");
        } else if (
          memoryobject.guess == $(this).attr("data-id") &&
          !$(this).hasClass("picked")
        ) {
          $(".picked").addClass("matched");
          memoryobject.CardMatched(memoryobject.guess, memoryobject);
          memoryobject.guess = null;
        } else {
          memoryobject.guess = null;
          memoryobject.paused = true;
          setTimeout(function() {
            $(".picked").removeClass("picked");
            Memory.paused = false;
          }, 600);
        }
        if ($(".matched").length == $(".card").length) {
          //  this.won=true;
        }
      }
    },
    /*
You win the game, show sweet alert box and go to next page or restart the game
*/
    win: function() {
      this.paused = true;
      var obj = this;
      setTimeout(function() {
        swal({
          title: "Winner Winner!",
          text:"Fill in the form and you’ll go in to the draw win a one-way Economy SkycouchTM upgrade on your Air New Zealand flight from Auckland to Los Angeles or San Francisco!",
          buttons: ["Enter Draw", "Play Again"],
          closeOnClickOutside: false
        }).then(value => {
          if (value == true && typeof value != "undefined" && value != null) {
            obj.reset();
          } else {
            // window.open( "https://fatfishagency.typeform.com/to/Q3kDeb");
            location.href = "https://fatfishagency.typeform.com/to/Q3kDeb";
          }
        });
      }, 1000);
    },

    reset: function() {
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.binding();
      this.$game.show("slow");
    },

    checkifwon: function() {
      if ($(".matched").length == $(".card").length) {
        return true;
      }
    },

    shuffle: function(array) {
      var counter = array.length,
        temp,
        index;
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },

    buildHTML: function() {
      var frag = "";
      this.$cards.each(function(k, v) {
        frag +=
          '<div class="card" data-id="' +
          v.id +
          '"><div class="inside">\
				<div class="front" style="background-color:' +
          v.color +
          ";background-image:url(" +
          v.img +
          ')"></div>\
				<div class="back"></div></div>\
				</div>';
      });
      return frag;
    },
    CardMatched: function(id, object) {
      $.grep(cards, function(card) {
        if (card.id == id) {
          var myhtml = document.createElement("span");
          myhtml.innerHTML = card.text;
          setTimeout(function() {
            swal({
              title: "MATCH!",
              content: myhtml,
              icon: card.icon,
              imageHeight: "100px",
              button: "Play On"
            }).then(value => {
              if (value) {
                if ($(".matched").length == $(".card").length) {
                  object.win();
                }
              }
            });
          }, 600);
        }
      });
    }
  };

  var cards = [
    {
      name:  "Theme Parks",
      img:   "/images/Card-Theme-Parks-Front.jpg",
      icon:  "/images/Card-Theme-Parks-Icon.jpg",
      id:    1,
      text:  "<h2>Theme Parks<br>Los Angeles</h2>There's a super-abundance of fun park family attractions to get your adrenaline pumping - famous places like Anaheim Disneyland, Universal Studios Hollywood, Knott's Berry Farm and Legoland!",
      color: "#000000"
    },
    {
      name:  "Theme Parks",
      img:   "/images/Card-Theme-Parks-Meaning.jpg",
      icon:  "/images/Card-Theme-Parks-Icon.jpg",
      id:    1,
      text:  "<h2>Theme Parks<br>Los Angeles</h2>There's a super-abundance of fun park family attractions to get your adrenaline pumping - famous places like Anaheim Disneyland, Universal Studios Hollywood, Knott's Berry Farm and Legoland!",
      color: "#000000"
    },
    {
      name:  "Gaslamp Quarter",
      img:   "https://uploads-ssl.webflow.com/5e2a4c410962397d0c3cc7d9/60f61bba4028b863b59fb99f_Card-Gaslamp-Quarter-Front.jpg",
      icon:  "https://uploads-ssl.webflow.com/5e2a4c410962397d0c3cc7d9/60f61bbacecceb2b29b576e6_Card-Gaslamp-Quarter-Icon.jpg",
      id:    2,
      text:  "<h2>Gaslamp Quarter<br>San Diego</h2>Food, craft beer, boutique shopping and live music are all part of the historic Gaslamp Quarter in San Diego, the part of town that tends to keep things hopping ‘til the small hours.",
      color: "#000000"
    },
    {
      name:  "Gaslamp Quarter",
      img:   "https://uploads-ssl.webflow.com/5e2a4c410962397d0c3cc7d9/60f61bba3b780948c6d25c8a_Card-Gaslamp-Quarter-Meaning.jpg",
      icon:  "https://uploads-ssl.webflow.com/5e2a4c410962397d0c3cc7d9/60f61bbacecceb2b29b576e6_Card-Gaslamp-Quarter-Icon.jpg",
      id:    2,
      text:  "<h2>Gaslamp Quarter<br>San Diego</h2>Food, craft beer, boutique shopping and live music are all part of the historic Gaslamp Quarter in San Diego, the part of town that tends to keep things hopping ‘til the small hours.",
      color: "#000000"
    },
    {
      name:  "Pacific Coast",
      img:   "/images/Card-Pacific-Coast-Front.jpg",
      icon:  "/images/Card-Pacific-Coast-Icon.jpg",
      id:    3,
      text:  "<h2>Pacific Coast<br>Highway</h2>One of the most scenic drives in the world is the Pacific Coast Highway between Los Angeles and San Francisco. Pull over at numerous turnouts to get amazing views!",
      color: "#000000"
    },
    {
      name:  "Pacific Coast",
      img:   "/images/Card-Pacific-Coast-Meaning.jpg",
      icon:  "/images/Card-Pacific-Coast-Icon.jpg",
      id:    3,
      text:  "<h2>Pacific Coast<br>Highway</h2>One of the most scenic drives in the world is the Pacific Coast Highway between Los Angeles and San Francisco. Pull over at numerous turnouts to get amazing views!",
      color: "#000000"
    },
    {
      name:  "Santa Monica Pier",
      img:   "/images/Card-Santa-Monica-Pier-Front.jpg",
      icon:  "/images/Card-Santa-Monica-Pier-Icon.jpg",
      id:    4,
      text:  "<h2>Santa Monica Pier<br>Los Angeles</h2>Breathe in the scent of hotdogs and candy floss as you ride the roller coaster at the amusement park, or get a birds-eye-view of the surf from the famous Ferris wheel.",
      color: "#000000"
    },
    {
      name:  "Santa Monica Pier",
      img:   "/images/Card-Santa-Monica-Pier-Meaning.jpg",
      icon:  "/images/Card-Santa-Monica-Pier-Icon.jpg",
      id:    4,
      text:  "<h2>Santa Monica Pier<br>Los Angeles</h2>Breathe in the scent of hotdogs and candy floss as you ride the roller coaster at the amusement park, or get a birds-eye-view of the surf from the famous Ferris wheel.",
      color: "#000000"
    },
    {
      name:  "Golden Gate Bridge",
      img:   "/images/Card-Golden-Gate-Bridge-Front.jpg",
      icon:  "/images/Card-Golden-Gate-Bridge-Icon.jpg",
      id:    5,
      text:  "<h2>Golden Gate Bridge<br>San Francisco</h2>A must do while in San Francisco is to bike over Golden Gate Bridge to Sausalito. Completed in 1937, this world-famous bridge has featured in around 70 movies, and it's 2.7 kilometres long!",
      color: "#000000"
    },
    {
      name:  "Golden Gate Bridge",
      img:   "/images/Card-Golden-Gate-Bridge-Meaning.jpg",
      icon:  "/images/Card-Golden-Gate-Bridge-Icon.jpg",
      id:    5,
      text:  "<h2>Golden Gate Bridge<br>San Francisco</h2>A must do while in San Francisco is to bike over Golden Gate Bridge to Sausalito. Completed in 1937, this world-famous bridge has featured in around 70 movies, and it's 2.7 kilometres long!",
      color: "#000000"
    },
    {
      name:  "Yosemite National",
      img:   "/images/Card-Yosemite-National-Front.jpg",
      icon:  "/images/Card-Yosemite-National-Icon.jpg",
      id:    6,
      text:  "<h2>Yosemite National<br>Park</h2>Known for its breath-taking waterfalls, giant sequoia trees, awe-inspiring vistas and more, experience this majestic park in all four seasons!",
      color: "#000000"
    },
    {
      name:  "Yosemite National",
      img:   "/images/Card-Yosemite-National-Meaning.jpg",
      icon:  "/images/Card-Yosemite-National-Icon.jpg",
      id:    6,
      text:  "<h2>Yosemite National<br>Park</h2>Known for its breath-taking waterfalls, giant sequoia trees, awe-inspiring vistas and more, experience this majestic park in all four seasons!",
      color: "#000000"
    }
  ];

  Memory.init(cards);
})();
