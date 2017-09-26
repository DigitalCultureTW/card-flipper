/**
 * 
 * @param {string} img_path Path to the image to be included.
 * @param {int} side Lenth of the card border.
 * @param {string} color Background color.
 * @param {function(card)} callback function to process the card.
 * @returns {undefined}
 */
function create_card(img_path, side, color, callback) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = img_path;

    var card = document.createElement("div");
    $(card).css({width: side, height: side, "background": color});
    $(card).addClass("card");

    img.onload = function () {

        window.EXIF.getData(img, function () {
            var orientation = window.EXIF.getTag(this, "Orientation");
            var img_transformed = window.loadImage.scale(img, {
                orientation: orientation || 0, canvas: true,
                maxWidth: side, maxHeight: side});
            var img_loaded = new Image();
            img_loaded.src = img_transformed.toDataURL("image/png");

            img_loaded.onload = function () {
                var img_wrapper = wrap_div(img_loaded);
                $(img_wrapper).addClass("left card_image");
                $(img_wrapper).css("vertical-align", "middle");
                var middle = document.createElement("div");
                $(middle).addClass("card_middle");
                $(middle).css({
                    width: side,
                    height: img_transformed.height,
                    "vertical-align": "middle"
                });
                $(middle).append(img_wrapper);
//                $(middle).append(img_transformed);
                mark_finished(1, "card image added.");
                callback(card);
            };
        });
    };

}

var create_block = function (width, height, color, callback) {
    var block_canvas = document.createElement("canvas");
    block_canvas.width = width;
    block_canvas.height = height;
    var ctx = block_canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    var block = new Image();
    block.src = block_canvas.toDataURL("image/png");
    block.onload = function () {
        var div = wrap_div(block);
        callback(div);
    };
};