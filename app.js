/* =========================================
   POKÉHUB — app.js (v2 — multi-page build)
   ========================================= */

/* ── DATA ── */
const POKEMON_DB = [
  { name:"Charizard", emoji:"🔥", type:"Fire/Flying",   rarity:"Rare",   price:210, cond:"Mint",         stars:5, category:"tcg"    },
  { name:"Mewtwo",     emoji:"🔮", type:"Psychic",       rarity:"Ultra",  price:350, cond:"Near Mint",    stars:5, category:"tcg"    },
  { name:"Pikachu",    emoji:"⚡", type:"Electric",      rarity:"Common", price:15,  cond:"Lightly Played",stars:4, category:"tcg"   },
  { name:"Rayquaza",   emoji:"🐉", type:"Dragon/Flying", rarity:"Shiny",  price:120, cond:"Mint",         stars:5, category:"tcg"    },
  { name:"Snorlax",    emoji:"😴", type:"Normal",        rarity:"Rare",   price:55,  cond:"Good",         stars:3, category:"nearby" },
  { name:"Gengar",     emoji:"👻", type:"Ghost/Poison",  rarity:"Rare",   price:80,  cond:"Near Mint",    stars:4, category:"tcg"    },
  { name:"Blastoise",  emoji:"🌊", type:"Water",         rarity:"Rare",   price:95,  cond:"Mint",         stars:4, category:"nearby" },
  { name:"Eevee",      emoji:"🦊", type:"Normal",        rarity:"Common", price:20,  cond:"Good",         stars:3, category:"nearby" },
  { name:"Dialga",     emoji:"⏳", type:"Steel/Dragon",  rarity:"Ultra",  price:180, cond:"Near Mint",    stars:5, category:"tcg"    },
  { name:"Umbreon",    emoji:"🌙", type:"Dark",          rarity:"Shiny",  price:260, cond:"Mint",         stars:5, category:"tcg"    },
  { name:"Greninja",   emoji:"🥷", type:"Water/Dark",    rarity:"Ultra",  price:140, cond:"Near Mint",    stars:4, category:"nearby" },
  { name:"Lucario",    emoji:"🥋", type:"Fighting/Steel",rarity:"Rare",   price:65,  cond:"Good",         stars:3, category:"nearby" },
];

const NEARBY_SPAWNS = [
  { name:"Dragonite",  emoji:"🐲", dist:"80m",  rarity:"rare"   },
  { name:"Lapras",     emoji:"🧊", dist:"120m", rarity:"shiny"  },
  { name:"Pikachu",    emoji:"⚡", dist:"45m",  rarity:"common" },
  { name:"Snorlax",    emoji:"😴", dist:"200m", rarity:"rare"   },
  { name:"Mewtwo",     emoji:"🔮", dist:"350m", rarity:"rare"   },
  { name:"Gardevoir",  emoji:"💖", dist:"95m",  rarity:"rare"   },
  { name:"Golem",      emoji:"🪨", dist:"310m", rarity:"common" },
  { name:"Lucario",    emoji:"🥋", dist:"140m", rarity:"rare"   },
  { name:"Eevee",      emoji:"🦊", dist:"60m",  rarity:"common" },
  { name:"Articuno",   emoji:"❄️", dist:"420m", rarity:"shiny"  },
  { name:"Charmeleon", emoji:"🔥", dist:"150m", rarity:"common" },
  { name:"Gyarados",   emoji:"🌊", dist:"500m", rarity:"rare"   },
  { name:"Celebi",     emoji:"🌿", dist:"260m", rarity:"shiny"  },
];

const RAIDS = [
  { name:"Zapdos",    stars:5, time:730  },
  { name:"Snorlax",   stars:2, time:525  },
  { name:"Mewtwo",    stars:5, time:270  },
  { name:"Articuno",  stars:4, time:1320 },
  { name:"Gengar",    stars:4, time:415  },
  { name:"Charizard", stars:5, time:220  },
  { name:"Lapras",    stars:3, time:860  },
  { name:"Raikou",    stars:4, time:545  },
  { name:"Dragonite", stars:5, time:312  },
  { name:"Lucario",   stars:3, time:693  },
  { name:"Ho-Oh",     stars:5, time:1130 },
  { name:"Gyarados",  stars:4, time:442  },
];

