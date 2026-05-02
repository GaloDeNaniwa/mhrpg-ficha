import { useState } from 'react';
import { Card, Help } from './ui.jsx';
import { ATTRIBUTES, ATTRIBUTE_KEYS, SKILLS, ATTRIBUTE_DESCRIPTIONS } from '../data/core.js';
import { UNIQUE_TRAITS, SUPERIOR_TRAITS } from '../data/fisionomias.js';
import { NATIVE_ABILITIES } from '../data/quirks.js';
import { LEGACIES } from '../data/personalization.js';
import { expectedTechniqueCount, expectedStrategyCount, maxTechniqueGrade } from '../data/progression.js';
import { derived, attrMod, fmt, skillValue, manifestationVirtualPoints } from '../utils/calculations.js';

const findTrait = id => UNIQUE_TRAITS.find(t => t.id === id);
const abbr = a => ({ Força:'FOR', Destreza:'DES', Constituição:'CON', Inteligência:'INT', Vontade:'VON', Carisma:'CAR' })[a] || a;
const safe = v => (v === 0 || v ? v : '—');
const text = v => (Array.isArray(v) ? v.filter(Boolean).join('\n') : safe(v));

export default function CharacterSheet({ sheet, setSheet }) {
  const [view, setView] = useState('valores');
  const d = derived(sheet);
  const legacy = LEGACIES.find(l => l.id === sheet.legacyId);
  const hero = sheet.heroName || sheet.name || 'Personagem sem nome';
  const expectedTech = expectedTechniqueCount(sheet.quirk?.path || 'primario', sheet.level);
  const expectedStrat = expectedStrategyCount(sheet.quirk?.path || 'primario', sheet.level);
  const maxGrade = maxTechniqueGrade(sheet.level);
  const qv = manifestationVirtualPoints(sheet.quirk || {});

  const tabs = [
    ['valores', 'Valores'],
    ['personalizacao', 'Personalização e Inventário'],
    ['classes', 'Classes e Técnicas'],
    ['apetrechos', 'Apetrechos'],
  ];

  return (
    <div className="sheet-wrap space-y-4 print:bg-white print:text-black">
      <Card className="p-4 print:border-black print:bg-white print:shadow-none">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-black md:text-3xl">Ficha de Personagem</h2>
            <p className="text-base text-zinc-400 print:text-black">Layout responsivo para leitura, print e consulta em mesa.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={`rounded-xl border px-4 py-3 text-sm font-black transition md:text-base ${
                  view === id
                    ? 'border-emerald-400 bg-emerald-500 text-zinc-950'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-100 hover:bg-zinc-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3 md:p-5 print:border-black print:bg-white">
        {view === 'valores' && <ValoresPage sheet={sheet} d={d} hero={hero} legacy={legacy} />}
        {view === 'personalizacao' && <PersonalizacaoPage sheet={sheet} legacy={legacy} />}
        {view === 'classes' && <ClassesPage sheet={sheet} d={d} expectedTech={expectedTech} expectedStrat={expectedStrat} maxGrade={maxGrade} qv={qv} />}
        {view === 'apetrechos' && <ApetrechosPage sheet={sheet} setSheet={setSheet} />}
      </div>
    </div>
  );
}

function ValoresPage({ sheet, d, hero, legacy }) {
  const currentHp = sheet.state?.currentHp ?? d.hp;
  const currentVigor = sheet.state?.currentVigor ?? d.vigor;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[minmax(360px,1.35fr)_minmax(180px,.55fr)_minmax(180px,.55fr)_minmax(180px,.55fr)]">
        <Panel title="My Hero RPG">
          <div className="space-y-3">
            <Line label="Nome" value={sheet.name} big />
            <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-3">
              <Line label="Nível" value={sheet.level} />
              <Line label="Experiência" value={sheet.xp} />
              <Line label="Proficiência" value={fmt(d.prof)} />
              <Line label="Classe" value={d.klass.name} />
              <Line label="Legado" value={legacy?.name} />
              <Line label="Nome de Herói" value={hero} />
              <Line label="Quirk" value={sheet.quirk?.name} />
              <Line label="Alinhamento/Função" value={sheet.alignment} />
              <Line label="Jogador" value={sheet.player} />
            </div>
          </div>
        </Panel>

        <Panel title="Pontos de Vida"><TripleNumber a={currentHp} b={d.hp} c={sheet.state?.tempHp || 0} /></Panel>
        <Panel title="Vigor"><TripleNumber a={currentVigor} b={d.vigor} c={sheet.manual?.vigorBonus || 0} /></Panel>
        <Panel title="Deslocamento">
          <div className="grid grid-cols-3 text-center">
            <TableHead>Terra</TableHead><TableHead>Voo</TableHead><TableHead>Nado</TableHead>
            <ValueBox>{d.speed}</ValueBox><ValueBox>0</ValueBox><ValueBox>0</ValueBox>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 2xl:grid-cols-[minmax(420px,1fr)_minmax(260px,.65fr)_minmax(260px,.65fr)_minmax(320px,.8fr)]">
        <Panel title="Atributos">
          <ResponsiveTable>
            <thead><tr><th>Atributo</th><th>Valor</th><th>Mod.</th><th>Atributo</th><th>Valor</th><th>Mod.</th></tr></thead>
            <tbody>
              {ATTRIBUTES.slice(0, 3).map((a, i) => {
                const b = ATTRIBUTES[i + 3];
                return (
                  <tr key={a}>
                    <td>{a} <Help text={ATTRIBUTE_DESCRIPTIONS[a]} /></td>
                    <td>{sheet.attributes[ATTRIBUTE_KEYS[a]]}</td>
                    <td className="font-black">{fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[a]]))}</td>
                    <td>{b} <Help text={ATTRIBUTE_DESCRIPTIONS[b]} /></td>
                    <td>{sheet.attributes[ATTRIBUTE_KEYS[b]]}</td>
                    <td className="font-black">{fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[b]]))}</td>
                  </tr>
                );
              })}
            </tbody>
          </ResponsiveTable>
        </Panel>

        <Panel title="Classe de Resistência"><ScoreBreakdown rows={[['Natural', '10'], ['Atributo', fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[sheet.primaryAttribute || 'Força']]))], ['Outros', sheet.manual?.crBonus || 0]]} total={d.cr} /></Panel>
        <Panel title="Classe de Dificuldade"><ScoreBreakdown rows={[['Base', '8'], ['Proficiência', fmt(d.prof)], ['Atributo', fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[sheet.quirk?.attribute || 'Força']]))]]} total={d.quirkDc} /></Panel>
        <Panel title="Anotações"><TextBlock className="min-h-[180px]">{sheet.notes}</TextBlock></Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(620px,1.4fr)_minmax(260px,.55fr)_minmax(260px,.55fr)]">
        <Panel title="Perícias">
          <ResponsiveTable>
            <thead><tr><th>Nome</th><th>Atributo</th><th>Outros</th><th>Pro.</th><th>Total</th></tr></thead>
            <tbody>
              {SKILLS.map(skill => (
                <tr key={skill.id}>
                  <td>{skill.name} <Help text={skill.description} /></td>
                  <td>{abbr(skill.attribute)}</td>
                  <td></td>
                  <td>{sheet.skillProfs.includes(skill.name) ? '☑' : '☐'}</td>
                  <td className="font-black">{fmt(skillValue(sheet, skill.name))}</td>
                </tr>
              ))}
            </tbody>
          </ResponsiveTable>
        </Panel>

        <Panel title="Salvaguardas">
          <ResponsiveTable>
            <thead><tr><th>Atributo</th><th>Total</th><th>Pro.</th></tr></thead>
            <tbody>{ATTRIBUTES.map(a => <tr key={a}><td>{a}</td><td>{fmt(attrMod(sheet.attributes[ATTRIBUTE_KEYS[a]]) + (sheet.saveProfs.includes(a) ? d.prof : 0))}</td><td>{sheet.saveProfs.includes(a) ? '☑' : '☐'}</td></tr>)}</tbody>
          </ResponsiveTable>
        </Panel>

        <Panel title="Dados de Vida">
          <ResponsiveTable>
            <thead><tr><th>Dado</th><th>Gastos</th><th>Disponível</th></tr></thead>
            <tbody>{['d12', 'd10', 'd8', 'd6'].map(die => <tr key={die}><td>{die}</td><td></td><td>{`d${d.klass.hitDie}` === die ? sheet.level : ''}</td></tr>)}</tbody>
          </ResponsiveTable>
        </Panel>
      </div>
    </div>
  );
}

function PersonalizacaoPage({ sheet, legacy }) {
  const superior = SUPERIOR_TRAITS.find(t => t.id === sheet.superiorTrait);
  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[minmax(380px,1fr)_minmax(260px,.55fr)_minmax(360px,.95fr)]">
        <Panel title="Nome">
          <Line label="Nome" value={sheet.name} big />
          <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(180px,.8fr)_minmax(240px,1.1fr)]">
            <div><TableHead>Aparência</TableHead><TextBlock className="min-h-[180px]">{sheet.appearance}</TextBlock></div>
            <div className="space-y-3">
              <PanelTitle>Social</PanelTitle>
              <Line label="Nome de Herói" value={sheet.heroName} />
              <Line label="Sonho" value={sheet.dream} />
              <Line label="Caminho" value={sheet.path} />
              <Line label="Afiliação/Função" value={sheet.alignment} />
              <PanelTitle>Físico</PanelTitle>
              <Line label="Altura" value={sheet.height} />
              <Line label="Peso" value={sheet.weight} />
              <Line label="Idade" value={sheet.age} />
              <Line label="Outros" value={sheet.clothing || sheet.voice} />
            </div>
          </div>
        </Panel>

        <Panel title="Personalização">
          <TableHead>Virtudes/Qualidades</TableHead><ListBox items={sheet.qualities} />
          <TableHead>Defeitos</TableHead><ListBox items={sheet.flaws} />
        </Panel>

        <Panel title="Legado">
          <div className="grid gap-2 sm:grid-cols-2"><Line label="Nome" value={legacy?.name} /><Line label="Atributo" value={legacy?.attribute} /></div>
          <TableHead>Efeito</TableHead>
          <TextBlock className="min-h-[220px]">{legacy?.exactText || legacy?.summary || sheet.legacyNotes}</TextBlock>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(360px,.9fr)_minmax(380px,1fr)_minmax(220px,.55fr)_minmax(220px,.55fr)]">
        <Panel title="História do Personagem"><TextBlock className="min-h-[360px]">{sheet.backstory}</TextBlock></Panel>
        <Panel title="Equipamentos">
          <ResponsiveTable>
            <thead><tr><th>Nome</th><th>Bônus</th><th>Dano</th><th>Propriedades</th><th>Tipo</th><th>Alcance</th></tr></thead>
            <tbody>{(sheet.items || []).slice(0, 10).map(i => <tr key={i.id}><td>{i.name}</td><td>{i.proficient ? 'Prof.' : ''}</td><td>{i.damage}</td><td>{i.notes}</td><td>{i.kind || i.type}</td><td>{i.range || '—'}</td></tr>)}</tbody>
          </ResponsiveTable>
        </Panel>
        <Panel title="Fisionomia"><TableHead>Traço Superior</TableHead><TextBlock>{superior?.name}</TextBlock><TableHead>Traços Únicos</TableHead><ListBox items={(sheet.uniqueTraits || []).map(id => findTrait(id)?.name || id)} /></Panel>
        <Panel title="Bolsa"><ListBox items={(sheet.items || []).filter(i => !i.equipped).map(i => `${i.quantity || 1}x ${i.name}`)} min="min-h-[220px]" /><TableHead>Depósito/Base</TableHead><TextBlock>{sheet.inventory?.storageNotes}</TextBlock></Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(320px,.6fr)_minmax(240px,.45fr)_minmax(420px,1fr)]">
        <Panel title="Munição"><TextBlock>{sheet.inventory?.ammo}</TextBlock></Panel>
        <Panel title="Dinheiro"><ValueBox>{sheet.inventory?.money || '—'}</ValueBox></Panel>
        <Panel title="Treinamentos"><ListBox items={sheet.trainings} min="min-h-[180px]" /></Panel>
      </div>
    </div>
  );
}

function ClassesPage({ sheet, d, expectedTech, expectedStrat, maxGrade, qv }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[minmax(340px,.85fr)_minmax(160px,.35fr)_minmax(480px,1.25fr)]">
        <Panel title="Classe">
          <Line label="Nome" value={d.klass.name} />
          <Line label="Categoria" value={d.klass.category} />
          <Line label="Dado de Vida" value={`d${d.klass.hitDie}`} />
          <Line label="Atributo Principal" value={sheet.primaryAttribute} />
          <Line label="Prof. em Armas" value={(sheet.items || []).filter(i => i.proficient).map(i => i.name).join(', ')} />
          <Line label="Arma Favorita" value={sheet.favoriteWeapon} />
        </Panel>
        <Panel title="Vigor"><TripleNumber a={sheet.state?.currentVigor ?? d.vigor} b={d.vigor} c={sheet.manual?.vigorBonus || 0} /></Panel>
        <Panel title="Quirk">
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            <Line label="Nome" value={sheet.quirk?.name} />
            <Line label="Tipo" value={sheet.quirk?.type} />
            <Line label="Base" value={sheet.quirk?.base} />
            <Line label="Atributo" value={sheet.quirk?.attribute} />
            <Line label="CD" value={d.quirkDc} />
            <Line label="Mod. de Atk" value={fmt(d.quirkAttack)} />
            <Line label="P. Manifestação" value={`${qv.used}/${qv.total}`} />
            <Line label="Livres" value={qv.free} />
          </div>
          <TableHead>Manifestações</TableHead>
          <TextBlock className="min-h-[110px]">{sheet.quirk?.manifestations}</TextBlock>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title="Talentos"><ListBox items={sheet.talents} min="min-h-[120px]" /></Panel>
        <Panel title="Técnicas">
          <ResponsiveTable>
            <thead><tr><th>Nível</th><th>Grau</th><th>Técnica</th><th>Esperado</th><th>Atual</th></tr></thead>
            <tbody>{[['1º','1º'],['3º','2º'],['6º','3º'],['9º','4º'],['12º','5º'],['16º','6º'],['20º','7º']].map((r, i) => <tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td>{i === 0 ? 'Inicial' : 'Progressão'}</td><td>{expectedTech}</td><td>{sheet.techniques?.length || 0}</td></tr>)}</tbody>
          </ResponsiveTable>
          <div className="mt-2 text-sm text-zinc-300">Estratagemas esperados: <b>{expectedStrat}</b> • Grau máximo atual: <b>{maxGrade}º</b></div>
        </Panel>
        <Panel title="Características da Classe Primária"><ListBox items={[d.klass.summary, ...(d.klass.features || [])]} min="min-h-[120px]" /></Panel>
        <Panel title="Características da Classe Secundária"><ListBox items={[]} min="min-h-[120px]" /></Panel>
        <Panel title="Habilidades Nativas"><ListBox items={(sheet.quirk?.nativeAbilities || []).map(id => NATIVE_ABILITIES.find(x => x.id === id)?.name || id)} min="min-h-[120px]" /></Panel>
        <Panel title="Pontos de Manifestação">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Metric label="Máx." value={qv.total} />
            <Metric label="Usados" value={qv.used} />
            <Metric label="Livres" value={qv.free} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">Base 3 + ajuste da ativação ({qv.modifier >= 0 ? `+${qv.modifier}` : qv.modifier}). Limite: {qv.cap}. Ativação: {String(qv.activation || '').replace('_', ' ')}.</p>
          <TableHead>Notas</TableHead><TextBlock>{sheet.quirk?.virtualPointsNotes}</TextBlock>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {(sheet.techniques || []).map(t => <TechniqueCard key={t.id} t={t} />)}
      </div>
    </div>
  );
}

function ApetrechosPage({ sheet, setSheet }) {
  const items = sheet.items?.length ? sheet.items : [];
  const updateItem = (id, key, value) => setSheet?.(prev => ({ ...prev, items: (prev.items || []).map(i => i.id === id ? { ...i, [key]: value } : i) }));
  const addItem = () => setSheet?.(prev => ({ ...prev, items: [...(prev.items || []), { id: `item-${Date.now()}`, name: 'Novo apetrecho', type: 'Apetrecho', kind: 'Outro', quantity: 1, weight: 0, price: '', attribute: 'Força', proficient: false, equipped: true, damage: '', range: '—', grade: 'Básico', modifiers: '', cost: '', notes: '' }] }));
  const removeItem = id => setSheet?.(prev => ({ ...prev, items: (prev.items || []).filter(i => i.id !== id) }));

  return (
    <div className="space-y-4">
      {setSheet && <button type="button" onClick={addItem} className="rounded-xl bg-emerald-500 px-4 py-3 font-black text-zinc-950">+ Adicionar apetrecho/item</button>}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {items.map((i, idx) => (
          <div key={i.id || idx} className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/80">
            <div className="grid gap-px bg-zinc-700 sm:grid-cols-2">
              <div className="bg-emerald-900/70 p-3 text-center text-lg font-black uppercase break-words">{i.name || 'Nome Apetrecho'}</div>
              <div className="bg-emerald-900/70 p-3 text-center text-lg font-black uppercase break-words">Modificadores e efeito</div>
            </div>
            <div className="p-3 space-y-3">
              {setSheet ? (
                <>
                  <EditLine label="Nome" value={i.name} onChange={v => updateItem(i.id, 'name', v)} />
                  <div className="grid gap-2 sm:grid-cols-2"><EditLine label="Grau" value={i.grade || 'Básico'} onChange={v => updateItem(i.id, 'grade', v)} /><EditLine label="PC/Preço" value={i.cost || i.price || ''} onChange={v => updateItem(i.id, 'cost', v)} /></div>
                  <div className="grid gap-2 sm:grid-cols-2"><EditLine label="Dano/CR" value={i.damage || ''} onChange={v => updateItem(i.id, 'damage', v)} /><EditLine label="Alcance" value={i.range || '—'} onChange={v => updateItem(i.id, 'range', v)} /></div>
                  <EditLine label="Mods" value={i.modifiers || ''} onChange={v => updateItem(i.id, 'modifiers', v)} />
                  <EditArea label="Efeito/descrição" value={i.notes || ''} onChange={v => updateItem(i.id, 'notes', v)} />
                  <div className="flex flex-wrap gap-4 text-sm"><label><input type="checkbox" checked={Boolean(i.proficient)} onChange={() => updateItem(i.id, 'proficient', !i.proficient)} /> Proficiente</label><label><input type="checkbox" checked={Boolean(i.equipped)} onChange={() => updateItem(i.id, 'equipped', !i.equipped)} /> Equipado</label><button type="button" onClick={() => removeItem(i.id)} className="font-bold text-red-300">Remover</button></div>
                </>
              ) : (
                <>
                  <ResponsiveTable><tbody><tr><th>Grau</th><td>{i.grade || 'Básico'}</td></tr><tr><th>Mods</th><td>{i.modifiers || '—'}</td></tr><tr><th>PC</th><td>{i.cost || i.price || '—'}</td></tr><tr><th>Dano/CR</th><td>{i.damage || '—'}</td></tr><tr><th>Alcance</th><td>{i.range || '—'}</td></tr></tbody></ResponsiveTable>
                  <TextBlock className="min-h-[80px]">{i.notes}</TextBlock>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {!items.length && <TextBlock>Nenhum apetrecho cadastrado.</TextBlock>}
    </div>
  );
}

function Panel({ title, className = '', children }) {
  return <section className={`min-w-0 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/70 print:border-black print:bg-white ${className}`}><PanelTitle>{title}</PanelTitle><div className="min-w-0 p-3">{children}</div></section>;
}
function PanelTitle({ children }) { return <div className="bg-emerald-900/70 px-3 py-2 text-center text-lg font-black text-white md:text-xl print:border-b print:border-black print:bg-white print:text-black">{children}</div>; }
function TableHead({ children }) { return <div className="border border-zinc-700 bg-emerald-900/60 px-3 py-2 text-center text-sm font-black leading-snug print:border-black print:bg-white print:text-black">{children}</div>; }
function CellBox({ children, big = false, strong = false, className = '' }) { return <div className={`min-w-0 rounded-none border border-zinc-700 bg-zinc-950/70 px-3 py-2 leading-snug text-zinc-100 print:border-black print:bg-white print:text-black ${big ? 'text-xl font-black' : 'text-sm'} ${strong ? 'font-black' : ''} ${className}`}>{safe(children)}</div>; }
function ValueBox({ children }) { return <CellBox big className="text-center">{children}</CellBox>; }
function Line({ label, value, big = false }) { return <div className="grid min-w-0 grid-cols-[minmax(96px,34%)_minmax(0,1fr)]"><TableHead>{label}</TableHead><CellBox big={big}>{value}</CellBox></div>; }
function TextBlock({ children, className = '' }) { return <div className={`min-w-0 whitespace-pre-wrap break-words rounded-lg bg-white/5 p-3 text-sm leading-relaxed text-zinc-200 print:bg-white print:text-black ${className}`}>{text(children)}</div>; }
function ListBox({ items = [], min = 'min-h-[100px]' }) { return <TextBlock className={min}>{items?.length ? items.map(x => typeof x === 'string' ? x : JSON.stringify(x)).join('\n') : '—'}</TextBlock>; }
function TripleNumber({ a, b, c }) { return <div className="grid grid-cols-3 text-center"><ValueBox>{a}</ValueBox><ValueBox>{b}</ValueBox><ValueBox>{c}</ValueBox><TableHead>Atuais</TableHead><TableHead>Máximos</TableHead><TableHead>Temporários</TableHead></div>; }
function Metric({ label, value }) { return <div className="rounded-lg border border-zinc-700 bg-zinc-950/60 p-3"><div className="text-xs text-zinc-400">{label}</div><div className="text-2xl font-black">{value}</div></div>; }
function ScoreBreakdown({ rows, total }) { return <div className="grid grid-cols-[minmax(0,1fr)_80px] gap-2"><div className="space-y-1">{rows.map(([k, v]) => <Line key={k} label={k} value={v} />)}</div><div className="flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 text-3xl font-black print:bg-white">{total}</div></div>; }
function ResponsiveTable({ children }) { return <div className="w-full overflow-x-auto"><table className="sheet-table w-full min-w-[520px] border-collapse text-left text-sm">{children}</table></div>; }
function TechniqueCard({ t }) { return <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/80"><div className="bg-emerald-900/70 p-3 text-center font-black break-words">Nome: {t.name || '—'}</div><ResponsiveTable><tbody><tr><th>Grau</th><td>{t.grade || 1}º</td><th>Custo</th><td>{t.cost || '—'}</td></tr><tr><th>Duração</th><td>{t.duration || '—'}</td><th>Alcance</th><td>{t.range || '—'}</td></tr><tr><th>Requisito</th><td>{t.save || '—'}</td><th>Dano</th><td>{t.damage || '—'}</td></tr></tbody></ResponsiveTable><TextBlock className="min-h-[80px]">{t.notes || t.summary}</TextBlock></div>; }
function EditLine({ label, value, onChange }) { return <label className="block text-sm font-bold text-zinc-300"><span>{label}</span><input value={value || ''} onChange={e => onChange(e.target.value)} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-base text-zinc-100" /></label>; }
function EditArea({ label, value, onChange }) { return <label className="block text-sm font-bold text-zinc-300"><span>{label}</span><textarea rows={4} value={value || ''} onChange={e => onChange(e.target.value)} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-base leading-relaxed text-zinc-100" /></label>; }
