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
    $("canvas.card").css({"width": side, "height": side});
    $("div.row").css({"width": (side + 2) * 4,
        "margin-left": "auto",
        "margin-right": "auto",
        "display": "block"});

    var cards = $(".card");
    console.log(cards.length);
//img_back.src = "./element/puke-back.png";
//img_front.src = "./element/puke-k.png";
//200,282
    var img_path = "./element/student.jpg";
//    var img_path = "https://scontent-tpe1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c85.0.909.909/18094725_830739007089714_6979019236899291136_n.jpg";
    var img = new Image();
    img.src = img_path;
    console.log(img);

    cards.each(function () {
        console.log(this.id);
        var ctx = this.getContext("2d");
        ctx.fillStyle = 'rgb(50,0,0)';
        ctx.fillRect(0, 0, side, side);
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        window.loadImage(img_path, function (img_loaded) {
            if (img_loaded.type === "error") {
                console.log("couldn't load image:", img_loaded);
            } else {
                window.EXIF.getData(img_loaded, function () {
                    var orientation = EXIF.getTag(this, "Orientation");
                    img = window.loadImage.scale(img_loaded, {orientation: orientation || 0, canvas: true, maxWidth: side / 1.5, maxHeight: side / 3});
//                    var canvas = window.loadImage.scale(img_loaded, {orientation: orientation || 0, canvas: true});
//                    document.getElementById("container").appendChild(canvas);
//                    ctx.drawImage(img, 0, 50, side / 1.5, side / 4);
                    ctx.drawImage(img, 0, 0, side / 1.5, side / 3);
                });
            }
        });
    });
});