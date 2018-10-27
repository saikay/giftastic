var buttons = ["cat","dog","house","food"];
var apiKey = "&api_key=l056OogK44BY97gqObxdShYS0Ab3H9Bk";


//draw giphy button
function renderButtons(){
    $(".buttons").empty();
    buttons.forEach(function(buttonText){
        var button = $("<button>").addClass("giphyButton").text(buttonText);
        $(".buttons").append(button);
    });
    $("button").off("click")
    $("button").on("click",buttonClick);
}

$("#submit").on("click",function(){
    var userInput= $("#user-input").val().trim();
    if(buttons.indexOf(userInput)==-1){
        buttons.push(userInput);
    }
    renderButtons();
})

function buttonClick(){
    
    var q = $(this).text();
    var limit = "&limit=";
    var rating = "&rating=";
    var url = "http://api.giphy.com/v1/gifs/search?q=" + q + apiKey;

    var config = {
        url:url,
        method:"GET"
    }

    $.ajax(config).then(function(response){
        console.log(response);
        $(".images").empty();
        response.data.forEach(function(item){
            var newDiv= $("<div>");
            var p = $("<p>");
            var image = $("<img>");
            image.attr("src",item.images.downsized_still.url);
            image.attr("giphy_link",item.images.downsized.url);
            p.text("Rating: " + item.rating);
            newDiv.append(p);
            newDiv.append(image);
            $(".images").prepend(newDiv);
        });
        //assign click event after create images.
        $("img").click(function(){
            currentLink = $(this).attr("src");
            giphyLink = $(this).attr("giphy_link");
            $(this).attr("src",giphyLink);
            $(this).attr("giphy_link",currentLink);
        });
    });

}


renderButtons();