const EVENTS = [
  { icon:"🌟", name:"Community Day",    time:"Saturday · 6:00 PM", desc:"Featured spawn boost + exclusive move for evolutions." },
  { icon:"🔦", name:"Spotlight Hour",   time:"Saturday · 1:00 PM", desc:"Double catch candy on the spotlighted species." },
  { icon:"🥚", name:"Hatch-a-thon",     time:"Sunday · 10:00 AM",  desc:"Half hatch distance across all egg types." },
  { icon:"🏆", name:"GO Battle League", time:"Ongoing",            desc:"Great League season — rank up for exclusive avatar items." },
  { icon:"🌩️", name:"Legendary Raid Hour", time:"Wednesday · 6:00 PM", desc:"All 5-star raids feature a legendary for one hour." },
];

const NOTIFICATIONS = [
  { icon:"⭐", title:"Wishlist Match!",     sub:"Dialga listed nearby for $180", time:"2m ago"  },
  { icon:"⚔️", title:"Raid Starting Soon",  sub:"Mewtwo 5★ — 4 minutes left",    time:"4m ago"  },
  { icon:"💰", title:"Price Drop Alert",    sub:"Charizard VSTAR dropped to $180", time:"18m ago" },
  { icon:"💬", title:"New Message",         sub:"PokeTrader91: Is it available?", time:"25m ago" },
  { icon:"🤝", title:"Trade Offer",         sub:"ShinyHunter offered $700 for Rayquaza EX", time:"1h ago" },
  { icon:"📦", title:"Order Shipped",       sub:"Your Blastoise EX order is on the way", time:"3h ago" },
];

const TRADERS = [
  { name:"PokeTrader91", badge:"Verified", has:"Dialga",    price:180 },
  { name:"ShinyHunter",  badge:"Pro",      has:"Umbreon",   price:260 },
  { name:"CardMaster",   badge:"Trusted",  has:"Charizard", price:210 },
  { name:"TCGDownUnder", badge:"Verified", has:"Greninja",  price:140 },
];

const CHAT_CONTACTS = [
  { name:"PokeTrader91",   avatar:"🎮", preview:"Is the Rayquaza still available?" },
  { name:"ShinyHunter",    avatar:"✨", preview:"Would you take $700?" },
  { name:"CardKingAU",     avatar:"👑", preview:"Can you bundle the Gengar and Umbreon?" },
  { name:"MintMaster",     avatar:"🧼", preview:"Is your Blastoise EX near mint?" },
  { name:"VaultCollector", avatar:"🗄️", preview:"Happy to trade if you're interested." },
  { name:"RetroRipper",    avatar:"📦", preview:"Got pics of the Lugia GX?" },
  { name:"EeveeEnthusiast",avatar:"🦊", preview:"Would you swap for my Sylveon VMAX?" },
  { name:"GoldStarGuru",   avatar:"⭐", preview:"$380 is my best offer on Greninja." },
  { name:"TCGDownUnder",   avatar:"🇦🇺", preview:"Still chasing that Charizard VSTAR!" },
  { name:"PackBreaker",    avatar:"💥", preview:"Can pick up locally if you're nearby." },
];

const CARD_SCAN_RESULTS = [
  { name:"Charizard VMAX",    value:210, rarity:"Rare Holo",     set:"Sword & Shield" },
  { name:"Pikachu V",         value:45,  rarity:"Ultra Rare",    set:"Vivid Voltage"  },
  { name:"Mewtwo GX",         value:120, rarity:"GX Holo",       set:"Unbroken Bonds" },
  { name:"Rayquaza EX",       value:88,  rarity:"EX Holo",       set:"Roaring Skies"  },
  { name:"Gengar VMAX",       value:165, rarity:"Secret Rare",   set:"Fusion Strike"  },
  { name:"Umbreon V",         value:52,  rarity:"Ultra Rare",    set:"Evolving Skies" },
  { name:"Blastoise EX",      value:95,  rarity:"EX Holo",       set:"XY Base Set"    },
  { name:"Lugia GX",          value:130, rarity:"GX Ultra Rare", set:"Lost Thunder"   },
  { name:"Charizard VSTAR",   value:180, rarity:"Rainbow Rare",  set:"Brilliant Stars"},
  { name:"Sylveon VMAX",      value:110, rarity:"Full Art",      set:"Evolving Skies" },
  { name:"Greninja Gold Star",value:420, rarity:"Gold Star",     set:"POP Series 3"   },
  { name:"Arceus V",          value:40,  rarity:"Ultra Rare",    set:"Brilliant Stars"},
];

