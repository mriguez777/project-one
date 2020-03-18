$(document).ready(function () {
    $("#forminfo").on("submit", function (e) {
        e.preventDefault();
        $("#artistHeadline").empty();
        $("#newsDisplay").empty();
        $("#gifImage").empty();

        var artist = $("input[name='artist']").val();
        console.log(artist);
        $("#artistHeader").text(artist)

        var queryURL = "http://newsapi.org/v2/everything?qInTitle=" + artist +
            "&" +
            "apiKey=c338cad50e1e4c6d8aa41548e7259844";
        console.log(queryURL);

        $.get(queryURL, function (data) {
            console.log(data);
            console.log(data.articles[0].title);
            console.log(data.articles[0].description);

            $("#artistHeadline").append(data.articles[0].title);
            $("#newsDisplay").append(data.articles[0].description);
            //insert next api call
        }).then(function () {

            var queryURL2 =
                "https://api.giphy.com/v1/gifs/search?q=" +
                artist +
                "&api_key=o2BMu32QNHXQZs2A5dgV6kntwDSDTrXU&limit=10";
            console.log(queryURL2);

            $.get(queryURL2, function (response2) {
                console.log(response2);
                var results2 = response2.data;
                for (var i = 0; i < results2.length; i++) {
                    // Creating and storing a div tag
                    var newgifDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results2[i].rating);
                    // Creating and storing an image tag
                    var gifImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    gifImage.attr("src", results2[i].images.fixed_height.url);
                    // Appending the paragraph and image tag to the animalDiv
                    newgifDiv.append(p);
                    newgifDiv.prepend(gifImage);
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifImage").prepend(newgifDiv);
                };
            });
        });
    });
});
