const COLUMN = 4, ROW = 3, CARD_BORDER = 7;
const WT = window.screen.availWidth - 10, HT = window.screen.availHeight;
const SIDE = (WT / COLUMN > HT / ROW) ? HT / ROW - CARD_BORDER * 2 : WT / COLUMN - CARD_BORDER * 2;
const FILL_COLOR = 'rgb(55,55,55)';


$(function () {
    var img_pool, txt_pool;
    $.getScript("./data/data.js", () => {
        img_pool = IMG_POOL;
        txt_pool = TXT_POOL;
    });
    var cards = [];
    $.getScript("./js/libs/Card.js", () => {
        for (i = 0; i < ROW; i++) {
            cards[i] = [];
            var row = document.createElement("div");
            $(row).addClass("row");
            $("body").append(row);
            for (j = 0; j < COLUMN; j++) {
                var index = parseInt(img_pool.length * Math.random());
                cards[i][j] = new Card(i + "_" + j, img_pool[index]);
                var card = document.createElement("div");
                $(card).addClass('card viewport-flip left');
                $(card).attr("id", cards[i][j].id);
                $(row).append(card);
            }
        }
        $(".card").css({width: SIDE, height: SIDE, border: CARD_BORDER + "px inset #cecece"});
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
            var img_index, txt_index;
            do {
                img_index = parseInt(img_pool.length * Math.random());
//                console.log(cards[i][j].next_img, img_pool[index]);
            } while (card.next_img === img_pool[img_index]);
            if (Math.random() > 0.7) {
                txt_index = parseInt(txt_pool.length * Math.random());
                draw_text(SIDE, txt_pool[txt_index], FILL_COLOR, (txt) => {
                    card.set_next(txt);
                    flip(card, SIDE, FILL_COLOR);
                });
            } else {
                card.set_next(img_pool[img_index]);
                flip(card, SIDE, FILL_COLOR);
            }
        });
    }
    );
});