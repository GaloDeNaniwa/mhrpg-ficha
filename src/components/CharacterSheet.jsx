import { useState } from 'react';
import { Card, Badge, Help } from './ui.jsx';
import { ATTRIBUTES, ATTRIBUTE_KEYS, SKILLS, ATTRIBUTE_DESCRIPTIONS } from '../data/core.js';
import { UNIQUE_TRAITS, SUPERIOR_TRAITS } from '../data/fisionomias.js';
import { QUIRK_TYPES, QUIRK_BASES, NATIVE_ABILITIES, VIRTUAL_POINTS_TEXT } from '../data/quirks.js';
import { LEGACIES } from '../data/personalization.js';
import { expectedTechniqueCount, expectedStrategyCount, maxTechniqueGrade } from '../data/progression.js';
import { derived, attrMod, fmt, skillValue } from '../utils/calculations.js';

const findName = (arr,id) => arr.find(x=>x.id===id)?.name || id || '—';
const findTrait = id => UNIQUE_TRAITS.find(t=>t.id===id);
const emptyRows = (n) => Array.from({length:n}, (_,i)=>i);

export default function CharacterSheet({sheet}){
  const [view,setView] = useState('valores');
  const d = derived(sheet);
  const hero = sheet.heroName || sheet.name || 'Personagem sem nome';
  const legacy = LEGACIES.find(l=>l.id===sheet.legacyId);
  const expectedTech = expectedTechniqueCount(sheet.quirk?.path || 'primario', sheet.level);
  const expectedStrat = expectedStrategyCount(sheet.quirk?.path || 'primario', sheet.level);
  const maxGrade = maxTechniqueGrade(sheet.level);
  const qvMax = Number(sheet.quirk?.virtualPointsMax || 0);
  const qvUsed = Number(sheet.quirk?.virtualPointsUsed || 0);
  const qvFree = Math.max(0, qvMax - qvUsed);
  const sheetTabs = [
    ['valores','Valores'],
    ['personalizacao','Personalização e Inventário'],
    ['classes','Classes e Técnicas'],
    ['apetrechos','Apetrechos'],
  ];

  return <div className="sheet-wrap space-y-4 print:bg-white print:text-black">
    <Card className="p-3 md:p-4 print:shadow-none print:border-black print:bg-white">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-black">Ficha de Personagem</h2>
          <p className="text-zinc-400 print:text-black">Layout de leitura, print e consulta em mesa.</p>
        </div>
        <div className="flex flex-wrap gap-2">{sheetTabs.map(([id,label])=><button key={id} onClick={()=>setView(id)} className={`rounded-xl px-4 py-2 font-bold border ${view===id?'bg-emerald-500 text-zinc-950 border-emerald-400':'bg-zinc-950 border-zinc-800 text-zinc-200 hover:bg-zinc-800'}`}>{label}</button>)}</div>
      </div>
    </Card>

    <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/60 print:border-black print:bg-white">
      <div className="min-w-[1120px] p-4">
        {view==='valores' && <ValoresPage sheet={sheet} d={d} hero={hero} legacy={legacy}/>} 
        {view==='personalizacao' && <PersonalizacaoPage sheet={sheet} legacy={legacy}/>} 
        {view==='classes' && <ClassesPage sheet={sheet} d={d} expectedTech={expectedTech} expectedStrat={expectedStrat} maxGrade={maxGrade} qvMax={qvMax} qvUsed={qvUsed} qvFree={qvFree}/>} 
        {view==='apetrechos' && <ApetrechosPage sheet={sheet}/>} 
      </div>
    </div>
  </div>
}

