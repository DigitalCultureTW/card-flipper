$(function () {
    var x = 4, y = 3, border = 5;
    var wt = window.screen.availWidth, ht = window.screen.availHeight;
    var side = (wt > ht) ? ht / y - border * 2 : wt / x - border * 2;
//    console.log(w + ',' + h + "," + side);
    var card_color = 'rgb(50,50,50)';

    for (i = 0; i < y; i++) {
        var row = document.createElement("div");
        $(row).addClass("row");
        $("body").append(row);
        for (j = 0; j < x; j++) {
            var card = document.createElement("div");
            $(card).addClass("card viewport-flip left");
            $(card).attr({id: i + "_" + j});
            var face_front = document.createElement("a");
            $(face_front).addClass("face front flip out");
            var face_back = document.createElement("a");
            $(face_back).addClass("face back flip in");

            $(card).append(face_front).append(face_back);
            $(row).append(card);
        }
    }
    $(".row").css({
        "width": (side + border * 2) * x,
        "height": row_height = side + border * 2,
        "margin-left": "auto",
        "margin-right": "auto",
        "display": "block"});
    $(".face").attr({"href": "#"});
    $(".face").css({"max-width": side, "max-height": side, "margin": "auto", "display": "block"});
    $(".card").css({"width": side, "height": side, "border": border + "px solid #aaaaaa"});
    $(".card").bind("click", function () {
        console.log(this.id);
        var card = $("#" + this.id);
//        console.log(card);
        var face1 = card.find(".in"), face2 = card.find(".out");
        face1.toggleClass("in").toggleClass("out");
        setTimeout(function () {
            face2.toggleClass("in").toggleClass("out");
        }, 220);
    });

    var face_front =
//            "./element/2017_08_26_2.jpg";
            "./element/student.jpg";
//            "./element/sample.jpg";
//            "./element/puke-k.png";
    create_card(face_front, side, card_color, function (card) {
        $(".front").append(card);
    });

    var face_back =
            "./element/scream.jpg";
    //            "http://data.digitalculture.tw/taichung/sites/default/files/object/photo/%E6%B8%85%E6%B3%89%E5%B4%97%E5%85%AC%E5%85%B1%E8%97%9D%E8%A1%93%E5%AD%A3%20%E8%87%A8%E6%99%82%E6%80%A7%E4%BD%9C%E5%93%81%EF%BC%9A%E7%B4%85%E5%9C%9F.jpg";
//                       "./element/puke-back.png";
//            "https://scontent-tpe1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c85.0.909.909/18094725_830739007089714_6979019236899291136_n.jpg";
    create_card(face_back, side, card_color, function (card) {
        $(".back").append(card);
    });
});

//            localStorage.setItem( "savedImageData", load.toDataURL("image/png") );
//            image_loaded.src = savedImageData;