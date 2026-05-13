/* =========================================
   POKÉHUB — app.js
   ========================================= */

/* ── DATA ── */
const POKEMON_DB = [
  { name:"Charizard",   emoji:"🔥", type:"Fire/Flying",   rarity:"Rare",   price:210, cond:"Mint",        stars:5, category:"tcg"     },
  { name:"Mewtwo",      emoji:"🔮", type:"Psychic",       rarity:"Ultra",  price:350, cond:"Near Mint",   stars:5, category:"tcg"     },
  { name:"Pikachu",     emoji:"⚡", type:"Electric",      rarity:"Common", price:15,  cond:"Lightly Played",stars:4, category:"tcg"  },
  { name:"Rayquaza",    emoji:"🐉", type:"Dragon/Flying", rarity:"Shiny",  price:120, cond:"Mint",        stars:5, category:"tcg"     },
  { name:"Snorlax",     emoji:"😴", type:"Normal",        rarity:"Rare",   price:55,  cond:"Good",        stars:3, category:"nearby"  },
  { name:"Gengar",      emoji:"👻", type:"Ghost/Poison",  rarity:"Rare",   price:80,  cond:"Near Mint",   stars:4, category:"tcg"     },
  { name:"Blastoise",   emoji:"🌊", type:"Water",         rarity:"Rare",   price:95,  cond:"Mint",        stars:4, category:"nearby"  },
  { name:"Eevee",       emoji:"🦊", type:"Normal",        rarity:"Common", price:20,  cond:"Good",        stars:3, category:"nearby"  },
];

const NEARBY_SPAWNS = [
  { name:"Dragonite",  emoji:"🐲", dist:"80m",   rarity:"rare"  },
  { name:"Lapras",     emoji:"🧊", dist:"120m",  rarity:"shiny" },
  { name:"Pikachu",    emoji:"⚡", dist:"45m",   rarity:"common"},
  { name:"Snorlax",    emoji:"😴", dist:"200m",  rarity:"rare"  },
  { name:"Mewtwo",     emoji:"🔮", dist:"350m",  rarity:"rare"  },
];

const RAIDS = [
  { name:"Zapdos",   stars:"⭐⭐⭐⭐⭐", time:"12m 10s" },
  { name:"Snorlax",  stars:"⭐⭐",       time:"8m 45s"  },
  { name:"Mewtwo",   stars:"⭐⭐⭐⭐⭐", time:"4m 30s"  },
  { name:"Articuno", stars:"⭐⭐⭐⭐",   time:"22m 00s" },
];

const EVENTS = [
  { icon:"🌟", name:"Community Day",    time:"Saturday 6:00 PM" },
  { icon:"🔦", name:"Spotlight Hour",   time:"Saturday 1:00 PM" },
  { icon:"🥚", name:"Hatch-a-thon",     time:"Sunday 10:00 AM"  },
  { icon:"🏆", name:"GO Battle League", time:"Ongoing"           },
];

const NOTIFICATIONS = [
  { icon:"⭐", title:"Wishlist Match!",       sub:"Dialga listed nearby for $80" },
  { icon:"⚔️", title:"Raid Starting Soon",   sub:"Mewtwo 5★ — 5 minutes left"   },
  { icon:"💰", title:"Price Drop Alert",      sub:"Charizard V dropped to $180"   },
  { icon:"💬", title:"New Message",           sub:"PokeTrader91: Is it available?" },
];

const TRADERS = [
  { name:"PokeTrader91", badge:"Verified", has:"Dialga"   },
  { name:"ShinyHunter",  badge:"Pro",      has:"Umbreon"  },
  { name:"CardMaster",   badge:"Trusted",  has:"Charizard"},
];

const CHAT_CONTACTS = [
  { name:"PokeTrader91", avatar:"🎮", preview:"Is the Rayquaza still available?" },
  { name:"ShinyHunter",  avatar:"✨", preview:"Would you take $700?"             },
];

const CARD_SCAN_RESULTS = [
  { name:"Charizard VMAX",   value:"$210 AUD", rarity:"Rare Holo", set:"Sword & Shield" },
  { name:"Pikachu V",        value:"$45 AUD",  rarity:"Ultra Rare", set:"Vivid Voltage"  },
  { name:"Mewtwo GX",        value:"$120 AUD", rarity:"GX Holo",    set:"Unbroken Bonds" },
  { name:"Rayquaza EX",      value:"$88 AUD",  rarity:"Ex Holo",    set:"Roaring Skies"  },
];