function ValoresPage({sheet,d,hero,legacy}){
  const currentHp = sheet.state?.currentHp ?? d.hp;
  const currentVigor = sheet.state?.currentVigor ?? d.vigor;
  const skillLeft = SKILLS.slice(0,10);
  const skillRight = SKILLS.slice(10);
  return <div className="sheet-grid sheet-grid-values">
    <Panel title="My Hero RPG" className="col-span-4">
      <div className="grid grid-cols-[110px_1fr] border border-zinc-700"><CellHead>Nome</CellHead><Cell big>{sheet.name || '—'}</Cell></div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <MiniField label="Nível" value={sheet.level}/><MiniField label="Experiência" value={sheet.xp}/><MiniField label="Proficiência" value={fmt(d.prof)}/>
        <MiniField label="Classe" value={d.klass.name}/><MiniField label="Legado" value={legacy?.name || '—'}/><MiniField label="Nome de Herói" value={hero}/>
        <MiniField label="Quirk" value={sheet.quirk?.name || '—'}/><MiniField label="Alinhamento/Função" value={sheet.alignment || '—'}/><MiniField label="Jogador" value={sheet.player || '—'}/>
      </div>
    </Panel>

    <Panel title="Pontos de Vida" className="col-span-2 text-center"><TripleNumber a={currentHp} b={d.hp} c={sheet.state?.tempHp || 0}/></Panel>
    <Panel title="Vigor" className="col-span-2 text-center"><TripleNumber a={currentVigor} b={d.vigor} c={sheet.manual?.vigorBonus || 0}/></Panel>
    <Panel title="Deslocamento" className="col-span-2"><div className="grid grid-cols-3 text-center"><SubHead>Terra</SubHead><SubHead>Voo</SubHead><SubHead>Nado</SubHead><Cell big>{d.speed}</Cell><Cell big>0</Cell><Cell big>0</Cell></div></Panel>

    <Panel title="Atributos" className="col-span-5">
      <div className="grid grid-cols-6 text-center text-sm">
        <SubHead>Atributo</SubHead><SubHead>Valor</SubHead><SubHead>Mod.</SubHead><SubHead>Atributo</SubHead><SubHead>Valor</SubHead><SubHead>Mod.</SubHead>
        {ATTRIBUTES.slice(0,3).map((a,i)=>{const b=ATTRIBUTES[i+3]; return <RowFrag key={a}>
          <Cell>{a} <Help text={ATTRIBUTE_DESCRIPTIONS[a]}/></Cell><Cell>{sheet.attributes[ATTRIBUTE_KEYS[a]]}</Cell><Cell strong>{fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[a]]))}</Cell>
          <Cell>{b} <Help text={ATTRIBUTE_DESCRIPTIONS[b]}/></Cell><Cell>{sheet.attributes[ATTRIBUTE_KEYS[b]]}</Cell><Cell strong>{fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[b]]))}</Cell>
        </RowFrag>})}
      </div>
    </Panel>

    <Panel title="Classe de Resistência" className="col-span-2"><InfoTable rows={[['Natural','10'],['Atributo',fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[sheet.primaryAttribute || 'Força']]))],['Outros',sheet.manual?.crBonus || 0]]} total={d.cr}/></Panel>
    <Panel title="Classe de Dificuldade" className="col-span-2"><InfoTable rows={[['Base','8'],['Proficiência',fmt(d.prof)],['Atributo',fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[sheet.quirk?.attribute || 'Força']]))]]} total={d.quirkDc}/></Panel>
    <Panel title="Anotações" className="col-span-3 row-span-2"><div className="min-h-[220px] whitespace-pre-wrap rounded-lg bg-white/5 p-3 text-zinc-300 print:text-black print:bg-white">{sheet.notes || '—'}</div></Panel>

    <Panel title="Perícias" className="col-span-5">
      <div className="grid grid-cols-10 text-sm">
        <SkillHeader/>{skillLeft.map(s=><SkillRow key={s.id} sheet={sheet} skill={s}/>) }
        <SkillHeader/>{skillRight.map(s=><SkillRow key={s.id} sheet={sheet} skill={s}/>) }
        {emptyRows(Math.max(0, skillLeft.length-skillRight.length)).map(i=><RowFrag key={i}><Cell></Cell><Cell></Cell><Cell></Cell><Cell></Cell><Cell></Cell></RowFrag>)}
      </div>
    </Panel>

    <Panel title="Salvaguardas" className="col-span-2"><div className="grid grid-cols-3 text-sm"><SubHead>Atributo</SubHead><SubHead>Total</SubHead><SubHead>Pro.</SubHead>{ATTRIBUTES.map(a=><RowFrag key={a}><Cell>{a}</Cell><Cell>{fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[a]]) + (sheet.saveProfs.includes(a)?d.prof:0))}</Cell><Cell>{sheet.saveProfs.includes(a)?'☑':'☐'}</Cell></RowFrag>)}</div></Panel>
    <Panel title="Dados de Vida" className="col-span-2"><div className="grid grid-cols-3 text-sm"><SubHead>Dado</SubHead><SubHead>Gastos</SubHead><SubHead>Disponível</SubHead>{['d12','d10','d8','d6'].map(die=><RowFrag key={die}><Cell>{die}</Cell><Cell></Cell><Cell>{`d${d.klass.hitDie}`===die ? sheet.level : ''}</Cell></RowFrag>)}</div></Panel>
  </div>
}

