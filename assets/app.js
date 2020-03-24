$(document).ready(function () {
    document.cookie = 'same-site-cookie=foo; SameSite=Lax';
    document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

    $("#forminfo").on("submit", function (e) {
        e.preventDefault();
        $("#artistHeadline").empty();
        $("#newsDisplay").empty();
        $("#gifImage").empty();
        $("#spotDisplay").empty();
        $("#bioDisplay").empty();
        $("#youTubeSearch").empty();


        var artist = $("input[name='artist']").val();
        console.log(artist);
        $("#artistHeader").text(artist);

        $('iframe').attr("src", "https://www.youtube.com/embed?listType=search&list=" + artist);

        var queryURL =
            "https://api.giphy.com/v1/gifs/search?q=" +
            artist +
            "&api_key=o2BMu32QNHXQZs2A5dgV6kntwDSDTrXU&limit=3";

        // console.log(queryURL);

        $.get(queryURL, function (response2) {
            console.log(response2);

            var results2 = response2.data;

            for (var i = 0; i < results2.length; i++) {
                // Creating and storing a div tag
                var newgifDiv = $("<div>");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text(results2[i].title);
                // Creating and storing an image tag
                var gifImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                gifImage.attr("src", results2[i].images.original.url);
                // Appending the paragraph and image tag to the animalDiv
                newgifDiv.append(p);
                newgifDiv.prepend(gifImage);
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifImage").prepend(newgifDiv);
            };
        }).then(function () {

            $.ajax({
                url: "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=2b35547bd5675d8ecb2b911ee9901f59&format=json",
                success: function (response3) {

                    var results3 = response3.artist;
                    console.log(results3);

                    // Creating and storing a div tag
                    var newbioDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text(results3.bio.summary);
                    // Appending the paragraph and image tag to the animalDiv
                    newbioDiv.append(p);
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#bioDisplay").append(newbioDiv);
                }
            });

        }).then(function () {

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist + "&limit=3",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "286743b9e8mshca96ef72bc84158p10a340jsn84bc27c45ef1"
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);

                var results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                    // Creating and storing a div tag
                    var newtrackDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Title: " + results[i].title);
                    var trackImg = $("<a> Play on Deezer! </a>");
                    // Creating and storing an image tag
                    var trackLink = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    trackLink.attr("src", results[i].album.cover);
                    trackImg.attr("href", results[i].link);
                    // Appending the paragraph and image tag to the animalDiv
                    newtrackDiv.prepend(p);
                    newtrackDiv.append(trackImg);
                    newtrackDiv.append(trackLink);
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#spotDisplay").append(newtrackDiv);
                }
            });


        }).then(function () {
            search(artist);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=3&q=" + artist + "&safeSearch=true",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
                    "x-rapidapi-key": "286743b9e8mshca96ef72bc84158p10a340jsn84bc27c45ef1"
                }
            };

            $.ajax(settings).done(function (response4) {

                var results4 = response4.value;
                console.log(results4);

                for (var i = 0; i < results4.length; i++) {
                    // Creating and storing a div tag
                    var cwNewsDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<h4>").text(results4[i].title);
                    console.log(results4[i].title);
                    // Creating and storing an image tag
                    var nytImage = $("<p>").text("Article Abstract: " + results4[i].description);
                    var readMore = $("<a> Read More, Click Here! </a>");
                    readMore.attr("href", results4[i].url);
                    console.log(results4[i].description);
                    console.log(results4[i].url);
                    // Appending the paragraph and image tag to the animalDiv
                    cwNewsDiv.prepend(p);
                    cwNewsDiv.append(nytImage);
                    cwNewsDiv.append(readMore);
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#newsDisplay").append(cwNewsDiv);
                };


            });

        }).then(function () {

            var tag = document.createElement('script');
            tag.id = 'iframe-demo';
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var player;

            function onYouTubeIframeAPIReady() {
                player = new YT.Player('existing-iframe-example', {
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
            }

            function onPlayerReady(event) {
                document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
                event.setVolume(100);
                event.playVideo();
            }
            // function changeBorderColor(playerStatus) {
            //     var color;
            //     if (playerStatus == -1) {
            //         color = "#37474F"; // unstarted = gray
            //     } else if (playerStatus == 0) {
            //         color = "#FFFF00"; // ended = yellow
            //     } else if (playerStatus == 1) {
            //         color = "#33691E"; // playing = green
            //     } else if (playerStatus == 2) {
            //         color = "#DD2C00"; // paused = red
            //     } else if (playerStatus == 3) {
            //         color = "#AA00FF"; // buffering = purple
            //     } else if (playerStatus == 5) {
            //         color = "#FF6DOO"; // video cued = orange
            //     }
            //     if (color) {
            //         document.getElementById('existing-iframe-example').style.borderColor = color;
            //     }
            // }
            function onPlayerStateChange(event) {
                changeBorderColor(event.data);

            }
        }).catch(function (err) { console.error("Rachael signing in", err) });

        function search(artistIn) {

            console.log(artistIn);

            var apikey = "AIzaSyBA6-_OD-6JJj0-Gr4FjtF6KIeZeBQxXQ8"

            $.ajax({
                method: "GET",
                url: "https://www.googleapis.com/youtube/v3/search",
                data: {
                    key: apikey,
                    q: artistIn,
                    part: "snippet",
                    maxResults: 3,
                    type: "video",
                    videoEmbeddable: true,
                }

            }).done((data) => {

                var videos = data.items;
                console.log(videos);
                videoDisplay(videos);

                function videoDisplay() {
                    var videoList = videos;

                    for (var i = 0; i < videoList.length; i++) {

                        var vidId = videoList[i].id.videoId;
                        console.log(vidId);

                        var videoSrc = ("https://www.youtube.com/embed/" + vidId)

                        // var newVideoBtn = $("<button>", {
                        //     text: "Play",
                        //     click: function () {   
                        //         var createIframe = $("<iframe>")                             
                        //         createIframe.attr("src", videoSrc, "width", 640, "height", 360); 

                        //     },
                        // });

                        // Creating and storing a div tag
                        var newYTDiv = $("<div>");
                        var createIframe = $("<iframe>")
                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text(videoList[i].snippet.title);
                        // Creating and storing an image tag
                        // var videoImg = $("<img>");
                        // Setting the src attribute of the image to a property pulled off the result item
                        createIframe.attr("src", videoSrc, "width", 740, "height", 460);
                        // videoImg.attr("src", videoList[i].snippet.thumbnails.high.url);
                        // newVideoBtn.attr("src", "https://www.youtube.com/embed/" + vidId);
                        // Appending the paragraph and image tag to the animalDiv
                        newYTDiv.append(p);
                        // newYTDiv.prepend(videoImg);
                        newYTDiv.append(createIframe);
                        // newYTDiv.append(newVideoBtn);
                        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                        $("#youTubeSearch").append(newYTDiv);

                    };

                };

            }).catch(function (err) { console.log("you have an:" + JSON.stringify(err)) });
        };

    });

});