const AD_UNITS = [
  { key:"hotwheels",    emoji:"🏎️", brand:"Hot Wheels", tag:"Collect. Race. Repeat. New die-cast drops weekly.", cta:"Shop the drop" },
  { key:"fortnite",     emoji:"🎮", brand:"Fortnite",    tag:"New season, new skins. Drop in tonight.",           cta:"Play now"      },
  { key:"rocketleague", emoji:"🚗⚽", brand:"Rocket League", tag:"Season pass live — new car & boost trail.",       cta:"Get the pass"  },
];

/* ── STATE ── */
let wishlist   = [
  { name:"Dialga",  price:180 },
  { name:"Umbreon", price:260 },
];
let collection = [];
let marketFilter = "all";
let nearbyFilter  = "all";
let currentChat   = null;
let raidSeconds   = 900; // 15 min for banner raid
let unreadChats   = new Set(["CardKingAU","GoldStarGuru","PackBreaker"]);
let unreadNotifs  = 3;

let chatHistories = {
  PokeTrader91: [
    { from:"them", text:"Is the Rayquaza still available?" },
    { from:"me",   text:"Yes, it's available!" },
  ],
  ShinyHunter: [
    { from:"them", text:"Would you take $700?" },
  ],
  CardKingAU: [
    { from:"them", text:"Can you bundle the Gengar and Umbreon?" },
  ],
  MintMaster: [
    { from:"them", text:"Is your Blastoise EX near mint?" },
    { from:"me",   text:"Yep, near mint — barely played." },
  ],
  VaultCollector: [
    { from:"them", text:"Happy to trade if you're interested." },
  ],
  RetroRipper: [
    { from:"them", text:"Got pics of the Lugia GX?" },
  ],
  EeveeEnthusiast: [
    { from:"them", text:"Would you swap for my Sylveon VMAX?" },
  ],
  GoldStarGuru: [
    { from:"them", text:"$380 is my best offer on Greninja." },
  ],
  TCGDownUnder: [
    { from:"them", text:"Still chasing that Charizard VSTAR!" },
  ],
  PackBreaker: [
    { from:"them", text:"Can pick up locally if you're nearby." },
  ],
};

/* =========================================
   AI-STYLE BOT REPLY SYSTEM
   ========================================= */
function aiReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes("price"))     return "I can work with the price a little if you're serious.";
  if (msg.includes("condition")) return "Condition is solid — I can send more pics if you want.";
  if (msg.includes("trade"))     return "I'm open to trades. What do you have?";
  if (msg.includes("available")) return "Yep, it's still available right now.";
  if (msg.includes("meet"))      return "I can meet later today if that helps.";
  if (msg.includes("ship"))      return "I can ship it tracked, usually out next business day.";

  const genericReplies = [
    "Sounds good — what are you thinking?",
    "I can do that. Want to continue?",
    "Let me know what you need.",
    "I'm flexible — tell me your offer.",
    "Sure thing, happy to chat.",
    "I can work with that.",
    "Want to see more photos?",
    "I'm online now if you want to sort it out.",
  ];
  return genericReplies[Math.floor(Math.random() * genericReplies.length)];
}