function PersonalizacaoPage({sheet,legacy}){
  const superior = SUPERIOR_TRAITS.find(t=>t.id===sheet.superiorTrait);
  return <div className="sheet-grid sheet-grid-persona">
    <Panel title="Nome" className="col-span-4"><Cell big>{sheet.name || '—'}</Cell><div className="grid grid-cols-[1fr_1.4fr] mt-2"><div><SubHead>Aparência</SubHead><div className="min-h-[170px] bg-white/5 p-3 whitespace-pre-wrap">{sheet.appearance || '—'}</div></div><div><PanelTitle>Social</PanelTitle><InfoRows rows={[['Nome de Herói',sheet.heroName],['Sonho',sheet.dream],['Caminho',sheet.path],['Afiliação/Função',sheet.alignment]]}/><PanelTitle>Físico</PanelTitle><InfoRows rows={[['Altura',sheet.height],['Peso',sheet.weight],['Idade',sheet.age],['Outros',sheet.clothing || sheet.voice]]}/></div></div></Panel>
    <Panel title="Personalização" className="col-span-2"><SubHead>Virtudes/Qualidades</SubHead><ListBox items={sheet.qualities}/><SubHead>Defeitos</SubHead><ListBox items={sheet.flaws}/></Panel>
    <Panel title="Legado" className="col-span-4"><div className="grid grid-cols-[1fr_1fr] gap-2"><MiniField label="Nome" value={legacy?.name || '—'}/><MiniField label="Atributo" value={legacy?.attribute || '—'}/></div><SubHead>Efeito</SubHead><div className="min-h-[190px] bg-white/5 p-3 whitespace-pre-wrap">{legacy?.exactText || legacy?.summary || sheet.legacyNotes || '—'}</div></Panel>
    <Panel title="História do Personagem" className="col-span-4 row-span-2"><div className="min-h-[450px] bg-white/5 p-4 whitespace-pre-wrap">{sheet.backstory || '—'}</div></Panel>
    <Panel title="Equipamentos" className="col-span-4"><div className="grid grid-cols-6 text-sm"><SubHead>Nome</SubHead><SubHead>Bônus</SubHead><SubHead>Dano</SubHead><SubHead>Propriedades</SubHead><SubHead>Tipo</SubHead><SubHead>Alcance</SubHead>{(sheet.items||[]).slice(0,7).map(i=><RowFrag key={i.id}><Cell>{i.name}</Cell><Cell>{i.proficient?'Prof.':''}</Cell><Cell>{i.damage}</Cell><Cell>{i.notes}</Cell><Cell>{i.kind || i.type}</Cell><Cell>{i.range || '—'}</Cell></RowFrag>)}</div></Panel>
    <Panel title="Fisionomia" className="col-span-2"><SubHead>Traço Superior</SubHead><Cell>{superior?.name || '—'}</Cell><SubHead>Traço Único</SubHead>{(sheet.uniqueTraits||[]).map(id=><Cell key={id}>{findTrait(id)?.name || id}</Cell>)}</Panel>
    <Panel title="Bolsa" className="col-span-2 row-span-2"><ListBox items={(sheet.items||[]).filter(i=>!i.equipped).map(i=>`${i.quantity || 1}x ${i.name}`)} min="min-h-[300px]"/><SubHead>Depósito/Base</SubHead><div className="whitespace-pre-wrap bg-white/5 p-2">{sheet.inventory?.storageNotes || '—'}</div></Panel>
    <Panel title="Munição" className="col-span-2"><div className="grid grid-cols-3 text-sm"><SubHead>Nome</SubHead><SubHead>Dano</SubHead><SubHead>Tipo</SubHead>{emptyRows(5).map(i=><RowFrag key={i}><Cell></Cell><Cell></Cell><Cell></Cell></RowFrag>)}</div></Panel>
    <Panel title="Dinheiro" className="col-span-1"><Cell big>{sheet.inventory?.money || '—'}</Cell></Panel>
    <Panel title="Treinamentos" className="col-span-4"><div className="grid grid-cols-[1fr_90px] text-sm"><SubHead>Treinamento</SubHead><SubHead>P. de Treino</SubHead>{(sheet.trainings||[]).map(t=><RowFrag key={t}><Cell>{t}</Cell><Cell></Cell></RowFrag>)}{emptyRows(Math.max(4, 8-(sheet.trainings||[]).length)).map(i=><RowFrag key={i}><Cell></Cell><Cell></Cell></RowFrag>)}</div></Panel>
  </div>
}

