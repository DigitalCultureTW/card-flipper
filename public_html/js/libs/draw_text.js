function draw_text(size, text, color, callback) {
//    console.log(size);
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.canvas.width = size;
    ctx.canvas.height = size;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    var font_size = parseInt(size / 10);
    ctx.font = font_size + 'px 標楷體';//serif 
    ctx.fillStyle = 'white';
    var margin = font_size * 0.8;
    var y = margin + font_size;
    var sub_start = 0;
    for (i = 0; i < text.length; i++) {
        var substr = text.substring(sub_start, i + 1);
        var substr_width = ctx.measureText(substr).width;
//        console.log(sub_start, i - sub_start + 1, substr_width, substr);
        if (substr_width > size - margin * 3 || i === text.length - 1) {
            ctx.fillText(substr, margin, y);
            sub_start = i + 1;
            y += font_size * 1.2;
            if (y > size - margin)
                break;
        }
    }
    var img = new Image();
    img.src = canvas.toDataURL("image/png");
    img.onload = function () {
        callback(img.src);
    };
}