/* ── STATE ── */
let wishlist        = ["Dialga","Umbreon"];
let collection      = [];
let marketFilter    = "all";
let currentChat     = null;
let chatHistories   = { PokeTrader91: [
  { from:"them", text:"Is the Rayquaza still available?" },
  { from:"me",   text:"Yes, it's available!" },
], ShinyHunter: [
  { from:"them", text:"Would you take $700?" },
]};
let raidSeconds     = 900; // 15 min

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  renderNearby();
  renderMarket();
  renderRaids();
  renderEvents();
  renderWishlist();
  renderTraders();
  renderCollection();
  renderNotifs();
  renderChatList();
  startRaidTimer();
  setupNavLinks();
  setupHamburger();
});

/* ── NAVBAR ── */
function setupNavLinks() {
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
  document.getElementById("notifBtn").addEventListener("click", () => openModal("notifModal"));
  document.getElementById("msgBtn").addEventListener("click", () => openModal("msgModal"));
}
function setupHamburger() {
  const ham = document.getElementById("hamburger");
  const links = document.querySelector(".nav-links");
  ham.addEventListener("click", () => {
    const open = links.style.display === "flex";
    links.style.display = open ? "none" : "flex";
    links.style.flexDirection = "column";
    links.style.position = "absolute";
    links.style.top = "60px";
    links.style.left = "0"; links.style.right = "0";
    links.style.background = "var(--dark)";
    links.style.padding = "1rem 2rem";
    links.style.gap = ".8rem";
    links.style.zIndex = "99";
  });
}

/* ── SEARCH ── */
function runSearch() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const box = document.getElementById("searchResults");
  if (!q) { box.classList.add("hidden"); return; }
  const hits = POKEMON_DB.filter(p => p.name.toLowerCase().includes(q));
  const nearby = NEARBY_SPAWNS.filter(p => p.name.toLowerCase().includes(q));
  box.innerHTML = "";
  if (!hits.length && !nearby.length) {
    box.innerHTML = `<div class="search-result-item"><span class="result-emoji">😔</span><div class="result-info"><div class="result-name">No results for "${q}"</div></div></div>`;
  } else {
    [...hits, ...nearby].slice(0,6).forEach(item => {
      const div = document.createElement("div");
      div.className = "search-result-item";
      div.innerHTML = `<span class="result-emoji">${item.emoji}</span>
        <div class="result-info">
          <div class="result-name">${item.name}</div>
          <div class="result-meta">${item.type || item.rarity} ${item.price ? "· $"+item.price : item.dist ? "· "+item.dist : ""}</div>
        </div>`;
      box.appendChild(div);
    });
  }
  box.classList.remove("hidden");
}
document.addEventListener("click", e => {
  if (!e.target.closest(".search-bar") && !e.target.closest(".search-results"))
    document.getElementById("searchResults").classList.add("hidden");
});
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") runSearch();
});

/* ── NEARBY ── */
function renderNearby() {
  const list = document.getElementById("nearbyList");
  list.innerHTML = "";
  NEARBY_SPAWNS.forEach(p => {
    const li = document.createElement("li");
    li.className = "nearby-item";
    li.innerHTML = `
      <span class="nearby-emoji">${p.emoji}</span>
      <div class="nearby-info">
        <div class="nearby-name">${p.name}</div>
        <div class="nearby-dist">📍 ${p.dist} away</div>
      </div>
      <span class="nearby-badge ${p.rarity}">${p.rarity.toUpperCase()}</span>`;
    list.appendChild(li);
  });
}
function refreshNearby() {
  const list = document.getElementById("nearbyList");
  list.innerHTML = "";
  for (let i=0;i<3;i++) {
    const li = document.createElement("li");
    li.className = "nearby-item shimmer";
    list.appendChild(li);
  }
  setTimeout(() => { shuffleArray(NEARBY_SPAWNS); renderNearby(); }, 1000);
}
function setLocation() {
  const val = document.getElementById("locationInput").value.trim();
  if (!val) return;
  pushNotif("📍", "Location Updated", `Now showing results for: ${val}`);
  setTimeout(refreshNearby, 300);
}

