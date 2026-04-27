// LuizOliveira.js
// Mesmo layout anterior, apenas reduzido para caber melhor em 400x400

new p5(function (p) {

  const W = 400, H = 400;
  const SCALE = 0.88; // diminui tudo proporcionalmente

  const BASE = [
    ['#d94433', 198,  42, 245, 46, -3.0],
    ['#a00000', 202,  88, 230, 48,  2.0],
    ['#c42828', 214, 150, 235, 50, -2.0],
    ['#5a0000', 120, 202, 230, 52, -2.5],
    ['#d88e84', 180, 255, 235, 56,  9.0],
    ['#320000', 208, 306, 235, 58,  1.0],
    ['#d40d0d', 188, 360, 230, 56,  0.5],
    ['#4b0000', 145, 418, 210, 54, -2.5],
  ];

  let faixas = [];

  p.setup = function () {
    p.createCanvas(W, H);
    p.noLoop();
    p.rectMode(p.CENTER);
    p.noStroke();

    faixas = BASE.map(f => ({
      cor: f[0],
      cx: f[1],
      cy: f[2] * SCALE,
      w: f[3] * SCALE,
      h: f[4] * SCALE,
      angBase: f[5],
      angAtual: f[5],
      hovering: false
    }));
  };

  p.draw = function () {
    p.background('#f4f1ea');

    for (let f of faixas) {
      p.push();
      p.translate(f.cx, f.cy);
      p.rotate(p.radians(f.angAtual));
      p.fill(f.cor);
      p.rect(0, 0, f.w, f.h);
      p.pop();
    }
  };

  p.mouseMoved = function () {
    let redraw = false;

    for (let f of faixas) {
      let dx = p.mouseX - f.cx;
      let dy = p.mouseY - f.cy;

      let sobre =
        dx > -f.w / 2 && dx < f.w / 2 &&
        dy > -f.h / 2 && dy < f.h / 2;

      if (sobre && !f.hovering) {
        f.angAtual = p.random(-15, 15);
        f.hovering = true;
        redraw = true;
      } else if (!sobre && f.hovering) {
        f.hovering = false;
      }
    }

    if (redraw) p.redraw();
  };

});