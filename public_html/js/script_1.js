$(function () {
    for (i = 0; i < 3; i++) {
        var div = document.createElement("div");
        $(div).addClass("row");
        $("body").append(div);
        for (j = 0; j < 4; j++) {
            var canvas = document.createElement("canvas");
            $(canvas).addClass("card").addClass("left");
            $(canvas).attr('id', i + "_" + j);
            $(canvas).text("Your browser does not support the HTML5 canvas tag.");
            $(div).append(canvas);
        }
    }
    var wt = window.screen.availWidth;
    var ht = window.screen.availHeight;
    var w = parseInt(wt / 4), h = parseInt(ht / 3);
    var side = (w > h) ? h : w;
    $("canvas.card").css("width", side);
    $("canvas.card").css("height", side);
    $("div.row").css("width", (side + 2) * 4);
    $("div.row").css("margin-left", "auto");
    $("div.row").css("margin-right", "auto");
    $("div.row").css("display", "block");

    var cards = $(".card");

//img_back.src = "./element/puke-back.png";
//img_front.src = "./element/puke-k.png";
//200,282
    var img_path = "./element/student.jpg";
    loadImage.parseMetaData(img_path, function (data) {
        //default image orientation
        var orientation = 0;
        console.log(data);
        if (data.exif) {
            orientation = data.exif.get('Orientation');
            console.log("Orientation = " + orientation);
        }
        var img_back = loadImage(img_path, function (canvas) {
//            var img_w = img_back.naturalWidth, img_h = img_back.naturalHeight;
            var img_w = img_back.naturalWidth, img_h = img_back.naturalHeight;
            console.log(img_w + "," + img_h);
            cards.each(function () {
                console.log(this.id);
                var ctx = this.getContext('2d');
                ctx.fillStyle = 'rgb(50,50,50)';
                ctx.fillRect(0, 0, side, side);
                var img_shortside = (img_w > img_h) ? img_h : img_w;
                if (img_w > img_h) {
                    console.log("landscape");
                    var space = parseInt((side - img_shortside * side / img_w - 2) / 4);
                    console.log("space = " + space);
                    var s1 = parseInt(side * 0.755), s2 = parseInt(side / 4);
                    ctx.drawImage(canvas, 0, space, s1, s2);//, iside, iside);
//                    ctx.drawImage(img_back, 0, space, side, side);//, iside, iside);
                } else {
                    console.log("portrait");
                    var space = parseInt((side - img_shortside - 2) / 4);
                    console.log("space = " + space);
                    ctx.drawImage(canvas, space, 0, img_shortside, img_shortside * 0.75);//, iside, iside);
//                    ctx.drawImage(img_back, space, 0, img_shortside, img_shortside * 0.75);//, iside, iside);
                }
//                ctx.drawImage(img_back, 0, 0, 200, 150);
//            ctx.drawImage(img_back, 0, 0, 200, 200, 0, 0, 200, 200);
            });
        }, {//should be set to canvas : true to activate auto fix orientation
            canvas: true, orientation: orientation, 
        });


    });
});