function ClassesPage({sheet,d,expectedTech,expectedStrat,maxGrade,qvMax,qvUsed,qvFree}){
  return <div className="sheet-grid sheet-grid-classes">
    <Panel title="Classe" className="col-span-3"><InfoRows rows={[['Nome',d.klass.name],['Categoria',d.klass.category],['Dado de Vida',`d${d.klass.hitDie}`],['Atributo Principal',sheet.primaryAttribute],['Prof. em Armas',d.klass.equipment?.join(', ')],['Arma Favorita','—']]}/></Panel>
    <Panel title="Vigor" className="col-span-1 text-center"><TripleNumber a={sheet.state?.currentVigor ?? d.vigor} b={d.vigor} c={sheet.manual?.vigorBonus || 0}/></Panel>
    <Panel title="Quirk" className="col-span-4"><div className="grid grid-cols-4 gap-2"><MiniField label="Nome" value={sheet.quirk?.name || '—'}/><MiniField label="Tipo" value={findName(QUIRK_TYPES,sheet.quirk?.type)}/><MiniField label="Base" value={findName(QUIRK_BASES,sheet.quirk?.base)}/><MiniField label="Atributo" value={sheet.quirk?.attribute}/><MiniField label="CD" value={d.quirkDc}/><MiniField label="Mod. de Atk" value={fmt(d.quirkAttack)}/><MiniField label="P. Virtuais" value={`${qvUsed}/${qvMax}`}/><MiniField label="Livres" value={qvFree}/></div><SubHead>Manifestações</SubHead><div className="min-h-[120px] bg-white/5 p-3 whitespace-pre-wrap">{sheet.quirk?.manifestations || '—'}</div></Panel>
    <Panel title="Talentos" className="col-span-3"><ListBox items={[...(d.klass.talents||[]), ...(sheet.manual?.talents || [])]} min="min-h-[110px]"/></Panel>
    <Panel title="Técnicas" className="col-span-3"><div className="grid grid-cols-5 text-sm"><SubHead>Nível</SubHead><SubHead>Grau</SubHead><SubHead>Técnica</SubHead><SubHead>Esperado</SubHead><SubHead>Atual</SubHead>{[['1º','1º'],['3º','2º'],['6º','3º'],['9º','4º'],['12º','5º'],['16º','6º'],['20º','7º']].map((r,i)=><RowFrag key={i}><Cell>{r[0]}</Cell><Cell>{r[1]}</Cell><Cell>{i===0?'Inicial':'Progressão'}</Cell><Cell>{expectedTech}</Cell><Cell>{sheet.techniques?.length || 0}</Cell></RowFrag>)}</div></Panel>
    <Panel title="Características da Classe Primária" className="col-span-3"><ListBox items={[d.klass.summary, ...(d.klass.features||[])]} min="min-h-[130px]"/></Panel>
    <Panel title="Características da Classe Secundária" className="col-span-3"><ListBox items={[]} min="min-h-[130px]"/></Panel>
    <Panel title="Habilidades Nativas" className="col-span-3"><ListBox items={(sheet.quirk?.nativeAbilities||[]).map(id=>NATIVE_ABILITIES.find(x=>x.id===id)?.name || id)} min="min-h-[130px]"/></Panel>
    <Panel title="Pontos Virtuais" className="col-span-3"><p className="text-sm text-zinc-300 whitespace-pre-wrap line-clamp-[8]">{VIRTUAL_POINTS_TEXT}</p><SubHead>Notas</SubHead><div className="bg-white/5 p-2 whitespace-pre-wrap">{sheet.quirk?.virtualPointsNotes || '—'}</div></Panel>
    <div className="col-span-9 grid grid-cols-3 gap-4">{(sheet.techniques||[]).map(t=><TechniqueCard key={t.id} t={t}/>)}</div>
  </div>
}

