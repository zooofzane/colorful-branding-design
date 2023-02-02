const { RGBADepthPacking } = require("three");

let time = 0
let types = "COLORFUL"
let splitstr = types.split('');
let text = []
var material = []
let blotter = []
let scope = []
let mousex, mousey

let r = [];
let g = [];
let b = [];
for (let i = 0; i < 8; i++) {
    r[i] = random(100, 150);
    g[i] = 255 - r[i];
    b[i] = 0;
}

let allcanvas = document.getElementsByClassName("b-canvas")
    // VTCSpike
var vfont = new FontFace('VTCSpike', 'url(VTCSpikeTrial-Bold.woff)');
vfont.load().then(function(VTCfont) {
    document.fonts.add(VTCfont);
    console.log(VTCfont);
    for (let i = 0; i < splitstr.length; i++) {
        text[i] = new Blotter.Text(splitstr[i], {
            family: 'VTCSpike',
            size: 120,
            fill: "#" + (r[i]).toString(16) + (g[i]).toString(16) + (b[i]).toString(16),
            paddingLeft: 240,
            paddingTop: 240,
            paddingRight: 240,
            paddingTDown: 240,
        });

        material[i] = new Blotter.ChannelSplitMaterial();
        material[i].uniforms.uRotation.value = 0
        material[i].uniforms.uOffset.value = 0.08
        material[i].uniforms.uAnimateNoise.value = 0.0

        blotter[i] = new Blotter(material[i], { texts: text[i] });

        scope[i] = blotter[i].forText(text[i]);

        scope[i].appendTo(document.body);
    }
    // error occurred

    allcanvas[0].setAttribute('id', 'c')
    allcanvas[1].setAttribute('id', 'o')
    allcanvas[2].setAttribute('id', 'l')
    allcanvas[3].setAttribute('id', 'o')
    allcanvas[4].setAttribute('id', 'r')
    allcanvas[5].setAttribute('id', 'f')
    allcanvas[6].setAttribute('id', 'u')
    allcanvas[7].setAttribute('id', 'l')


    const tick = () => {

        time += 0.005;
        for (let i = 0; i < splitstr.length; i++) {
            let cx = getOffset(allcanvas[i]).left;
            let cy = getOffset(allcanvas[i]).top;

            var angleDeg = Math.atan2(mousey - cy, mousex - cx) * 180 / Math.PI;
            material[i].uniforms.uRotation.value = angleDeg;

            let distance = dist(cx, cy, mousex, mousey);
            distance = clamp(distance, 0, 1000)
            distance = map(distance, 0, 1000, 0, 0.1)
            material[i].uniforms.uOffset.value = distance

        }

        window.requestAnimationFrame(tick)
    }

    tick()
});





document.addEventListener('mousemove', (e) => {
    mousex = e.clientX - 240;
    mousey = e.clientY - 240;
});

function map(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function dist(x1, y1, x2, y2) {
    let xDiff = x1 - x2;
    let yDiff = y1 - y2;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2);
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}