function sendMessage(to, text) {
  if (!chatHistories[to]) chatHistories[to] = [];
  chatHistories[to].push({ from:"me", text });
  renderChatWindow();

  const typingEl = document.getElementById("chatMessages");
  if (typingEl) {
    const typing = document.createElement("div");
    typing.className = "msg-typing";
    typing.id = "typingIndicator";
    typing.textContent = `${to} is typing…`;
    typingEl.appendChild(typing);
    typingEl.scrollTop = typingEl.scrollHeight;
  }

  setTimeout(() => {
    chatHistories[to].push({ from:"them", text: aiReply(text) });
    renderChatWindow();
  }, 600 + Math.random() * 700);
}

/* =========================================
   HELPERS
   ========================================= */
function fmt(n) { return "$" + n.toLocaleString(); }
function mmss(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return `${m}m ${String(sec).padStart(2,"0")}s`;
}
function starIcons(n) { return "⭐".repeat(n); }
function closeModal(id) { document.getElementById(id).classList.add("hidden"); }
function openModal(id)  { document.getElementById(id).classList.remove("hidden"); }

/* =========================================
   NAVBAR / MOBILE MENU
   ========================================= */
function initNavbar() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => mobileNav.classList.toggle("open"));
  }
  const notifBtn = document.getElementById("notifBtn");
  const msgBtn   = document.getElementById("msgBtn");
  if (notifBtn) notifBtn.addEventListener("click", () => { unreadNotifs = 0; updateIconDots(); renderNotifs(); openModal("notifModal"); });
  if (msgBtn)   msgBtn.addEventListener("click", () => { renderChatList(); openModal("msgModal"); });
  updateIconDots();
}
function updateIconDots() {
  const notifDot = document.getElementById("notifDot");
  const msgDot   = document.getElementById("msgDot");
  if (notifDot) notifDot.classList.toggle("hidden", unreadNotifs === 0);
  if (msgDot)   msgDot.classList.toggle("hidden", unreadChats.size === 0);
}

/* =========================================
   RAID BANNER COUNTDOWN
   ========================================= */
function initRaidBanner() {
  const el = document.getElementById("raidTimer");
  if (!el) return;
  setInterval(() => {
    if (raidSeconds > 0) raidSeconds--;
    el.textContent = mmss(raidSeconds);
  }, 1000);
}
function joinRaid() {
  alert("You've joined the Mewtwo 5★ raid! Check Live Raids on the Pokémon GO page for your squad.");
}

/* =========================================
   HOME — SEARCH
   ========================================= */
function runSearch() {
  const input = document.getElementById("searchInput");
  const box = document.getElementById("searchResults");
  if (!input || !box) return;
  const q = input.value.trim().toLowerCase();
  if (!q) { box.classList.add("hidden"); box.innerHTML = ""; return; }

  const matches = POKEMON_DB.filter(p => p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q));
  if (matches.length === 0) {
    box.innerHTML = `<div class="search-result-item"><div class="result-info">No matches for "${escapeHtml(input.value)}" — try another name.</div></div>`;
  } else {
    box.innerHTML = matches.map(p => `
      <div class="search-result-item" onclick="window.location.href='trade.html'">
        <span class="result-emoji">${p.emoji}</span>
        <div class="result-info">
          <div class="result-name">${p.name}</div>
          <div class="result-meta">${p.type} · ${p.rarity} · ${p.cond}</div>
        </div>
        <span class="result-price">${fmt(p.price)}</span>
      </div>
    `).join("");
  }
  box.classList.remove("hidden");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================
   LOCATOR PAGE
   ========================================= */
