
$(document).ready(function () {
    $("#forminfo").on("submit", function (e) {
        e.preventDefault();
        $("#artistHeadline").empty();
        $("#newsDisplay").empty();

        var artist = $("input[name='artist']").val();
        console.log(artist);

        var queryURL = "http://newsapi.org/v2/everything?qInTitle=" + artist +
            "&" +
            "apiKey=c338cad50e1e4c6d8aa41548e7259844";
        console.log(queryURL);

        $.get(queryURL, function (data) {
            console.log(data);
            console.log(data.articles[0].title);

            $("#artistHeadline").append(data.articles[0].title);
            $("#newsDisplay").append(data.articles[0].content);

        });

    });

});