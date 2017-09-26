const COLUMN = 4, ROW = 3, CARD_BORDER = 5;
const WT = window.screen.availWidth - 10, HT = window.screen.availHeight;
const SIDE = (WT / COLUMN > HT / ROW) ? HT / ROW - CARD_BORDER * 2 : WT / COLUMN - CARD_BORDER * 2;
const FILL_COLOR = 'rgb(55,55,55)';

const IMG_POOL = [
    "./element/scream.jpg",
    "./element/2017_08_26_2.jpg",
    "./element/puke-back.png",
    "./element/puke-k.png",
    "./element/sample.jpg",
    "./element/student.jpg",
    "https://scontent-tpe1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c85.0.909.909/18094725_830739007089714_6979019236899291136_n.jpg",
    "https://scontent-tpe1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c135.0.809.809/18014079_117891442103190_3830284845691437056_n.jpg",
    "https://scontent-tpe1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c180.0.720.720/18096655_281091902349562_7410941648063954944_n.jpg",
    "https://scontent-tpe1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/16230644_252157598540891_2094687826938429440_n.jpg",
    "https://scontent-tpe1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/17881614_1116651255113611_9069087564517867520_n.jpg",
    "https://scontent-tpe1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/17934372_200434343795906_4782638545875501056_n.jpg"
//    "http://data.digitalculture.tw/taichung/sites/default/files/object/photo/%E6%B8%85%E6%B3%89%E5%B4%97%E5%85%AC%E5%85%B1%E8%97%9D%E8%A1%93%E5%AD%A3%E8%87%A8%E6%99%82%E6%80%A7%E4%BD%9C%E5%93%81%EF%BC%9A%E7%89%86%E8%AA%9E%EF%BC%9A%E8%89%B2%E5%BD%A9%E7%B6%BB%E6%94%BE02.jpg"
];

$(function () {

    var cards = [];
    $.getScript("./js/libs/Card.js", function () {
        for (i = 0; i < ROW; i++) {
            cards[i] = [];
            var row = document.createElement("div");
            $(row).addClass("row");
            $("body").append(row);
            for (j = 0; j < COLUMN; j++) {
                var index = parseInt(IMG_POOL.length * Math.random());
                cards[i][j] = new Card(i + "_" + j, IMG_POOL[index]);
                var card = document.createElement("div");
                $(card).addClass('card viewport-flip left');
                $(card).attr("id", cards[i][j].id);
                $(row).append(card);
            }
        }
        $(".card").css({width: SIDE, height: SIDE, border: CARD_BORDER + "px inset #aaaaaa"});
        $(".row").css({
            height: SIDE + CARD_BORDER * 2,
            width: (SIDE + CARD_BORDER * 2) * COLUMN,
//            "margin-left": "auto",
//            "margin-right": "auto",
            margin: "auto",
            display: "block"});
    });
    // initialize cards
    $.getScript("./js/libs/create_card.js", function () {
        cards.forEach(function (row) {
            row.forEach(function (card) {
                var id = card.id;
                create_card(card.img, SIDE, FILL_COLOR, function (c) {
                    $(c).addClass("face front flip in");
                    $("#" + id).append(c);
                });
            });
        });
        $(".face").css({width: SIDE, height: SIDE, margin: "auto", display: "block"});
    });
    $(".card").css({width: SIDE, height: SIDE, border: CARD_BORDER + "px solid #aaaaaa"});


    $.getScript("./js/libs/card_flip.js", function () {
        $(".card").bind("click", function () {
            console.log(this.id);
            var card_id = this.id.split("_");
            var i = parseInt(card_id[0]), j = parseInt(card_id[1]);
            var card = cards[i][j];
            var index;
            do {
                index = parseInt(IMG_POOL.length * Math.random());
//                console.log(cards[i][j].next_img, img_pool[index]);
            } while (card.next_img === IMG_POOL[index]);
            if (Math.random() > 0.5) {
                draw_text(SIDE,
                        "但是火紅的夕陽，十幾分鐘就掉落不見了...哈哈！誰叫我們在貨櫃場拍太久了🤣🤣🤣",
//                        "#台中 #清水 #高美 #高美濕地 #台中景點 #黃昏 #日落 #風車 #風力發電 #潮間帶 #vscotaiwan #igerstaiwan #vscocam #vscotaichung #discove",
                        FILL_COLOR,
                        function (txt) {
                            card.set_next(txt);
                            flip(card, SIDE, FILL_COLOR);
                        });
            } else {
                card.set_next(IMG_POOL[index]);
                flip(card, SIDE, FILL_COLOR);
            }
        });
    }
    );
});