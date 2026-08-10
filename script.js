/* =======================================================
   BHASURA BDAY - INTERACTIVE JAVASCRIPT LOGIC
   ======================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- AUDIO SYNTHESIZER (WEB AUDIO API - ZERO DEPENDENCIES!) ---
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  function playTone(freq, type, duration, startVol = 0.3, endVol = 0.01) {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(startVol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(endVol, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log('Audio error', e);
    }
  }

  // Airhorn SFX
  function playAirhorn() {
    if (!soundEnabled) return;
    initAudio();
    const freqs = [370, 370, 370, 370, 493];
    const durations = [0.1, 0.1, 0.1, 0.15, 0.4];
    let time = audioCtx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + durations[idx]);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(time);
      osc.stop(time + durations[idx]);
      time += durations[idx] + 0.03;
    });
  }

  // Bruh SFX
  function playBruh() {
    if (!soundEnabled) return;
    initAudio();
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch(e){}
  }

  // Stamp SFX
  function playStampSFX() {
    playTone(150, 'square', 0.15, 0.5);
    setTimeout(() => playTone(80, 'sine', 0.2, 0.6), 50);
  }

  // Victory Arpeggio SFX
  function playVictorySFX() {
    if (!soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      setTimeout(() => playTone(freq, 'sine', 0.25, 0.4), index * 120);
    });
  }

  // Sound Toggle Button (Optional)
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundStatus = document.getElementById('soundStatus');

  if (soundToggleBtn && soundStatus) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundStatus.textContent = soundEnabled ? 'ON' : 'OFF';
      soundToggleBtn.style.background = soundEnabled ? '#333' : '#ff0055';
      if (soundEnabled) playTone(440, 'sine', 0.1);
    });
  }

  const airhornBtn = document.getElementById('airhornBtn');
  if (airhornBtn) airhornBtn.addEventListener('click', playAirhorn);

  const bruhBtn = document.getElementById('bruhBtn');
  if (bruhBtn) bruhBtn.addEventListener('click', playBruh);


  // --- PARTY NUKE MODE & HACK POPUP MODAL ---
  const partyNukeBtn = document.getElementById('partyNukeBtn');
  const hackModal = document.getElementById('hackModal');
  const closeHackModalBtn = document.getElementById('closeHackModalBtn');
  const closeHackModalX = document.getElementById('closeHackModalX');

  function playChaChing() {
    if (!soundEnabled) return;
    initAudio();
    const freqs = [987.77, 1318.51, 1567.98];
    freqs.forEach((f, i) => {
      setTimeout(() => playTone(f, 'sawtooth', 0.2, 0.4), i * 80);
    });
  }

  partyNukeBtn.addEventListener('click', () => {
    playAirhorn();
    playVictorySFX();

    // Trigger Canvas Confetti Explosion
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 85,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 85,
          origin: { x: 1 }
        });
      }, 300);
    }

    // Body Screen Shake & Disco Flash
    document.body.classList.add('shake', 'disco-mode');

    // Create Floating Emoji Rain
    createFloatingEmojis();

    // Launch Fake Hack Terminal Popup Modal after dramatic pause
    setTimeout(() => {
      document.body.classList.remove('shake', 'disco-mode');
      if (hackModal) {
        hackModal.classList.remove('hidden');
        playChaChing();
      }
    }, 1000);
  });

  // Modal Close Buttons
  function closeHackModal() {
    if (hackModal) {
      hackModal.classList.add('hidden');
      playVictorySFX();
    }
  }

  if (closeHackModalBtn) closeHackModalBtn.addEventListener('click', closeHackModal);
  if (closeHackModalX) closeHackModalX.addEventListener('click', closeHackModal);

  function createFloatingEmojis() {
    const emojis = ['🎂', '🏎️', '👑', '🥳', '🍻', '🍕', '🚗', '💯'];
    for (let i = 0; i < 25; i++) {
      const emojiEl = document.createElement('div');
      emojiEl.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emojiEl.style.position = 'fixed';
      emojiEl.style.left = Math.random() * 100 + 'vw';
      emojiEl.style.top = '-50px';
      emojiEl.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
      emojiEl.style.zIndex = '9999';
      emojiEl.style.pointerEvents = 'none';
      emojiEl.style.transition = 'all 3s linear';
      document.body.appendChild(emojiEl);

      setTimeout(() => {
        emojiEl.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
      }, 50);

      setTimeout(() => {
        emojiEl.remove();
      }, 3100);
    }
  }


  // --- BRO-O-MATIC ROAST & FACT GENERATOR ---
  const roasts = [
    "🔥 Fact #1: Bhasura doesn't take bad photos, bad photos take Bhasura.",
    "🚗 Fact #2: Toyota named the Prado after Bhasura saw it and nodded in approval.",
    "😴 Fact #3: Bhasura is scientifically proven to sleep 12 hours and still wake up asking for a nap.",
    "👑 Fact #4: Bro code Section 1: Bhasura is exempt from washing dishes on his birthday.",
    "🌊 Fact #5: When Bhasura walks into the ocean, the waves ask for an autograph.",
    "🇱🇰 Fact #6: In a sarong, Bhasura has a 1000% higher chance of being mistaken for a diplomat.",
    "🍕 Fact #7: The maximum amount of pizza Bhasura can eat is n+1.",
    "🚀 Fact #8: NASA checked Bhasura's bro level and found it exceeded outer space limits.",
    "⚡ Fact #9: 9 out of 10 scientists agree Bhasura is the most reliable bro in the hemisphere.",
    "🏆 Fact #10: On his birthday, calories consumed do not count."
  ];

  const generateRoastBtn = document.getElementById('generateRoastBtn');
  const roastDisplay = document.getElementById('roastDisplay');

  generateRoastBtn.addEventListener('click', () => {
    playTone(600, 'sine', 0.1);
    const randomIndex = Math.floor(Math.random() * roasts.length);
    roastDisplay.style.opacity = '0';
    setTimeout(() => {
      roastDisplay.textContent = roasts[randomIndex];
      roastDisplay.style.opacity = '1';
    }, 150);

    if (typeof confetti === 'function') {
      confetti({ particleCount: 25, spread: 40 });
    }
  });


  // --- CERTIFICATE STAMP LOGIC ---
  const stampBtn = document.getElementById('stampBtn');
  const stampApproved = document.getElementById('stampApproved');

  stampBtn.addEventListener('click', () => {
    playStampSFX();
    stampBtn.style.display = 'none';
    stampApproved.classList.remove('hidden');

    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60 });
    }
  });


  // --- BRO QUIZ MINI-GAME ---
  const quizData = [
    {
      q: "Q1: What is Bhasura's superpower in daily life?",
      options: [
        "A) Sleeping through 15 alarms effortlessly 🛌",
        "B) Looking like a CEO next to any vehicle 🚗",
        "C) Being the absolute best bro ever ❤️",
        "D) All of the above (CORRECT!) 🔥"
      ],
      correct: 3,
      funnyMsg: "BINGO! You know Bhasura is an all-around champion!"
    },
    {
      q: "Q2: What happens when you go to the beach at midnight with Bhasura?",
      options: [
        "A) You solve the mysteries of the universe 🌌",
        "B) Take legendary selfies that belong in a museum 📸",
        "C) Chill like true royalty 👑",
        "D) All of the above! 💯"
      ],
      correct: 3,
      funnyMsg: "EXACTLY! Midnight beach walks with bro are legendary!"
    },
    {
      q: "Q3: How much does Bhasura mean to you?",
      options: [
        "A) He's okay I guess 🤷‍♂️",
        "B) Top tier bro 🥇",
        "C) THE ONLY BRO IN MY LIFE FOR REAL 👑🔥",
        "D) Beyond calculation infinity ♾️"
      ],
      correct: 2,
      funnyMsg: "FACTS! Only true bro in life! 👑🔥"
    }
  ];

  let currentQ = 0;
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');

  function renderQuiz() {
    if (currentQ >= quizData.length) {
      quizQuestion.textContent = "🎉 QUIZ COMPLETED: 100% BRO CERTIFIED!";
      quizOptions.innerHTML = `<div class="roast-box" style="color:#2e7d32;">🏆 RESULT: Bhasura passed with Flying Colors (Bro Score: 999,999/10)!</div>`;
      quizFeedback.textContent = "";
      playVictorySFX();
      return;
    }

    const qItem = quizData[currentQ];
    quizQuestion.textContent = qItem.q;
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';

    qItem.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        playTone(500 + idx * 100, 'sine', 0.15);
        quizFeedback.textContent = qItem.funnyMsg;
        quizFeedback.style.color = '#2e7d32';

        if (typeof confetti === 'function') {
          confetti({ particleCount: 30, spread: 50 });
        }

        setTimeout(() => {
          currentQ++;
          renderQuiz();
        }, 1500);
      });
      quizOptions.appendChild(btn);
    });
  }

  renderQuiz();


  // --- SECRET MESSAGE REVEAL ---
  const revealSecretBtn = document.getElementById('revealSecretBtn');
  const secretMessage = document.getElementById('secretMessage');

  revealSecretBtn.addEventListener('click', () => {
    playVictorySFX();
    secretMessage.classList.remove('hidden');
    revealSecretBtn.style.display = 'none';

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  });

  // Initial greeting sound effect on first user interaction
  document.body.addEventListener('click', () => {
    initAudio();
  }, { once: true });

});
