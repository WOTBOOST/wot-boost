const services = [
  {id:"lbz",name:"ЛБЗ",icon:"▣",desc:"Выполнение личных боевых задач",price:"от 300 ₽",items:["1 задача — 300 ₽","Пакет из 5 задач — 1 300 ₽","Полный комплект — 3 500 ₽"]},
  {id:"account",name:"Прокачка аккаунтов",icon:"▰",desc:"Победы, опыт и развитие техники",price:"от 1 000 ₽",items:["До 1 000 боёв — 1 000 ₽","1 000–5 000 боёв — 2 500 ₽","5 000+ боёв — от 5 000 ₽"]},
  {id:"wn8",name:"Рейтинг / WN8",icon:"★",desc:"Повышение боевой эффективности",price:"от 1 500 ₽",items:["WN8 2 000 — 1 500 ₽","WN8 3 000 — 2 500 ₽","WN8 5 000+ — от 4 000 ₽"]},
  {id:"battlepass",name:"Боевые пропуски",icon:"▤",desc:"Закрытие этапов и получение наград",price:"от 800 ₽",items:["Стандарт — 800 ₽","Улучшенный — 1 500 ₽","Полный — 2 500 ₽"]},
  {id:"silver",name:"Фарм серебра",icon:"◉",desc:"Заработок игровой валюты",price:"от 700 ₽",items:["1 000 000 — 700 ₽","5 000 000 — 2 800 ₽","10 000 000 — 5 000 ₽"]},
  {id:"other",name:"Другое",icon:"⚙",desc:"Индивидуальные игровые задачи",price:"По запросу",items:["Индивидуальный расчёт","Согласование сроков","Персональные условия"]}
];

const serviceCards = document.querySelector("#serviceCards");
const priceGrid = document.querySelector("#priceGrid");
const serviceSelect = document.querySelector("#serviceSelect");

services.forEach(s=>{
  serviceCards.insertAdjacentHTML("beforeend",`
    <article class="service-card">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.name}</h3><p>${s.desc}</p>
      <button type="button" data-service="${s.id}" aria-label="Выбрать ${s.name}">→</button>
    </article>`);
  priceGrid.insertAdjacentHTML("beforeend",`
    <article class="price-card"><h3>${s.name}</h3><p>${s.price}</p><ul>${s.items.map(i=>`<li>${i}</li>`).join("")}</ul></article>`);
  serviceSelect.insertAdjacentHTML("beforeend",`<option value="${s.id}">${s.name}</option>`);
});

document.addEventListener("click",e=>{
  const button=e.target.closest("[data-service]");
  if(button){
    serviceSelect.value=button.dataset.service;
    document.querySelector("#order").scrollIntoView({behavior:"smooth"});
  }
});
document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));

document.querySelector("#orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  const service=services.find(s=>s.id===serviceSelect.value)?.name;
  const text=`Здравствуйте! Хочу заказать услугу WOT-BOOST.\nУслуга: ${service}\nНикнейм: ${document.querySelector("#nickname").value}\nРегион: ${document.querySelector("#region").value}\nЗадача: ${document.querySelector("#details").value}`;
  document.querySelector("#formStatus").textContent="Заявка сформирована. Нажми кнопку ниже, чтобы открыть Telegram.";
  let old=document.querySelector("#telegramSend");
  if(old) old.remove();
  const a=document.createElement("a");a.id="telegramSend";a.className="btn btn-primary";a.href="https://t.me/Booster_Wot?text="+encodeURIComponent(text);a.target="_blank";a.rel="noopener";a.textContent="Отправить в Telegram →";
  document.querySelector("#orderForm").appendChild(a);
});
document.querySelector("#copyDiscord").addEventListener("click",async()=>{
  try{await navigator.clipboard.writeText("vaviaboosterwot");alert("Discord-ник скопирован: vaviaboosterwot");}
  catch{alert("Discord: vaviaboosterwot");}
});
