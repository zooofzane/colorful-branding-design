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
let randomint = []
let randomcdecimal = []
let allcanvas = document.getElementsByClassName("b-canvas")

function initialate() {
    for (let i = 0; i < 8; i++) {
        r[i] = random(100, 150);
        g[i] = 255 - r[i];
        b[i] = 0;
        randomint[i] = getRandomInt(8)
        randomcdecimal[i] = random(8)
    }


}
initialate()



// fill: "#" + (r[i]).toString(16) + (g[i]).toString(16) + (b[i]).toString(16),

    // VTCSpike
var vfont = new FontFace('VTCSpike', 'url(VTCCarrie-Regular.otf)');

vfont.load().then(function(VTCfont) {
    document.fonts.add(VTCfont);





    text[0] = new Blotter.Text(splitstr[0], {
        family: 'VTCSpike',
        size: 225,
        fill: "#232323",
        paddingLeft: 240,
        paddingTop: 240,
        paddingRight: 240,
        paddingTDown: 240,
    });

    text[1] = new Blotter.Text(splitstr[1], {
        family: 'VTCSpike',
        size: 225,
        fill: "#000000",
        paddingLeft: 240,
        paddingTop: 340,
        paddingRight: 240,
        paddingTDown: 240,
    });

    text[2] = new Blotter.Text(splitstr[2], {
        family: 'VTCSpike',
        size: 225,
        fill: "#000000",
        paddingLeft: 240,
        paddingTop: 240,
        paddingRight: 240,
        paddingTDown: 240,
    });

    text[3] = new Blotter.Text(splitstr[3], {
        family: 'VTCSpike',
        size: 225,
        fill: "#000000",
        paddingLeft: 240,
        paddingTop: 240,
        paddingRight: 240,
        paddingTDown: 240,
    });

    text[4] = new Blotter.Text(splitstr[4], {
        family: 'VTCSpike',
        size: 225,
        fill: "#000000",
        paddingLeft: 240,
        paddingTop: 240,
        paddingRight: 240,
        paddingTDown: 240,
    });

    text[5] = new Blotter.Text(splitstr[5], {
        family: 'VTCSpike',
        size: 225,
        fill: "#000000",
        paddingLeft: 240,
        paddingTop: 240,
        paddingRight: 240,
        paddingTDown: 240,
    });

    text[6] = new Blotter.Text(splitstr[6], {
        family: 'VTCSpike',
        size: 225,
        fill: "#000000",
        paddingLeft: 240,
        paddingTop: 240,
        paddingRight: 240,
        paddingTDown: 240,
    });

    text[7] = new Blotter.Text(splitstr[7], {
        family: 'VTCSpike',
        size: 225,
        fill: "#000000",
        paddingLeft: 240,
        paddingTop: 240,
        paddingRight: 240,
        paddingTDown: 240,
    });








    for (let i = 0; i < splitstr.length; i++) {

        // let fontsize = Math.sin(i/4-0.5) * 120;
        // console.log(fontsize)
       
        material[i] = new Blotter.ChannelSplitMaterial();
        material[i].uniforms.uRotation.value = 0
        material[i].uniforms.uOffset.value = 0
        material[i].uniforms.uAnimateNoise.value = 0.0

        blotter[i] = new Blotter(material[i], { texts: text[i] });

        scope[i] = blotter[i].forText(text[i]);

        scope[i].appendTo(document.body);
    }

    allcanvas[0].setAttribute('id', 'c')
    allcanvas[1].setAttribute('id', 'o1')
    allcanvas[2].setAttribute('id', 'l1')
    allcanvas[3].setAttribute('id', 'o2')
    allcanvas[4].setAttribute('id', 'r')
    allcanvas[5].setAttribute('id', 'f')
    allcanvas[6].setAttribute('id', 'u')
    allcanvas[7].setAttribute('id', 'l2')

let rotationangle = [12,90,0,120,145,76,126,30];
let offsetvalue = [18,60,8,19,9,18,20,7]


    const tick = () => {

        time += 0.005;
        for (let i = 0; i < splitstr.length; i++) {
            let cx = getOffset(allcanvas[i]).left;
            let cy = getOffset(allcanvas[i]).top;

            var angleDeg = Math.atan2(mousey - cy, mousex - cx) * 180 / Math.PI;
            material[i].uniforms.uRotation.value = rotationangle[i]+angleDeg;

            let distance = dist(cx, cy, mousex, mousey);
            distance = clamp(distance, 70, 1000)
            distance = map(distance, 70, 1000, 0, offsetvalue[i]/100)
            // material[i].uniforms.uOffset.value =  distance
            material[i].uniforms.uOffset.value =  offsetvalue[i]/200
            // material[i].uniforms.uOffset.value =  0
        }
        window.requestAnimationFrame(tick)
    }
    tick()
});








document.addEventListener('mousemove', (e) => {
    mousex = e.clientX - 440;
    mousey = e.clientY -540;
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}