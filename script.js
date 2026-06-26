/* ==========================================================================
   Global Variables & State
   ========================================================================== */
let currentScreenIndex = 1;
const totalScreens = 7;

// Background Canvas Config
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let bgParticles = [];
let rosePetals = [];
let fireflies = [];
let mouse = { x: null, y: null };

// Shooting Star Variables
let shootingStarActive = false;
let ssX = 0;
let ssY = 0;
let ssSpeedX = 0;
let ssSpeedY = 0;
let ssAlpha = 0;
let ssDecay = 0;

// Confetti & Trail Canvas Config
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let trailParticles = [];
let confettiActive = false;
let trailLoopActive = false;
let confettiAnimationId = null;

// Audio Configuration
let isMusicPlaying = false;
let audioObj = null;
let audioCtx = null;
let synthIntervalId = null;
let synthChordIndex = 0;
let synthNoteIndex = 0;

// Dodge Button Variables
const dodgeBtn = document.getElementById('btn-dodge');
let dodgeCount = 0;
const maxDodges = 3;

/* ==========================================================================
   Page Load Initialization
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  // Setup Background Canvas
  resizeBgCanvas();
  resizeConfettiCanvas();
  window.addEventListener('resize', () => {
    resizeBgCanvas();
    resizeConfettiCanvas();
  });
  
  // Track Mouse Move for Particle Interactive Push and Sparkle Trail
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Push sparkle trail particles
    if (Math.random() < 0.55) {
      addTrailParticle(e.clientX, e.clientY);
    }
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Track Touch for mobile interaction
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      mouse.x = touchX;
      mouse.y = touchY;
      
      // Push touch trail particles
      if (Math.random() < 0.65) {
        addTrailParticle(touchX, touchY);
      }
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Initialize background elements
  initBgParticles();
  animateBg();

  // Setup Music Toggle
  const musicToggle = document.getElementById('music-toggle');
  musicToggle.addEventListener('click', toggleMusic);

  // Setup Dodge Button Events
  dodgeBtn.addEventListener('mouseenter', handleDodge);
  dodgeBtn.addEventListener('touchstart', handleDodge, { passive: false });
  dodgeBtn.addEventListener('click', handleDodgeClick);
});

/* ==========================================================================
   Twinkling Celestial Stars Engine
   ========================================================================== */
function resizeBgCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}

class BgParticle {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.size = Math.random() * 3 + 1.2; // Stars are small
    this.x = Math.random() * bgCanvas.width;
    this.y = initial ? Math.random() * bgCanvas.height : -10;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.speedY = -(Math.random() * 0.05 + 0.01); // Stars drift extremely slowly upwards
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    this.twinkleOffset = Math.random() * Math.PI * 2;
    
    // Choose star color (60% white, 30% warm gold, 10% soft lavender)
    const randColor = Math.random();
    if (randColor < 0.3) {
      this.colorBase = 'rgba(255, 230, 150, '; // Warm Gold
    } else if (randColor < 0.4) {
      this.colorBase = 'rgba(194, 176, 248, '; // Soft Lavender
    } else {
      this.colorBase = 'rgba(255, 255, 255, '; // Pure White
    }
  }

  update() {
    this.y += this.speedY;
    if (this.y < -10) {
      this.reset(false);
    }
  }

  draw() {
    // Twinkle using cosine cycle
    const twinkle = 0.3 + Math.abs(Math.cos(Date.now() * this.twinkleSpeed + this.twinkleOffset)) * 0.7;
    bgCtx.fillStyle = this.colorBase + (this.opacity * twinkle) + ')';
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    bgCtx.fill();
  }
}

/* ==========================================================================
   Bioluminescent Fireflies (Jugnu) Class
   ========================================================================== */
class Firefly {
  constructor() {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.size = Math.random() * 2.5 + 1.5;
    
    // Slow drifting speeds
    this.vx = Math.random() * 0.4 - 0.2;
    this.vy = Math.random() * 0.3 - 0.15;
    
    this.pulseAngle = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.03 + 0.015; // Slow glowing pulse
    this.swayAngle = Math.random() * Math.PI * 2;
    this.swaySpeed = Math.random() * 0.015 + 0.005;
    this.swayWidth = Math.random() * 0.4 + 0.2;
  }