/* ── MARKET ── */
function renderMarket() {
  const list = document.getElementById("marketList");
  list.innerHTML = "";
  const items = marketFilter === "all" ? POKEMON_DB : POKEMON_DB.filter(p => p.category === marketFilter);
  items.slice(0,5).forEach(item => {
    const div = document.createElement("div");
    div.className = "market-item";
    div.innerHTML = `
      <span class="market-img">${item.emoji}</span>
      <div class="market-info">
        <div class="market-name">${item.name}</div>
        <div class="market-cond">${item.cond} · ${item.type}</div>
        <div class="market-stars">${"⭐".repeat(item.stars)}</div>
      </div>
      <div class="market-price">$${item.price}</div>
      <button class="btn-msg" onclick="openChat('PokeTrader91')">Message</button>`;
    list.appendChild(div);
  });
}
function filterMarket(cat, btn) {
  marketFilter = cat;
  document.querySelectorAll(".filter-tabs .tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderMarket();
}

/* ── SCANNER ── */
function simulateScan() {
  const result = CARD_SCAN_RESULTS[Math.floor(Math.random() * CARD_SCAN_RESULTS.length)];
  const box = document.getElementById("scanResult");
  box.classList.remove("hidden");
  box.innerHTML = `
    <div style="font-weight:800;font-size:1.05rem;margin-bottom:.3rem">✅ ${result.name}</div>
    <div style="color:var(--yellow);font-size:1.1rem;font-weight:700">${result.value}</div>
    <div style="font-size:.82rem;color:var(--muted);margin-top:.3rem">${result.rarity} · ${result.set}</div>
    <button class="btn-primary sm" style="margin-top:.7rem" onclick="addToCollection('${result.name}','${result.value}')">+ Add to Collection</button>`;
}
function addToCollection(name, value) {
  if (!collection.find(c => c.name === name)) {
    collection.push({ name, value });
    renderCollection();
    pushNotif("📦", "Card Added!", `${name} added to your collection.`);
  }
}
function renderCollection() {
  const ul = document.getElementById("myCollection");
  ul.innerHTML = "";
  if (!collection.length) {
    ul.innerHTML = `<li style="color:var(--muted);font-size:.88rem">No cards yet. Scan one!</li>`;
    return;
  }
  collection.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `📦 <span>${c.name}</span><span style="color:var(--yellow);font-weight:700">${c.value}</span>`;
    ul.appendChild(li);
  });
}

/* ── RAIDS ── */
function renderRaids() {
  const ul = document.getElementById("raidList");
  ul.innerHTML = "";
  RAIDS.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <div class="raid-item-name">${r.name}</div>
        <div class="raid-item-stars">${r.stars}</div>
      </div>
      <span class="raid-item-time">⏱ ${r.time}</span>`;
    ul.appendChild(li);
  });
}
function joinRaid() {
  pushNotif("⚔️","Raid Joined!","You joined the Mewtwo 5★ raid. Good luck!");
  alert("⚔️ You've joined the raid! Finding players…");
}

/* ── EVENTS ── */
function renderEvents() {
  const ul = document.getElementById("eventList");
  ul.innerHTML = "";
  EVENTS.forEach(ev => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="event-icon">${ev.icon}</span>
      <div class="event-info">
        <div class="event-name">${ev.name}</div>
        <div class="event-time">${ev.time}</div>
      </div>`;
    ul.appendChild(li);
  });
}

/* ── MATCHMAKING ── */
function findPlayers() {
  const poke = document.getElementById("raidPokemon").value.trim() || "Unknown";
  const box = document.getElementById("matchResults");
  box.innerHTML = `<div style="color:var(--muted);font-size:.85rem">🔍 Searching…</div>`;
  setTimeout(() => {
    const players = ["TrainerAsh_99","MistyWater7","BrockRock42","CynthiaChamp"];
    box.innerHTML = "";
    players.slice(0, 3).forEach(p => {
      const div = document.createElement("div");
      div.className = "match-item";
      div.innerHTML = `🎮 <strong>${p}</strong> <span style="color:var(--muted);font-size:.78rem">Ready for ${poke}</span>
        <button class="btn-sm" onclick="pushNotif('🤝','Invite Sent!','Invited ${p} to your raid.')">Invite</button>`;
      box.appendChild(div);
    });
  }, 1200);
}

