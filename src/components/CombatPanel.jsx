import { Card, Button, Input, Badge, Help, ProgressBar } from './ui.jsx';
import { CONDITIONS } from '../data/rules.js';
import { COMBAT_ACTIVITIES_TEXT, COMBAT_ACTIONS } from '../data/combatActions.js';
import { derived, manifestationVirtualPoints } from '../utils/calculations.js';

export default function CombatPanel({sheet,setSheet}){
  const d = derived(sheet);
  const currentHp = sheet.state.currentHp ?? d.hp;
  const currentVigor = sheet.state.currentVigor ?? d.vigor;
  const exhaustion = sheet.state.exhaustion ?? 0;
  const shortRests = sheet.state.shortRests ?? 0;
  const longRests = sheet.state.longRests ?? 0;
  const qv = manifestationVirtualPoints(sheet.quirk || {});
  const patchState = data => setSheet(s=>({...s,state:{...s.state,...data}}));
  const log = entry => setSheet(s=>({...s,auditPreview:[{at:new Date().toISOString(),...entry},...(s.auditPreview||[])].slice(0,40)}));
  const applyHp = (kind,n) => { const val=Number(n||0); const hp=kind==='damage'?Math.max(0,currentHp-val):Math.min(d.hp,currentHp+val); patchState({currentHp:hp,lastHpInput:0}); log({type:kind,value:val,hp}); };
  const applyVigor = (kind,n) => { const val=Number(n||0); const vigor=kind==='spend'?Math.max(0,currentVigor-val):Math.min(d.vigor,currentVigor+val); patchState({currentVigor:vigor,lastVigorInput:0}); log({type:kind==='spend'?'vigor_spent':'vigor_recovered',value:val,vigor}); };
  const toggleCondition = id => { const arr=sheet.state.conditions||[]; const next=arr.includes(id)?arr.filter(x=>x!==id):[...arr,id]; patchState({conditions:next}); log({type:next.includes(id)?'condition_add':'condition_remove',condition:id}); };
  const setExhaustion = v => { const ex=Math.max(0,Math.min(6,Number(v||0))); patchState({exhaustion:ex}); log({type:'exhaustion_set',exhaustion:ex}); };
  const shortRest = () => { patchState({currentVigor:d.vigor,shortRests:shortRests+1}); log({type:'short_rest',shortRests:shortRests+1}); };
  const longRest = () => { patchState({currentHp:d.hp,currentVigor:d.vigor,conditions:[],exhaustion:Math.max(0,exhaustion-1),longRests:longRests+1}); log({type:'long_rest',longRests:longRests+1}); };

  const active = new Set(sheet.state.conditions || []);
  const actionStatus = (action) => {
    const notes = [];
    let state = 'Liberada';
    const block = (msg) => { state = 'Bloqueada'; notes.push(msg); };
    const warn = (msg) => { if(state !== 'Bloqueada') state = 'Atenção'; notes.push(msg); };
    if(active.has('incapacitado') || active.has('inconsciente') || active.has('paralisado') || active.has('atordoado')) block('Condição impede ações normais ou deixa o personagem incapacitado.');
    if(active.has('letargico')) warn('Letárgico: em cada turno, escolha usar apenas uma entre ação, ação tática ou ação bônus.');
    if(active.has('sonolento') && action.id === 'preparar') warn('Sonolento: o personagem não pode usar Reações; preparar perde utilidade se depender de reação.');
    if(active.has('agarrado') || active.has('impedido')) {
      if(action.id === 'disparada') block('Deslocamento se torna 0; Disparada não resolve movimento.');
      if(action.id === 'esquivar') warn('Esquivar perde benefício se seu deslocamento for reduzido a 0.');
    }
    if(active.has('ca-do') || active.has('caido')) {
      if(action.id === 'disparada') warn('Caído: a única opção de deslocamento é rastejar, a menos que se levante.');
      if(action.id === 'atacar') warn('Caído: sofre desvantagem nas jogadas de ataque comuns e de técnicas.');
    }
    if(active.has('cego') && ['atacar','procurar'].includes(action.id)) warn('Cego: falha automaticamente em testes que requeiram visão; ataques do afetado sofrem desvantagem.');
    if(active.has('enfurecido')) warn('Enfurecido: deve atacar/fazer deslocamento em direção à fonte da fúria e não pode manter concentração.');
    if(active.has('p-nico') || active.has('panico')) warn('Pânico: age de forma imprevisível, ataca personagem próximo ou se move para longe da fonte do medo.');
    if(active.has('envenenado') && action.id === 'atacar') warn('Envenenado: sofre desvantagem em jogadas de ataque e Testes de Atributo.');
    if(active.has('queimado') && action.id === 'atacar') warn('Queimado: recebe dano constante de fogo na primeira jogada de ataque no turno enquanto não apagar o fogo.');
    if(exhaustion >= 1) warn('Exaustão nível 1+: desvantagem em Testes de Atributo.');
    if(exhaustion >= 2 && action.id === 'disparada') warn('Exaustão nível 2+: deslocamento reduzido pela metade.');
    if(exhaustion >= 3 && action.id === 'atacar') warn('Exaustão nível 3+: desvantagem nas jogadas de ataque e Salvaguardas.');
    if(exhaustion >= 5 && action.id === 'disparada') block('Exaustão nível 5: deslocamento reduzido a 0.');
    if(exhaustion >= 6) block('Exaustão nível 6: desmaio.');
    return {state, notes};
  };

  return <div className="space-y-4">
    <div className="grid md:grid-cols-2 gap-5">
      <Card className="p-5"><div className="flex items-center justify-between"><h2 className="text-3xl font-black">PV</h2><Badge>{currentHp}/{d.hp}</Badge></div><div className="mt-3"><ProgressBar value={currentHp} max={d.hp}/></div><div className="grid sm:grid-cols-3 gap-2 mt-4 items-end"><Input type="number" min="0" label="Quanto levou/curou" value={sheet.state.lastHpInput ?? 0} onChange={v=>patchState({lastHpInput:v})}/><Button variant="danger" onClick={()=>applyHp('damage',sheet.state.lastHpInput)}>Aplicar dano</Button><Button onClick={()=>applyHp('heal',sheet.state.lastHpInput)}>Aplicar cura</Button></div><div className="mt-2 flex gap-2 flex-wrap"><Button variant="ghost" onClick={()=>patchState({currentHp:d.hp})}>Resetar PV máx.</Button><Button variant="ghost" onClick={()=>patchState({currentHp:0})}>Zerar PV</Button></div></Card>
      <Card className="p-5"><div className="flex items-center justify-between"><h2 className="text-3xl font-black">Vigor</h2><Badge>{currentVigor}/{d.vigor}</Badge></div><div className="mt-3"><ProgressBar value={currentVigor} max={d.vigor}/></div><div className="grid sm:grid-cols-3 gap-2 mt-4 items-end"><Input type="number" min="0" label="Quanto gastou/recuperou" value={sheet.state.lastVigorInput ?? 0} onChange={v=>patchState({lastVigorInput:v})}/><Button variant="danger" onClick={()=>applyVigor('spend',sheet.state.lastVigorInput)}>Gastar</Button><Button onClick={()=>applyVigor('recover',sheet.state.lastVigorInput)}>Recuperar</Button></div><div className="mt-2 flex gap-2 flex-wrap"><Button variant="ghost" onClick={()=>patchState({currentVigor:d.vigor})}>Resetar vigor</Button><Button variant="ghost" onClick={()=>patchState({currentVigor:0})}>Zerar vigor</Button></div></Card>
    </div>

    <div className="grid md:grid-cols-3 gap-5">
      <Card className="p-5"><h3 className="font-black text-2xl mb-3">Exaustão</h3><div className="flex items-center gap-5"><Button variant="ghost" onClick={()=>setExhaustion(exhaustion-1)}>-</Button><div className="text-6xl font-black w-20 text-center">{exhaustion}</div><Button variant="ghost" onClick={()=>setExhaustion(exhaustion+1)}>+</Button></div><p className="text-base text-zinc-400 mt-3">Controle o nível atual. O app registra a alteração no log da sessão.</p></Card>
      <Card className="p-5"><h3 className="font-black text-2xl mb-3">Descansos</h3><div className="grid grid-cols-2 gap-2 mb-3"><div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5"><div className="text-sm text-zinc-500">Curtos</div><div className="text-4xl font-black">{shortRests}</div></div><div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5"><div className="text-sm text-zinc-500">Longos</div><div className="text-4xl font-black">{longRests}</div></div></div><div className="flex gap-2 flex-wrap"><Button onClick={shortRest}>Descanso curto</Button><Button variant="ghost" onClick={longRest}>Descanso longo</Button><Button variant="ghost" onClick={()=>patchState({shortRests:0,longRests:0})}>Zerar contadores</Button></div></Card>
      <Card className="p-5"><h3 className="font-black text-2xl mb-3">Resumo rápido</h3><p className="text-base text-zinc-300">CR {d.cr} • Deslocamento {d.speed}m • CD Quirk {d.quirkDc} • Ataque Quirk {d.quirkAttack >= 0 ? `+${d.quirkAttack}` : d.quirkAttack}</p><div className="mt-3 rounded-xl border border-emerald-900 bg-emerald-950/20 p-3"><b>Pontos de Manifestação:</b> {qv.used}/{qv.total} usados • {qv.free} livres <span className="text-zinc-400">(limite {qv.cap})</span></div><p className="text-sm text-zinc-500 mt-2">Sem rolagem automática nesta aba: foco em acompanhamento de mesa.</p></Card>
    </div>

    <Card className="p-5"><h3 className="font-black text-2xl mb-3">Ações do turno</h3><p className="text-base text-zinc-400 mb-3">O painel cruza as ações do Capítulo 10.2 com as condições ativas do Capítulo 8.3 e os males de Exaustão. Use como checklist rápido; o Narrador decide exceções.</p><details className="mb-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4"><summary className="cursor-pointer font-bold">Atividades em um encontro de combate</summary><p className="mt-3 whitespace-pre-wrap text-base text-zinc-300">{COMBAT_ACTIVITIES_TEXT}</p></details><div className="grid md:grid-cols-2 gap-3">{COMBAT_ACTIONS.map(a=>{const st=actionStatus(a); return <div key={a.id} className={`rounded-xl border p-4 ${st.state==='Bloqueada'?'border-red-800 bg-red-950/30':st.state==='Atenção'?'border-amber-800 bg-amber-950/20':'border-emerald-800 bg-emerald-950/20'}`}><div className="flex items-center justify-between gap-2"><b className="text-xl">{a.name}</b><Badge>{st.state}</Badge></div><p className="mt-2 text-sm text-zinc-300 whitespace-pre-wrap">{a.summary}</p>{st.notes.length>0 && <ul className="mt-2 list-disc pl-5 text-sm text-amber-100">{st.notes.map(n=><li key={n}>{n}</li>)}</ul>}</div>})}</div></Card>

    <Card className="p-5"><h3 className="font-black text-2xl mb-3">Condições e males</h3><p className="text-base text-zinc-400 mb-3">Clique para aplicar/remover. Passe no ? para ver o que a condição faz.</p><div className="flex flex-wrap gap-2">{CONDITIONS.map(c=><span key={c.id} className={`inline-flex items-center gap-1 rounded-full px-4 py-3 text-base font-bold ${sheet.state.conditions?.includes(c.id)?'bg-amber-400 text-zinc-950':'bg-zinc-800 text-zinc-300'}`}><button type="button" onClick={()=>toggleCondition(c.id)}>{c.name}</button><Help text={c.summary}/></span>)}</div></Card>

    <Card className="p-5"><h3 className="font-black text-2xl mb-3">Log local da sessão</h3><div className="space-y-2 max-h-72 overflow-auto">{(sheet.auditPreview||[]).map((l,i)=><div key={i} className="rounded-lg bg-zinc-950 p-2 text-base"><Badge>{l.type}</Badge> <span className="text-zinc-400">{new Date(l.at).toLocaleTimeString()}</span> {JSON.stringify({...l,at:undefined,type:undefined})}</div>)}</div></Card>
  </div>
}