function renderNearby() {
  const list = document.getElementById("nearbyList");
  if (!list) return;
  const items = nearbyFilter === "all" ? NEARBY_SPAWNS : NEARBY_SPAWNS.filter(s => s.rarity === nearbyFilter);
  list.innerHTML = items.map(s => `
    <li class="nearby-item">
      <span class="nearby-emoji">${s.emoji}</span>
      <div class="nearby-info">
        <div class="nearby-name">${s.name}</div>
        <div class="nearby-dist">${s.dist} away</div>
      </div>
      <span class="nearby-badge ${s.rarity}">${s.rarity}</span>
    </li>
  `).join("");
}
function filterNearby(rarity, el) {
  nearbyFilter = rarity;
  document.querySelectorAll("#nearbyFilters .tab").forEach(t => t.classList.remove("active"));
  if (el) el.classList.add("active");
  renderNearby();
}
function refreshNearby() {
  const list = document.getElementById("nearbyList");
  if (!list) return;
  list.innerHTML = `<li class="nearby-item shimmer"></li><li class="nearby-item shimmer"></li><li class="nearby-item shimmer"></li>`;
  setTimeout(() => {
    // shuffle distances a bit to feel "live"
    NEARBY_SPAWNS.forEach(s => {
      const base = parseInt(s.dist);
      s.dist = Math.max(10, base + Math.round((Math.random() - 0.5) * 40)) + "m";
    });
    renderNearby();
  }, 700);
}
function setLocation() {
  const input = document.getElementById("locationInput");
  const label = document.getElementById("locationLabel");
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  if (label) label.textContent = `📍 Showing spawns near "${val}"`;
  refreshNearby();
}

/* =========================================
   TRADE / MARKETPLACE PAGE
   ========================================= */
function renderMarket() {
  const list = document.getElementById("marketList");
  if (!list) return;
  const items = marketFilter === "all" ? POKEMON_DB : POKEMON_DB.filter(p => p.category === marketFilter);
  list.innerHTML = items.map(p => `
    <div class="market-item">
      <span class="market-img">${p.emoji}</span>
      <div class="market-info">
        <div class="market-name">${p.name} <span class="muted">· ${p.rarity}</span></div>
        <div class="market-cond">${p.type} · ${p.cond}</div>
        <div class="market-stars">${starIcons(p.stars)}</div>
      </div>
      <div class="market-price-wrap">
        <span class="market-price">${fmt(p.price)}</span>
        <button class="btn-msg" onclick="openChatFor('${p.name.replace(/'/g,"\\'")}')">💬 Message seller</button>
      </div>
    </div>
  `).join("");
}
function filterMarket(cat, el) {
  marketFilter = cat;
  document.querySelectorAll("#trade .filter-tabs .tab").forEach(t => t.classList.remove("active"));
  if (el) el.classList.add("active");
  renderMarket();
}
function openChatFor(pokemonName) {
  // route a "message seller" click to a plausible trader in CHAT_CONTACTS
  const seller = CHAT_CONTACTS[Math.floor(Math.random() * CHAT_CONTACTS.length)].name;
  renderChatList();
  openModal("msgModal");
  openChat(seller);
  const chatInput = document.getElementById("chatInput");
  if (chatInput) chatInput.placeholder = `Ask about your ${pokemonName}…`;
}

/* =========================================
   TCG SCANNER + COLLECTION PAGE
   ========================================= */