  update() {
    this.pulseAngle += this.pulseSpeed;
    this.swayAngle += this.swaySpeed;
    
    this.x += this.vx + Math.sin(this.swayAngle) * this.swayWidth;
    this.y += this.vy;

    // Wrap around screen boundaries
    if (this.x < -10) this.x = bgCanvas.width + 10;
    if (this.x > bgCanvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = bgCanvas.height + 10;
    if (this.y > bgCanvas.height + 10) this.y = -10;
  }

  draw() {
    // Generate soft glowing bioluminescent radial gradient
    const intensity = 0.35 + Math.sin(this.pulseAngle) * 0.35; // Oscillates between 0.0 and 0.7
    if (intensity > 0.02) {
      const glowRadius = this.size * 5;
      const glow = bgCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius);
      glow.addColorStop(0, `rgba(224, 255, 140, ${intensity})`);
      glow.addColorStop(0.35, `rgba(224, 255, 140, ${intensity * 0.35})`);
      glow.addColorStop(1, 'rgba(224, 255, 140, 0)');
      
      bgCtx.fillStyle = glow;
      bgCtx.beginPath();
      bgCtx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
      bgCtx.fill();
    }
  }
}

/* ==========================================================================
   Falling Organic Rose Petals Class
   ========================================================================== */
class RosePetal {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * bgCanvas.width;
    this.y = initial ? Math.random() * bgCanvas.height : -20;
    this.size = Math.random() * 9 + 6;
    this.speedY = Math.random() * 0.6 + 0.4; // Gentle descent
    this.speedX = Math.random() * 0.15 - 0.075;
    this.swayAngle = Math.random() * Math.PI * 2;
    this.swaySpeed = Math.random() * 0.012 + 0.005;
    this.swayWidth = Math.random() * 0.5 + 0.2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.015 - 0.007;
    this.opacity = Math.random() * 0.3 + 0.15;
    
    // Colors tuned for dark background (rich magenta rose, glowing peach pink)
    const colors = [
      'rgba(255, 105, 135, ', // Rose Pink
      'rgba(255, 142, 168, ', // Blush Pink
      'rgba(230, 50, 85, ',   // Deep Magenta
      'rgba(180, 40, 70, ',   // Velvet Rose
      'rgba(255, 185, 195, '  // Peach Champagne
    ];
    this.colorBase = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.y += this.speedY;
    this.swayAngle += this.swaySpeed;
    this.x += Math.sin(this.swayAngle) * this.swayWidth + this.speedX;
    this.rotation += this.rotationSpeed;

    // React slightly to mouse coordinates
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.x += (dx / dist) * force * 1.5;
      }
    }

    // Reset if offscreen
    if (this.y > bgCanvas.height + 20 || this.x < -20 || this.x > bgCanvas.width + 20) {
      this.reset(false);
    }
  }

  draw() {
    bgCtx.save();
    bgCtx.translate(this.x, this.y);
    bgCtx.rotate(this.rotation);
    bgCtx.fillStyle = this.colorBase + this.opacity + ')';
    
    // Draw organic curved petal vector
    bgCtx.beginPath();
    const s = this.size;
    bgCtx.moveTo(0, -s);
    bgCtx.bezierCurveTo(-s, -s / 2, -s, s, 0, s);
    bgCtx.bezierCurveTo(s, s, s, -s / 2, 0, -s);
    bgCtx.fill();
    
    bgCtx.restore();
  }
}

function initBgParticles() {
  const densityStars = Math.min(Math.floor((bgCanvas.width * bgCanvas.height) / 7500), 160);
  const densityFireflies = Math.min(Math.floor((bgCanvas.width * bgCanvas.height) / 25000), 30);
  const densityPetals = Math.min(Math.floor((bgCanvas.width * bgCanvas.height) / 32000), 20);
  
  bgParticles = [];
  fireflies = [];
  rosePetals = [];
  
  for (let i = 0; i < densityStars; i++) {
    bgParticles.push(new BgParticle());
  }
  for (let i = 0; i < densityFireflies; i++) {
    fireflies.push(new Firefly());
  }
  for (let i = 0; i < densityPetals; i++) {
    rosePetals.push(new RosePetal());
  }
}

