import { Card, Badge, Help } from './ui.jsx';
import { ATTRIBUTES, ATTRIBUTE_KEYS, SKILLS, ATTRIBUTE_DESCRIPTIONS } from '../data/core.js';
import { UNIQUE_TRAITS, SUPERIOR_TRAITS } from '../data/fisionomias.js';
import { QUIRK_TYPES, QUIRK_BASES } from '../data/quirks.js';
import { LEGACIES } from '../data/personalization.js';
import { expectedTechniqueCount, expectedStrategyCount, maxTechniqueGrade } from '../data/progression.js';
import { derived, attrMod, fmt, skillValue } from '../utils/calculations.js';

const findName = (arr,id) => arr.find(x=>x.id===id)?.name || id;
const findTrait = id => UNIQUE_TRAITS.find(t=>t.id===id);

export default function CharacterSheet({sheet}){
  const d = derived(sheet);
  const hero = sheet.heroName || sheet.name || 'Personagem sem nome';
  const legacy = LEGACIES.find(l=>l.id===sheet.legacyId);
  const expectedTech = expectedTechniqueCount(sheet.quirk?.path || 'primario', sheet.level);
  const expectedStrat = expectedStrategyCount(sheet.quirk?.path || 'primario', sheet.level);
  const maxGrade = maxTechniqueGrade(sheet.level);
  return <div className="space-y-4 print:bg-white print:text-black">
    <Card className="p-5 print:shadow-none print:border-black print:bg-white">
      <div className="grid md:grid-cols-[1.2fr_.8fr] gap-5">
        <div className="space-y-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 print:border-black print:bg-white"><div className="text-sm uppercase tracking-widest text-zinc-500 print:text-black">Ficha de Personagem</div><h2 className="text-4xl font-black leading-tight">{hero}</h2><p className="text-zinc-400 print:text-black">{sheet.name && sheet.heroName ? sheet.name : '—'} • Jogador: {sheet.player || '—'}</p><p className="mt-2 text-base text-zinc-300 print:text-black">{sheet.concept || 'Conceito não preenchido.'}</p></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Box label="Classe" value={`${d.klass.name} ${sheet.level}`}/><Box label="Quirk" value={sheet.quirk.name || '—'}/><Box label="Tipo/Base" value={`${findName(QUIRK_TYPES,sheet.quirk.type)} / ${findName(QUIRK_BASES,sheet.quirk.base)}`}/><Box label="Legado" value={legacy?.name || '—'}/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <BigBox label="PV Máx." value={d.hp}/><BigBox label="Vigor" value={d.vigor}/><BigBox label="CR" value={d.cr}/><BigBox label="Desloc." value={`${d.speed}m`}/><BigBox label="Prof." value={fmt(d.prof)}/><BigBox label="CD Quirk" value={d.quirkDc}/>
        </div>
      </div>
    </Card>

    <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-5">
      <Card className="p-5 print:shadow-none print:border-black print:bg-white"><h3 className="font-black text-2xl mb-3">Atributos</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-2">{ATTRIBUTES.map(a=><div key={a} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-center print:border-black print:bg-white"><div className="text-sm text-zinc-500 print:text-black uppercase">{a} <Help text={ATTRIBUTE_DESCRIPTIONS[a]}/></div><div className="text-4xl font-black">{sheet.attributes[ATTRIBUTE_KEYS[a]]}</div><div className="text-xl font-bold text-emerald-300 print:text-black">{fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[a]]))}</div></div>)}</div></Card>
      <Card className="p-5 print:shadow-none print:border-black print:bg-white"><h3 className="font-black text-2xl mb-3">Perícias</h3><div className="grid sm:grid-cols-2 gap-1.5">{SKILLS.map(s=><div key={s.id} className="flex justify-between rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-3 text-base print:border-black print:bg-white"><span>{sheet.skillProfs.includes(s.name) ? '●' : '○'} {s.name} <span className="text-zinc-500 print:text-black">({s.attribute})</span></span><b>{fmt(skillValue(sheet,s.name))}</b></div>)}</div></Card>
    </div>

    <div className="grid lg:grid-cols-2 gap-5">
      <Card className="p-5 print:shadow-none print:border-black print:bg-white"><h3 className="font-black text-2xl mb-3">Quirk</h3><div className="flex gap-2 flex-wrap mb-3"><Badge>Ataque {fmt(d.quirkAttack)}</Badge><Badge>CD {d.quirkDc}</Badge><Badge>Atributo: {sheet.quirk.attribute}</Badge><Badge>{expectedTech} técnica(s)</Badge><Badge>{expectedStrat} estratagema(s)</Badge><Badge>Grau máx. {maxGrade}</Badge></div><Label title="Conceito" text={sheet.quirk.concept}/><Label title="Manifestações" text={sheet.quirk.manifestations}/><Label title="Estratagemas" text={sheet.quirk.strategies}/><Label title="Limites/Fraquezas" text={sheet.quirk.weakness}/></Card>
      <Card className="p-5 print:shadow-none print:border-black print:bg-white"><h3 className="font-black text-2xl mb-3">Fisionomia</h3><Label title="Traço Superior" text={`${findName(SUPERIOR_TRAITS,sheet.superiorTrait)} — ${SUPERIOR_TRAITS.find(t=>t.id===sheet.superiorTrait)?.summary || ''}`}/><div className="space-y-2 mt-3">{sheet.uniqueTraits.map(id=>{const t=findTrait(id); return <div key={id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 print:border-black print:bg-white"><b>{t?.name || id}</b><p className="text-sm text-zinc-400 print:text-black mt-1">{t?.summary || '—'}</p></div>})}</div></Card>
    </div>

    <Card className="p-5 print:shadow-none print:border-black print:bg-white"><h3 className="font-black text-2xl mb-3">Técnicas</h3><div className="grid md:grid-cols-2 gap-5">{sheet.techniques.map(t=><div key={t.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 print:border-black print:bg-white"><div className="flex justify-between gap-2"><b className="text-xl">{t.name}</b><Badge>Grau {t.grade}</Badge></div><div className="mt-2 grid grid-cols-2 gap-1 text-sm text-zinc-400 print:text-black"><span>Ação: <b>{t.action}</b></span><span>Custo: <b>{t.cost}</b></span><span>Alcance: <b>{t.range}</b></span><span>Área: <b>{t.area}</b></span><span>Dano/Efeito: <b>{t.damage || '—'}</b></span><span>Teste: <b>{t.save || '—'}</b></span></div><p className="text-base text-zinc-300 print:text-black mt-2 whitespace-pre-wrap">{t.notes || t.summary}</p></div>)}</div></Card>

    <Card className="p-5 print:shadow-none print:border-black print:bg-white"><h3 className="font-black text-2xl mb-3">Itens, apetrechos e inventário</h3><div className="grid grid-cols-3 gap-2 mb-3"><Box label="Dinheiro" value={sheet.inventory?.money || '—'}/><Box label="Carga" value={sheet.inventory?.carryingNotes || '—'}/><Box label="Depósito" value={sheet.inventory?.storageNotes || '—'}/></div><div className="grid md:grid-cols-2 gap-5">{(sheet.items||[]).map(i=><div key={i.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 print:border-black print:bg-white"><b>{i.name}</b><p className="text-sm text-zinc-400 print:text-black">{i.type} • {i.kind || '—'} • Qtd. {i.quantity ?? 1} • {i.damage || '—'} • {i.attribute || '—'}</p><p className="text-base mt-1 text-zinc-300 print:text-black">{i.notes}</p></div>)}</div></Card>

    <Card className="p-5 print:shadow-none print:border-black print:bg-white"><h3 className="font-black text-2xl mb-3">Legado, personalidade e história</h3><div className="grid md:grid-cols-2 gap-5"><Label title="Legado" text={`${legacy?.name || '—'} — ${legacy?.summary || ''}`}/><Label title="Notas do legado" text={sheet.legacyNotes}/><Label title="Personalidade" text={sheet.personality}/><Label title="Sonho/Caminho" text={`${sheet.dream || '—'} / ${sheet.path || '—'}`}/><Label title="Backstory" text={sheet.backstory}/><Label title="Aparência" text={sheet.appearance}/></div></Card>

    <Card className="p-5 print:shadow-none print:border-black print:bg-white"><h3 className="font-black text-2xl mb-3">Missões</h3><div className="grid md:grid-cols-2 gap-5">{(sheet.missions||[]).map(m=><div key={m.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 print:border-black print:bg-white"><div className="flex justify-between gap-2"><b>{m.title}</b><Badge>{m.status}</Badge></div><p className="text-sm text-zinc-400 print:text-black mt-1">Recompensa: {m.reward || '—'}</p><ul className="mt-2 list-disc pl-5 text-base text-zinc-300 print:text-black">{(m.objectives||[]).map(o=><li key={o}>{o}</li>)}</ul><p className="text-base text-zinc-300 print:text-black mt-2 whitespace-pre-wrap">{m.notes}</p></div>)}</div><p className="mt-3 text-base whitespace-pre-wrap text-zinc-300 print:text-black">{sheet.notes}</p></Card>
  </div>
}
function Box({label,value}){return <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 print:border-black print:bg-white"><div className="text-sm uppercase text-zinc-500 print:text-black">{label}</div><div className="font-bold">{value}</div></div>}
function BigBox({label,value}){return <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-center print:border-black print:bg-white"><div className="text-sm uppercase text-zinc-500 print:text-black">{label}</div><div className="text-4xl font-black">{value}</div></div>}
function Label({title,text}){return <div className="mb-3"><div className="text-sm uppercase tracking-wide text-zinc-500 print:text-black">{title}</div><p className="text-base whitespace-pre-wrap text-zinc-300 print:text-black">{text || '—'}</p></div>}