function simulateScan() {
  const resultBox = document.getElementById("scanResult");
  if (!resultBox) return;
  const card = CARD_SCAN_RESULTS[Math.floor(Math.random() * CARD_SCAN_RESULTS.length)];
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    <div>
      <div style="font-weight:700">${card.name}</div>
      <div class="muted">${card.rarity} · ${card.set}</div>
    </div>
    <div style="display:flex;align-items:center;gap:.8rem">
      <span class="price-tag">${fmt(card.value)}</span>
      <button class="btn-primary sm" onclick='addToCollection(${JSON.stringify(card).replace(/'/g,"&#39;")})'>+ Add</button>
    </div>
  `;
}
function addToCollection(card) {
  collection.push(card);
  renderCollection();
}
function renderCollection() {
  const ul = document.getElementById("myCollection");
  const summary = document.getElementById("collectionValue");
  if (!ul) return;
  if (collection.length === 0) {
    ul.innerHTML = `<li class="muted">No cards yet — scan one above to add it.</li>`;
  } else {
    ul.innerHTML = collection.map((c, i) => `
      <li>
        <span>${c.name} <span class="muted">· ${c.set}</span></span>
        <span class="price-tag">${fmt(c.value)}</span>
      </li>
    `).join("");
  }
  if (summary) {
    const total = collection.reduce((sum, c) => sum + c.value, 0);
    summary.textContent = `${collection.length} card${collection.length === 1 ? "" : "s"} · ${fmt(total)} total value`;
  }
}
function renderPricingTable() {
  const tbody = document.getElementById("pricingTableBody");
  if (!tbody) return;
  tbody.innerHTML = CARD_SCAN_RESULTS.map(c => `
    <tr><td>${c.name}</td><td>${c.set}</td><td>${c.rarity}</td><td class="price">${fmt(c.value)}</td></tr>
  `).join("");
}

/* =========================================
   POKÉMON GO PAGE
   ========================================= */
function renderRaids() {
  const ul = document.getElementById("raidList");
  if (!ul) return;
  ul.innerHTML = RAIDS.map((r, i) => `
    <li>
      <span class="raid-item-name">${r.name}</span>
      <span class="raid-item-stars">${starIcons(r.stars)}</span>
      <span class="raid-item-time" data-raid-index="${i}">${mmss(r.time)}</span>
    </li>
  `).join("");
}
function tickRaids() {
  RAIDS.forEach((r, i) => {
    if (r.time > 0) r.time--;
    const el = document.querySelector(`[data-raid-index="${i}"]`);
    if (el) el.textContent = r.time > 0 ? mmss(r.time) : "Ending!";
  });
}
function renderEvents() {
  const ul = document.getElementById("eventList");
  if (!ul) return;
  ul.innerHTML = EVENTS.map(e => `
    <li>
      <span class="event-icon">${e.icon}</span>
      <div class="event-info">
        <div class="event-name">${e.name}</div>
        <div class="event-time">${e.time}</div>
        <div class="muted" style="font-size:.78rem;margin-top:.15rem">${e.desc}</div>
      </div>
    </li>
  `).join("");
}
function findPlayers() {
  const input = document.getElementById("raidPokemon");
  const box = document.getElementById("matchResults");
  if (!input || !box) return;
  const name = input.value.trim() || "this raid";
  const count = 2 + Math.floor(Math.random() * 4);
  const players = CHAT_CONTACTS.slice(0, count);
  box.innerHTML = players.map(p => `
    <div class="match-item"><span>${p.avatar}</span> <span>${p.name}</span> <span class="muted" style="margin-left:auto">wants ${name}</span></div>
  `).join("");
}

/* =========================================
   WISHLIST PAGE
   ========================================= */
function renderWishlist() {
  const ul = document.getElementById("wishList");
  if (!ul) return;
  if (wishlist.length === 0) {
    ul.innerHTML = `<li class="muted">Your wishlist is empty — add something you're chasing.</li>`;
    return;
  }
  ul.innerHTML = wishlist.map((w, i) => `
    <li>
      <span>${w.name}</span>
      <span style="display:flex;align-items:center;gap:.6rem">
        <span class="price-tag">${fmt(w.price)}</span>
        <button class="wish-remove" onclick="removeWish(${i})" title="Remove">✕</button>
      </span>
    </li>
  `).join("");
}
function renderTraders() {
  const ul = document.getElementById("traderList");
  if (!ul) return;
  ul.innerHTML = TRADERS.map(t => `
    <li>
      <span class="trader-name">${t.name} <span class="trader-badge">${t.badge}</span></span>
      <span style="display:flex;align-items:center;gap:.6rem">
        <span class="muted">${t.has}</span>
        <span class="price-tag">${fmt(t.price)}</span>
      </span>
    </li>
  `).join("");
}
function openAddWish() { openModal("wishModal"); }
function addWish() {
  const input = document.getElementById("wishInput");
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  const known = POKEMON_DB.find(p => p.name.toLowerCase() === val.toLowerCase());
  wishlist.push({ name: val, price: known ? known.price : 25 + Math.floor(Math.random() * 200) });
  input.value = "";
  closeModal("wishModal");
  renderWishlist();
}
function removeWish(i) {
  wishlist.splice(i, 1);
  renderWishlist();
}

/* =========================================
   NOTIFICATIONS
   ========================================= */