function animateBg() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  
  // 1. Render slow-drifting twinkling stars
  for (let i = 0; i < bgParticles.length; i++) {
    bgParticles[i].update();
    bgParticles[i].draw();
  }
  
  // 2. Render shooting star meteor streaks
  updateAndDrawShootingStar();
  
  // 3. Render organic falling rose petals
  for (let i = 0; i < rosePetals.length; i++) {
    rosePetals[i].update();
    rosePetals[i].draw();
  }
  
  // 4. Render glowing fireflies (Jugnu)
  for (let i = 0; i < fireflies.length; i++) {
    fireflies[i].update();
    fireflies[i].draw();
  }
  
  requestAnimationFrame(animateBg);
}

/* ==========================================================================
   Shooting Star Meteor Generator
   ========================================================================== */
function updateAndDrawShootingStar() {
  if (!shootingStarActive && Math.random() < 0.0035) {
    ssX = Math.random() * bgCanvas.width * 0.6;
    ssY = Math.random() * bgCanvas.height * 0.25;
    ssSpeedX = Math.random() * 12 + 10;
    ssSpeedY = Math.random() * 5 + 4;
    ssAlpha = 1.0;
    ssDecay = Math.random() * 0.03 + 0.015;
    shootingStarActive = true;
  }

  if (shootingStarActive) {
    ssX += ssSpeedX;
    ssY += ssSpeedY;
    ssAlpha -= ssDecay;

    if (ssAlpha <= 0) {
      shootingStarActive = false;
    } else {
      bgCtx.save();
      bgCtx.strokeStyle = `rgba(224, 240, 255, ${ssAlpha})`;
      bgCtx.lineWidth = 1.5;
      bgCtx.beginPath();
      bgCtx.moveTo(ssX, ssY);
      bgCtx.lineTo(ssX - ssSpeedX * 2.2, ssY - ssSpeedY * 2.2);
      bgCtx.stroke();
      bgCtx.restore();
    }
  }
}

/* ==========================================================================
   Interactive Sparkle Mouse/Touch Trail Canvas Engine (Stardust & Crescent Moon)
   ========================================================================== */
function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

class TrailParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 4;
    
    this.vx = Math.random() * 1.5 - 0.75;
    this.vy = Math.random() * 0.6 + 0.2; // drift down slowly
    this.opacity = 1.0;
    this.decay = Math.random() * 0.024 + 0.016; // fades in ~45 frames
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.08 - 0.04;
    
    // Sparks (80%) or Crescent Moons (20%)
    this.type = Math.random() < 0.18 ? 'moon' : 'sparkle';
    
    // Moonlit palette: glowing silver-blue, yellow moon glow, white
    const colors = [
      '#FFEFA8', // Yellow moon glow
      '#C2B0F8', // Glowing silver-lavender
      '#98E2FF', // Sparkling cyan-blue
      '#FFFFFF'  // Pure stardust white
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.opacity -= this.decay;
  }

  draw() {
    confettiCtx.save();
    confettiCtx.translate(this.x, this.y);
    confettiCtx.rotate(this.rotation);
    confettiCtx.globalAlpha = Math.max(this.opacity, 0);
    
    if (this.type === 'moon') {
      confettiCtx.font = `${this.size * 1.6}px 'Inter', sans-serif`;
      confettiCtx.fillStyle = '#FFEFA8';
      confettiCtx.fillText('🌙', -this.size / 2, this.size / 2);
    } 
    else {
      confettiCtx.fillStyle = this.color;
      confettiCtx.beginPath();
      const s = this.size * 0.85;
      confettiCtx.moveTo(0, -s);
      confettiCtx.quadraticCurveTo(0, 0, s, 0);
      confettiCtx.quadraticCurveTo(0, 0, 0, s);
      confettiCtx.quadraticCurveTo(0, 0, -s, 0);
      confettiCtx.quadraticCurveTo(0, 0, 0, -s);
      confettiCtx.fill();
    }
    
    confettiCtx.restore();
  }
}

function addTrailParticle(x, y) {
  if (trailParticles.length < 90) {
    trailParticles.push(new TrailParticle(x, y));
  }
  
  // Activate overlay loop if sleeping
  if (!trailLoopActive && !confettiActive) {
    trailLoopActive = true;
    animateConfettiCanvas();
  }
}