/* ── WISHLIST ── */
function renderWishlist() {
  const ul = document.getElementById("wishList");
  ul.innerHTML = "";
  if (!wishlist.length) {
    ul.innerHTML = `<li style="color:var(--muted);font-size:.88rem">Wishlist is empty.</li>`;
    return;
  }
  wishlist.forEach((w, i) => {
    const li = document.createElement("li");
    const emoji = POKEMON_DB.find(p => p.name === w)?.emoji || "⭐";
    li.innerHTML = `<span>${emoji} ${w}</span>
      <button class="wish-remove" onclick="removeWish(${i})">✕</button>`;
    ul.appendChild(li);
  });
}
function removeWish(i) {
  wishlist.splice(i, 1);
  renderWishlist();
}
function openAddWish() { openModal("wishModal"); }
function addWish() {
  const val = document.getElementById("wishInput").value.trim();
  if (val && !wishlist.includes(val)) {
    wishlist.push(val);
    renderWishlist();
    renderTraders();
    document.getElementById("wishInput").value = "";
    closeModal("wishModal");
    pushNotif("⭐","Wishlist Updated",`${val} added to your wishlist.`);
  }
}

/* ── TRADERS ── */
function renderTraders() {
  const ul = document.getElementById("traderList");
  ul.innerHTML = "";
  TRADERS.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <div class="trader-name">${t.name}</div>
        <div style="font-size:.78rem;color:var(--muted)">Has: ${t.has}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:.3rem;align-items:flex-end">
        <span class="trader-badge">${t.badge}</span>
        <button class="btn-sm" onclick="openChat('${t.name}')">Message</button>
      </div>`;
    ul.appendChild(li);
  });
}

/* ── RAID TIMER ── */
function startRaidTimer() {
  setInterval(() => {
    if (raidSeconds > 0) raidSeconds--;
    const m = String(Math.floor(raidSeconds / 60)).padStart(2,"0");
    const s = String(raidSeconds % 60).padStart(2,"0");
    document.getElementById("raidTimer").textContent = `${m}:${s}`;
    if (raidSeconds === 0) {
      document.getElementById("raidBanner").style.background = "#555";
      document.getElementById("raidName").textContent = "Raid Ended";
    }
  }, 1000);
}

/* ── NOTIFICATIONS ── */
let notifData = [...NOTIFICATIONS];
function renderNotifs() {
  const ul = document.getElementById("notifList");
  ul.innerHTML = "";
  notifData.forEach(n => {
    const li = document.createElement("li");
    li.className = "notif-item";
    li.innerHTML = `<span class="notif-icon">${n.icon}</span>
      <div class="notif-text">
        <div class="notif-title">${n.title}</div>
        <div class="notif-sub">${n.sub}</div>
      </div>`;
    ul.appendChild(li);
  });
}
function pushNotif(icon, title, sub) {
  notifData.unshift({ icon, title, sub });
  renderNotifs();
  const btn = document.getElementById("notifBtn");
  btn.style.transform = "scale(1.4)";
  setTimeout(() => btn.style.transform = "", 300);
}

/* ── CHAT / MESSAGES ── */
function renderChatList() {
  const list = document.getElementById("chatList");
  list.innerHTML = "";
  CHAT_CONTACTS.forEach(c => {
    const div = document.createElement("div");
    div.className = "chat-contact";
    div.innerHTML = `<span class="chat-avatar">${c.avatar}</span>
      <div>
        <div class="chat-uname">${c.name}</div>
        <div class="chat-preview">${c.preview}</div>
      </div>`;
    div.addEventListener("click", () => openChat(c.name));
    list.appendChild(div);
  });
}
function openChat(name) {
  currentChat = name;
  if (!chatHistories[name]) chatHistories[name] = [];
  renderMessages();
  if (!CHAT_CONTACTS.find(c => c.name === name)) {
    CHAT_CONTACTS.push({ name, avatar:"🎮", preview:"New conversation" });
    renderChatList();
  }
  openModal("msgModal");
}
function renderMessages() {
  const box = document.getElementById("chatMessages");
  box.innerHTML = "";
  if (!currentChat) return;
  (chatHistories[currentChat] || []).forEach(m => {
    const div = document.createElement("div");
    div.className = `msg-bubble ${m.from}`;
    div.textContent = m.text;
    box.appendChild(div);
  });
  box.scrollTop = box.scrollHeight;
}
function sendMsg() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text || !currentChat) return;
  if (!chatHistories[currentChat]) chatHistories[currentChat] = [];
  chatHistories[currentChat].push({ from:"me", text });
  input.value = "";
  renderMessages();
  // Simulate auto-reply
  setTimeout(() => {
    const replies = ["Sounds good!","Let me check.","Can you do $110? Deal?","Can you lower the price?","Is this still available?"];
    chatHistories[currentChat].push({ from:"them", text: replies[Math.floor(Math.random()*replies.length)] });
    renderMessages();
  }, 1200);
}

/* ── MODALS ── */
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.classList.add("hidden");
  });
});

/* ── HELPERS ── */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
