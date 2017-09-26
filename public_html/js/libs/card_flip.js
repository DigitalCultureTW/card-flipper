function flip(card, side, color) {
    if (card.next_img) {
//        console.log("yes:" + card.next_img);
        var id = card.id;
        var path = card.next_img;
        create_card(path, side, color, function (c) {
            $(c).addClass("face flip out");
            $("#" + id).find(".front").toggleClass("in").toggleClass("out");
            setTimeout(function () {
                $("#" + id).append(c);
                $(c).toggleClass("in").toggleClass("out");
                $("#" + id).find(".front").remove();
                $(c).toggleClass("front");
            }, 250);
        });
    }
}