/* Combined loop for high-index overlay canvas (Confetti + Trails) */
function animateConfettiCanvas() {
  if (!trailLoopActive && !confettiActive) return;
  
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  let drawNeeded = false;
  
  // 1. Process Confetti
  if (confettiActive) {
    let confettiRemaining = false;
    for (let i = 0; i < confettiParticles.length; i++) {
      const p = confettiParticles[i];
      if (p.opacity > 0 && p.y < confettiCanvas.height + 20) {
        p.update();
        p.draw();
        confettiRemaining = true;
      }
    }
    
    // Falling shower generator on accepted screen
    if (Math.random() < 0.08) {
      confettiParticles.push(new ConfettiParticle(Math.random() * confettiCanvas.width, -10, 90, 45, 'heart'));
      confettiRemaining = true;
    }
    
    if (confettiRemaining) {
      drawNeeded = true;
    } else {
      confettiActive = false;
    }
  }
  
  // 2. Process Mouse/Touch Trail Particles
  if (trailParticles.length > 0) {
    for (let i = trailParticles.length - 1; i >= 0; i--) {
      const t = trailParticles[i];
      if (t.opacity > 0) {
        t.update();
        t.draw();
        drawNeeded = true;
      } else {
        trailParticles.splice(i, 1);
      }
    }
  }
  
  if (drawNeeded) {
    confettiAnimationId = requestAnimationFrame(animateConfettiCanvas);
  } else {
    trailLoopActive = false;
    confettiActive = false;
  }
}

/* ==========================================================================
   Envelope Open & Navigation Flow
   ========================================================================== */
function openLetter() {
  const envelope = document.getElementById('envelope-wrapper').querySelector('.envelope');
  if (!envelope.classList.contains('open')) {
    envelope.classList.add('open');
    
    // Automatically trigger music on open (counts as user-interaction autoplay)
    if (!isMusicPlaying) {
      toggleMusic();
    }
  }
}

function nextFromLetter() {
  goToScreen(2);
}

function goToScreen(screenIndex) {
  const currentCard = document.querySelector('.card.active');
  if (currentCard) {
    currentCard.classList.remove('active');
    currentCard.classList.add('fade-out');
  }

  let targetCard;
  if (screenIndex === 'hug') {
    targetCard = document.getElementById('screen-hug');
  } else if (screenIndex === 'accepted') {
    targetCard = document.getElementById('screen-accepted');
  } else {
    targetCard = document.getElementById(`screen-${screenIndex}`);
    currentScreenIndex = screenIndex;
  }

  if (targetCard) {
    setTimeout(() => {
      targetCard.classList.remove('fade-out');
      targetCard.classList.add('active');
      
      if (currentCard) {
        setTimeout(() => {
          currentCard.classList.remove('fade-out');
        }, 950);
      }
    }, 280);
  }
}

/* ==========================================================================
   Interactive Dodge Button Logic
   ========================================================================== */
function handleDodge(e) {
  if (dodgeCount >= maxDodges) return;
  
  e.preventDefault();
  dodgeCount++;

  const maxDisplacementX = window.innerWidth < 480 ? 75 : 120;
  const maxDisplacementY = window.innerWidth < 480 ? 45 : 75;
  
  const angle = Math.random() * Math.PI * 2;
  const minDistance = 55;
  
  const distanceX = minDistance + Math.random() * (maxDisplacementX - minDistance);
  const distanceY = minDistance + Math.random() * (maxDisplacementY - minDistance);
  
  const x = Math.cos(angle) * distanceX;
  const y = Math.sin(angle) * distanceY;

  dodgeBtn.style.transform = `translate(${x}px, ${y}px)`;
  dodgeBtn.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';

  if (dodgeCount === 1) {
    dodgeBtn.innerHTML = '<span class="btn-emoji">😜</span> Hey! No!';
  } else if (dodgeCount === 2) {
    dodgeBtn.innerHTML = '<span class="btn-emoji">😅</span> Still too slow!';
  } else if (dodgeCount === 3) {
    dodgeBtn.innerHTML = '<span class="btn-emoji">🤗</span> Fine, tap me!';
  }
}

function handleDodgeClick(e) {
  if (dodgeCount < maxDodges) {
    handleDodge(e);
  } else {
    goToScreen('hug');
  }
}

