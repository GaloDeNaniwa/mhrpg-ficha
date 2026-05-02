import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Shield, BookOpen, Sword, UserRound, Save, Upload, Download, Database, Wand2, GraduationCap } from 'lucide-react';
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
  const d = derived(sheet);
  const errors = useMemo(()=>validateCharacter(sheet, sheet.mode==='campaign'?'campaign':'draft'),[sheet]);
  const nav = [ ['builder',UserRound,'Criador'], ['sheet',Shield,'Ficha'], ['combat',Sword,'Combate'], ['compendium',BookOpen,'Compêndio'], ['tutorial',GraduationCap,'Tutorial'], ['security',Database,'Anti-burla'] ];
  return <div className="min-h-screen bg-zinc-950 text-zinc-100"><header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur"><div className="mx-auto max-w-7xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><h1 className="text-3xl md:text-4xl font-black">MHRPG V2</h1><p className="text-base text-zinc-400">Ficha + compêndio + modo combate + base Supabase/Vercel</p></div><div className="flex gap-2 flex-wrap">{nav.map(([id,Icon,label])=><Button key={id} variant={tab===id?'primary':'ghost'} onClick={()=>setTab(id)}><Icon size={16} className="inline mr-1"/>{label}</Button>)}</div></div></header><main className="mx-auto max-w-7xl px-4 py-6 space-y-5"><section className="grid grid-cols-2 md:grid-cols-6 gap-3"><Stat label="PV" value={d.hp}/><Stat label="CR" value={d.cr}/><Stat label="Vigor" value={d.vigor}/><Stat label="Prof." value={fmt(d.prof)}/><Stat label="Atk Quirk" value={fmt(d.quirkAttack)}/><Stat label="CD Quirk" value={d.quirkDc}/></section><section className="flex flex-wrap gap-2 items-end"><div className="w-44"><Input type="number" min="1" max="20" label="Nível aleatório" value={randomLevel} onChange={v=>setRandomLevel(Math.max(1,Math.min(20,Number(v)||1)))}/></div><Button onClick={()=>{setSheet(generateRandomCharacter(randomLevel)); setTab('sheet')}}><Wand2 size={16} className="inline mr-1"/>Gerar personagem aleatório</Button><Button onClick={()=>{saveLocal(sheet)}}><Save size={16} className="inline mr-1"/>Salvar local</Button><Button variant="ghost" onClick={()=>{const l=loadLocal(); if(l) setSheet(l)}}><Upload size={16} className="inline mr-1"/>Carregar local</Button><Button variant="ghost" onClick={()=>exportJson(sheet, `${sheet.heroName || sheet.name || 'ficha-mhrpg'}.json`)}><Download size={16} className="inline mr-1"/>Exportar JSON</Button><label className="rounded-xl border border-zinc-700 px-5 py-4 text-base font-semibold cursor-pointer hover:bg-zinc-800">Importar JSON<input type="file" accept="application/json" className="hidden" onChange={async e=>{if(e.target.files?.[0]) setSheet(await importJsonFile(e.target.files[0]))}}/></label><Badge>{errors.length ? `${errors.length} validação(ões)` : 'Ficha válida no modo atual'}</Badge></section>{tab==='builder' && <CharacterBuilder sheet={sheet} setSheet={setSheet} errors={errors}/>} {tab==='sheet' && <CharacterSheet sheet={sheet}/>} {tab==='combat' && <CombatPanel sheet={sheet} setSheet={setSheet}/>} {tab==='compendium' && <Compendium/>} {tab==='tutorial' && <Tutorial/>} {tab==='security' && <SecurityPanel/>}</main></div>
}
createRoot(document.getElementById('root')).render(<App/>);
