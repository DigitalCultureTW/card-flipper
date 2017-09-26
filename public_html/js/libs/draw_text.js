function draw_text(size, text, color, callback) {
    console.log(size);
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.canvas.width = size;
    ctx.canvas.height = size;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    ctx.font = '48px 標楷體';//serif 
    ctx.fillStyle = 'white';
    var margin = 30;
    var y = margin + 48;
    var sub_start = 0;
    for (i = 0; i < text.length; i++) {
        var substr = text.substring(sub_start, i + 1);
        var substr_width = ctx.measureText(substr).width;
        console.log(sub_start, i - sub_start + 1, substr_width, substr);
        if (substr_width > size - margin * 3 || i == text.length - 1) {
            ctx.fillText(substr, margin, y);
            sub_start = i + 1;
            y += 48;
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