/* ==========================================================================
   Interactive Acceptance Outcomes
   ========================================================================== */
function handleAcceptance() {
  goToScreen('accepted');
  triggerConfetti();
}

function handleAcceptanceFromHug() {
  goToScreen('accepted');
  triggerConfetti();
}

/* ==========================================================================
   Confetti Cannon & Hearts Shower Canvas Engine (Accepted outcome)
   ========================================================================== */
class ConfettiParticle {
  constructor(x, y, angle, spread, type) {
    this.x = x;
    this.y = y;
    this.type = type || (Math.random() > 0.4 ? 'strip' : 'heart');
    
    const velocity = Math.random() * 12 + 10;
    const radAngle = (angle + (Math.random() * spread - spread / 2)) * (Math.PI / 180);
    this.vx = Math.cos(radAngle) * velocity;
    this.vy = Math.sin(radAngle) * velocity;
    
    this.gravity = 0.32;
    this.drag = 0.96;
    this.size = Math.random() * 8 + 6;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.2 - 0.1;
    this.opacity = 1;
    this.decay = Math.random() * 0.015 + 0.008;

    const colors = [
      '#61D07F', // Promise Green
      '#FF758F', // Heart pink
      '#FF85A1', // Lavender pink
      '#B09AF0', // Lavender purple
      '#FFD166', // Golden yellow
      '#4ECDC4'  // Soft mint
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.vx *= this.drag;
    this.vy *= this.drag;
    this.vy += this.gravity;
    
    this.x += this.vx;
    this.y += this.vy;
    
    this.rotation += this.rotationSpeed;
    this.opacity -= this.decay;
  }

  draw() {
    confettiCtx.save();
    confettiCtx.translate(this.x, this.y);
    confettiCtx.rotate(this.rotation);
    
    confettiCtx.globalAlpha = Math.max(this.opacity, 0);
    confettiCtx.fillStyle = this.color;
    
    confettiCtx.beginPath();
    if (this.type === 'heart') {
      const size = this.size * 1.2;
      confettiCtx.moveTo(0, size / 4);
      confettiCtx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      confettiCtx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, size / 4);
      confettiCtx.fill();
    } else {
      const w = this.size;
      const h = this.size * 2;
      confettiCtx.fillRect(-w/2, -h/2, w, h);
    }
    
    confettiCtx.restore();
  }
}

function triggerConfetti() {
  resizeConfettiCanvas();
  confettiParticles = [];
  confettiActive = true;
  
  for (let i = 0; i < 70; i++) {
    confettiParticles.push(new ConfettiParticle(0, confettiCanvas.height - 20, -45, 30));
  }
  
  for (let i = 0; i < 70; i++) {
    confettiParticles.push(new ConfettiParticle(confettiCanvas.width, confettiCanvas.height - 20, -135, 30));
  }
  
  for (let i = 0; i < 50; i++) {
    confettiParticles.push(new ConfettiParticle(confettiCanvas.width / 2, confettiCanvas.height / 2, -90, 360, 'heart'));
  }

  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  
  trailLoopActive = true;
  animateConfettiCanvas();
}

/* ==========================================================================
   Double-Safety Audio Controller
   ========================================================================== */
function toggleMusic() {
  const musicToggleBtn = document.getElementById('music-toggle');

  if (isMusicPlaying) {
    // Pause Music
    isMusicPlaying = false;
    musicToggleBtn.classList.remove('playing');
    
    if (audioObj) {
      audioObj.pause();
    }
    if (synthIntervalId) {
      clearInterval(synthIntervalId);
      synthIntervalId = null;
    }
  } else {
    // Play Music
    isMusicPlaying = true;
    musicToggleBtn.classList.add('playing');

    // Attempt 1: Load pre-recorded romantic lo-fi acoustic guitar
    if (!audioObj) {
      audioObj = new Audio();
      audioObj.loop = true;
      audioObj.volume = 0.5;
      
      // Local romantic guitar track
      audioObj.src = 'absolutesound-guitar-music-522811.mp3';
      
      audioObj.addEventListener('error', () => {
        console.warn('Network audio track failed to load. Initiating Plucked Nylon Guitar Synthesizer fallback.');
        startAmbientSynth();
      });
    }

    // Try playing the audio object
    audioObj.play()
      .then(() => {
        console.log('Network acoustic guitar audio track playing successfully.');
      })
      .catch((err) => {
        console.warn('Audio play prevented or failed. Activating Plucked Nylon Guitar Synthesizer fallback.', err);
        startAmbientSynth();
      });
  }
}

