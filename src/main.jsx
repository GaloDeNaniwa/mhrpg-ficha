import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Shield, BookOpen, Sword, UserRound, Save, Upload, Download, Database, Wand2, GraduationCap, Menu, X } from 'lucide-react';
import './index.css';
import { newSheet } from './data/defaultSheet.js';
import { derived, fmt } from './utils/calculations.js';
import { validateCharacter } from './utils/validators.js';
import { saveLocal, loadLocal, exportJson, importJsonFile } from './utils/storage.js';
import CharacterBuilder from './components/CharacterBuilder.jsx';
import CharacterSheet from './components/CharacterSheet.jsx';
import CombatPanel from './components/CombatPanel.jsx';
import Compendium from './components/Compendium.jsx';
import SecurityPanel from './components/SecurityPanel.jsx';
import Tutorial from './components/Tutorial.jsx';
import { Button, Stat, Badge, Input } from './components/ui.jsx';
import { generateRandomCharacter } from './utils/randomCharacter.js';
function App(){
  const [tab,setTab] = useState('builder');
  const [sheet,setSheet] = useState(newSheet());
  const [randomLevel,setRandomLevel] = useState(1);
  const [menuOpen,setMenuOpen] = useState(false);
  const [saveMsg,setSaveMsg] = useState('');
  const d = derived(sheet);
  const errors = useMemo(()=>validateCharacter(sheet, sheet.mode==='campaign'?'campaign':'draft'),[sheet]);
  const nav = [ ['builder',UserRound,'Criador'], ['sheet',Shield,'Ficha'], ['combat',Sword,'Combate'], ['compendium',BookOpen,'Compêndio'], ['tutorial',GraduationCap,'Tutorial'], ['security',Database,'Anti-burla'] ];
  const goTab = (id) => { setTab(id); setMenuOpen(false); };
  const doSave = () => { try { saveLocal(sheet); setSaveMsg('Salvo neste navegador.'); setTimeout(()=>setSaveMsg(''), 2500); } catch(e) { setSaveMsg('Erro ao salvar: ' + (e?.message || e)); } };
  const doLoad = () => { try { const l=loadLocal(); if(l){ setSheet(l); setSaveMsg('Ficha carregada.'); } else setSaveMsg('Nenhuma ficha salva neste navegador.'); setTimeout(()=>setSaveMsg(''), 2500); } catch(e) { setSaveMsg('Erro ao carregar: ' + (e?.message || e)); } };
  return <div className="min-h-screen bg-zinc-950 text-zinc-100"><header className="desktop-header sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur"><div className="mx-auto max-w-7xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div className="flex items-start justify-between gap-3"><div><h1 className="text-3xl md:text-4xl font-black">MHRPG V2</h1><p className="text-base text-zinc-400">Ficha + compêndio + modo combate + base Supabase/Vercel</p></div><Button className="md:hidden" variant="ghost" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18}/> : <Menu size={18}/>}</Button></div><div className={`${menuOpen ? 'flex' : 'hidden'} md:flex gap-2 flex-wrap`} >{nav.map(([id,Icon,label])=><Button key={id} variant={tab===id?'primary':'ghost'} onClick={()=>goTab(id)}><Icon size={16} className="inline mr-1"/>{label}</Button>)}</div></div></header><nav className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-20 grid-cols-5 gap-1 border-t border-zinc-800 bg-zinc-950/95 p-2 backdrop-blur">{nav.slice(0,5).map(([id,Icon,label])=><button key={id} type="button" onClick={()=>goTab(id)} className={`rounded-xl px-2 py-2 text-xs font-bold ${tab===id?'bg-emerald-500 text-zinc-950':'bg-zinc-900 text-zinc-300'}`}><Icon size={18} className="mx-auto mb-1"/>{label}</button>)}</nav><main className="mx-auto max-w-7xl px-4 py-6 space-y-5"><section className="grid grid-cols-2 md:grid-cols-6 gap-3"><Stat label="PV" value={d.hp}/><Stat label="CR" value={d.cr}/><Stat label="Vigor" value={d.vigor}/><Stat label="Prof." value={fmt(d.prof)}/><Stat label="Atk Quirk" value={fmt(d.quirkAttack)}/><Stat label="CD Quirk" value={d.quirkDc}/></section><section className="flex flex-wrap gap-2 items-end"><div className="w-44"><Input type="number" min="1" max="20" label="Nível aleatório" value={randomLevel} onChange={v=>setRandomLevel(Math.max(1,Math.min(20,Number(v)||1)))}/></div><Button onClick={()=>{setSheet(generateRandomCharacter(randomLevel)); setTab('sheet')}}><Wand2 size={16} className="inline mr-1"/>Gerar personagem aleatório</Button><Button onClick={doSave}><Save size={16} className="inline mr-1"/>Salvar local</Button><Button variant="ghost" onClick={doLoad}><Upload size={16} className="inline mr-1"/>Carregar local</Button><Button variant="ghost" onClick={()=>exportJson(sheet, `${sheet.heroName || sheet.name || 'ficha-mhrpg'}.json`)}><Download size={16} className="inline mr-1"/>Exportar JSON</Button><label className="rounded-xl border border-zinc-700 px-5 py-4 text-base font-semibold cursor-pointer hover:bg-zinc-800">Importar JSON<input type="file" accept="application/json" className="hidden" onChange={async e=>{if(e.target.files?.[0]) setSheet(await importJsonFile(e.target.files[0]))}}/></label><Badge>{errors.length ? `${errors.length} validação(ões)` : 'Ficha válida no modo atual'}</Badge>{saveMsg && <Badge className="bg-emerald-900 text-emerald-100">{saveMsg}</Badge>}</section>{tab==='builder' && <CharacterBuilder sheet={sheet} setSheet={setSheet} errors={errors}/>} {tab==='sheet' && <CharacterSheet sheet={sheet} setSheet={setSheet}/>} {tab==='combat' && <CombatPanel sheet={sheet} setSheet={setSheet}/>} {tab==='compendium' && <Compendium/>} {tab==='tutorial' && <Tutorial/>} {tab==='security' && <SecurityPanel/>}</main></div>
}
createRoot(document.getElementById('root')).render(<App/>);
