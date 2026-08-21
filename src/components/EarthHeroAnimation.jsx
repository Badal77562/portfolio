import { useEffect, useRef } from 'react';

// Land: [lon(0=center,0.25=right edge), lat(-0.5..0.5), rx, ry, color]
const LAND = [
  [0.12, -0.12, 0.26, 0.18, '#2a5c42'],  // Asia
  [0.06, -0.27, 0.09, 0.08, '#356b4a'],  // Europe
  [0.09,  0.11, 0.11, 0.21, '#2a5c42'],  // Africa
  [0.66, -0.17, 0.21, 0.17, '#1b4332'],  // North America
  [0.68,  0.23, 0.10, 0.19, '#356b4a'],  // South America
  [0.20,  0.26, 0.08, 0.07, '#5a9e78'],  // Australia
  [0.00,  0.46, 0.45, 0.05, '#c8e8f0'],  // Antarctica
  [0.33, -0.38, 0.06, 0.05, '#a8d8e8'],  // Greenland
  [0.15,  0.07, 0.05, 0.09, '#4aaa70'],  // India (highlighted)
];

// City lights [lon, lat, brightness]
const CITY_LIGHTS = [
  [0.08, -0.25, 0.9], // Europe
  [0.12, -0.18, 0.8], // Middle East
  [0.14, -0.32, 0.7], // Russia
  [0.18, -0.12, 0.9], // South Asia
  [0.20, -0.20, 0.8], // East Asia
  [0.67, -0.20, 0.9], // North America East
  [0.72, -0.22, 0.7], // North America West
  [0.09,  0.05, 0.6], // West Africa
  [0.22,  0.24, 0.6], // SE Australia
];

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export default function EarthHeroAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let t0 = null;
    let stars = [];

    function setup() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: 320 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.15,
        alpha: Math.random() * 0.7 + 0.3,
        phase: Math.random() * Math.PI * 2,
        freq: Math.random() * 1.8 + 0.3,
        color: Math.random() > 0.85
          ? `rgb(${180 + Math.floor(Math.random() * 75)},${180 + Math.floor(Math.random() * 75)},255)`
          : 'rgb(255,255,255)',
      }));
    }

    setup();
    const onResize = setup;
    window.addEventListener('resize', onResize);

    // ── Helpers ────────────────────────────────────────────────
    function lerp(a, b, t) { return a + (b - a) * t; }

    // ── Earth ──────────────────────────────────────────────────
    function drawEarth(cx, cy, R, rot, t) {
      // Outer atmosphere halo
      let g = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.32);
      g.addColorStop(0,    'rgba(20,110,255,0.0)');
      g.addColorStop(0.35, 'rgba(20,110,255,0.08)');
      g.addColorStop(0.72, 'rgba(50,170,255,0.18)');
      g.addColorStop(1,    'rgba(10, 70,200,0.0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.32, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Clip to Earth disc
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Ocean base
      g = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.22, R * 0.08, cx, cy, R);
      g.addColorStop(0,   '#1a72b8');
      g.addColorStop(0.45,'#0d4878');
      g.addColorStop(1,   '#051830');
      ctx.fillStyle = g;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // Land masses
      for (const [lon, lat, rx, ry, color] of LAND) {
        const lonFrac = ((lon - rot / (2 * Math.PI)) % 1 + 1) % 1;
        const lonAngle = lonFrac * 2 * Math.PI;
        const sinL = Math.sin(lonAngle);
        const cosL = Math.cos(lonAngle);
        if (cosL < 0.04) continue;

        const sx = cx + sinL * R;
        const sy = cy + lat * 2 * R;
        const erx = Math.max(0, rx * R * cosL * 1.1);
        const ery = ry * R;
        if (erx < 1) continue;

        ctx.beginPath();
        ctx.ellipse(sx, sy, erx, ery, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Lat/Lon grid
      ctx.globalAlpha = 0.055;
      ctx.strokeStyle = '#80d8ff';
      ctx.lineWidth = 0.6;
      for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
        const ly = cy + (latDeg / 90) * R;
        const hw = Math.sqrt(Math.max(0, R * R - (ly - cy) ** 2));
        ctx.beginPath();
        ctx.ellipse(cx, ly, hw, hw * 0.09, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Clouds
      ctx.globalAlpha = 0.30;
      const cRot = rot * 0.62;
      for (let i = 0; i < 8; i++) {
        const cFrac = ((i / 8 + cRot / (2 * Math.PI)) % 1 + 1) % 1;
        const cAngle = cFrac * 2 * Math.PI;
        const cc = Math.cos(cAngle), cs = Math.sin(cAngle);
        if (cc < 0.05) continue;
        const ccx = cx + cs * R * 0.72;
        const ccy = cy + Math.sin(i * 1.3 + 0.5) * R * 0.36;
        const cr = R * 0.11 * cc;
        const cg = ctx.createRadialGradient(ccx, ccy, 0, ccx, ccy, cr);
        cg.addColorStop(0, 'rgba(255,255,255,0.95)');
        cg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.ellipse(ccx, ccy, cr, cr * 0.38, 0, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // City lights (night side only)
      for (const [lon, lat, bright] of CITY_LIGHTS) {
        const lonFrac = ((lon - rot / (2 * Math.PI)) % 1 + 1) % 1;
        const lonAngle = lonFrac * 2 * Math.PI;
        const sinL = Math.sin(lonAngle);
        const cosL = Math.cos(lonAngle);
        if (cosL > 0.1) continue; // skip day side

        const sx = cx + sinL * R;
        const sy = cy + lat * 2 * R;
        const fadeIn = Math.max(0, -cosL * 4); // fade as we go darker
        const alpha = bright * fadeIn * 0.8;
        if (alpha < 0.05) continue;

        const lr = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * 0.04);
        lr.addColorStop(0, `rgba(255,220,120,${alpha})`);
        lr.addColorStop(1, `rgba(255,180,60,0)`);
        ctx.beginPath();
        ctx.arc(sx, sy, R * 0.04, 0, Math.PI * 2);
        ctx.fillStyle = lr;
        ctx.fill();
      }

      // Night shadow (left side)
      g = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      g.addColorStop(0,    'rgba(0,4,15,0.95)');
      g.addColorStop(0.25, 'rgba(0,4,15,0.72)');
      g.addColorStop(0.46, 'rgba(0,4,15,0.0)');
      g.addColorStop(1,    'rgba(0,4,15,0.0)');
      ctx.fillStyle = g;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // Specular highlight
      g = ctx.createRadialGradient(cx + R * 0.3, cy - R * 0.3, 0, cx + R * 0.3, cy - R * 0.3, R * 0.58);
      g.addColorStop(0, 'rgba(255,255,255,0.14)');
      g.addColorStop(0.5,'rgba(255,255,255,0.04)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      ctx.restore();

      // Atmosphere rim (after clip, so it draws outside)
      g = ctx.createRadialGradient(cx, cy, R * 0.87, cx, cy, R * 1.09);
      g.addColorStop(0,    'rgba(30,130,255,0)');
      g.addColorStop(0.55, 'rgba(30,130,255,0.06)');
      g.addColorStop(0.85, 'rgba(80,200,255,0.26)');
      g.addColorStop(1,    'rgba(20, 90,220,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.09, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    // ── Orbit Path ─────────────────────────────────────────────
    function drawOrbit(cx, cy, a, b, tilt) {
      ctx.save();
      ctx.strokeStyle = 'rgba(80,160,255,0.14)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 12]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, a, b, tilt, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    // ── Scan Beam ──────────────────────────────────────────────
    function drawScanBeam(sx, sy, ecx, ecy, t) {
      const dx = ecx - sx, dy = ecy - sy;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 1) return;
      const nx = dx / len, ny = dy / len;
      const px = -ny, py = nx;

      const reach = len * 0.82;
      const spread = reach * 0.20;
      const ex = sx + nx * reach, ey = sy + ny * reach;

      ctx.save();

      // Main beam
      const alpha = 0.12 + Math.sin(t * 2.8) * 0.04;
      const bg = ctx.createLinearGradient(sx, sy, ex, ey);
      bg.addColorStop(0,    `rgba(0,220,255,0)`);
      bg.addColorStop(0.10, `rgba(0,220,255,${alpha})`);
      bg.addColorStop(0.82, `rgba(0,180,255,${alpha * 0.55})`);
      bg.addColorStop(1,    `rgba(0,180,255,0)`);

      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex + px * spread, ey + py * spread);
      ctx.lineTo(ex - px * spread, ey - py * spread);
      ctx.closePath();
      ctx.fillStyle = bg;
      ctx.fill();

      // Beam edge lines
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex + px * spread, ey + py * spread);
      ctx.strokeStyle = `rgba(0,255,220,${alpha * 1.2})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex - px * spread, ey - py * spread);
      ctx.stroke();

      // Scanning sweep line
      const sp = (Math.sin(t * 3.2) + 1) * 0.5;
      const progress = 0.12 + sp * 0.72;
      const lx = sx + nx * reach * progress;
      const ly = sy + ny * reach * progress;
      const lw = spread * progress * 0.65;
      const la = 0.5 + Math.sin(t * 6.5) * 0.25;

      ctx.beginPath();
      ctx.moveTo(lx + px * lw, ly + py * lw);
      ctx.lineTo(lx - px * lw, ly - py * lw);
      ctx.strokeStyle = `rgba(0,255,180,${la})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Data dots along beam
      for (let i = 0; i < 4; i++) {
        const dp = 0.2 + i * 0.18;
        const ddx = sx + nx * reach * dp;
        const ddy = sy + ny * reach * dp;
        const da = 0.4 + Math.sin(t * 4 + i * 1.5) * 0.3;
        ctx.beginPath();
        ctx.arc(ddx, ddy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,200,${da})`;
        ctx.fill();
      }

      ctx.restore();
    }

    // ── ISRO Satellite ─────────────────────────────────────────
    function drawSatellite(sx, sy, angle, t) {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(angle);

      const bw = 22, bh = 14;

      // Body glow
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 62);
      glow.addColorStop(0, 'rgba(50,150,255,0.20)');
      glow.addColorStop(1, 'rgba(50,150,255,0)');
      ctx.beginPath();
      ctx.arc(0, 0, 62, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Body
      let g = ctx.createLinearGradient(-bw / 2, -bh / 2, bw / 2, bh / 2);
      g.addColorStop(0,   '#dce8f4');
      g.addColorStop(0.4, '#9aacC0');
      g.addColorStop(1,   '#485870');
      ctx.fillStyle = g;
      roundRect(ctx, -bw / 2, -bh / 2, bw, bh, 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(100,190,255,0.65)';
      ctx.lineWidth = 0.7;
      roundRect(ctx, -bw / 2, -bh / 2, bw, bh, 2);
      ctx.stroke();

      // ISRO-inspired saffron stripe
      ctx.fillStyle = 'rgba(255,128,0,0.90)';
      ctx.fillRect(-bw / 2, -2.2, bw, 4.4);

      // Instrument lens (bottom, pulse)
      ctx.fillStyle = '#0a1a28';
      ctx.fillRect(-4, bh / 2 - 1, 8, 5.5);
      const pulse = 0.55 + Math.sin(t * 5.5) * 0.38;
      const lr = ctx.createRadialGradient(0, bh / 2 + 2.5, 0, 0, bh / 2 + 2.5, 3.5);
      lr.addColorStop(0, `rgba(0,230,255,${pulse})`);
      lr.addColorStop(1, 'rgba(0,230,255,0)');
      ctx.beginPath();
      ctx.arc(0, bh / 2 + 2.5, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = lr;
      ctx.fill();

      // Solar panels
      const pw = 36, ph = 10, gap = 2.5;
      for (const side of [-1, 1]) {
        const ox = side < 0 ? -bw / 2 - gap - pw : bw / 2 + gap;

        // Panel body
        g = ctx.createLinearGradient(0, -ph / 2, 0, ph / 2);
        g.addColorStop(0,   '#1838b0');
        g.addColorStop(0.5, '#0d2268');
        g.addColorStop(1,   '#1838b0');
        ctx.fillStyle = g;
        ctx.fillRect(ox, -ph / 2, pw, ph);
        ctx.strokeStyle = '#2050c0';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(ox, -ph / 2, pw, ph);

        // Cell grid
        ctx.strokeStyle = 'rgba(50,150,255,0.38)';
        for (let ci = 1; ci < 5; ci++) {
          ctx.beginPath();
          ctx.moveTo(ox + ci * pw / 5, -ph / 2);
          ctx.lineTo(ox + ci * pw / 5,  ph / 2);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(ox, 0);
        ctx.lineTo(ox + pw, 0);
        ctx.stroke();

        // Alternating cell highlight
        ctx.fillStyle = 'rgba(60,180,255,0.10)';
        for (let ci = 0; ci < 5; ci += 2) {
          ctx.fillRect(ox + ci * pw / 5, -ph / 2, pw / 5, ph / 2);
        }

        // Strut
        const strutX = side < 0 ? -bw / 2 : bw / 2;
        ctx.strokeStyle = 'rgba(180,210,240,0.55)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(strutX, 0);
        ctx.lineTo(side < 0 ? ox + pw : ox, 0);
        ctx.stroke();
      }

      // Antenna mast
      ctx.strokeStyle = '#a8c8e0';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(0, -bh / 2);
      ctx.lineTo(0, -bh / 2 - 10);
      ctx.stroke();
      // Dish
      ctx.beginPath();
      ctx.arc(0, -bh / 2 - 14.5, 5.5, Math.PI, Math.PI * 2);
      ctx.strokeStyle = '#c8dff0';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      // Dish center dot
      ctx.beginPath();
      ctx.arc(0, -bh / 2 - 14.5, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#e0f0ff';
      ctx.fill();

      ctx.restore();
    }

    // ── Satellite trail ────────────────────────────────────────
    function drawTrail(ecx, ecy, a, b, tilt, satTheta, count = 24) {
      ctx.save();
      for (let i = 1; i <= count; i++) {
        const pastTheta = satTheta - (i / count) * 0.8;
        const cT = Math.cos(pastTheta), sT = Math.sin(pastTheta);
        const cTilt = Math.cos(tilt), sTilt = Math.sin(tilt);
        const tx = ecx + a * cT * cTilt - b * sT * sTilt;
        const ty = ecy + a * cT * sTilt + b * sT * cTilt;
        const alpha = (1 - i / count) * 0.18;
        const behind = sT > 0.08;
        if (behind) continue;
        ctx.beginPath();
        ctx.arc(tx, ty, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,200,255,${alpha})`;
        ctx.fill();
      }
      ctx.restore();
    }

    // ── Data grid on Earth surface ─────────────────────────────
    function drawDataPoints(cx, cy, R, rot, t) {
      const points = [
        [0.15, 0.07],  // India
        [0.12, -0.12], // Central Asia
        [0.08, -0.26], // Europe
      ];
      for (const [lon, lat] of points) {
        const lonFrac = ((lon - rot / (2 * Math.PI)) % 1 + 1) % 1;
        const lonAngle = lonFrac * 2 * Math.PI;
        const cosL = Math.cos(lonAngle), sinL = Math.sin(lonAngle);
        if (cosL < 0.2) continue;
        const sx = cx + sinL * R;
        const sy = cy + lat * 2 * R;
        const pAlpha = 0.5 + Math.sin(t * 3 + lon * 10) * 0.3;

        // Ping ring
        const ringR = (((t * 2 + lon * 5) % 1)) * R * 0.08;
        ctx.beginPath();
        ctx.arc(sx, sy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,180,${pAlpha * (1 - ringR / (R * 0.08))})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,180,${pAlpha})`;
        ctx.fill();
      }
    }

    // ── Main frame loop ────────────────────────────────────────
    function frame(ts) {
      if (!t0) t0 = ts;
      const t = (ts - t0) / 1000;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Space background
      let g = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h));
      g.addColorStop(0,   '#0c1828');
      g.addColorStop(0.55,'#060f1c');
      g.addColorStop(1,   '#020810');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Nebula glows
      const nebulas = [
        [0.08, 0.22, 24, 80, 160],
        [0.90, 0.78, 80, 40, 120],
        [0.50, 0.10, 20, 50, 120],
      ];
      for (const [nx, ny, r, gv, b] of nebulas) {
        g = ctx.createRadialGradient(w * nx, h * ny, 0, w * nx, h * ny, w * 0.42);
        g.addColorStop(0, `rgba(${r},${gv},${b},0.14)`);
        g.addColorStop(1, `rgba(${r},${gv},${b},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Stars
      for (const s of stars) {
        const a = s.alpha * (0.55 + 0.45 * Math.sin(t * s.freq + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace('rgb', 'rgba').replace(')', `,${a.toFixed(2)})`);
        ctx.fill();
        // Cross sparkle for bright stars
        if (s.r > 1.2 && a > 0.7) {
          ctx.strokeStyle = s.color.replace('rgb', 'rgba').replace(')', `,${(a * 0.3).toFixed(2)})`);
          ctx.lineWidth = 0.5;
          const sl = s.r * 3;
          ctx.beginPath();
          ctx.moveTo(s.x - sl, s.y); ctx.lineTo(s.x + sl, s.y);
          ctx.moveTo(s.x, s.y - sl); ctx.lineTo(s.x, s.y + sl);
          ctx.stroke();
        }
      }

      // Earth parameters
      const ecx = w * 0.58;
      const ecy = h * 0.50;
      const eR = Math.min(w * 0.23, h * 0.40, 215);

      // Earth rotation: 30s full loop
      const earthRot = (t / 30) * 2 * Math.PI;

      // Orbit parameters
      const orbitA = eR * 1.76;
      const orbitB = eR * 0.64;
      const orbitTilt = 0.52; // ~30°

      // Satellite position: 10s orbit loop
      const satTheta = (t / 10) * 2 * Math.PI;
      const cosT = Math.cos(satTheta), sinT = Math.sin(satTheta);
      const cosTilt = Math.cos(orbitTilt), sinTilt = Math.sin(orbitTilt);

      const satX = ecx + orbitA * cosT * cosTilt - orbitB * sinT * sinTilt;
      const satY = ecy + orbitA * cosT * sinTilt + orbitB * sinT * cosTilt;
      const satBehind = sinT > 0.08;
      const satAngle = Math.atan2(satY - ecy, satX - ecx) + Math.PI / 2;

      // Orbit path
      drawOrbit(ecx, ecy, orbitA, orbitB, orbitTilt);

      // Behind-Earth satellite (faded, occluded)
      if (satBehind) {
        ctx.globalAlpha = 0.20;
        drawSatellite(satX, satY, satAngle, t);
        ctx.globalAlpha = 1;
      }

      // Earth
      drawEarth(ecx, ecy, eR, earthRot, t);

      // Data points on Earth surface
      drawDataPoints(ecx, ecy, eR, earthRot, t);

      // Front-of-Earth satellite + effects
      if (!satBehind) {
        drawTrail(ecx, ecy, orbitA, orbitB, orbitTilt, satTheta);
        drawScanBeam(satX, satY, ecx, ecy, t);
        drawSatellite(satX, satY, satAngle, t);
      }

      // Vignette
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.75);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.38)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