/* ==========================================================================
   Web Audio API Plucked Nylon Guitar Synthesizer Fallback
   ========================================================================== */
function startAmbientSynth() {
  if (synthIntervalId) return;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Frequencies for a lower guitar progression: Cmaj9 - Am9 - Fmaj9 - G9
  const chordNotes = [
    [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9 (C3, E3, G3, B3, D4)
    [110.00, 130.81, 164.81, 196.00, 246.94], // Amin9 (A2, C3, E3, G3, B3)
    [87.31, 110.00, 130.81, 164.81, 196.00],  // Fmaj9 (F2, A2, C3, E3, G3)
    [98.00, 123.47, 146.83, 174.61, 220.00]   // G9 (G2, B2, D3, F3, A3)
  ];

  synthChordIndex = 0;
  synthNoteIndex = 0;

  // Play a soft arpeggiated guitar pluck every 480ms
  synthIntervalId = setInterval(() => {
    if (!isMusicPlaying) return;
    
    const notes = chordNotes[synthChordIndex];
    const freq = notes[synthNoteIndex];
    
    playSynthTone(freq);
    
    synthNoteIndex++;
    if (synthNoteIndex >= notes.length) {
      synthNoteIndex = 0;
      if (Math.random() < 0.15) {
        advanceChord();
      }
    }

    if (Math.random() < 0.05) {
      advanceChord();
    }
  }, 480);

  function advanceChord() {
    synthChordIndex = (synthChordIndex + 1) % chordNotes.length;
    synthNoteIndex = 0;
  }
}

function playSynthTone(frequency) {
  if (!audioCtx) return;
  
  const now = audioCtx.currentTime;
  
  // 1. Primary string resonator (mix of sawtooth and triangle for plucked warm nylon buzz)
  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(frequency, now);
  
  const osc2 = audioCtx.createOscillator();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(frequency, now);
  
  // 2. High-Frequency Pick Transient (Transient click to simulate pick strike)
  const pickOsc = audioCtx.createOscillator();
  pickOsc.type = 'triangle';
  pickOsc.frequency.setValueAtTime(frequency * 5, now); // Higher harmonic pick spike
  
  const pickGain = audioCtx.createGain();
  pickGain.gain.setValueAtTime(0.08, now);
  pickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015); // extremely fast 15ms pick pluck decay
  
  // 3. String Lowpass Filter Sweep (sweeps from bright to warm to model pluck decay)
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2200, now); // Starts bright
  filter.frequency.exponentialRampToValueAtTime(140, now + 0.12); // Sweeps down to warm bass in 120ms
  
  // 4. Amplitude Envelope (Rapid attack, long guitar sustain decay)
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.09, now + 0.002); // 2ms Pick attack
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.9); // 1.9s String decay
  
  // 5. Cathedral Echo Delay Node
  const delayNode = audioCtx.createDelay();
  delayNode.delayTime.setValueAtTime(0.38, now);
  
  // 6. Feedback Gain Node
  const feedbackNode = audioCtx.createGain();
  feedbackNode.gain.setValueAtTime(0.35, now);
  
  // Connections
  osc1.connect(filter);
  osc2.connect(filter);
  
  // Connect Pick click straight to filter
  pickOsc.connect(pickGain);
  pickGain.connect(filter);
  
  filter.connect(gainNode);
  
  // Connect dry signal straight to output
  gainNode.connect(audioCtx.destination);
  
  // Connect wet signal to delay line with feedback loop
  gainNode.connect(delayNode);
  delayNode.connect(feedbackNode);
  feedbackNode.connect(delayNode); // feedback loop
  
  // Output the delay effect
  delayNode.connect(audioCtx.destination);
  
  // Start and Stop nodes
  osc1.start(now);
  osc2.start(now);
  pickOsc.start(now);
  
  osc1.stop(now + 2.0);
  osc2.stop(now + 2.0);
  pickOsc.stop(now + 0.02);
}