function ApetrechosPage({sheet}){
  const items = sheet.items?.length ? sheet.items : [];
  const slots = [...items, ...emptyRows(Math.max(0, 15-items.length)).map(i=>({id:`empty-${i}`, name:'Nome Apetrecho', empty:true}))];
  return <div className="grid grid-cols-3 gap-6">
    {slots.slice(0,15).map((i,idx)=><div key={i.id || idx} className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden"><div className="grid grid-cols-[1fr_1fr]"><div className="bg-emerald-900/60 p-2 text-center font-black uppercase">{i.empty?'Nome Apetrecho':i.name}</div><div className="bg-emerald-900/60 p-2 text-center font-black uppercase">Nome Mod e Efeito</div></div><div className="grid grid-cols-[72px_1fr_1fr_1fr] text-sm"><CellHead>Grau</CellHead><Cell>{i.grade || 'Básico'}</Cell><Cell></Cell><Cell></Cell><CellHead>Mods</CellHead><Cell>{i.modifiers || '—'}</Cell><Cell></Cell><Cell></Cell><CellHead>PC</CellHead><Cell>{i.cost || i.price || '—'}</Cell><Cell></Cell><Cell></Cell><CellHead>Dano/CR</CellHead><Cell>{i.damage || '—'}</Cell><Cell></Cell><Cell></Cell></div><div className="p-3 min-h-[72px] text-sm text-zinc-300 whitespace-pre-wrap">{i.notes || ''}</div></div>)}
  </div>
}

function TechniqueCard({t}){return <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden"><div className="bg-emerald-900/60 p-2 text-center font-black">Nome: {t.name || '—'}</div><div className="grid grid-cols-[70px_70px_1fr] text-sm"><CellHead>{t.grade || 1}º Grau</CellHead><CellHead>Custo</CellHead><Cell>{t.cost || '—'}</Cell><CellHead></CellHead><SubHead>Duração</SubHead><Cell>{t.duration || '—'}</Cell><CellHead></CellHead><SubHead>Alcance</SubHead><Cell>{t.range || '—'}</Cell><CellHead></CellHead><SubHead>Requisito</SubHead><Cell>{t.save || '—'}</Cell><CellHead></CellHead><SubHead>Dano</SubHead><Cell>{t.damage || '—'}</Cell></div><div className="min-h-[70px] p-3 text-sm text-zinc-300 whitespace-pre-wrap">{t.notes || t.summary || '—'}</div></div>}
function Panel({title,className='',children}){return <section className={`rounded-sm border border-zinc-700 bg-zinc-900/70 overflow-hidden print:border-black print:bg-white ${className}`}><PanelTitle>{title}</PanelTitle><div className="p-2">{children}</div></section>}
function PanelTitle({children}){return <div className="bg-emerald-900/70 px-3 py-2 text-center text-xl font-black text-white print:bg-white print:text-black print:border-b print:border-black">{children}</div>}
function Cell({children,big,strong}){return <div className={`min-h-8 border border-zinc-700 bg-zinc-950/70 px-2 py-1 print:border-black print:bg-white ${big?'text-2xl font-black':'text-sm'} ${strong?'font-black text-lg':''}`}>{children}</div>}
function CellHead({children}){return <div className="min-h-8 border border-zinc-700 bg-emerald-900/60 px-2 py-1 text-sm font-black print:border-black print:bg-white print:text-black">{children}</div>}
function SubHead({children}){return <div className="min-h-7 border border-zinc-700 bg-emerald-800/50 px-2 py-1 text-xs font-black text-center print:border-black print:bg-white print:text-black">{children}</div>}
function RowFrag({children}){return <>{children}</>}
function MiniField({label,value}){return <div className="grid grid-cols-[110px_1fr] border border-zinc-700"><CellHead>{label}</CellHead><Cell>{value || '—'}</Cell></div>}
function TripleNumber({a,b,c}){return <div className="grid grid-cols-3 text-center"><Cell big>{a}</Cell><Cell big>{b}</Cell><Cell big>{c}</Cell><SubHead>Atuais</SubHead><SubHead>Máximos</SubHead><SubHead>Temporários</SubHead></div>}
function InfoTable({rows,total}){return <div className="grid grid-cols-[1fr_80px_80px]"><div className="col-span-2">{rows.map(([k,v])=><div key={k} className="grid grid-cols-2"><CellHead>{k}</CellHead><Cell>{v}</Cell></div>)}</div><div className="row-span-3 flex items-center justify-center border border-zinc-700 bg-zinc-950 text-3xl font-black">{total}</div></div>}
function InfoRows({rows}){return <div className="space-y-1">{rows.map(([k,v])=><MiniField key={k} label={k} value={v}/>)}</div>}
function ListBox({items=[],min='min-h-[100px]'}){return <div className={`${min} bg-white/5 p-2 whitespace-pre-wrap`}>{items?.length ? items.map((x,i)=><div key={i} className="border-b border-zinc-800 py-1">{typeof x === 'string' ? x : JSON.stringify(x)}</div>) : '—'}</div>}
function SkillHeader(){return <><SubHead>Nome</SubHead><SubHead>Atributo</SubHead><SubHead>Outros</SubHead><SubHead>Pro.</SubHead><SubHead>Total</SubHead></>}
function SkillRow({sheet,skill}){return <RowFrag><Cell>{skill.name} <Help text={skill.description}/></Cell><Cell>{abbr(skill.attribute)}</Cell><Cell></Cell><Cell>{sheet.skillProfs.includes(skill.name)?'☑':'☐'}</Cell><Cell strong>{fmt(skillValue(sheet,skill.name))}</Cell></RowFrag>}
function abbr(a){return ({Força:'FOR',Destreza:'DES',Constituição:'CON',Inteligência:'INT',Vontade:'VON',Carisma:'CAR'})[a] || a}
