(() => {
  'use strict';
  const heroes = [
    {name:'VEX',type:'rushdown',title:'Tiểu quỷ cơ bắp',desc:'Áp sát nhanh, K lướt gây 3 nhịp sát thương; L+K tạo triple rush.'},
    {name:'AURA',type:'balanced',title:'Chiến binh giáp trụ',desc:'Lối chơi cân bằng giữa tấn công và phòng thủ.'},
    {name:'NYX',type:'zoner',title:'Nữ pháo thủ giáp nặng',desc:'Kiểm soát khoảng cách bằng kỹ năng tầm xa.'},
    {name:'MUETA',type:'deadly-zoner',title:'Xạ thủ tia tử quang',desc:'Giữ K tích lực tia năng lượng; hướng tiến + K hoặc L+K để phase strike.'},
    {name:'LOCKE',type:'soul-duelist',title:'Kẻ khế ước linh hồn',desc:'Đấu sĩ cận chiến, khống chế và dấu ấn đầu lâu tự kích hoạt.'}
  ];
  const grid=document.getElementById('heroGrid');
  const filters=document.getElementById('heroFilters');
  const favKey='nna_favorites_v1';
  let favorites=[]; try{favorites=JSON.parse(localStorage.getItem(favKey)||'[]')}catch{}
  function render(filter='all'){
    if(!grid)return;
    grid.innerHTML=heroes.filter(h=>filter==='all'||h.type===filter).map(h=>{const locked=h.name==='LOCKE'&&localStorage.getItem('nna_locke_unlocked_v1')!=='true';return `<article class="hero-card ${locked?'roster-locked':''}"><button class="fav" data-fav="${h.name}" aria-label="Yêu thích">${favorites.includes(h.name)?'★':'☆'}</button><div class="eyebrow">${h.type.toUpperCase()}</div><h3>${h.name} ${locked?'🔒':''}</h3><strong>${locked?'MỞ KHÓA QUA EVENT':h.title}</strong><p>${locked?'Hoàn thành SOUL RIFT để sử dụng Locke.':h.desc}</p></article>`}).join('');
  }
  filters?.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;filters.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));render(b.dataset.filter)});
  grid?.addEventListener('click',e=>{const b=e.target.closest('[data-fav]');if(!b)return;const n=b.dataset.fav;favorites=favorites.includes(n)?favorites.filter(x=>x!==n):[...favorites,n];localStorage.setItem(favKey,JSON.stringify(favorites));render(filters?.querySelector('.active')?.dataset.filter||'all')});
  const tasks=['Hoàn thiện ý tưởng và luật chơi','Hoàn thiện bộ điều khiển nhân vật','Xây dựng hệ thống chiến đấu','Bổ sung vật phẩm trong đấu trường','Cân bằng hero và độ khó BOT','Kiểm thử và sửa lỗi','Hoàn thiện bản demo giới thiệu'];
  const list=document.getElementById('roadmapList'),bar=document.getElementById('progressBar'),label=document.getElementById('progressLabel');
  const roadKey='nna_roadmap_v1';let done=[];try{done=JSON.parse(localStorage.getItem(roadKey)||'[]')}catch{}
  if(list){list.innerHTML=tasks.map((t,i)=>`<label><input type="checkbox" data-task="${i}" ${done.includes(i)?'checked':''}>${t}</label>`).join('');updateRoad()}
  function updateRoad(){if(!list)return;done=[...list.querySelectorAll('[data-task]:checked')].map(x=>Number(x.dataset.task));localStorage.setItem(roadKey,JSON.stringify(done));const pct=Math.round(done.length/tasks.length*100);if(bar)bar.style.width=pct+'%';if(label)label.textContent=pct+'%'}
  list?.addEventListener('change',updateRoad);
  document.getElementById('clearBtn')?.addEventListener('click',()=>{done=[];list?.querySelectorAll('input').forEach(x=>x.checked=false);updateRoad()});
  document.getElementById('exportBtn')?.addEventListener('click',()=>{const pct=Math.round(done.length/tasks.length*100);const text='NO NAME ARENA — ROADMAP\nTiến độ: '+pct+'%\n\n'+tasks.map((t,i)=>(done.includes(i)?'[x] ':'[ ] ')+t).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));a.download='no-name-arena-roadmap.txt';a.click();URL.revokeObjectURL(a.href)});
  render();

  // SOUL RIFT: checkbox task state is browser-local. Owner mode is a convenience switch, not auth.
  const eventKey='nna_locke_event_tasks_v1';
  const ownerKey='nna_owner_mode_v1';
  const unlockKey='nna_locke_unlocked_v1';
  const eventChecks=[...document.querySelectorAll('[data-event-task]')];
  let eventDone=[]; try{eventDone=JSON.parse(localStorage.getItem(eventKey)||'[]')}catch{}
  const ownerBtn=document.getElementById('ownerUnlockBtn');
  const eventBar=document.getElementById('eventProgressBar');
  const eventLabel=document.getElementById('eventProgress');
  const lockeStatus=document.getElementById('lockeStatus');
  function updateEvent(){
    eventChecks.forEach((c)=>c.checked=eventDone.includes(Number(c.dataset.eventTask)));
    const owner=localStorage.getItem(ownerKey)==='true';
    const unlocked=owner||eventDone.length===3;
    localStorage.setItem(unlockKey,unlocked?'true':'false');
    if(eventBar)eventBar.style.width=(eventDone.length/3*100)+'%';
    if(eventLabel)eventLabel.textContent=eventDone.length+' / 3';
    if(lockeStatus){lockeStatus.textContent=unlocked?'LOCKE: ĐÃ MỞ KHÓA':'LOCKE: ĐANG BỊ KHÓA';lockeStatus.classList.toggle('unlocked',unlocked)}
    if(ownerBtn)ownerBtn.textContent=owner?'TẮT OWNER MODE':'MỞ KHÓA LOCKE CHO CHỦ WEB';
    render(filters?.querySelector('.active')?.dataset.filter||'all');
  }
  eventChecks.forEach(c=>c.addEventListener('change',()=>{
    const id=Number(c.dataset.eventTask);eventDone=c.checked?[...new Set([...eventDone,id])]:eventDone.filter(x=>x!==id);
    localStorage.setItem(eventKey,JSON.stringify(eventDone));updateEvent();
  }));
  ownerBtn?.addEventListener('click',()=>{
    const on=localStorage.getItem(ownerKey)==='true';
    localStorage.setItem(ownerKey,on?'false':'true');updateEvent();
    const toast=document.getElementById('toast');if(toast){toast.textContent=on?'OWNER MODE ĐÃ TẮT':'OWNER MODE: LOCKE ĐÃ MỞ';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}
  });
  updateEvent();
})();