function renderNotifs() {
  const ul = document.getElementById("notifList");
  if (!ul) return;
  ul.innerHTML = NOTIFICATIONS.map(n => `
    <li class="notif-item">
      <span class="notif-icon">${n.icon}</span>
      <div class="notif-text">
        <div class="notif-title">${n.title}</div>
        <div class="notif-sub">${n.sub}</div>
      </div>
      <span class="notif-time">${n.time}</span>
    </li>
  `).join("");
}

/* =========================================
   CHAT / MESSAGES MODAL
   ========================================= */
function renderChatList() {
  const list = document.getElementById("chatList");
  if (!list) return;
  list.innerHTML = CHAT_CONTACTS.map(c => {
    const hist = chatHistories[c.name] || [];
    const lastMsg = hist.length ? hist[hist.length - 1].text : c.preview;
    const unread = unreadChats.has(c.name);
    return `
      <div class="chat-contact ${currentChat === c.name ? "active" : ""}" onclick="openChat('${c.name.replace(/'/g,"\\'")}')">
        <span class="chat-avatar">${c.avatar}</span>
        <div style="min-width:0">
          <div class="chat-uname">${c.name}</div>
          <div class="chat-preview">${lastMsg}</div>
        </div>
        ${unread ? '<span class="chat-unread"></span>' : ""}
      </div>
    `;
  }).join("");
}
function openChat(name) {
  currentChat = name;
  unreadChats.delete(name);
  updateIconDots();
  renderChatList();
  renderChatWindow();
}
function renderChatWindow() {
  const win = document.getElementById("chatWindow");
  if (!win) return;
  if (!currentChat) {
    win.innerHTML = `<div class="chat-empty">Select a conversation to start chatting.</div>`;
    return;
  }
  const contact = CHAT_CONTACTS.find(c => c.name === currentChat);
  const hist = chatHistories[currentChat] || [];
  win.innerHTML = `
    <div class="chat-window-header"><span>${contact ? contact.avatar : "💬"}</span> ${currentChat}</div>
    <div class="chat-messages" id="chatMessages">
      ${hist.map(m => `<div class="msg-bubble ${m.from}">${escapeHtml(m.text)}</div>`).join("")}
    </div>
    <div class="chat-input">
      <input type="text" id="chatInput" placeholder="Message ${currentChat}…" onkeydown="if(event.key==='Enter')sendMsg()" />
      <button onclick="sendMsg()">Send</button>
    </div>
  `;
  const msgs = document.getElementById("chatMessages");
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}
function sendMsg() {
  const input = document.getElementById("chatInput");
  if (!input || !currentChat) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  sendMessage(currentChat, text);
}

/* =========================================
   AD RAIL — rotating sponsor units
   ========================================= */
function initAdRail() {
  const slots = document.querySelectorAll(".ad-slot[data-ad-rotator]");
  slots.forEach((slot, slotIndex) => {
    let i = slotIndex % AD_UNITS.length; // stagger start so multiple slots don't sync
    renderAd(slot, i);
    setInterval(() => {
      i = (i + 1) % AD_UNITS.length;
      const card = slot.querySelector(".ad-card");
      if (card) card.classList.add("fading");
      setTimeout(() => renderAd(slot, i), 250);
    }, 5000 + slotIndex * 700);
  });
}
function renderAd(slot, i) {
  const ad = AD_UNITS[i];
  slot.innerHTML = `
    <span class="ad-slot-label">Sponsored</span>
    <div class="ad-card ${ad.key}">
      <span class="ad-emoji">${ad.emoji}</span>
      <span class="ad-brand">${ad.brand}</span>
      <span class="ad-tag">${ad.tag}</span>
      <button class="ad-cta" onclick="alert('This is a demo ad slot — no real link attached.')">${ad.cta}</button>
      <div class="ad-dots">
        ${AD_UNITS.map((_, j) => `<span class="${j === i ? "active" : ""}"></span>`).join("")}
      </div>
    </div>
  `;
}

/* =========================================
   PAGE INIT (called from each page's inline script)
   ========================================= */
function initSharedChrome() {
  initNavbar();
  initRaidBanner();
  initAdRail();
  renderNotifs();
  renderChatList();
  renderChatWindow();
}
