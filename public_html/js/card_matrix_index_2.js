/* global IMG_POOL, TXT_POOL */

const COLUMN = 12, ROW = 6;
const CARD_BORDER = 10, BORDER_STYLE = 'inset';
const WT = window.screen.availWidth - 10, HT = window.screen.availHeight;
const SIDE = (WT / COLUMN > HT / ROW) ?
        HT / ROW * MOD(ROW) - CARD_BORDER * 2 :
        WT / COLUMN - CARD_BORDER * 2;
const COLOR = {
    CARD: '#373737', //rgb(55,55,55)
    BORDER: ['#cecece', '#3333ff']
};

var top_box = document.createElement("div");
$(top_box).css({
    height: (HT - (SIDE + CARD_BORDER * 2) * ROW) * 0.4,
    width: (SIDE + CARD_BORDER * 2) * COLUMN
});
$("body").prepend(top_box);

function MOD(row) {
    switch (row) {
        case 1:
            return 0.72;
        case 2:
            return 0.95;
    }
    return 1;
}

$(function () {
    var img_pool, txt_pool;
    img_pool = IMG_POOL;
    txt_pool = TXT_POOL;
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
        $(".card").css({
            width: SIDE,
            height: SIDE,
            border: CARD_BORDER + "px " + BORDER_STYLE + " " + COLOR.BORDER[0]});
        $(".row").css({
            height: SIDE + CARD_BORDER * 2,
            width: (SIDE + CARD_BORDER * 2) * COLUMN
        });

    });
    // initialize cards
    $.getScript("./js/libs/create_card.js", function () {
        cards.forEach(function (row) {
            row.forEach(function (card) {
                var id = card.id;
                create_card(card.img, SIDE, COLOR.CARD, (c) => {
                    $(c).addClass("face front flip in");
                    $("#" + id).append(c);
                });
            });
        });
        $(".face").css({width: SIDE, height: SIDE});
    });
    $(".card").css({width: SIDE, height: SIDE}); //, border: CARD_BORDER + "px solid #aaaaaa"

    $.getScript("./js/libs/card_flip.js", function () {
        $(".card").click(function (event) {
            console.log(this.id);
            var card_id = this.id.split("_");
            var i = parseInt(card_id[0]), j = parseInt(card_id[1]);
            var card = cards[i][j];
            var img_index, txt_index;
            do {
                img_index = parseInt(img_pool.length * Math.random());
//                console.log(cards[i][j].next_img, img_pool[index]);
            } while (card.next_img === img_pool[img_index]);
            if (Math.random() > 0.5) {
                txt_index = parseInt(txt_pool.length * Math.random());
                draw_text(SIDE, txt_pool[txt_index], COLOR.CARD, (txt) => {
                    card.set_next(txt);
                    flip(card, SIDE, COLOR.CARD, CARD_BORDER, BORDER_STYLE, COLOR.BORDER[1]);
                });
            } else {
                card.set_next(img_pool[img_index]);
                flip(card, SIDE, COLOR.CARD, CARD_BORDER, BORDER_STYLE, COLOR.BORDER[0]);
            }
        });
    }
    );
});