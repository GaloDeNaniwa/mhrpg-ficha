import { useMemo, useState } from 'react';
import { Card, Input, Badge } from './ui.jsx';
import { RULES, CONDITIONS } from '../data/rules.js';
import { CLASSES } from '../data/classes.js';
import { SUPERIOR_TRAITS, UNIQUE_TRAITS } from '../data/fisionomias.js';
import { QUIRK_BASES, QUIRK_TYPES, TECHNIQUE_TEMPLATES, NATIVE_ABILITIES, VIRTUAL_POINTS_TEXT, SPECIAL_MANIFESTATIONS } from '../data/quirks.js';
import { LEGACIES } from '../data/personalization.js';
import { BOOK_CHAPTERS } from '../data/bookFull.js';
import { EQUIPMENT_CHAPTER_TEXT } from '../data/equipmentFull.js';

export default function Compendium(){
  const [q,setQ] = useState('');
  const [expanded,setExpanded] = useState(null);
  const entries = useMemo(()=>[
    ...RULES.map(r=>({...r,type:'Regra', title:r.title, exactText:r.summary})),
    ...CONDITIONS.map(c=>({id:c.id,title:c.name,summary:c.summary,exactText:c.exactText || c.summary,tags:c.tags,type:'Condição/Mal'})),
    ...CLASSES.map(c=>({id:c.id,title:c.name,summary:c.summary,exactText:c.summary,tags:[c.category,'classe',...c.primary],type:'Classe'})),
    ...SUPERIOR_TRAITS.map(t=>({id:t.id,title:t.name,summary:t.summary,exactText:t.summary,tags:['fisionomia','traço superior'],type:'Traço Superior'})),
    ...UNIQUE_TRAITS.map(t=>({id:t.id,title:t.name,summary:t.summary,exactText:t.summary,tags:['fisionomia','traço único'],type:'Traço Único'})),
    ...LEGACIES.map(l=>({id:l.id,title:l.name,summary:l.summary,exactText:l.exactText || l.summary,tags:['legado', l.recommendedAttribute].filter(Boolean),type:'Legado'})),
    ...QUIRK_TYPES.map(t=>({id:t.id,title:t.name,summary:t.summary,exactText:t.summary,tags:['quirk','tipo'],type:'Tipo de Quirk'})),
    ...QUIRK_BASES.map(t=>({id:t.id,title:t.name,summary:t.summary,exactText:t.summary,tags:['quirk','base'],type:'Base de Quirk'})),
    ...NATIVE_ABILITIES.map(t=>({id:t.id,title:t.name,summary:t.summary,exactText:t.exactText || t.summary,tags:['quirk','habilidade nativa'],type:'Habilidade Nativa'})),
    {id:'pontos-virtuais',title:'Pontos Virtuais',summary:VIRTUAL_POINTS_TEXT,exactText:VIRTUAL_POINTS_TEXT,tags:['quirk','manifestação','pontos virtuais'],type:'Quirk'},
    ...SPECIAL_MANIFESTATIONS.map(t=>({id:t.id,title:t.name,summary:t.summary,exactText:t.exactText || t.summary,tags:['quirk','manifestação especial'],type:'Manifestação de Quirk'})),
    ...TECHNIQUE_TEMPLATES.map(t=>({id:t.id,title:t.name,summary:t.summary,exactText:t.summary,tags:['técnica',t.base,t.action],type:'Modelo de Técnica'})),
    {id:'equipamentos-exatos',title:'Capítulo 5 — Itens, Equipamentos e Apetrechos',summary:EQUIPMENT_CHAPTER_TEXT,exactText:EQUIPMENT_CHAPTER_TEXT,tags:['equipamento','apetrecho','item','capítulo 5'],type:'Capítulo completo'},
    ...BOOK_CHAPTERS.map(c=>({id:c.id,title:c.title,summary:c.text,exactText:c.text,tags:['livro completo','capítulo',String(c.page)],type:'Livro'}))
  ],[]);
  const needle=q.trim().toLowerCase();
  const filtered = entries.filter(e => !needle || `${e.title} ${e.summary} ${e.tags?.join(' ')}`.toLowerCase().includes(needle)).slice(0,120);
  return <div className="space-y-4"><Card className="p-5"><h2 className="text-3xl font-black">Compêndio pesquisável completo</h2><p className="text-zinc-400 text-base mt-1">Busca nas regras estruturadas e nos capítulos extraídos do PDF enviado. Use as entradas “Livro” para consultar seções inteiras.</p><Input label="Buscar regra, classe, condição, legado, quirk, item, apetrecho ou texto do livro" value={q} onChange={setQ}/></Card><div className="grid md:grid-cols-2 gap-5">{filtered.map(e=>{const key=`${e.type}-${e.id}`; const isOpen=expanded===key; const text=e.exactText || e.summary; return <Card key={key} className="p-5"><div className="flex items-start justify-between gap-5"><div><Badge>{e.type}</Badge><h3 className="text-2xl font-black mt-2">{e.title}</h3></div>{e.page && <Badge>p. {e.page}</Badge>}</div><p className="mt-2 text-base text-zinc-300 whitespace-pre-wrap">{isOpen ? text : (text?.length>650 ? text.slice(0,650)+'…' : text)}</p>{text?.length>650 && <button className="mt-3 text-emerald-300 font-bold" onClick={()=>setExpanded(isOpen?null:key)}>{isOpen?'Recolher':'Ler completo'}</button>}<div className="mt-3 flex gap-1 flex-wrap">{e.tags?.map(t=><span className="text-sm text-zinc-500" key={t}>#{t}</span>)}</div></Card>})}</div></div>
}
