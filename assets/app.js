
$(document).ready(function () {
    $("#forminfo").on("submit", function (e) {
        e.preventDefault();

        var artist = $("input[name='artist']").val();
        console.log(artist);

        var queryURL = "http://newsapi.org/v2/everything?qInTitle=" + artist +
            "&" +
            "apiKey=c338cad50e1e4c6d8aa41548e7259844";
        console.log(queryURL);

        $.get(queryURL, function (data) {
            console.log(data);
            $("#artistHeadline").append(data.title);
            $("#newsDisplay").append(data.content)
        });
    });
});