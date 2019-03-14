$( document ).ready(function() {

    // dynamicly created array with some predefined buttons
    var topic = ["jiu jitsu" , "boxing" , "muay thai" , "judo" ,"wrestling" ];
    
    //function that will display my buttons    
    function displayGifButtons() {

        $("#gifButtonsView").empty();

        for (var i = 0; i < topic.length; i++) {

            //creates button
            var gifButton = $("<button>");

            //gives button a class
            gifButton.addClass("fightStyle");

            //another class used in bootstrap
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);

            // writes what was typed or from array onto button
            gifButton.text(topic[i]);

            //appends the button
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    //function adds a whole new button when one is typed into the text feild
    function anotherButton() {

        // on click adds of the add button adds a new button
        $("#addGif").on("click", function() {

            var fightStyle = $("#topicInput").val().trim();

            // if statement that doesnt allow for blank buttons
            if (fightStyle == ""){
                return false;
            }
                topic.push(fightStyle);
    
                displayGifButtons();
                return false;
            });
    }
    
    //function to remove last button created
    function removeTheButton() {

        $("removeGif").on("click", function() {

            // .pop removes last element from array
            topic.pop(fightStyle);

            displayGifButtons();

            return false;

        });
    
    }
    
    // function to display the gifs themselves to the page, generates 10 
    function displayGifs() {

        var fightStyle = $(this).attr("data-name");
        
        // my api key an a limit of ten pulled
        // inserts the var fightstyle into what is being searched 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fightStyle + 
        
        "&api_key=zIE1JqxeeB1r3QeNhFH9nlQ7xgqJiKWZ&limit=10";
        

        // uses ajax method of "get"
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {

            $("#gifsView").empty();

            //shows my results 
            var results = response.data;

            if (results == ""){

                // alerts user if nothing was found
                alert("uhh, thats not a thing?"	)
            }
            for (var i = 0; i<results.length; i++){

                //gifs get placed into a div
                var gifDiv = $("<div1>");

                //gets gifs rating and dispalys it in a <p>
                var gifRating = $("<p>").text("Rating " + results[i].rating);

                gifDiv.append(gifRating);
    
                //puts the actual images of gif into a <img> tag
                var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height_small_still.url);

                //pauses the gifs
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);

                //causes the gifs to move when you click them
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                
                //when gifs are first displayed they are in the paused stage
                gifImage.attr("data-state", "still");

                // adds image class to the gif
                gifImage.addClass("image");

                // appends the gifs
                gifDiv.append(gifImage);

                //creates new div for the gifs
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    
    //calls all of my functions used above
    displayGifButtons();

    anotherButton();

    removeTheButton();
    
    
    
    //all my event listeners .clicks for the paused and moving gifs
    $(document).on("click", ".fightStyle", displayGifs);

    $(document).on("click", ".image", function() {

        var state = $(this).attr('data-state');

        if (state == 'still') {

            $(this).attr('src', $(this).data('animate'));

            $(this).attr('data-state', 'animate');

        }else {

            $(this).attr('src', $(this).data('still'));
            
            $(this).attr('data-state', 'still');
        }
    
        });
    
    });

