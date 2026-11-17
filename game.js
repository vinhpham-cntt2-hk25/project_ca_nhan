/* =========================================================
   NO NAME ARENA — PLAYABLE DEMO (1v1)
   Canvas game chạy trực tiếp trên trình duyệt.
   Hero: VEX / AURA / NYX / MUETA · Items · Overload · Bot hoặc 2P
   ========================================================= */
(() => {
    'use strict';

    /* TỰ DỰNG GIAO DIỆN DEMO: chỉ cần game.js + nút có class "js-open-demo"; không cần demo.css / markup modal */
    const DEMO_CSS = `body.demo-open{overflow:hidden}
.btn.demo-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#63e5dc,#8af2ea);animation:dmPulse 2.2s infinite}
.btn.demo-btn:hover{transform:translateY(-1px)}
.nav-demo{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
@keyframes dmPulse{0%{box-shadow:0 0 0 0 #63e5dc88}70%{box-shadow:0 0 0 14px #63e5dc00}100%{box-shadow:0 0 0 0 #63e5dc00}}

#demoModal{--bg:#090c13;--panel:#121927;--panel2:#192235;--line:#293449;--text:#f4f7ff;--muted:#a6b1c4;--cyan:#63e5dc;--orange:#ff9867;--purple:#b19aff;
--stage-w:min(calc(100vw - 12px),calc((100vh - 84px)*16/9));
position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:6px;background:#04060bfa;color:var(--text);font:14px/1.5 Inter,Arial,sans-serif}
#demoModal[hidden]{display:none}
#demoModal *{box-sizing:border-box}
#demoModal h1,#demoModal h2{font-family:'Barlow Condensed',Impact,'Arial Narrow',sans-serif;text-transform:uppercase;line-height:1;margin:0;font-weight:900}
#demoModal button{font:inherit;color:inherit;cursor:pointer}
#demoModal kbd{display:inline-block;min-width:20px;padding:1px 6px;margin:0 1px;border:1px solid var(--line);border-bottom-width:2px;border-radius:5px;background:var(--panel);color:var(--text);font:700 11px Inter,Arial,sans-serif;text-align:center}

#demoModal .dm-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--line);background:transparent;color:var(--text);border-radius:8px;padding:11px 15px;font-weight:800;letter-spacing:.5px;transition:background .15s,border-color .15s,transform .15s}
#demoModal .dm-btn:hover,#demoModal .dm-btn:focus-visible{border-color:var(--cyan);background:#63e5dc1a;outline:none}
#demoModal .dm-btn.pri{background:var(--cyan);border-color:var(--cyan);color:#071113}
#demoModal .dm-btn.pri:hover,#demoModal .dm-btn.pri:focus-visible{background:#8af2ea;box-shadow:0 0 0 3px #63e5dc44}
#demoModal .dm-sm{padding:6px 10px;font-size:12px}

.dm-shell{width:100%;display:flex;flex-direction:column;align-items:center;gap:6px}
.dm-top{width:var(--stage-w);display:flex;align-items:center;justify-content:space-between;gap:10px}
.dm-top strong{font:900 20px 'Barlow Condensed',Impact,sans-serif;letter-spacing:1px}
.dm-top strong span{color:var(--cyan)}
.dm-top-actions{display:flex;gap:6px}
.dm-stage{position:relative;width:var(--stage-w);aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:var(--bg);outline:1px solid #63e5dc55;box-shadow:0 0 70px #63e5dc22}
.dm-stage>canvas{display:block;width:100%;height:100%}
.dm-ui{position:absolute;left:0;top:0;width:960px;height:540px;transform-origin:0 0}
.dm-ui[hidden]{display:none}
.dm-help{width:var(--stage-w);display:flex;justify-content:space-between;gap:14px;color:var(--muted);font-size:11px;line-height:1.2;white-space:nowrap}
.dm-help b{color:var(--cyan)}
.dm-touch{display:none;width:var(--stage-w);justify-content:space-between;gap:10px}
.dm-pad{display:flex;gap:8px}
.dm-touch button{min-width:58px;height:50px;padding:0 10px;border:1px solid var(--line);border-radius:12px;background:var(--panel2);font-weight:800;font-size:12px;touch-action:none;user-select:none;-webkit-user-select:none}
.dm-touch button.on{background:#63e5dc33;border-color:var(--cyan);color:var(--cyan)}
@media (pointer:coarse){#demoModal{--stage-w:min(calc(100vw - 12px),calc((100vh - 132px)*16/9))}.dm-touch{display:flex}.dm-help{display:none}}
@media (max-width:900px){.dm-help{display:none}.dm-top strong span{display:none}}

.dm-screen{position:absolute;inset:0}

/* MENU CHÍNH */
.dm-main{padding:46px 56px 0;display:flex;flex-direction:column;justify-content:flex-start;background:linear-gradient(90deg,#070a11f5 0,#070a11e0 34%,#070a1100 62%)}
.dm-eyebrow{color:var(--cyan);font-size:11px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase}
#demoModal .dm-title{font-size:76px;line-height:.92;margin:8px 0 18px}
.dm-title span{color:var(--cyan)}
.dm-menu{display:grid;gap:8px;width:400px}
.dm-mbtn{display:flex;align-items:baseline;gap:14px;text-align:left;padding:9px 18px;border:1px solid var(--line);border-left:4px solid var(--cyan);border-radius:10px;background:linear-gradient(145deg,var(--panel2),var(--panel));transition:transform .15s,background .15s,border-color .15s}
.dm-mbtn b{font:900 24px/1 'Barlow Condensed',Impact,sans-serif;letter-spacing:1.5px;min-width:130px}
.dm-mbtn small{color:var(--muted);font-size:11px}
.dm-mbtn:hover,.dm-mbtn:focus-visible{transform:translateX(8px);background:#63e5dc1c;border-color:var(--cyan);outline:none}
.dm-mbtn.exit{border-left-color:#ff6b6b}
.dm-mbtn.exit:hover,.dm-mbtn.exit:focus-visible{background:#ff6b6b18;border-color:#ff6b6b}
.dm-foot{position:absolute;left:56px;bottom:22px;color:var(--muted);font-size:11px}

/* CHỌN NHÂN VẬT */
.dm-sel{display:flex;flex-direction:column;gap:10px;padding:14px 26px;background:radial-gradient(ellipse at 50% 25%,#14213a 0,#070a11f7 72%)}
.dm-bar{display:flex;align-items:center;gap:14px;height:38px}
.dm-bar h2{font-size:32px;flex:1}
.dm-bar h2 span{color:var(--cyan)}
.dm-grid{flex:1;min-height:0;overflow:hidden;display:grid;grid-template-columns:1fr 130px 1fr;gap:12px;align-items:center}
.dm-side{min-width:0;background:linear-gradient(145deg,var(--panel2),var(--panel));border:1px solid var(--line);border-color:color-mix(in srgb,var(--c) 45%,var(--line));border-radius:12px;padding:8px 12px 10px;text-align:center}
.dm-tag{color:var(--c);font-size:10px;font-weight:800;letter-spacing:3px}
.dm-pv{display:block;width:208px;height:130px;margin:0 auto}
.dm-name{font:900 30px/1 'Barlow Condensed',Impact,sans-serif;letter-spacing:1px;color:var(--c)}
.dm-sub{color:var(--muted);font-size:11px;margin-top:2px}
.dm-stats{display:grid;gap:3px;margin:6px 0 8px}
.dm-stat{display:grid;grid-template-columns:78px 1fr;align-items:center;gap:8px;color:var(--muted);font-size:9px;font-weight:800;letter-spacing:1px;text-align:left}
.dm-stat i{display:block;height:6px;border-radius:9px;background:#273247;overflow:hidden}
.dm-stat b{display:block;height:100%;background:var(--c);border-radius:9px}
.dm-thumbs{display:grid;grid-template-columns:repeat(var(--n,4),1fr);gap:6px}
.dm-th{display:grid;justify-items:center;min-width:0;padding:2px 2px 3px;border:1px solid var(--line);border-radius:9px;background:var(--panel);color:var(--muted)}
.dm-th canvas{display:block;width:44px;height:44px}
.dm-th b{font:800 12px 'Barlow Condensed',Impact,sans-serif;letter-spacing:1px}
.dm-th:hover{border-color:var(--c)}
.dm-th.on{border-color:var(--c);color:var(--text);box-shadow:0 0 0 1px var(--c) inset,0 0 14px #0006}
.dm-mid{display:grid;gap:14px;justify-items:center}
.dm-vs{font:900 44px 'Barlow Condensed',Impact,sans-serif;text-shadow:0 0 22px #fff6}
#demoModal .dm-start{padding:12px 16px;font-size:13px;white-space:nowrap}
.dm-bot{height:54px;display:flex;align-items:center}

/* THANH TRƯỢT ĐỘ KHÓ */
.dm-diff{display:flex;align-items:center;gap:16px;width:100%;padding:8px 18px;border:1px solid var(--line);border-radius:12px;background:var(--panel)}
.dm-diff-l{font-size:10px;font-weight:800;letter-spacing:2px;color:var(--muted);white-space:nowrap}
.dm-diff input{flex:1;-webkit-appearance:none;appearance:none;height:8px;border-radius:99px;background:linear-gradient(90deg,var(--dc) var(--p),#273247 var(--p));outline:none;margin:0;cursor:pointer}
.dm-diff input::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#fff;border:4px solid var(--dc);cursor:pointer}
.dm-diff input::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#fff;border:4px solid var(--dc);cursor:pointer}
.dm-diff input:focus-visible{box-shadow:0 0 0 3px #ffffff33}
.dm-diff-v{min-width:230px;text-align:right;line-height:1.15}
.dm-diff-v b{display:block;font:900 22px 'Barlow Condensed',Impact,sans-serif;letter-spacing:1px;color:var(--dc)}
.dm-diff-v small{display:block;color:var(--muted);font-size:10px}
.dm-keys{display:grid;gap:5px;width:100%;color:var(--muted);font-size:11px;text-align:center}
.dm-keys b{font-weight:800;margin-right:4px}

/* TẠM DỪNG / KẾT QUẢ */
.dm-pm{display:grid;place-items:center;background:#070a11d9}
.dm-card{width:340px;display:grid;gap:10px;text-align:center}
.dm-card h2{font-size:56px;margin-bottom:4px}
.dm-card p{color:var(--muted);font-size:12px;margin:-2px 0 6px}

.dm-splash{display:grid;place-content:center;justify-items:center;gap:12px;text-align:center;background:radial-gradient(ellipse at 50% 45%,#14213a 0,#04060bf8 70%);cursor:pointer}
.dm-splash h1{font-size:76px;line-height:.95}
.dm-splash h1 span{color:var(--cyan)}
.dm-splash i{display:block;width:260px;height:3px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);animation:dmLine 1.6s ease-in-out infinite}
.dm-splash p{margin:0;letter-spacing:5px;font-weight:800;color:var(--muted);font-size:13px}
.dm-splash small{color:#6f7b92;font-size:11px}
@keyframes dmLine{0%,100%{transform:scaleX(.3);opacity:.5}50%{transform:scaleX(1);opacity:1}}
.dm-opt{display:grid;place-items:center;background:#070a11e6}
.dm-opt .dm-card{width:430px}
.dm-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;border:1px solid var(--line);border-radius:10px;background:var(--panel)}
.dm-row>span{font-size:11px;font-weight:800;letter-spacing:2px;color:var(--muted)}
.dm-seg{display:flex;gap:6px}
#demoModal .dm-btn.sel{background:#63e5dc26;border-color:var(--cyan);color:var(--cyan)}
`;

    const DEMO_HTML = `<div class="dm-shell">
<div class="dm-top">
<strong>NO NAME ARENA <span>· PLAYABLE DEMO</span></strong>
<div class="dm-top-actions">
<button class="dm-btn dm-sm" id="demoFull" type="button">⛶ TOÀN MÀN HÌNH</button>
<button class="dm-btn dm-sm" id="demoMute" type="button">🔊 ÂM THANH</button>
<button class="dm-btn dm-sm" id="demoClose" type="button">✕ ĐÓNG</button>
</div>
</div>
<div class="dm-stage">
<canvas id="gameCanvas" width="960" height="540"></canvas>
<div class="dm-ui" id="demoOverlay"></div>
</div>
<div class="dm-help">
<span><b>P1:</b> <kbd>A</kbd><kbd>D</kbd> di chuyển · <kbd>W</kbd> nhảy · <kbd>J</kbd> đánh · <kbd>K</kbd> skill · <kbd>L</kbd> lướt</span>
<span><b>P2:</b> <kbd>←</kbd><kbd>→</kbd> di chuyển · <kbd>↑</kbd> nhảy · <kbd>,</kbd> đánh · <kbd>.</kbd> skill · <kbd>/</kbd> lướt</span>
<span><kbd>P</kbd> tạm dừng · <kbd>M</kbd> tắt tiếng · <kbd>F</kbd> toàn màn hình</span>
</div>
<div class="dm-touch" id="touchControls">
<div class="dm-pad">
<button type="button" data-key="KeyA">◀</button>
<button type="button" data-key="KeyW">▲</button>
<button type="button" data-key="KeyD">▶</button>
</div>
<div class="dm-pad">
<button type="button" data-key="KeyJ">ĐÁNH</button>
<button type="button" data-key="KeyK">SKILL</button>
<button type="button" data-key="KeyL">LƯỚT</button>
</div>
</div>
</div>
`;

    function mountDemo() {
        ['demoModal', 'demoStyles'].forEach(id => { const o = document.getElementById(id); if (o) o.remove(); });
        const st = document.createElement('style');
        st.id = 'demoStyles';
        st.textContent = DEMO_CSS;
        document.head.appendChild(st);
        const m = document.createElement('div');
        m.id = 'demoModal';
        m.hidden = true;
        m.setAttribute('role', 'dialog');
        m.setAttribute('aria-modal', 'true');
        m.setAttribute('aria-label', 'Demo game NO NAME ARENA');
        m.innerHTML = DEMO_HTML;
        document.body.appendChild(m);
        return m;
    }

    const modal = mountDemo();

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('demoOverlay');
    const muteBtn = document.getElementById('demoMute');

    const W = canvas.width;
    const H = canvas.height;
    const GROUND = 462;
    const GRAV = 1900;
    const ROUNDS_TO_WIN = 2;
    const ROUND_TIME = 60;

    const SIDE_COLOR = ['#63e5dc', '#ff9867'];
    const PURPLE = '#b19aff';

    /* ---------------------------------------------------------
       1. DỮ LIỆU HERO (khớp với danh sách trên website)
    --------------------------------------------------------- */
    const HEROES = {
        vex: {
            id: 'vex', name: 'VEX', style: 'Rush-down', title: 'Tiểu quỷ cơ bắp',
            blurb: 'Nhỏ con nhưng đô, áp sát liên tục',
            hp: 100, speed: 345,
            w: 54, h: 82, visH: 98,                       // hitbox + chiều cao hiển thị
            stats: { pow: 5, def: 2, spd: 5, rng: 1 },    // thang 1–5 hiển thị ở màn chọn
            melee: { dmg: 10, range: 68, cd: 0.26 },
            skill: { dmg: 10, speed: 760, life: 0.38, cd: 1.0, size: 9 }
        },
        aura: {
            id: 'aura', name: 'AURA', style: 'Balanced', title: 'Chiến binh giáp trụ',
            blurb: 'Đô con, vừa dame vừa trâu',
            hp: 118, speed: 295,
            w: 60, h: 98, visH: 106,
            stats: { pow: 4, def: 4, spd: 3, rng: 2 },
            melee: { dmg: 9, range: 80, cd: 0.32 },
            skill: { dmg: 11, speed: 540, life: 0.9, cd: 1.1, size: 10 }
        },
        nyx: {
            id: 'nyx', name: 'NYX', style: 'Zoner', title: 'Nữ pháo thủ giáp nặng',
            blurb: 'Trâu bò nhất đội, bắn xa kiểm soát vùng',
            hp: 135, speed: 255,
            w: 70, h: 94, visH: 110,
            stats: { pow: 2, def: 5, spd: 2, rng: 5 },
            melee: { dmg: 5, range: 64, cd: 0.4 },
            skill: { dmg: 11, speed: 470, life: 1.6, cd: 0.95, size: 12 }
        },
        mueta: {
            id: 'mueta', name: 'MUETA', style: 'Deadly Zoner', title: 'Xạ thủ tia tử quang',
            blurb: 'Tích lực tia năng lượng; có thể chuyển thành pha lướt tấn công',
            hp: 96, speed: 310,
            w: 56, h: 88, visH: 112,
            stats: { pow: 4, def: 2, spd: 4, rng: 5 },
            melee: { dmg: 7, range: 70, cd: 0.34 },
            skill: { dmg: 15, speed: 650, life: 1.25, cd: 1.25, size: 13 }
        },
        musashi: { id:'musashi', name:'MUSASHI', style:'Blade Stance', title:'Kiếm sĩ song vũ khí', blurb:'Thanh Kiếm Thánh chọn ngẫu nhiên một trong hai vũ khí', hp:108, speed:320, w:58, h:92, visH:116, stats:{pow:5,def:3,spd:4,rng:3}, melee:{dmg:8,range:88,cd:0.34}, skill:{dmg:14,speed:650,life:0.5,cd:0.95,size:12} },
        locke: { id:'locke', name:'LOCKE', style:'Event Vanguard', title:'Chiến binh Soulbound', blurb:'Nhân vật sự kiện · cần mở khóa', hp:112, speed:315, w:60, h:94, visH:116, stats:{pow:4,def:4,spd:4,rng:3}, melee:{dmg:10,range:86,cd:.32}, skill:{dmg:16,speed:620,life:.9,cd:1.1,size:13} },
        katex: { id:'katex', name:'KATEX', style:'Ancient Vanguard', title:'Nữ chiến binh cổ đại', blurb:'Kết hợp thương dài và kiếm gắn tay', hp:116, speed:300, w:60, h:96, visH:118, stats:{pow:4,def:4,spd:3,rng:4}, melee:{dmg:9,range:104,cd:0.36}, skill:{dmg:13,speed:580,life:0.85,cd:1.05,size:12} }
    };

    const ITEM_TYPES = {
        shield: { label: 'S', color: '#7fb4ff', name: 'KHIÊN' },
        rocket: { label: '➤', color: '#ffcf66', name: 'TÊN LỬA LƯỚT' },
        glove:  { label: '✊', color: '#ff7d9b', name: 'ĐẤM MÓC BOXING' }
    };
    const ITEM_POOL = ['shield', 'shield', 'rocket', 'rocket', 'glove', 'glove'];

    const CTRL1 = { left: 'KeyA', right: 'KeyD', jump: 'KeyW', atk: 'KeyJ', skill: 'KeyK', dash: 'KeyL' };
    const CTRL2 = { left: 'ArrowLeft', right: 'ArrowRight', jump: 'ArrowUp', atk: 'Comma', skill: 'Period', dash: 'Slash' };
    const GAME_KEYS = new Set([
        ...Object.values(CTRL1), ...Object.values(CTRL2)
    ]);

    /* ---------------------------------------------------------
       2. TRẠNG THÁI
    --------------------------------------------------------- */
    const cfg = { mode: 'bot', diff: 5, map: 'arena', p1: 'vex', p2: 'nyx', graphics: 'high' };
    let splashT = 4;
    let scr = 'splash';        // splash | main | options | select (khi state = menu)

    let state = 'menu';        // menu | countdown | fight | roundEnd | matchEnd | paused
    let prevState = 'menu';
    let stateT = 0;
    let timer = ROUND_TIME;
    let round = 1;
    let banner = { text: '', t: 0 };
    let shake = 0;
    let itemT = 4;
    let lastCount = 0;
    let arenaEvent = { name: 'BÃO NĂNG LƯỢNG', kind: 'surge', t: 8, announce: 2.4 };

    let p1, p2;
    let projectiles = [];
    let items = [];
    let particles = [];
    let floaters = [];

    const keys = new Set();

    /* ---------------------------------------------------------
       3. ÂM THANH (WebAudio, không cần file)
    --------------------------------------------------------- */
    let actx = null;
    let muted = false;

    const SFX = {
        swing: [300, 120, 0.08, 'sawtooth'],
        shoot: [520, 820, 0.12, 'square'],
        hit:   [180, 60, 0.14, 'square'],
        dash:  [240, 480, 0.1, 'triangle'],
        item:  [500, 1000, 0.18, 'sine'],
        over:  [160, 40, 0.5, 'sawtooth'],
        ko:    [220, 40, 0.6, 'sawtooth'],
        beep:  [660, 660, 0.1, 'square'],
        go:    [880, 880, 0.25, 'square'],
        block: [900, 500, 0.1, 'triangle']
    };

    function sfx(name) {
        if (muted) return;
        try {
            actx = actx || new (window.AudioContext || window.webkitAudioContext)();
            const p = SFX[name];
            const t = actx.currentTime;
            const o = actx.createOscillator();
            const g = actx.createGain();
            o.type = p[3];
            o.frequency.setValueAtTime(p[0], t);
            o.frequency.exponentialRampToValueAtTime(Math.max(30, p[1]), t + p[2]);
            g.gain.setValueAtTime(0.06, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + p[2]);
            o.connect(g).connect(actx.destination);
            o.start(t);
            o.stop(t + p[2]);
        } catch (e) { /* bỏ qua nếu trình duyệt chặn audio */ }
    }

    /* ---------------------------------------------------------
       4. TẠO NHÂN VẬT
    --------------------------------------------------------- */
    function makeFighter(side, heroId, human) {
        const hero = HEROES[heroId];
        return {
            side, hero, human,
            ctrl: side === 0 ? CTRL1 : CTRL2,
            ai: { t: 0, in: {} },
            x: 0, y: GROUND, vx: 0, vy: 0, w: hero.w, h: hero.h, atkKind: '',
            face: side === 0 ? 1 : -1,
            hp: hero.hp, maxhp: hero.hp,
            ov: 0, ovLock: 0, ovDelay: 0, lastAct: '',
            atkT: 0, atkCd: 0, skCd: 0, dashCd: 0, dashT: 0, hitT: 0,
            shield: 0, boost: 0, rocket: 0, glove: 0, skillCharge: 0, vexCombo: 0, vexHits: 0, vexTick: 0, muetaDash: 0, weapon: Math.random()<0.5?'katana':'nodachi', combo:0, comboT:0, comboHits:0, specialT:0, specialHit:false, holy:0, wasAtk:false, wasSkill:false, onGround: true, wins: 0
        };
    }

    function resetFighterForRound(f) {
        f.x = f.side === 0 ? 240 : W - 240;
        f.y = GROUND; f.vx = 0; f.vy = 0;
        f.face = f.side === 0 ? 1 : -1;
        f.hp = f.maxhp;
        f.ov = 0; f.ovLock = 0; f.ovDelay = 0; f.lastAct = '';
        f.atkT = 0; f.atkCd = 0; f.skCd = 0; f.dashCd = 0; f.dashT = 0; f.hitT = 0;
        f.shield = 0; f.boost = 0; f.rocket = 0; f.glove = 0; f.skillCharge = 0; f.skillWasDown = false; f.vexCombo = 0; f.vexHits = 0; f.vexTick = 0; f.muetaDash = 0; f.weapon = Math.random()<0.5?'katana':'nodachi'; f.combo=0; f.comboT=0; f.comboHits=0; f.specialT=0; f.specialHit=false; f.holy=0; f.wasAtk=false; f.wasSkill=false; f.onGround = true;
        f.ai = { t: 0, in: {} };
    }

    function startMatch() {
        if (!isLockeUnlocked()) { if (cfg.p1 === 'locke') cfg.p1 = 'vex'; if (cfg.p2 === 'locke') cfg.p2 = 'nyx'; }
        p1 = makeFighter(0, cfg.p1, true);
        p2 = makeFighter(1, cfg.p2, cfg.mode === '2p');
        p2.diff = cfg.diff;
        p2.dmgMul = cfg.mode === 'bot' ? lerp(0.7, 1.25, (cfg.diff - 1) / 9) : 1;
        round = 1;
        beginRound();
    }

    window.isLockeUnlocked = function () {
        const unlocked =
            localStorage.getItem("nna_locke_unlocked") === "true";

        const ownerMode =
            localStorage.getItem("nna_owner_mode") === "true";

        return unlocked || ownerMode;
    };
    function beginRound() {
        resetFighterForRound(p1);
        resetFighterForRound(p2);
        projectiles = []; items = []; particles = []; floaters = [];
        timer = ROUND_TIME;
        itemT = 3.5;
        arenaEvent = { name: 'BÃO NĂNG LƯỢNG', kind: 'surge', t: 8, announce: 2.4 };
        state = 'countdown';
        stateT = 3.2;
        lastCount = 0;
        hideOverlay();
    }

    /* ---------------------------------------------------------
       5. CƠ CHẾ QUÁ TẢI (OVERLOAD)
       Mỗi lần dùng kỹ năng đặc biệt → thanh tăng. Đánh thường và lướt không tăng.
       Đầy thanh → bị khóa đòn + chậm trong vài giây.
    --------------------------------------------------------- */
    function addOverload(f, act) {
        const same = f.lastAct === act;
        f.ov += same ? 16 : 6;
        f.lastAct = act;
        f.ovDelay = 0.6;
        if (f.ov >= 100) {
            f.ov = 100;
            f.ovLock = 2.2;
            shake = 8;
            sfx('over');
            floatText(f.x, f.y - f.h - 28, 'QUÁ TẢI!', PURPLE);
            burst(f.x, f.y - f.h / 2, PURPLE, 22, 320);
        }
    }

    /* ---------------------------------------------------------
       6. HÀNH ĐỘNG
    --------------------------------------------------------- */
    function doMelee(f, o, inp) {
        const m = f.hero.melee;
        if (f.hero.id === 'musashi') {
            if (inp && inp.skill) { doSkill(f, inp); return; }
            const moving = !!(inp && (inp.left || inp.right));
            const triple = !moving;
            f.atkT = triple ? 0.42 : 0.30; f.atkKind = moving ? 'spin' : 'triple';
            f.atkCd = triple ? 0.48 : 0.38; f.comboT = f.atkT; f.combo = triple ? 3 : 1; f.comboHits=0;
            const range = m.range + (f.weapon === 'nodachi' ? 24 : 0);
            const hit = Math.abs(o.x-f.x) < range && Math.abs(o.y-o.h/2-(f.y-f.h/2)) < 90;
            if (hit) hurt(o, moving ? m.dmg+3 : m.dmg*1.35, f.face, f);
            f.holy = Math.min(100, f.holy + (moving ? 8 : 12));
            if(f.holy>=100){f.holy=0;const own=ITEM_POOL[Math.floor(Math.random()*ITEM_POOL.length)];applyItem(f,{type:own});floatText(f.x,f.y-f.h-52,'THÁNH KIẾM BAN PHÚC','#ffe7a0');}
            burst(f.x+f.face*range*.55,f.y-f.h*.58,'#ffe7a0',moving?18:12,230); sfx('swing'); return;
        }
        if (f.hero.id === 'katex') {
            f.atkT=.22; f.atkKind='atk'; f.atkCd=m.cd;
            const hit=Math.abs(o.x-f.x)<m.range && Math.abs(o.y-o.h/2-(f.y-f.h/2))<100;
            if(hit) hurt(o,m.dmg,f.face,f); sfx('swing'); return;
        }
        f.atkT = 0.16;
        f.atkKind = 'atk';
        f.atkCd = m.cd;
        sfx('swing');

        const x1 = f.x + f.face * 10;
        const x2 = f.x + f.face * (m.range + f.w / 2);
        const left = Math.min(x1, x2), right = Math.max(x1, x2);
        const hitX = o.x + o.w / 2 > left && o.x - o.w / 2 < right;
        const hitY = o.y - o.h < f.y && o.y > f.y - f.h;
        if (hitX && hitY) {
            hurt(o, m.dmg + (f.glove > 0 ? 5 : 0), f.face, f);
            if (f.glove > 0) {
                o.vx = f.face * 620; o.vy = -260; f.glove = 0;
                burst(o.x, o.y - o.h * 0.55, '#ff7d9b', 20, 300);
                floatText(o.x, o.y - o.h - 28, 'KNOCKBACK!', '#ff7d9b');
            }
        }
    }

    function doSkill(f, inp) {
        const s = f.hero.skill;
        if (f.hero.id === 'musashi') {
            f.skCd=s.cd; f.atkKind='skill'; f.atkT=.34; addOverload(f,'skill'); sfx('dash');
            const moving=!!(inp.left||inp.right);
            if (!moving) { f.specialT=.30; f.specialHit=false; f.vx=f.face*760; f.dashT=.30; floatText(f.x,f.y-f.h-20,'IAI DASH','#ffe7a0'); }
            else { f.specialT=.42; f.specialHit=false; f.vx=f.face*260; floatText(f.x,f.y-f.h-20,'SKY BREAKER','#ffe7a0'); }
            return;
        }
        if (f.hero.id === 'katex') {
            f.skCd=s.cd; f.atkT=.32; f.atkKind='skill'; addOverload(f,'skill'); sfx('shoot');
            if (inp.jump) { f.vy=-720; f.onGround=false; f.specialT=.45; f.specialHit=false; floatText(f.x,f.y-f.h-20,'SPEARFALL','#e9c77a'); }
            else if (inp.left||inp.right) { f.vx=f.face*840; f.dashT=.22; f.specialT=.24; f.specialHit=false; floatText(f.x,f.y-f.h-20,'PHALANX DRIVE','#e9c77a'); }
            else { projectiles.push({x:f.x+f.face*34,y:f.y-f.h*.58,vx:f.face* s.speed,life:s.life,dmg:s.dmg,size:s.size,owner:f,color:'#e9c77a'}); floatText(f.x,f.y-f.h-20,'SPEAR OF DAWN','#e9c77a'); }
            return;
        }
        f.skCd = s.cd;
        f.atkT = 0.22;
        f.atkKind = 'skill';
        addOverload(f, 'skill'); // Chỉ dùng kỹ năng mới tăng Overload.
        sfx('shoot');

        // VEX: K lướt xuyên đòn và gây 3 nhịp sát thương.
        if (f.hero.id === 'vex') {
            const triple = !!inp.dash;
            f.vexCombo = triple ? 3 : 1;
            f.vexHits = 0;
            f.vexTick = 0;
            f.dashT = triple ? 0.72 : 0.50;
            f.vx = f.face * (triple ? 980 : 820);
            f.vexComboDir = f.face;
            burst(f.x, f.y - f.h * 0.55, '#ff5577', 18, 250);
            floatText(f.x, f.y - f.h - 18, triple ? 'TRIPLE RUSH!' : 'VEX RUSH!', '#ff8ca8');
            return;
        }

        // MUETA: giữ K để tích lực tia; nhấn hướng tiến + K hoặc L + K để lướt đâm.
        if (f.hero.id === 'mueta') {
            const inpForward = (inp.right && f.face > 0) || (inp.left && f.face < 0);
            if (inp.dash || inpForward) {
                f.muetaDash = 0.28;
                f.dashT = 0.28;
                f.vx = f.face * 900;
                f.muetaDashHit = false;
                burst(f.x, f.y - f.h * 0.5, '#70f4ff', 16, 220);
                floatText(f.x, f.y - f.h - 18, 'PHASE STRIKE', '#70f4ff');
                return;
            }
            const charge = Math.min(1, f.skillCharge || 0.65);
            projectiles.push({
                x: f.x + f.face * 34, y: f.y - f.h * 0.58,
                vx: f.face * (s.speed + charge * 260), life: s.life + charge * 0.35,
                dmg: s.dmg + Math.round(charge * 12), size: s.size + charge * 5,
                owner: f, beam: true, color: '#70f4ff'
            });
            f.skillCharge = 0;
            return;
        }

        projectiles.push({
            x: f.x + f.face * 30, y: f.y - f.h * 0.55,
            vx: f.face * s.speed, life: s.life,
            dmg: s.dmg, size: s.size, owner: f
        });
    }

    function doDash(f, inp) {
        const dir = (inp.right ? 1 : 0) - (inp.left ? 1 : 0) || f.face;
        f.dashT = 0.17;
        f.dashCd = 0.9;
        f.vx = dir * (f.rocket > 0 ? 1180 : 720);
        if (f.rocket > 0) { f.rocket = 0; f.dashT = 0.28; floatText(f.x, f.y - f.h - 20, 'ROCKET BOOST!', '#ffcf66'); }
        sfx('dash');
        burst(f.x, f.y - f.h / 2, SIDE_COLOR[f.side], 8, 140);
    }

    function hurt(t, dmg, dir, src) {
        dmg = Math.max(1, Math.round(dmg * ((src && src.dmgMul) || 1)));
        if (t.dashT > 0) { sfx('block'); floatText(t.x, t.y - t.h - 10, 'NÉ!', '#fff'); return; }
        if (t.shield > 0) {
            t.shield = 0;
            sfx('block');
            burst(t.x, t.y - t.h / 2, '#7fb4ff', 14, 260);
            floatText(t.x, t.y - t.h - 10, 'CHẶN!', '#7fb4ff');
            return;
        }
        t.hp = Math.max(0, t.hp - dmg);
        t.hitT = 0.22;
        t.vx = dir * 260;
        t.vy = -180;
        t.onGround = false;
        shake = Math.max(shake, 7);
        sfx('hit');
        burst(t.x, t.y - t.h / 2, '#ffffff', 10, 280);
        floatText(t.x, t.y - t.h - 6, '-' + dmg, '#ff6b6b');
    }

    /* ---------------------------------------------------------
       7. ĐẦU VÀO: NGƯỜI CHƠI + BOT
    --------------------------------------------------------- */
    function humanInput(f) {
        const c = f.ctrl;
        return {
            left: keys.has(c.left), right: keys.has(c.right), jump: keys.has(c.jump),
            atk: keys.has(c.atk), skill: keys.has(c.skill), dash: keys.has(c.dash)
        };
    }

    // Bot theo độ khó 1–10 (k = 0 → 1)
    //  · phản xạ nhanh dần, đánh hung hăng dần, né đạn / phản đòn tốt dần
    //  · từ mức 3 biết chạy đi nhặt vật phẩm, mức 4+ biết đổi chiêu tránh Quá tải
    function botInput(f, o, dt) {
        const b = f.ai;
        b.t -= dt;
        if (b.t > 0) return b.in;

        const k = ((f.diff || 5) - 1) / 9;
        b.t = lerp(0.36, 0.07, k) * (0.7 + Math.random() * 0.6);

        const h = f.hero;
        const d = o.x - f.x;
        const ad = Math.abs(d);
        const dir = Math.sign(d) || 1;
        const toward = dir > 0 ? 'right' : 'left';
        const away = dir > 0 ? 'left' : 'right';
        const pref = h.id === 'nyx' ? 330 : h.id === 'aura' ? 150 : h.melee.range - 6;
        const aggr = lerp(0.4, 1, k);
        const i = { left: false, right: false, jump: false, atk: false, skill: false, dash: false };

        // đi nhặt vật phẩm có ích
        let goal = null;
        if (f.diff >= 3 && ad > 100) {
            const it = items.find(x =>
                Math.abs(x.x - f.x) < lerp(150, 520, k) &&
                true);
            if (it) goal = it.x;
        }

        if (goal !== null) {
            if (Math.abs(goal - f.x) > 24) i[goal > f.x ? 'right' : 'left'] = true;
        } else if (ad > pref + 35) i[toward] = true;
        else if (ad < pref - 45) i[away] = true;
        else if (Math.random() < 0.35) i[Math.random() < 0.5 ? 'left' : 'right'] = true;

        let want = null;
        const r = Math.random();
        if (ad <= h.melee.range + 14 && r < 0.7 * aggr + 0.1) want = 'atk';
        else if (ad > 140 && ad < 620 && r < 0.55 * aggr) want = 'skill';
        else if (o.atkT > 0 && ad < 110 && r < lerp(0.05, 0.7, k)) want = 'dash';
        else if (ad > 380 && r < 0.25 * k) want = 'dash';

        // quản lý Quá tải: mức thấp tự spam đến khi bị khóa, mức cao biết dừng
        if (f.diff >= 4 && want && f.ov > 65 && want === f.lastAct) want = want === 'atk' ? 'skill' : 'atk';
        if (f.diff >= 6 && f.ov > 88) want = null;

        if (want) {
            i[want] = true;
            if (want === 'dash') {
                i.left = i.right = false;
                i[ad < 110 ? away : toward] = true;
            }
        }

        // nhảy né đạn
        const incoming = projectiles.some(p => p.owner !== f && Math.abs(p.x - f.x) < 150 &&
            Math.sign(p.vx) === Math.sign(f.x - p.x));
        if (f.onGround && (Math.random() < 0.02 + 0.05 * k || (incoming && Math.random() < lerp(0.05, 0.8, k)))) i.jump = true;

        b.in = i;
        return i;
    }

    /* ---------------------------------------------------------
       8. CẬP NHẬT NHÂN VẬT
    --------------------------------------------------------- */
    function stepFighter(f, o, dt, active) {
        const h = f.hero;
        f.atkCd = Math.max(0, f.atkCd - dt);
        f.skCd = Math.max(0, f.skCd - dt);
        f.dashCd = Math.max(0, f.dashCd - dt);
        f.atkT = Math.max(0, f.atkT - dt);
        f.dashT = Math.max(0, f.dashT - dt);
        f.hitT = Math.max(0, f.hitT - dt);
        f.shield = Math.max(0, f.shield - dt);
        f.boost = Math.max(0, f.boost - dt);

        // Overload: khóa / hồi dần
        if (f.ovLock > 0) {
            f.ovLock -= dt;
            if (f.ovLock <= 0) { f.ov = 30; f.lastAct = ''; }
        } else if (f.ovDelay > 0) {
            f.ovDelay -= dt;
        } else {
            f.ov = Math.max(0, f.ov - 14 * dt);
        }

        const locked = f.ovLock > 0;
        const canAct = active && f.hitT <= 0;

        if (canAct) {
            const inp = f.human ? humanInput(f) : botInput(f, o, dt);
            const spd = h.speed * (f.boost > 0 ? 1.35 : 1) * (locked ? 0.5 : 1);

            if (f.dashT <= 0) {
                const dir = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
                f.vx += (dir * spd - f.vx) * Math.min(1, dt * 14);
            }
            if (inp.jump && f.onGround) { f.vy = -640; f.onGround = false; }

            if (!locked) {
                if (f.hero.id === 'mueta') {
                    if (inp.skill) f.skillCharge = Math.min(1, f.skillCharge + dt * 1.15);
                    if (!inp.skill && f.skillWasDown && f.skCd <= 0) doSkill(f, inp);
                    f.skillWasDown = !!inp.skill;
                }
                if (inp.atk && f.atkCd <= 0) doMelee(f, o, inp);
                if (f.hero.id !== 'mueta' && inp.skill && f.skCd <= 0 && !(f.hero.id === 'musashi' && inp.atk)) doSkill(f, inp);
                if (f.hero.id === 'musashi' && inp.atk && inp.skill && f.atkCd <= 0 && f.skCd <= 0) { doMelee(f,o,inp); }
                if (inp.dash && !inp.skill && f.dashCd <= 0 && f.dashT <= 0) doDash(f, inp);
            }
        } else {
            f.vx -= f.vx * Math.min(1, dt * 6);
        }

        // VEX rush: triple-dash chỉ có hitbox ở lần lướt thứ ba; K thường có 3 nhịp.
        if (f.vexCombo > 0 && f.dashT > 0) {
            const total = f.vexCombo === 3 ? 3 : 3;
            const elapsed = (f.vexCombo === 3 ? 0.72 : 0.42) - f.dashT;
            const tick = Math.floor(elapsed / (f.vexCombo === 3 ? 0.24 : 0.14));
            if (tick > f.vexHits && (f.vexCombo === 1 || tick === 2)) {
                if (Math.abs(o.x - f.x) < 104 && Math.abs(o.y - f.y) < 105) {
                    hurt(o, 4, f.vexComboDir || f.face, f);
                    f.vexHits++;
                    burst(o.x, o.y - o.h * 0.55, '#ff5577', 8, 170);
                }
            }
            if (f.dashT <= 0.02) f.vexCombo = 0;
        }
        if (f.hero.id==='musashi' && f.combo===3 && f.comboT>0) {
            const stage=Math.min(2,Math.floor((0.42-f.comboT)/0.14));
            if(stage>f.comboHits){ f.comboHits=stage; if(Math.abs(o.x-f.x)<f.hero.melee.range+12 && Math.abs(o.y-o.h*.5-(f.y-f.h*.5))<95){hurt(o,5,f.face,f);burst(o.x,o.y-o.h*.5,'#ffe7a0',8,180);} }
            f.comboT=Math.max(0,f.comboT-dt);
        }
        if (f.specialT > 0) {
            f.specialT=Math.max(0,f.specialT-dt);
            const airTarget = o.y < GROUND-24;
            const inFront = (o.x-f.x)*f.face > -12;
            const vertical = Math.abs((o.y-o.h*.55)-(f.y-f.h*.55));
            const diagonal = f.hero.id==='musashi' && f.specialT>0 && airTarget && inFront && vertical<150;
            const close = Math.abs(o.x-f.x)<(f.hero.id==='katex'?100:115) && vertical<105;
            if (!f.specialHit && inFront && (diagonal||close)) {
                hurt(o,f.hero.id==='katex'?17:19,f.face,f); f.specialHit=true;
                burst(o.x,o.y-o.h*.55,f.hero.id==='katex'?'#e9c77a':'#ffe7a0',22,300);
            }
        }
        if (f.muetaDash > 0) {
            f.muetaDash = Math.max(0, f.muetaDash - dt);
            if (!f.muetaDashHit && Math.abs(o.x - f.x) < 82 && Math.abs(o.y - f.y) < 110) {
                hurt(o, 17, f.face, f); f.muetaDashHit = true;
                burst(o.x, o.y - o.h * 0.5, '#70f4ff', 18, 260);
            }
        }
        if (f.dashT <= 0) f.face = o.x >= f.x ? 1 : -1;

        f.vy += GRAV * dt;
        f.y += f.vy * dt;
        if (f.y >= GROUND) { f.y = GROUND; f.vy = 0; f.onGround = true; } else f.onGround = false;
        f.x = Math.max(36, Math.min(W - 36, f.x + f.vx * dt));
    }

    function separate() {
        const dx = p2.x - p1.x;
        const min = (p1.w + p2.w) * 0.8;
        if (Math.abs(dx) < min && Math.abs(p1.y - p2.y) < 50) {
            const push = (min - Math.abs(dx)) / 2 * (dx >= 0 ? 1 : -1);
            p1.x = Math.max(36, Math.min(W - 36, p1.x - push));
            p2.x = Math.max(36, Math.min(W - 36, p2.x + push));
        }
    }

    /* ---------------------------------------------------------
       9. ĐẠN, VẬT PHẨM, HIỆU ỨNG
    --------------------------------------------------------- */
    function updateProjectiles(dt) {
        projectiles = projectiles.filter(p => {
            p.x += p.vx * dt;
            p.life -= dt;
            if (p.life <= 0 || p.x < -20 || p.x > W + 20) return false;
            const t = p.owner === p1 ? p2 : p1;
            const hit = Math.abs(p.x - t.x) < t.w / 2 + (p.beam ? 42 : p.size) &&
                p.y > t.y - t.h - p.size && p.y < t.y + p.size;
            if (hit) {
                if (t.dashT > 0) return true;   // lướt xuyên qua đạn
                hurt(t, p.dmg, Math.sign(p.vx), p.owner);
                return false;
            }
            return true;
        });
    }

    function updateItems(dt) {
        itemT -= dt;
        if (itemT <= 0) {
            itemT = 4.5 + Math.random() * 3;
            if (items.length < 2) {
                items.push({
                    type: ITEM_POOL[Math.floor(Math.random() * ITEM_POOL.length)],
                    x: 150 + Math.random() * (W - 300),
                    life: 9, phase: Math.random() * 6
                });
            }
        }
        items = items.filter(it => {
            it.life -= dt;
            it.phase += dt * 4;
            if (it.life <= 0) return false;
            for (const f of [p1, p2]) {
                if (Math.hypot(f.x - it.x, (f.y - f.h / 2) - (GROUND - 30)) < 46) {
                    applyItem(f, it);
                    return false;
                }
            }
            return true;
        });
    }

    function applyItem(f, it) {
        const t = ITEM_TYPES[it.type];
        if (f.hero.id === 'musashi') { f.holy=Math.min(100,f.holy+28); floatText(f.x,f.y-f.h-36,'THÁNH KIẾM +28','#ffe7a0'); }
        sfx('item');
        if (it.type === 'shield') f.shield = 6;
        if (it.type === 'rocket') f.rocket = 1;
        if (it.type === 'glove') f.glove = 1;
        burst(it.x, GROUND - 30, t.color, 16, 240);
        floatText(f.x, f.y - f.h - 24, t.name, t.color);
    }

    function updateArenaEvent(dt) {
        arenaEvent.t -= dt;
        if (arenaEvent.announce > 0) arenaEvent.announce -= dt;
        if (arenaEvent.t <= 0) {
            const events = [
                { name: 'BÃO NĂNG LƯỢNG', kind: 'surge' },
                { name: 'SÀN TĂNG TỐC', kind: 'speed' },
                { name: 'MƯA TIA SÁNG', kind: 'shards' }
            ];
            const next = events[Math.floor(Math.random() * events.length)];
            arenaEvent = { ...next, t: 11, announce: 2.5 };
            banner = { text: next.name, t: 1.8 };
            burst(W / 2, GROUND - 40, next.kind === 'speed' ? '#ffcf66' : '#70f4ff', 28, 360);
        }
        if (arenaEvent.kind === 'speed') {
            [p1, p2].forEach(f => { if (f) f.boost = Math.max(f.boost, 0.08); });
        }
        if (arenaEvent.kind === 'shards' && Math.random() < dt * 1.2) {
            const x = 70 + Math.random() * (W - 140);
            particles.push({ x, y: 90, vx: 0, vy: 280, life: 0.8, max: 0.8, size: 5, color: '#70f4ff' });
        }
    }

    function burst(x, y, color, n, speed) {
        if (cfg.graphics === 'low') n = Math.ceil(n * 0.45);
        else if (cfg.graphics === 'medium') n = Math.ceil(n * 0.72);
        for (let i = 0; i < n; i++) {
            const a = Math.random() * Math.PI * 2;
            const s = speed * (0.3 + Math.random() * 0.7);
            particles.push({
                x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40,
                life: 0.35 + Math.random() * 0.3, max: 0.65,
                size: 2 + Math.random() * 3, color
            });
        }
    }

    function floatText(x, y, text, color) {
        floaters.push({ x, y, text, color, t: 0.9 });
    }

    function updateFx(dt) {
        shake = Math.max(0, shake - dt * 30);
        particles = particles.filter(p => {
            p.life -= dt;
            p.vy += 600 * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            return p.life > 0;
        });
        floaters = floaters.filter(f => {
            f.t -= dt;
            f.y -= 40 * dt;
            return f.t > 0;
        });
        if (banner.t > 0) banner.t -= dt;
    }

    /* ---------------------------------------------------------
       10. VÒNG LẶP TRẬN ĐẤU
    --------------------------------------------------------- */
    function update(dt) {
        updateFx(dt);

        if (state === 'splash') {
            splashT -= dt;
            if (splashT <= 0) showMain();
            return;
        }
        if (state === 'menu' || state === 'paused' || state === 'matchEnd') return;

        if (state === 'countdown') {
            stateT -= dt;
            const n = Math.ceil(stateT - 0.2);
            if (n !== lastCount && n >= 1 && n <= 3) { lastCount = n; sfx('beep'); }
            stepFighter(p1, p2, dt, false);
            stepFighter(p2, p1, dt, false);
            if (stateT <= 0.2) {
                state = 'fight';
                banner = { text: 'FIGHT!', t: 0.7 };
                sfx('go');
            }
            return;
        }

        if (state === 'fight') {
            timer -= dt;
            stepFighter(p1, p2, dt, true);
            stepFighter(p2, p1, dt, true);
            separate();
            updateProjectiles(dt);
            updateItems(dt);
            updateArenaEvent(dt);

            if (p1.hp <= 0 || p2.hp <= 0 || timer <= 0) endRound();
            return;
        }

        if (state === 'roundEnd') {
            const sdt = dt * 0.4;
            stepFighter(p1, p2, sdt, false);
            stepFighter(p2, p1, sdt, false);
            stateT -= dt;
            if (stateT <= 0) {
                if (p1.wins >= ROUNDS_TO_WIN || p2.wins >= ROUNDS_TO_WIN) showMatchEnd();
                else beginRound();
            }
        }
    }

    function endRound() {
        timer = Math.max(0, timer);
        let msg;
        if (p1.hp === p2.hp) {
            msg = 'HÒA — ĐẤU LẠI';
        } else {
            const w = p1.hp > p2.hp ? p1 : p2;
            w.wins++;
            round++;
            msg = (w.side === 0 ? 'P1' : (cfg.mode === 'bot' ? 'BOT' : 'P2')) + ' THẮNG HIỆP';
        }
        banner = { text: p1.hp <= 0 || p2.hp <= 0 ? 'K.O.' : 'HẾT GIỜ', t: 2 };
        floatText(W / 2, 200, msg, '#fff');
        sfx('ko');
        state = 'roundEnd';
        stateT = 2.4;
        projectiles = [];
    }

    /* ---------------------------------------------------------
       11. VẼ
    --------------------------------------------------------- */
    function rr(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    /* BẢN ĐỒ: thêm map mới (vd. 'soulbound') bằng cách đăng ký vào MAPS rồi gán cfg.map.
       draw()  — vẽ nền / sàn / hiệu ứng riêng của map
       Có thể mở rộng thêm: spawn(), items, events, ground… */
    const MAP_IMAGE = new Image(); MAP_IMAGE.src = 'ash-blossom.png';
    const MAPS = { arena:{name:'ARENA 1v1',draw:drawArenaClassic}, ashblossom:{name:'ASH BLOSSOM',draw:drawAshBlossom}, soulbound:{name:'SOULBOUND',draw:drawSoulbound} };
    function drawAshBlossom(){
        if(MAP_IMAGE.complete && MAP_IMAGE.naturalWidth){ctx.drawImage(MAP_IMAGE,0,0,W,H);} else drawArenaClassic();
        const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(22,10,30,.10)');g.addColorStop(1,'rgba(5,20,28,.62)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
        ctx.fillStyle='#182333';ctx.fillRect(0,GROUND,W,H-GROUND);ctx.fillStyle='#ef8ba8';ctx.fillRect(0,GROUND,W,3);
        if(arenaEvent.kind==='surge'){ctx.fillStyle='rgba(255,180,210,.08)';ctx.fillRect(0,80,W,GROUND-80);}
        for(let i=0;i<18;i++){let x=(i*83+(performance.now()/70)%W)%W;let y=90+(i*47)%300;ctx.fillStyle='rgba(255,190,220,.7)';ctx.beginPath();ctx.ellipse(x,y,3,7,.6,0,TAU);ctx.fill();}
    }
    function drawSoulbound(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#111b35');g.addColorStop(.55,'#27395a');g.addColorStop(1,'#101624');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.save();for(let i=0;i<9;i++){let x=i*125-30;ctx.fillStyle=i%2?'#34435b':'#202d48';ctx.fillRect(x,140+(i%3)*32,72,GROUND-140-(i%3)*32);ctx.fillStyle='#76d8d1';ctx.globalAlpha=.25;for(let y=190;y<GROUND-30;y+=38)ctx.fillRect(x+16,y,5,12);ctx.globalAlpha=1;}ctx.restore();ctx.fillStyle='#172235';ctx.fillRect(0,GROUND,W,H-GROUND);ctx.fillStyle='#72d9d1';ctx.fillRect(0,GROUND,W,3);ctx.strokeStyle='rgba(117,230,220,.22)';ctx.lineWidth=2;for(let i=0;i<7;i++){ctx.beginPath();ctx.arc(W/2,GROUND,60+i*42,Math.PI,TAU);ctx.stroke();}}

    function drawArena() { (MAPS[cfg.map] || MAPS.arena).draw(); }

    function drawArenaClassic() {
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#0b1020');
        g.addColorStop(1, '#101a2b');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);

        // vòng tròn trang trí giống ảnh arena trên web
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.strokeStyle = 'rgba(255,152,103,.22)';
        ctx.beginPath(); ctx.ellipse(W / 2, GROUND - 40, 380, 210, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = 'rgba(177,154,255,.22)';
        ctx.beginPath(); ctx.ellipse(W / 2, GROUND - 40, 240, 130, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);

        // lưới
        ctx.strokeStyle = 'rgba(99,229,220,.06)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 80); ctx.lineTo(x, GROUND); ctx.stroke(); }
        for (let y = 80; y <= GROUND; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

        // Hiệu ứng sự kiện đấu trường, giữ độ tương phản để nhân vật không bị chìm.
        if (arenaEvent.kind === 'surge') {
            ctx.save(); ctx.globalAlpha = 0.12 + Math.sin(performance.now() / 180) * 0.035;
            ctx.fillStyle = '#70f4ff'; ctx.fillRect(0, 90, W, GROUND - 90); ctx.restore();
        } else if (arenaEvent.kind === 'shards') {
            ctx.save(); ctx.strokeStyle = 'rgba(112,244,255,.22)'; ctx.lineWidth = 2;
            for (let x = 30; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 100); ctx.lineTo(x + 22, GROUND); ctx.stroke(); }
            ctx.restore();
        }
        // sàn
        ctx.fillStyle = '#121927';
        ctx.fillRect(0, GROUND, W, H - GROUND);
        ctx.shadowColor = '#63e5dc';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#63e5dc';
        ctx.fillRect(0, GROUND, W, 3);
        ctx.shadowBlur = 0;
    }

    /* ---------------------------------------------------------
       11A. SPRITE ENGINE — nhân vật vẽ bằng vector, không cần file ảnh
       Gốc toạ độ = giữa hai bàn chân · +x = hướng nhìn · y âm = đi lên
       Màu hero cố định, màu đội (P1 xanh / P2 cam) nằm ở mắt, huy hiệu, lông mào...
    --------------------------------------------------------- */
    const TAU = Math.PI * 2;
    const OUT = '#0c0f1a';
    const MAX_VIS = 114;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function oval(c, x, y, rx, ry, fill, line, rot) {
        c.beginPath();
        c.ellipse(x, y, rx, ry, rot || 0, 0, TAU);
        if (fill) { c.fillStyle = fill; c.fill(); }
        if (line !== false) { c.lineWidth = 2; c.strokeStyle = OUT; c.stroke(); }
    }

    function shape(c, pts, fill, line) {
        c.beginPath();
        c.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]);
        c.closePath();
        if (fill) { c.fillStyle = fill; c.fill(); }
        if (line !== false) { c.lineWidth = 2; c.lineJoin = 'round'; c.strokeStyle = OUT; c.stroke(); }
    }

    function limb(c, pts, w, col) {
        c.lineCap = 'round';
        c.lineJoin = 'round';
        c.beginPath();
        c.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]);
        c.strokeStyle = OUT; c.lineWidth = w + 4; c.stroke();
        c.strokeStyle = col; c.lineWidth = w; c.stroke();
    }

    function curve(c, x0, y0, cx, cy, x1, y1, wd, col) {
        c.lineCap = 'round';
        c.beginPath();
        c.moveTo(x0, y0);
        c.quadraticCurveTo(cx, cy, x1, y1);
        c.strokeStyle = OUT; c.lineWidth = wd + 4; c.stroke();
        c.strokeStyle = col; c.lineWidth = wd; c.stroke();
    }

    // tay 2 đoạn: vai -> khuỷu -> cổ tay (ang: 0 = chỉ ra trước, PI/2 = chỉ xuống)
    function armPts(sx, sy, ang, l1, l2, bend) {
        const ex = sx + Math.cos(ang) * l1, ey = sy + Math.sin(ang) * l1;
        const a2 = ang + bend;
        return [[sx, sy], [ex, ey], [ex + Math.cos(a2) * l2, ey + Math.sin(a2) * l2]];
    }

    // chân 2 đoạn: hông -> gối -> bàn chân
    function legPts(hx, hipY, swing, air) {
        const lift = Math.max(0, swing);
        const fx = air ? hx + (swing >= 0 ? 7 : -3) : hx + swing * 8;
        const fy = air ? hipY * 0.4 : -lift * 5;
        return [[hx, hipY], [(hx + fx) / 2 + 4, (hipY + fy) / 2], [fx, fy]];
    }

    // gradient dọc dùng làm màu tô → thân nhân vật có khối sáng/tối
    function vg(c, y0, y1, top, bottom) {
        const g = c.createLinearGradient(0, y0, 0, y1);
        g.addColorStop(0, top);
        g.addColorStop(1, bottom);
        return g;
    }

    function glow(c, x, y, r, col) {
        c.save();
        c.shadowColor = col; c.shadowBlur = 16;
        c.fillStyle = col;
        c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
        c.fillStyle = '#fff';
        c.beginPath(); c.arc(x, y, r * 0.45, 0, TAU); c.fill();
        c.restore();
    }

    // tư thế theo trạng thái nhân vật trong trận
    function poseOf(f) {
        const t = performance.now() / 1000 + f.side * 1.3;
        const moving = f.onGround && Math.abs(f.vx) > 50;
        const ph = Math.sin(t * 13);
        return {
            t,
            walk: moving ? ph : 0,
            bob: !f.onGround ? 0 : (moving ? Math.abs(ph) * 2.2 : Math.sin(t * 2.6) * 1.4),
            air: !f.onGround,
            atk: f.atkT > 0 && f.atkKind === 'atk' ? 1 - f.atkT / 0.16 : -1,
            cast: f.atkT > 0 && f.atkKind === 'skill' ? Math.max(0, Math.min(1, 1 - f.atkT / (f.hero.id === 'vex' ? 0.22 : 0.1))) : -1,
            hit: f.hitT > 0 ? f.hitT / 0.22 : 0,
            dash: f.dashT > 0,
            lock: f.ovLock > 0,
            accent: SIDE_COLOR[f.side]
        };
    }

    // tư thế cho màn chọn nhân vật: đứng thở, thỉnh thoảng đánh / bắn skill
    function demoPose(t, side, big) {
        const cyc = t % 3.4;
        let atk = -1, cast = -1;
        if (big) {
            if (cyc < 0.55) atk = cyc / 0.55;
            else if (cyc > 1.7 && cyc < 2.2) cast = (cyc - 1.7) / 0.5;
        }
        return {
            t, walk: 0, bob: Math.sin(t * 2.6) * 1.4, air: false,
            atk, cast, hit: 0, dash: false, lock: false, accent: SIDE_COLOR[side]
        };
    }

    function drawHeroSprite(c, id, x, y, face, p) {
        c.save();
        c.translate(x, y);
        c.scale(face, 1);
        if (p.hit > 0) c.rotate(-0.16 * p.hit);
        else if (p.dash) c.rotate(0.2);
        if (p.lock) c.translate((Math.random() - 0.5) * 3, 0);
        SPRITES[id](c, p);
        c.restore();
    }

    /* ===== VEX — Malphas-inspired demon: trident, infernal familiar, bronze armor ===== */
    function spriteVex(c, p) {
        const A = '#ff9a42';
        const skin = vg(c, -102, -20, '#e66b4e', '#8f2636');
        const skinD = vg(c, -72, -8, '#9b2d3d', '#4e1728');
        const armor = vg(c, -78, -28, '#59636a', '#202a35');
        const gold = vg(c, -76, -24, '#f3c46b', '#9d5a2d');
        const cloth = '#24202b';
        const B = -p.bob, w = p.walk;
        const attack = p.atk >= 0 ? Math.sin(Math.min(1,p.atk) * Math.PI) : 0;
        const cast = p.cast >= 0 ? Math.sin(Math.min(1,p.cast) * Math.PI) : 0;
        const dashLean = p.dash ? 7 : 0;
        const flameBob = Math.sin(p.t * 7) * 3;

        // Trident strapped behind the shoulder: recognizable Malphas silhouette.
        c.save(); c.globalAlpha = .94;
        curve(c, -9, -34+B, 12, -68+B, 42, -111+B, 4, '#342b32');
        curve(c, -9, -34+B, 12, -68+B, 42, -111+B, 1.7, '#c69b62');
        shape(c, [[36,-105+B],[42,-125+B],[47,-108+B],[53,-123+B],[51,-101+B],[44,-94+B]], gold);
        c.restore();

        // Tail with a pointed tip.
        curve(c, -10, -28+B, -45, -20+B+Math.sin(p.t*4)*5, -43, -58+B, 5, skinD);
        shape(c, [[-43,-57+B],[-55,-70+B],[-35,-65+B]], '#b94b3d');

        // Boots and short armored legs.
        [[-11,w],[11,-w]].forEach(([hx,sw])=>{
            const lp=legPts(hx,-29,sw,p.air);
            limb(c,lp,13,skinD);
            shape(c, [[lp[2][0]-7,lp[2][1]-5],[lp[2][0]+7,lp[2][1]-5],[lp[2][0]+12,lp[2][1]+1],[lp[2][0]-8,lp[2][1]+2]], armor);
            shape(c, [[lp[1][0]-7,lp[1][1]-5],[lp[1][0]+6,lp[1][1]-5],[lp[1][0]+8,lp[1][1]+4],[lp[1][0]-5,lp[1][1]+5]], gold);
        });

        // Waist cloth and belt.
        shape(c,[[-19,-40+B],[18,-40+B],[22,-24],[-18,-22],[-24,-31]],cloth);
        shape(c,[[-15,-40+B],[15,-40+B],[12,-34+B],[-12,-34+B]],gold);
        oval(c,0,-37+B,5,5,'#f8d68c');
        shape(c,[[-5,-32+B],[5,-32+B],[13,-17],[0,-22],[-12,-17]],'#6d2934');

        // Broad torso with layered dark armor plates.
        shape(c,[[-29,-75+B],[27,-75+B],[23,-54+B],[15,-39+B],[-16,-39+B],[-24,-55+B]],skin);
        shape(c,[[-28,-70+B],[-18,-78+B],[-5,-71+B],[0,-49+B],[-18,-48+B]],armor);
        shape(c,[[28,-70+B],[18,-78+B],[5,-71+B],[0,-49+B],[18,-48+B]],armor);
        shape(c,[[-15,-72+B],[0,-78+B],[15,-72+B],[10,-59+B],[0,-54+B],[-10,-59+B]],gold);
        shape(c,[[-9,-58+B],[9,-58+B],[7,-43+B],[-7,-43+B]],armor);
        c.strokeStyle='#f5c46d'; c.lineWidth=2;
        c.beginPath(); c.moveTo(-18,-62+B); c.lineTo(-7,-57+B); c.moveTo(18,-62+B); c.lineTo(7,-57+B); c.stroke();
        // Shoulder guards and rivets.
        shape(c,[[-28,-72+B],[-39,-66+B],[-34,-52+B],[-20,-55+B],[-17,-68+B]],gold);
        shape(c,[[25,-72+B],[36,-66+B],[31,-52+B],[18,-55+B],[16,-68+B]],gold);
        [-29,29].forEach(x=>oval(c,x,-62+B,3,3,'#fff0b8'));

        // Neck and head.
        shape(c,[[-8,-80+B],[8,-80+B],[10,-72+B],[-10,-72+B]],skinD);
        const hx=2, hy=-91+B;
        // swept-back horns
        shape(c,[[-11,hy-2],[-23,hy-14],[-25,hy-31],[-14,hy-20],[-5,hy-9]],'#ead7b0');
        shape(c,[[9,hy-5],[20,hy-18],[23,hy-34],[27,hy-17],[17,hy-2]],'#ead7b0');
        // ears
        shape(c,[[-12,hy+1],[-29,hy-5],[-17,hy+12]],skinD);
        shape(c,[[15,hy+1],[30,hy-7],[21,hy+13]],skinD);
        oval(c,hx,hy,18,17,skin);
        // brow, glowing eyes, mouth and tusks
        shape(c,[[-13,hy-8],[-1,hy-12],[2,hy-7],[-9,hy-4]],skinD);
        shape(c,[[4,hy-11],[17,hy-8],[14,hy-3],[5,hy-5]],skinD);
        glow(c,-5,hy-2,3.2,'#ffd36b');
        glow(c,10,hy-2,3.2,'#ffd36b');
        c.strokeStyle='#401a25'; c.lineWidth=2.5; c.beginPath(); c.moveTo(-3,hy+7); c.lineTo(8,hy+9); c.stroke();
        shape(c,[[-1,hy+8],[1,hy+15],[4,hy+9]],'#fff0d6');
        shape(c,[[8,hy+9],[11,hy+15],[13,hy+8]],'#fff0d6');

        // Rear arm in guard position.
        const guard=armPts(-22,-64+B,1.35-w*.2,16,13,.45);
        limb(c,guard,13,skinD); oval(c,guard[2][0],guard[2][1],9,8,skin);
        shape(c,[[guard[2][0]-7,guard[2][1]-5],[guard[2][0]+7,guard[2][1]-6],[guard[2][0]+10,guard[2][1]+3],[guard[2][0]-5,guard[2][1]+5]],gold);

        // Front arm changes pose: punch on J, raise the familiar during K.
        const shoulder=[24,-63+B];
        let ang=1.0-w*.28, bend=-.6, reach=1;
        if(p.atk>=0){ ang=lerp(1.25,-.08,attack); bend=lerp(-.8,-.15,attack); reach=1+.22*attack; }
        else if(p.cast>=0){ ang=lerp(.9,-1.15,cast); bend=lerp(-.5,.5,cast); reach=1+.12*cast; }
        else if(p.dash){ ang=-.12; bend=-.35; }
        const arm=armPts(shoulder[0],shoulder[1],ang,18*reach,16*reach,bend);
        limb(c,arm,15,skin); oval(c,arm[2][0],arm[2][1],10,9,skinD);
        // Bronze wrist cuff.
        oval(c,(arm[1][0]+arm[2][0])*.5,(arm[1][1]+arm[2][1])*.5,5,9,gold,true,ang);

        // Floating infernal familiar. It follows the palm and grows during skill cast.
        const fx=cast>0?arm[2][0]+12:Math.max(38,arm[2][0]+12);
        const fy=(cast>0?arm[2][1]-18: -104+B)+flameBob*(1+cast*.4);
        const fr=cast>0?11+cast*8:10;
        c.save(); c.shadowColor='#ff8b32'; c.shadowBlur=18+cast*18;
        c.fillStyle=vg(c,fy-fr,fy+fr,'#fff0a4','#ed5b24');
        c.beginPath(); c.moveTo(fx-fr*.8,fy+fr*.8);
        c.quadraticCurveTo(fx-fr*1.5,fy-fr*.1,fx-fr*.2,fy-fr*1.5);
        c.quadraticCurveTo(fx+fr*.1,fy-fr*.65,fx+fr*.8,fy-fr*1.7);
        c.quadraticCurveTo(fx+fr*1.5,fy-fr*.1,fx+fr*.8,fy+fr*.8);
        c.quadraticCurveTo(fx,fy+fr*1.25,fx-fr*.8,fy+fr*.8); c.fill();
        c.shadowBlur=0;
        oval(c,fx-fr*.28,fy,2,2,'#54202a'); oval(c,fx+fr*.22,fy,2,2,'#54202a');
        c.strokeStyle='#54202a'; c.lineWidth=1.6; c.beginPath(); c.arc(fx,fy+fr*.18,fr*.25,.15*Math.PI,.85*Math.PI); c.stroke();
        c.restore();
        if(p.cast>=0){
            glow(c,fx,fy,fr*.7,'#ffb34f');
            c.save(); c.globalAlpha=.55+.35*cast; c.strokeStyle='#ffb34f'; c.lineWidth=2;
            c.beginPath(); c.arc(fx,fy,fr+7+cast*9,p.t*3,p.t*3+Math.PI*1.5); c.stroke(); c.restore();
        }
        if(p.dash){
            c.save(); c.globalAlpha=.7; c.strokeStyle='#ff6b45'; c.lineWidth=5;
            c.beginPath(); c.moveTo(-25,-48+B); c.quadraticCurveTo(-48,-38+B,-58,-18+B); c.stroke(); c.restore();
        }
    }

    /* ===== AURA — chiến binh giáp trụ: cao to, khiên + kiếm, vừa công vừa thủ ===== */
    function spriteAura(c, p) {
        const A = p.accent;
        const st = vg(c, -104, -20, '#c8d6ea', '#7d92b3'), stD = vg(c, -80, -10, '#6e81a6', '#43557c');
        const stL = '#dbe5f3', gold = vg(c, -76, -26, '#f7d67f', '#d09b32'), cl = '#26335e';
        const w = p.walk, B = -p.bob, sw = Math.sin(p.t * 3.2) * 5;

        // áo choàng
        shape(c, [[-12, -78 + B], [-27, -76 + B], [-44 + sw, -34], [-41 + sw * 1.4, -16], [-22, -24], [-10, -40]], cl);
        c.strokeStyle = A; c.lineWidth = 2.5; c.lineCap = 'round';
        c.beginPath(); c.moveTo(-44 + sw, -34); c.lineTo(-41 + sw * 1.4, -16); c.stroke();

        // chân giáp
        [[-11, w], [11, -w]].forEach(([hx, s]) => {
            const lp = legPts(hx, -38, s, p.air);
            limb(c, lp, 16, stD);
            oval(c, lp[1][0] + 4, lp[1][1], 7, 7, st);
            oval(c, lp[2][0] + 5, lp[2][1] - 1, 12, 6, st);
        });

        // váy giáp + thắt lưng
        shape(c, [[-18, -40 + B], [-7, -40 + B], [-8, -27], [-20, -29]], stD);
        shape(c, [[7, -40 + B], [18, -40 + B], [20, -29], [8, -27]], stD);
        shape(c, [[-5, -40 + B], [5, -40 + B], [5, -25], [-5, -25]], st);

        // thân giáp ngực
        shape(c, [[-29, -76 + B], [29, -76 + B], [22, -56 + B], [15, -42 + B], [-15, -42 + B], [-22, -56 + B]], st);
        shape(c, [[-29, -76 + B], [0, -76 + B], [0, -42 + B], [-15, -42 + B], [-22, -56 + B]], 'rgba(255,255,255,.18)', false);
        c.strokeStyle = gold; c.lineWidth = 2;
        c.beginPath(); c.moveTo(-22, -62 + B); c.lineTo(22, -62 + B); c.stroke();
        shape(c, [[0, -73 + B], [7, -62 + B], [0, -51 + B], [-7, -62 + B]], A);
        shape(c, [[-16, -45 + B], [16, -45 + B], [16, -39 + B], [-16, -39 + B]], gold);

        // vai sau + khiên tròn (đỡ đòn)
        oval(c, -27, -75 + B, 14, 10, st);
        const sx = -17 + (p.atk >= 0 ? Math.sin(p.atk * Math.PI) * 4 : 0), sy = -50 + B;
        oval(c, sx, sy, 19, 20, gold);
        oval(c, sx, sy, 15, 16, stD);
        shape(c, [[sx, sy - 11], [sx + 7, sy], [sx, sy + 11], [sx - 7, sy]], A);

        // đầu: mũ giáp, lông mào, kính ngắm
        const hx = 4, hy = -88 + B;
        shape(c, [[hx - 2, hy - 11], [hx - 14, hy - 21], [hx - 30 + sw, hy - 7], [hx - 38 + sw * 1.2, hy + 8],
            [hx - 20, hy - 1], [hx - 4, hy - 2]], A);
        oval(c, hx, hy + 12, 7, 5, stD);
        oval(c, hx, hy, 12.5, 13, st);
        c.strokeStyle = gold; c.lineWidth = 2.5; c.lineCap = 'round';
        c.beginPath(); c.moveTo(hx - 1, hy - 13); c.lineTo(hx + 1, hy - 1); c.stroke();
        shape(c, [[hx + 1, hy - 4], [hx + 13, hy - 4], [hx + 13, hy + 3], [hx + 2, hy + 3]], '#0c0f1a');
        c.fillStyle = A;
        c.shadowColor = A; c.shadowBlur = 8;
        c.fillRect(hx + 4, hy - 2, 9, 2.2);
        c.shadowBlur = 0;
        shape(c, [[hx - 11, hy + 1], [hx + 2, hy + 4], [hx + 4, hy + 13], [hx - 6, hy + 10]], stD);

        // tay kiếm
        const sh = [26, -73 + B];
        let bladeAng, aAng, aBend;
        if (p.atk >= 0) {
            bladeAng = lerp(-2.2, 0.8, p.atk); aAng = lerp(-1.0, 0.5, p.atk); aBend = 0;
        } else if (p.cast >= 0) {
            aAng = -0.25; aBend = 0; bladeAng = -1.2;
        } else {
            aAng = 1.0 - w * 0.25; aBend = -0.55; bladeAng = -1.15;
        }
        const fa = armPts(sh[0], sh[1], aAng, 18, 17, aBend);
        oval(c, sh[0], sh[1], 15, 11, stL, true, -0.25);
        shape(c, [[sh[0] - 4, sh[1] - 9], [sh[0] + 2, sh[1] - 20], [sh[0] + 8, sh[1] - 8]], gold);
        limb(c, fa, 14, stD);
        const hand = fa[2];
        const dx = Math.cos(bladeAng), dy = Math.sin(bladeAng), nx = -dy, ny = dx;
        const pt = (d, o) => [hand[0] + dx * d + nx * o, hand[1] + dy * d + ny * o];
        limb(c, [pt(-8, 0), pt(4, 0)], 5, '#5a3c22');
        limb(c, [pt(5, -9), pt(5, 9)], 4, gold);
        shape(c, [pt(6, -3.5), pt(44, -3), pt(54, 0), pt(44, 3), pt(6, 3.5)], stL);
        const b0 = pt(8, 0), b1 = pt(46, 0);
        c.strokeStyle = A; c.lineWidth = 1.5;
        c.beginPath(); c.moveTo(b0[0], b0[1]); c.lineTo(b1[0], b1[1]); c.stroke();
        oval(c, hand[0], hand[1], 8.5, 8.5, st);
        if (p.cast >= 0) {
            const tp = pt(54, 0);
            glow(c, tp[0], tp[1], 6 + 5 * Math.sin(p.cast * Math.PI), A);
        }
    }

    /* ===== NYX — nữ hộ vệ pháo thủ: giáp nặng, khiên tháp, gậy pha lê, tóc đuôi đôi ===== */
    function spriteNyx(c, p) {
        const A = p.accent;
        const ar = vg(c, -100, -20, '#a084f4', '#6547bd'), arD = vg(c, -80, -10, '#523d9f', '#2d2063');
        const arL = '#b69cff', rose = '#ff9fd2';
        const skin = vg(c, -104, -72, '#fee6d6', '#f0c3aa'), hair = '#2c1b55', cl = '#201545';
        const w = p.walk, B = -p.bob, sw = Math.sin(p.t * 3) * 5;
        const hx = 4, hy = -88 + B;

        // tóc đuôi đôi (sau lưng)
        curve(c, hx - 6, hy - 4, hx - 32, hy - 8, hx - 38 + sw, hy + 36, 13, hair);
        curve(c, hx - 6, hy - 2, hx - 20, hy + 2, hx - 24 + sw * 0.6, hy + 42, 10, hair);

        // chân to, giáp ống chân
        [[-13, w], [13, -w]].forEach(([hx2, s]) => {
            const lp = legPts(hx2, -32, s, p.air);
            limb(c, lp, 19, arD);
            oval(c, lp[1][0] + 4, lp[1][1] + 2, 8, 8, ar);
            oval(c, lp[2][0] + 6, lp[2][1] - 2, 14, 7, ar);
        });

        // váy giáp rộng
        shape(c, [[-24, -48 + B], [24, -48 + B], [34, -21], [-34, -21]], cl);
        shape(c, [[-24, -44 + B], [-8, -44 + B], [-11, -21], [-33, -22]], arD);
        shape(c, [[8, -44 + B], [24, -44 + B], [33, -22], [11, -21]], arD);
        shape(c, [[-8, -44 + B], [8, -44 + B], [10, -20], [-10, -20]], ar);
        c.strokeStyle = rose; c.lineWidth = 2.5; c.lineCap = 'round';
        c.beginPath(); c.moveTo(-33, -22); c.lineTo(33, -22); c.stroke();

        // thân: dáng đồng hồ cát, vai rộng
        shape(c, [[-26, -78 + B], [26, -78 + B], [22, -64 + B], [14, -54 + B], [18, -44 + B],
            [-18, -44 + B], [-14, -54 + B], [-22, -64 + B]], ar);
        oval(c, -8, -67 + B, 9, 8, 'rgba(255,255,255,.22)', false);
        oval(c, 9, -67 + B, 9, 8, 'rgba(255,255,255,.22)', false);
        c.strokeStyle = rose; c.lineWidth = 2;
        c.beginPath(); c.moveTo(-18, -74 + B); c.lineTo(0, -58 + B); c.lineTo(18, -74 + B); c.stroke();
        shape(c, [[-15, -52 + B], [15, -52 + B], [17, -44 + B], [-17, -44 + B]], rose);
        oval(c, 0, -60 + B, 4.5, 4.5, A);

        // vai sau
        oval(c, -28, -76 + B, 14, 11, ar);

        // khiên tháp khổng lồ (tay sau) — thúc ra trước khi đánh
        const bump = p.atk >= 0 ? Math.sin(p.atk * Math.PI) * 14 : 0;
        const sx = 20 + bump, sy = -54 + B;
        shape(c, [[sx - 12, sy - 31], [sx + 12, sy - 31], [sx + 14, sy + 8], [sx, sy + 31], [sx - 14, sy + 8]], rose);
        shape(c, [[sx - 9, sy - 27], [sx + 9, sy - 27], [sx + 10, sy + 7], [sx, sy + 26], [sx - 10, sy + 7]], arD, false);
        oval(c, sx, sy - 5, 5, 8, A);
        c.strokeStyle = rose; c.lineWidth = 2;
        c.beginPath(); c.moveTo(sx, sy - 20); c.lineTo(sx, sy + 18); c.stroke();

        // đầu: mặt, mắt to, mái, nơ
        oval(c, hx, hy + 12, 6, 6, skin);
        oval(c, hx, hy, 12, 12.5, skin);
        [hx + 1, hx + 10.5].forEach(ex => {
            oval(c, ex, hy + 0.5, 3.2, 4.2, '#fff', false);
            oval(c, ex + 0.8, hy + 1, 2.3, 3.4, A, false);
            oval(c, ex + 1.4, hy - 0.6, 0.9, 0.9, '#fff', false);
        });
        c.strokeStyle = OUT; c.lineWidth = 1.6; c.lineCap = 'round';
        c.beginPath();
        c.moveTo(hx - 2.5, hy - 3.2); c.lineTo(hx - 4.5, hy - 5);
        c.moveTo(hx + 7.5, hy - 3.2); c.lineTo(hx + 6, hy - 5);
        c.stroke();
        oval(c, hx + 11, hy + 6, 3, 2, 'rgba(255,110,150,.4)', false);
        c.beginPath(); c.arc(hx + 6, hy + 6, 3, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke();
        shape(c, [[hx - 13, hy - 3], [hx - 12, hy - 13], [hx, hy - 16], [hx + 12, hy - 12], [hx + 13, hy - 4],
            [hx + 6, hy - 8], [hx + 1, hy - 4], [hx - 5, hy - 9]], hair);
        shape(c, [[hx - 8, hy - 13], [hx - 19, hy - 21], [hx - 18, hy - 9]], A);
        shape(c, [[hx - 8, hy - 13], [hx + 2, hy - 22], [hx + 1, hy - 10]], A);
        oval(c, hx - 8, hy - 13, 2.5, 2.5, '#fff', false);

        // tay trước: gậy pha lê
        const shp = [27, -75 + B];
        let aAng, aBend, stAng;
        if (p.cast >= 0) { aAng = -0.2; aBend = 0; stAng = -0.35; }
        else { aAng = 0.9 - w * 0.2; aBend = -0.6; stAng = -1.25; }
        const fa = armPts(shp[0], shp[1], aAng, 18, 17, aBend);
        const hand = fa[2];
        const dx = Math.cos(stAng), dy = Math.sin(stAng);
        const pt = d => [hand[0] + dx * d, hand[1] + dy * d];
        limb(c, [pt(-20), pt(46)], 4, '#e8dcff');
        oval(c, shp[0], shp[1], 16, 12, arL, true, -0.25);
        oval(c, shp[0] + 1, shp[1] - 1, 4, 4, rose);
        limb(c, fa, 15, arD);
        oval(c, hand[0], hand[1], 8.5, 8.5, ar);
        const orb = pt(52);
        glow(c, orb[0], orb[1], 7 + (p.cast >= 0 ? 6 * Math.sin(p.cast * Math.PI) : Math.sin(p.t * 5) * 0.8), A);
    }

    /* ===== MUETA — xạ thủ tia tử quang, giáp nhẹ và pháo tay năng lượng ===== */
    function spriteMueta(c, p) {
        const A = p.accent, skin = '#c9e8ed', dark = '#263d55', armor = '#355c78';
        const B = -p.bob, w = p.walk;
        // áo choàng ngắn sau lưng
        shape(c, [[-12,-76+B],[-29,-68+B],[-39,-28],[-20,-35],[-8,-48]], '#18354b');
        // chân có giáp và giày
        [[-10,w],[11,-w]].forEach(([hx,sw]) => {
            const lp = legPts(hx,-30,sw,p.air);
            limb(c,lp,11,dark); oval(c,lp[2][0]+5,lp[2][1]-1,10,5,'#8db9c9');
        });
        // thân giáp
        shape(c,[[-22,-75+B],[20,-75+B],[17,-43+B],[10,-31+B],[-12,-31+B],[-20,-45+B]],armor);
        shape(c,[[-13,-69+B],[0,-72+B],[0,-39+B],[-11,-42+B]],'#6d9eb4',false);
        glow(c,0,-57+B,5,A);
        // tay sau
        const back=armPts(-18,-66+B,1.6,17,13,0.5); limb(c,back,9,skin); oval(c,back[2][0],back[2][1],7,7,dark);
        // đầu, tóc và kính ngắm
        oval(c,2,-91+B,17,17,skin);
        shape(c,[[-14,-96+B],[-8,-111+B],[8,-108+B],[20,-96+B],[12,-101+B],[-4,-99+B]],'#15263c');
        ctxSafeMueta(c,A);
        // tay pháo
        const arm=armPts(19,-65+B,p.cast>=0?-0.12:0.15,20,20,0.05);
        limb(c,arm,11,skin); oval(c,arm[2][0],arm[2][1],9,8,dark);
        shape(c,[[arm[2][0]-2,arm[2][1]-5],[arm[2][0]+24,arm[2][1]-4],[arm[2][0]+30,arm[2][1]],[arm[2][0]+24,arm[2][1]+5],[arm[2][0]-2,arm[2][1]+5]],'#70dce8');
        if (p.cast>=0) glow(c,arm[2][0]+28,arm[2][1],8+5*Math.sin(p.cast*Math.PI),A);
    }
    function ctxSafeMueta(c,A) {
        c.save(); c.shadowColor=A; c.shadowBlur=10;
        oval(c,7,-92,5,2.5,A,false); c.restore();
    }

    function spriteMusashi(c,p){ const A='#f5d98b', B=-p.bob; shape(c,[[-19,-76+B],[18,-76+B],[15,-34+B],[-14,-34+B]],'#28384c'); oval(c,0,-91+B,17,17,'#f0d7bd'); shape(c,[[-17,-96+B],[-8,-113+B],[9,-108+B],[19,-94+B],[4,-101+B]],'#20243a'); const arm=armPts(15,-65+B,p.atk>=0?-0.4:0.25,18,20,0); limb(c,arm,8,'#e8d9bd'); shape(c,[[arm[2][0],arm[2][1]-3],[arm[2][0]+39,arm[2][1]-1],[arm[2][0]+43,arm[2][1]+2],[arm[2][0],arm[2][1]+4]],A); glow(c,0,-55+B,4,p.accent); }
    function spriteKatex(c,p){ const B=-p.bob; shape(c,[[-21,-77+B],[20,-77+B],[17,-32+B],[-17,-32+B]],'#8d4d36'); oval(c,0,-94+B,17,17,'#c98d68'); shape(c,[[-18,-99+B],[-12,-115+B],[8,-112+B],[19,-96+B],[5,-102+B]],'#312536'); const a=armPts(18,-65+B,p.atk>=0?-0.35:0.1,18,22,0); limb(c,a,9,'#d6ad83'); shape(c,[[a[2][0],a[2][1]-4],[a[2][0]+56,a[2][1]-2],[a[2][0]+61,a[2][1]+1],[a[2][0],a[2][1]+4]],'#e7d19b'); shape(c,[[-23,-68+B],[-40,-52+B],[-29,-38+B],[-13,-55+B]],'#c17a48'); glow(c,-5,-56+B,4,p.accent); }
    const SPRITES = { vex: spriteVex, aura: spriteAura, nyx: spriteNyx, mueta: spriteMueta, musashi:spriteMusashi, katex:spriteKatex, locke:spriteLocke };
    function spriteLocke(c,p){const B=-p.bob;shape(c,[[-22,-78+B],[22,-78+B],[17,-32+B],[-18,-32+B]],'#26324b');oval(c,0,-94+B,17,17,'#d6c2b2');shape(c,[[-18,-100+B],[-12,-116+B],[12,-110+B],[20,-94+B],[3,-103+B]],'#171e32');const a=armPts(18,-65+B,p.atk>=0?-.35:.1,20,24,0);limb(c,a,10,'#b9c6d8');shape(c,[[a[2][0],a[2][1]-5],[a[2][0]+43,a[2][1]-2],[a[2][0]+47,a[2][1]+3],[a[2][0],a[2][1]+5]],'#70d9d0');glow(c,-2,-55+B,5,p.accent);}

    function drawFighter(f) {
        const { x, y, w, h } = f;
        const col = SIDE_COLOR[f.side];
        const flash = f.hitT > 0 && Math.floor(f.hitT * 40) % 2 === 0;

        // bóng
        const air = Math.min(1, (GROUND - y) / 160);
        ctx.fillStyle = 'rgba(0,0,0,' + (0.35 - air * 0.2) + ')';
        ctx.beginPath();
        ctx.ellipse(x, GROUND + 5, 28 * (1 - air * 0.4), 7, 0, 0, Math.PI * 2);
        ctx.fill();

        // vòng màu đội dưới chân
        ctx.save();
        ctx.strokeStyle = SIDE_COLOR[f.side];
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(x, GROUND + 5, 36 * (f.w / 56) * (1 - air * 0.4), 8 * (1 - air * 0.3), 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // vệt ảnh khi lướt
        if (f.dashT > 0 && cfg.graphics !== 'low') {
            const sgn = Math.sign(f.vx) || f.face;
            for (let n = 3; n >= 1; n--) {
                ctx.save();
                ctx.globalAlpha = 0.13 * (4 - n);
                drawHeroSprite(ctx, f.hero.id, x - sgn * n * 16, y, f.face, poseOf(f));
                ctx.restore();
            }
        }

        ctx.save();
        if (f.dashT > 0) ctx.globalAlpha = 0.5;

        // nhân vật vẽ vector (xem mục 11A)
        if (flash) ctx.filter = 'brightness(2.4)';
        drawHeroSprite(ctx, f.hero.id, x, y, f.face, poseOf(f));
        ctx.filter = 'none';
        ctx.restore();

        // VEX K: infernal familiar flares and leaves a fiery crescent during the rush.
        if (f.hero.id === 'vex' && (f.atkT > 0 && f.atkKind === 'skill' || f.dashT > 0)) {
            ctx.save();
            const pulse = .45 + .35 * Math.sin(performance.now() / 55);
            ctx.globalAlpha = f.dashT > 0 ? .72 : pulse;
            ctx.strokeStyle = '#ff8a3d'; ctx.lineWidth = f.dashT > 0 ? 8 : 4;
            ctx.shadowColor = '#ff5b32'; ctx.shadowBlur = 20;
            ctx.lineCap = 'round'; ctx.beginPath();
            const rr = f.dashT > 0 ? 62 : 38;
            if (f.face > 0) ctx.arc(x + 8, y - h * .62, rr, -.95, .8);
            else ctx.arc(x - 8, y - h * .62, rr, Math.PI - .8, Math.PI + .95);
            ctx.stroke();
            ctx.restore();
        }

        // đòn đánh
        if (f.atkT > 0 && ['atk','spin','triple','skill'].includes(f.atkKind)) {
            const a = Math.min(1, f.atkT / 0.16);
            ctx.save();
            ctx.globalAlpha = a;
            ctx.strokeStyle = f.hero.id==='musashi'?'#ffe7a0':f.hero.id==='katex'?'#e9c77a':'#fff';
            ctx.lineWidth = f.atkKind==='spin'?9:6;
            ctx.lineCap = 'round';
            ctx.beginPath();
            const r = f.hero.melee.range * (f.atkKind==='spin'?1.12:0.85);
            if (f.face > 0) ctx.arc(x + 10, y - h * 0.55, r, -0.9, 0.9);
            else ctx.arc(x - 10, y - h * 0.55, r, Math.PI - 0.9, Math.PI + 0.9);
            ctx.stroke();
            ctx.restore();
        }

        // Thanh tích lực riêng của MUETA.
        if (f.hero.id === 'mueta' && f.skillCharge > 0) {
            ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(x - 28, y - h - 15, 56, 5);
            ctx.fillStyle = '#70f4ff'; ctx.fillRect(x - 28, y - h - 15, 56 * f.skillCharge, 5);
        }
        // Trang bị đang mang
        if (f.glove > 0) { ctx.fillStyle = '#ff7d9b'; ctx.font = '900 13px Inter'; ctx.textAlign = 'center'; ctx.fillText('✊ BOXING', x, y - h - 18); }
        if (f.rocket > 0) { ctx.fillStyle = '#ffcf66'; ctx.font = '900 13px Inter'; ctx.textAlign = 'center'; ctx.fillText('➤ ROCKET', x, y - h - 34); }
        // khiên
        if (f.shield > 0) {
            ctx.save();
            ctx.globalAlpha = f.shield < 1.5 && Math.floor(f.shield * 8) % 2 ? 0.3 : 0.8;
            ctx.strokeStyle = '#7fb4ff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(x, y - h / 2, w * 0.9, h * 0.66, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        // tăng tốc
        if (f.boost > 0) {
            ctx.strokeStyle = 'rgba(255,207,102,.7)';
            ctx.lineWidth = 3;
            for (let i = 0; i < 3; i++) {
                const yy = y - 20 - i * 24;
                ctx.beginPath();
                ctx.moveTo(x - f.face * 34, yy);
                ctx.lineTo(x - f.face * (54 + i * 6), yy);
                ctx.stroke();
            }
        }

        // quá tải: tia điện tím
        if (f.ovLock > 0) {
            ctx.strokeStyle = PURPLE;
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                let px = x - w / 2 - 6 + Math.random() * (w + 12);
                let py = y - h - 4;
                ctx.moveTo(px, py);
                for (let k = 0; k < 4; k++) {
                    px += (Math.random() - 0.5) * 18;
                    py += h / 4 + 4;
                    ctx.lineTo(px, py);
                }
                ctx.stroke();
            }
            ctx.fillStyle = PURPLE;
            ctx.font = '800 15px Inter, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('OVERLOAD', x, y - f.hero.visH - 8);
        }

        // mũi tên màu đội trên đầu
        if (f.ovLock <= 0 && !f.glove && !f.rocket && !(f.hero.id === 'mueta' && f.skillCharge > 0)) {
            const my = y - f.hero.visH - 12 + Math.sin(performance.now() / 220) * 2;
            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.moveTo(x - 6, my - 8);
            ctx.lineTo(x + 6, my - 8);
            ctx.lineTo(x, my);
            ctx.closePath();
            ctx.fill();
        }
    }

    function drawProjectiles() {
        projectiles.forEach(p => {
            const col = p.color || SIDE_COLOR[p.owner.side];
            ctx.save();
            ctx.shadowColor = col;
            ctx.shadowBlur = 18;
            ctx.fillStyle = col;
            if (p.beam) {
                ctx.fillRect(p.x - Math.sign(p.vx) * 36, p.y - p.size * 0.55, 72, p.size * 1.1);
                ctx.fillStyle = '#fff'; ctx.fillRect(p.x - Math.sign(p.vx) * 32, p.y - 2, 64, 4);
            }
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });
    }

    function drawItems() {
        items.forEach(it => {
            const t = ITEM_TYPES[it.type];
            const y = GROUND - 30 + Math.sin(it.phase) * 5;
            ctx.save();
            if (it.life < 2 && Math.floor(it.life * 6) % 2) ctx.globalAlpha = 0.35;
            ctx.shadowColor = t.color;
            ctx.shadowBlur = 16;
            ctx.fillStyle = '#121927';
            ctx.strokeStyle = t.color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(it.x, y, 19, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.fillStyle = t.color;
            ctx.font = '900 22px Inter, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(t.label, it.x, y + 8);
            ctx.restore();
        });
    }

    function drawFx() {
        particles.forEach(p => {
            ctx.globalAlpha = Math.max(0, p.life / p.max);
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        ctx.globalAlpha = 1;
        floaters.forEach(f => {
            ctx.globalAlpha = Math.min(1, f.t * 2);
            ctx.fillStyle = f.color;
            ctx.font = '900 24px "Barlow Condensed", Impact, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(f.text, f.x, f.y);
        });
        ctx.globalAlpha = 1;
    }

    function drawBar(x, y, w, h, ratio, color, rightAlign) {
        ctx.fillStyle = '#273247';
        rr(x, y, w, h, h / 2);
        ctx.fill();
        const fw = Math.max(0, w * Math.max(0, Math.min(1, ratio)));
        if (fw > 0) {
            ctx.fillStyle = color;
            rr(rightAlign ? x + w - fw : x, y, fw, h, h / 2);
            ctx.fill();
        }
    }

    // Huy hiệu mặt hero cạnh thanh máu (HUD)
    function drawBadge(f, bx, by) {
        const s = 56, col = SIDE_COLOR[f.side];
        ctx.save();
        rr(bx, by, s, s, 10);
        ctx.fillStyle = '#0d1424';
        ctx.fill();
        ctx.clip();
        const rg = ctx.createRadialGradient(bx + s / 2, by + s * 0.55, 2, bx + s / 2, by + s * 0.55, s * 0.75);
        rg.addColorStop(0, col + '55');
        rg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = rg;
        ctx.fillRect(bx, by, s, s);
        ctx.translate(bx + s / 2, by + s + 14);
        ctx.scale(0.58, 0.58);
        drawHeroSprite(ctx, f.hero.id, 0, 0, f.side === 0 ? 1 : -1,
            demoPose(performance.now() / 1000 + f.side, f.side, false));
        ctx.restore();
        rr(bx, by, s, s, 10);
        ctx.lineWidth = 2;
        ctx.strokeStyle = col;
        ctx.stroke();
    }

    // Menu chính: 3 hero đứng trên đấu trường, thay phiên đánh / bắn skill
    function drawShowcase(t) {
        const ids = ['vex', 'aura', 'nyx', 'mueta'];
        const xs = [500, 640, 780, 905];
        const cols = [SIDE_COLOR[0], PURPLE, SIDE_COLOR[1], '#70f4ff'];
        ids.forEach((id, i) => {
            const cyc = (t + i * 1.1) % 3.6;
            const p = {
                t: t + i, walk: 0, bob: Math.sin(t * 2.6 + i) * 1.4, air: false,
                atk: cyc < 0.5 ? cyc / 0.5 : -1,
                cast: cyc > 1.9 && cyc < 2.4 ? (cyc - 1.9) / 0.5 : -1,
                hit: 0, dash: false, lock: false, accent: cols[i]
            };
            ctx.save();
            ctx.translate(xs[i], 474);
            ctx.scale(1.3, 1.3);
            ctx.fillStyle = 'rgba(0,0,0,.4)';
            ctx.beginPath();
            ctx.ellipse(0, 4, 46, 8, 0, 0, TAU);
            ctx.fill();
            drawHeroSprite(ctx, id, 0, 0, -1, p);
            ctx.restore();
        });
    }

    function drawHUD() {
        const bw = 306, left = 92, right = W - 92 - bw;
        drawBadge(p1, 28, 14);
        drawBadge(p2, W - 28 - 56, 14);
        [[p1, left, false], [p2, right, true]].forEach(([f, x, ra]) => {
            const col = SIDE_COLOR[f.side];
            const name = f.hero.name + (f.side === 0 ? '  · P1' : (cfg.mode === 'bot' ? '  · BOT LV' + cfg.diff : '  · P2'));
            ctx.fillStyle = col;
            ctx.font = '900 22px "Barlow Condensed", Impact, sans-serif';
            ctx.textAlign = ra ? 'right' : 'left';
            ctx.fillText(name, ra ? x + bw : x, 28);

            drawBar(x, 36, bw, 16, f.hp / f.maxhp, f.hp / f.maxhp > 0.3 ? col : '#ff6b6b', ra);

            const ovCol = f.ovLock > 0 ? (Math.floor(performance.now() / 120) % 2 ? '#ff6b6b' : PURPLE)
                : f.ov >= 85 ? '#ff6b6b' : f.ov >= 60 ? '#ffb366' : PURPLE;
            drawBar(x, 58, bw, 8, f.ov / 100, ovCol, ra);
            ctx.fillStyle = 'rgba(255,255,255,.55)';
            ctx.font = '700 10px Inter, Arial, sans-serif';
            ctx.fillText('OVERLOAD · CHỈ TĂNG KHI DÙNG SKILL', ra ? x + bw : x, 80);
            if(f.hero.id==='musashi'){ drawBar(x,84,bw,5,f.holy/100,'#ffe7a0',ra); ctx.fillStyle='#ffe7a0';ctx.font='700 9px Inter,Arial';ctx.fillText('THÁNH KIẾM · '+(f.weapon==='katana'?'KATANA':'NODACHI'),ra?x+bw:x,103); }

            // chấm thắng hiệp
            for (let i = 0; i < ROUNDS_TO_WIN; i++) {
                const cx = ra ? x + 8 + i * 18 : x + bw - 8 - i * 18;
                ctx.beginPath();
                ctx.arc(cx, 94, 6, 0, Math.PI * 2);
                ctx.fillStyle = i < f.wins ? col : 'rgba(255,255,255,.15)';
                ctx.fill();
            }
        });

        // đồng hồ
        ctx.fillStyle = '#fff';
        ctx.font = '900 44px "Barlow Condensed", Impact, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(Math.ceil(timer), W / 2, 52);
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.font = '700 11px Inter, Arial, sans-serif';
        ctx.fillText('HIỆP ' + Math.min(round, 3), W / 2, 70);
        ctx.font = '800 12px Inter, Arial, sans-serif';
        ctx.fillStyle = '#70f4ff';
        ctx.fillText('EVENT: ' + (arenaEvent.name || 'ARENA'), W / 2, 91);
    }

    function drawCenterText(text, size, color) {
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = '900 ' + size + 'px "Barlow Condensed", Impact, sans-serif';
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'rgba(0,0,0,.6)';
        ctx.strokeText(text, W / 2, H / 2 - 20);
        ctx.fillStyle = color;
        ctx.fillText(text, W / 2, H / 2 - 20);
        ctx.restore();
    }

    function draw() {
        ctx.save();
        ctx.clearRect(0, 0, W, H);
        if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);

        drawArena();
        if (state === 'menu' && scr === 'main') drawShowcase(performance.now() / 1000);

        if (p1 && state !== 'menu') {
            drawItems();
            drawFighter(p1);
            drawFighter(p2);
            drawProjectiles();
            drawFx();
        }
        ctx.restore();

        if (p1 && state !== 'menu') {
            drawHUD();
            if (state === 'countdown') {
                const n = Math.ceil(stateT - 0.2);
                if (n >= 1) drawCenterText(String(n), 120, '#63e5dc');
            }
            if (banner.t > 0) drawCenterText(banner.text, 96, '#fff');
        }
    }

    /* ---------------------------------------------------------
       12. GIAO DIỆN: MENU CHÍNH · CHỌN NHÂN VẬT · TẠM DỪNG · KẾT QUẢ
       Mọi màn hình dựng trong khung logic 960×540 rồi được scale vừa
       khung game → luôn nằm gọn trong màn hình, không phải cuộn.
    --------------------------------------------------------- */
    function hideOverlay() { overlay.hidden = true; overlay.innerHTML = ''; }

    function focusFirst(sel) {
        const el = overlay.querySelector(sel);
        if (el) el.focus({ preventScroll: true });
    }

    const STAT_LABELS = [['pow', 'SỨC MẠNH'], ['def', 'PHÒNG THỦ'], ['spd', 'TỐC ĐỘ'], ['rng', 'TẦM XA']];

    function statBars(h) {
        return '<div class="dm-stats">' + STAT_LABELS.map(([k, label]) =>
            '<div class="dm-stat"><span>' + label + '</span><i><b style="width:' + (h.stats[k] * 20) + '%"></b></i></div>'
        ).join('') + '</div>';
    }

    function sidePanel(slot, side, label) {
        const hero = HEROES[cfg[slot]];
        const thumbs = Object.values(HEROES).map(h =>
            '<button class="dm-th' + (h.id === hero.id ? ' on' : '') + '" data-pick="' + slot +
            '" data-hero="' + h.id + '">' +
            '<canvas data-hero="' + h.id + '" data-side="' + side + '" width="96" height="96"></canvas>' +
            '<b>' + h.name + (h.id==='locke' && !isLockeUnlocked()?' 🔒':'') + '</b></button>'
        ).join('');

        return '<div class="dm-side" style="--c:' + SIDE_COLOR[side] + '">' +
            '<div class="dm-tag">' + label + '</div>' +
            '<canvas class="dm-pv" data-hero="' + hero.id + '" data-side="' + side +
            '" data-big="1" width="480" height="300"></canvas>' +
            '<div class="dm-name">' + hero.name + '</div>' +
            '<div class="dm-sub">' + hero.title + ' · ' + hero.style + '</div>' + (hero.id==='musashi'?'<div class="dm-sub" style="color:#ffe7a0">THÁNH KIẾM · KATANA / NODACHI NGẪU NHIÊN</div>':hero.id==='katex'?'<div class="dm-sub" style="color:#e9c77a">THƯƠNG CỔ · KIẾM GẮN TAY</div>':'') +
            statBars(hero) +
            '<div class="dm-thumbs" style="--n:' + Object.keys(HEROES).length + '">' + thumbs + '</div>' +
            '</div>';
    }

    // Preview nhân vật (động) trên các canvas của màn chọn
    function paintPortraits() {
        const t = performance.now() / 1000;
        overlay.querySelectorAll('canvas[data-hero]').forEach(cv => {
            const g = cv.getContext('2d');
            const side = +cv.dataset.side;
            const big = !!cv.dataset.big;
            const hero = HEROES[cv.dataset.hero];
            const col = SIDE_COLOR[side];
            const k = (cv.height - (big ? 40 : 26)) / MAX_VIS;
            const gy = cv.height - (big ? 20 : 12);
            const sx = hero.w / 56;

            g.clearRect(0, 0, cv.width, cv.height);

            const rg = g.createRadialGradient(cv.width / 2, gy - 45 * k, 4, cv.width / 2, gy - 45 * k, cv.width * 0.5);
            rg.addColorStop(0, col + '40');
            rg.addColorStop(1, 'rgba(0,0,0,0)');
            g.fillStyle = rg;
            g.fillRect(0, 0, cv.width, cv.height);

            // bục đứng
            g.fillStyle = 'rgba(0,0,0,.45)';
            g.beginPath();
            g.ellipse(cv.width / 2, gy + 3, 46 * k * sx, 8 * k, 0, 0, TAU);
            g.fill();
            g.strokeStyle = col + '99';
            g.lineWidth = big ? 2 : 1.5;
            g.beginPath();
            g.ellipse(cv.width / 2, gy + 3, 58 * k * sx, 11 * k, 0, 0, TAU);
            g.stroke();

            g.save();
            g.translate(cv.width / 2, gy);
            g.scale(k, k);
            drawHeroSprite(g, hero.id, 0, 0, side === 0 ? 1 : -1, demoPose(t + side * 0.9, side, big));
            g.restore();
        });
    }

    /* ----- thanh trượt độ khó ----- */
    const DIFF_NAMES = ['', 'TẬP SỰ', 'TẬP SỰ', 'DỄ', 'DỄ', 'THƯỜNG', 'THƯỜNG', 'KHÓ', 'KHÓ', 'ÁC MỘNG', 'ÁC MỘNG'];
    const DIFF_COLORS = ['', '#63e5dc', '#63e5dc', '#7dffa4', '#7dffa4', '#ffcf66', '#ffcf66', '#ff9867', '#ff9867', '#ff6b6b', '#ff6b6b'];
    const DIFF_HINTS = {
        'TẬP SỰ': 'Bot chậm, hay tự gây Quá tải',
        'DỄ': 'Phản xạ chậm, ít né đạn',
        'THƯỜNG': 'Cân bằng, biết đổi chiêu',
        'KHÓ': 'Nhặt vật phẩm, né đạn, phản đòn',
        'ÁC MỘNG': 'Phản xạ cực nhanh, đánh mạnh hơn'
    };

    function diffStyle(v) { return '--p:' + ((v - 1) / 9 * 100) + '%;--dc:' + DIFF_COLORS[v]; }
    function diffLabel(v) {
        return '<b>LV ' + v + ' · ' + DIFF_NAMES[v] + '</b><small>' + DIFF_HINTS[DIFF_NAMES[v]] + '</small>';
    }

    function diffHTML() {
        const v = cfg.diff;
        return '<div class="dm-diff" id="diffBox" style="' + diffStyle(v) + '">' +
            '<span class="dm-diff-l">ĐỘ KHÓ BOT</span>' +
            '<input id="diffRange" type="range" min="1" max="10" step="1" value="' + v + '" aria-label="Độ khó của bot">' +
            '<span class="dm-diff-v" id="diffVal">' + diffLabel(v) + '</span></div>';
    }

    function keysHTML() {
        return '<div class="dm-keys">' +
            '<span><b style="color:' + SIDE_COLOR[0] + '">P1</b><kbd>A</kbd><kbd>D</kbd> di chuyển · <kbd>W</kbd> nhảy · <kbd>J</kbd> đánh · <kbd>K</kbd> skill · <kbd>L</kbd> lướt</span>' +
            '<span><b style="color:' + SIDE_COLOR[1] + '">P2</b><kbd>←</kbd><kbd>→</kbd> di chuyển · <kbd>↑</kbd> nhảy · <kbd>,</kbd> đánh · <kbd>.</kbd> skill · <kbd>/</kbd> lướt</span>' +
            '</div>';
    }

    /* ----- các màn hình ----- */
    function showMain() {
        state = 'menu';
        scr = 'main';
        overlay.innerHTML =
            '<div class="dm-screen dm-main">' +
            '<div class="dm-eyebrow">Independent Game Project · 1v1 Arena Fighter</div>' +
            '<h1 class="dm-title">NO NAME<br><span>ARENA</span></h1>' +
            '<nav class="dm-menu">' +
            '<button class="dm-mbtn" data-go="bot" data-nav><b>PLAY</b><small>Chơi đơn · đấu với BOT, chỉnh độ khó</small></button>' +
            '<button class="dm-mbtn" data-go="2p" data-nav><b>MULTIPLAYER</b><small>P1 vs P2 · hai người cùng một máy</small></button>' +
            '<button class="dm-mbtn" data-act="options" data-nav><b>OPTIONS</b><small>Âm thanh · đồ họa</small></button>' +
            '<button class="dm-mbtn exit" data-act="exit" data-nav><b>EXIT</b><small>Thoát về trang web</small></button>' +
            '</nav>' +
            '<div class="dm-foot">↑ ↓ + Enter hoặc click để chọn · Bản demo prototype</div>' +
            '</div>';
        overlay.hidden = false;
        focusFirst('[data-nav]');
    }

    function showSplash() {
        state = 'splash'; scr = 'splash'; splashT = 3;
        overlay.innerHTML = '<div class="dm-screen dm-splash" data-act="skip"><h1>NO NAME<br><span>ARENA</span></h1><i></i><p>PREPARE FOR THE FIGHT</p><small>Đang khởi tạo đấu trường… · bấm để bỏ qua</small></div>';
        overlay.hidden = false;
    }

    function showOptions() {
        state = 'menu'; scr = 'options';
        overlay.innerHTML =
            '<div class="dm-screen dm-opt"><div class="dm-card">' +
            '<div class="dm-eyebrow">Game settings</div><h2>OPTIONS</h2>' +
            '<div class="dm-row"><span>ÂM THANH</span><button class="dm-btn dm-sm" data-act="sound" data-nav>' + (muted ? '🔇 ĐANG TẮT' : '🔊 ĐANG BẬT') + '</button></div>' +
            '<div class="dm-row"><span>ĐỒ HỌA</span><div class="dm-seg">' +
            ['low', 'medium', 'high'].map(v => '<button class="dm-btn dm-sm' + (cfg.graphics === v ? ' sel' : '') + '" data-graphics="' + v + '" data-nav>' + ({ low: 'THẤP', medium: 'VỪA', high: 'CAO' }[v]) + '</button>').join('') + '</div></div>' +
            '<button class="dm-btn pri" data-act="back" data-nav>← QUAY LẠI</button>' +
            '</div></div>';
        overlay.hidden = false;
        focusFirst('[data-act="back"]');
    }

    function showSelect(mode) {
        cfg.mode = mode;
        if (!isLockeUnlocked()) { if (cfg.p1 === 'locke') cfg.p1 = 'vex'; if (cfg.p2 === 'locke') cfg.p2 = 'nyx'; }
        state = 'menu';
        scr = 'select';
        const bot = mode === 'bot';
        overlay.innerHTML =
            '<div class="dm-screen dm-sel">' +
            '<div class="dm-bar">' +
            '<button class="dm-btn dm-sm" data-act="back">← QUAY LẠI</button>' +
            '<h2>' + (bot ? 'PLAY' : 'MULTIPLAYER') + ' <span>· CHỌN NHÂN VẬT</span></h2>' +
            '</div>' +
            '<div class="dm-grid">' +
            sidePanel('p1', 0, bot ? 'NGƯỜI CHƠI' : 'P1') +
            '<div class="dm-mid"><div class="dm-vs">VS</div>' +
            '<button class="dm-btn pri dm-start" data-act="start" data-nav>▶ BẮT ĐẦU</button></div>' +
            sidePanel('p2', 1, bot ? 'BOT' : 'P2') +
            '</div>' +
            '<div class="dm-bot">' + (bot ? diffHTML() : keysHTML()) + '</div>' + '<div style="display:flex;justify-content:center;gap:8px;align-items:center;color:var(--muted);font-size:11px">MAP <select id="mapSelect" style="background:#121927;color:#fff;border:1px solid #293449;border-radius:7px;padding:6px">' + Object.keys(MAPS).map(k=>'<option value="'+k+'" '+(cfg.map===k?'selected':'')+'>'+MAPS[k].name+'</option>').join('') + '</select></div>' +
            '</div>';
        overlay.hidden = false;
        paintPortraits();
        focusFirst('[data-act="start"]');
    }

    function showPause() {
        overlay.innerHTML =
            '<div class="dm-screen dm-pm"><div class="dm-card">' +
            '<h2>TẠM DỪNG</h2>' +
            '<button class="dm-btn pri" data-act="resume" data-nav>TIẾP TỤC</button>' +
            '<button class="dm-btn" data-act="rematch" data-nav>CHƠI LẠI TRẬN</button>' +
            '<button class="dm-btn" data-act="chars" data-nav>ĐỔI NHÂN VẬT</button>' +
            '<button class="dm-btn" data-act="menu" data-nav>MENU CHÍNH</button>' +
            '</div></div>';
        overlay.hidden = false;
        focusFirst('[data-nav]');
    }

    function showMatchEnd() {
        state = 'matchEnd';
        const w = p1.wins > p2.wins ? p1 : p2;
        const who = w.side === 0 ? (cfg.mode === 'bot' ? 'BẠN' : 'P1') : (cfg.mode === 'bot' ? 'BOT' : 'P2');
        overlay.innerHTML =
            '<div class="dm-screen dm-pm"><div class="dm-card">' +
            '<div class="dm-eyebrow">Kết quả trận đấu</div>' +
            '<h2 style="color:' + SIDE_COLOR[w.side] + '">' + who + ' THẮNG</h2>' +
            '<p>' + w.hero.name + ' · tỉ số ' + p1.wins + ' – ' + p2.wins +
            (cfg.mode === 'bot' ? ' · Bot LV ' + cfg.diff : '') + '</p>' +
            '<button class="dm-btn pri" data-act="rematch" data-nav>ĐẤU LẠI</button>' +
            '<button class="dm-btn" data-act="chars" data-nav>ĐỔI NHÂN VẬT</button>' +
            '<button class="dm-btn" data-act="menu" data-nav>MENU CHÍNH</button>' +
            '</div></div>';
        overlay.hidden = false;
        focusFirst('[data-nav]');
    }

    overlay.addEventListener('click', e => {
        const el = e.target.closest('[data-act],[data-pick],[data-go],[data-graphics]');
        if (!el) return;
        if (el.dataset.graphics) { cfg.graphics = el.dataset.graphics; showOptions(); return; }
        if (el.dataset.go) { showSelect(el.dataset.go); return; }
        if (el.dataset.pick) { if(el.dataset.hero==='locke' && !isLockeUnlocked()){ floatText(W/2,160,'LOCKE · EVENT ONLY','#ff9867'); return; } cfg[el.dataset.pick] = el.dataset.hero; showSelect(cfg.mode); return; }
        switch (el.dataset.act) {
            case 'start':
            case 'rematch': startMatch(); break;
            case 'back':
            case 'menu': showMain(); break;
            case 'chars': showSelect(cfg.mode); break;
            case 'resume': resume(); break;
            case 'exit': closeDemo(); break;
            case 'options': showOptions(); break;
            case 'sound': toggleMute(); showOptions(); break;
            case 'skip': showMain(); break;
        }
    });

    overlay.addEventListener('change', e => { if(e.target.id==='mapSelect') cfg.map=e.target.value; });
    overlay.addEventListener('input', e => {
        if (e.target.id !== 'diffRange') return;
        const v = +e.target.value;
        cfg.diff = v;
        document.getElementById('diffBox').setAttribute('style', diffStyle(v));
        document.getElementById('diffVal').innerHTML = diffLabel(v);
    });


    /* ---------------------------------------------------------
       13. ĐIỀU KHIỂN, MỞ / ĐÓNG DEMO
    --------------------------------------------------------- */
    const stage = canvas.parentElement;
    const fullBtn = document.getElementById('demoFull');
    const inMatch = () => state === 'countdown' || state === 'fight' || state === 'roundEnd';

    // Scale khung UI 960×540 cho vừa khung game (mọi cỡ màn hình)
    function fitUI() {
        const w = stage.clientWidth;
        if (w) overlay.style.transform = 'scale(' + (w / 960) + ')';
    }
    if (window.ResizeObserver) new ResizeObserver(fitUI).observe(stage);
    window.addEventListener('resize', fitUI);

    function pause() {
        if (inMatch()) {
            prevState = state;
            state = 'paused';
            keys.clear();
            showPause();
        }
    }

    function resume() {
        if (state === 'paused') { state = prevState; hideOverlay(); }
    }

    function toggleMute() {
        muted = !muted;
        if (muteBtn) muteBtn.textContent = muted ? '🔇 TẮT ÂM' : '🔊 ÂM THANH';
    }

    function toggleFullscreen() {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (modal.requestFullscreen) modal.requestFullscreen().catch(() => {});
    }

    document.addEventListener('fullscreenchange', () => {
        if (fullBtn) fullBtn.textContent = document.fullscreenElement ? '⛶ THOÁT TOÀN MÀN HÌNH' : '⛶ TOÀN MÀN HÌNH';
        fitUI();
    });

    // Di chuyển focus giữa các nút menu bằng ↑ ↓
    function navFocus(delta) {
        const list = [...overlay.querySelectorAll('[data-nav]')];
        if (!list.length) return;
        const i = list.indexOf(document.activeElement);
        list[(i + delta + list.length) % list.length].focus({ preventScroll: true });
    }

    document.addEventListener('keydown', e => {
        if (modal.hidden) return;

        if (state === 'splash' && (e.code === 'Enter' || e.code === 'Space')) { e.preventDefault(); showMain(); return; }
        if (e.code === 'Escape') {
            if (document.fullscreenElement) return;          // trình duyệt tự thoát toàn màn hình
            if (inMatch()) pause();
            else if (state === 'paused') resume();
            else if (state === 'splash' || state === 'matchEnd' || scr === 'options') showMain();
            else if (scr === 'select') showMain();
            else closeDemo();
            return;
        }
        if (e.code === 'KeyP') { state === 'paused' ? resume() : pause(); return; }
        if (e.code === 'KeyM') { toggleMute(); return; }
        if (e.code === 'KeyF') { toggleFullscreen(); return; }

        if (!inMatch()) {
            const ae = document.activeElement;
            if (ae && ae.type === 'range') return;           // để thanh trượt tự xử lý phím mũi tên
            if (e.code === 'ArrowDown') { e.preventDefault(); navFocus(1); }
            if (e.code === 'ArrowUp') { e.preventDefault(); navFocus(-1); }
            return;
        }
        if (GAME_KEYS.has(e.code)) { e.preventDefault(); keys.add(e.code); }
    });

    document.addEventListener('keyup', e => keys.delete(e.code));
    window.addEventListener('blur', () => { keys.clear(); if (!modal.hidden) pause(); });

    // Nút cảm ứng (điện thoại / máy tính bảng) — điều khiển P1
    modal.querySelectorAll('[data-key]').forEach(btn => {
        const code = btn.dataset.key;
        const down = e => { e.preventDefault(); keys.add(code); btn.classList.add('on'); };
        const up = e => { e.preventDefault(); keys.delete(code); btn.classList.remove('on'); };
        btn.addEventListener('pointerdown', down);
        btn.addEventListener('pointerup', up);
        btn.addEventListener('pointerleave', up);
        btn.addEventListener('pointercancel', up);
    });

    let raf = 0;
    let last = 0;

    function frame(ts) {
        raf = requestAnimationFrame(frame);
        const dt = Math.min(0.033, (ts - last) / 1000 || 0);
        last = ts;
        update(dt);
        draw();
        if (state === 'menu' && !overlay.hidden) paintPortraits();
    }

    function openDemo() {
        modal.hidden = false;
        document.body.classList.add('demo-open');
        keys.clear();
        showSplash();
        fitUI();
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
    }

    function closeDemo() {
        if (document.fullscreenElement) document.exitFullscreen();
        modal.hidden = true;
        document.body.classList.remove('demo-open');
        cancelAnimationFrame(raf);
        keys.clear();
        state = 'menu';
        scr = 'main';
        if (location.hash === '#demo') history.replaceState(null, '', location.pathname + location.search);
    }

    document.querySelectorAll('.js-open-demo').forEach(b => b.addEventListener('click', openDemo));
    document.getElementById('demoClose').addEventListener('click', closeDemo);
    if (muteBtn) muteBtn.addEventListener('click', toggleMute);
    if (fullBtn) fullBtn.addEventListener('click', toggleFullscreen);

    // Link dạng  trang-web.html#demo  mở thẳng vào game
    window.addEventListener('hashchange', () => { if (location.hash === '#demo' && modal.hidden) openDemo(); });
    if (location.hash === '#demo') openDemo();
})();