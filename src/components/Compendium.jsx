import { useMemo, useState } from 'react';
import { Card, Input, Badge } from './ui.jsx';
import { RULES, CONDITIONS } from '../data/rules.js';
import { CLASSES } from '../data/classes.js';
import { SUPERIOR_TRAITS, UNIQUE_TRAITS } from '../data/fisionomias.js';
import { QUIRK_BASES, QUIRK_TYPES, TECHNIQUE_TEMPLATES } from '../data/quirks.js';
export default function Compendium(){
  const [q,setQ] = useState('');
  const entries = useMemo(()=>[
    ...RULES.map(r=>({...r,type:'Regra'})),
    ...CONDITIONS.map(c=>({id:c.id,title:c.name,summary:c.summary,tags:c.tags,type:'Condição'})),
    ...CLASSES.map(c=>({id:c.id,title:c.name,summary:c.summary,tags:[c.category,'classe',...c.primary],type:'Classe'})),
    ...SUPERIOR_TRAITS.map(t=>({id:t.id,title:t.name,summary:t.summary,tags:['fisionomia','traço superior'],type:'Traço Superior'})),
    ...UNIQUE_TRAITS.map(t=>({id:t.id,title:t.name,summary:t.summary,tags:['fisionomia','traço único'],type:'Traço Único'})),
    ...QUIRK_TYPES.map(t=>({id:t.id,title:t.name,summary:t.summary,tags:['quirk','tipo'],type:'Tipo de Quirk'})),
    ...QUIRK_BASES.map(t=>({id:t.id,title:t.name,summary:t.summary,tags:['quirk','base'],type:'Base de Quirk'})),
    ...TECHNIQUE_TEMPLATES.map(t=>({id:t.id,title:t.name,summary:t.summary,tags:['técnica',t.base,t.action],type:'Modelo de Técnica'}))
  ],[]);
  const filtered = entries.filter(e => `${e.title} ${e.summary} ${e.tags?.join(' ')}`.toLowerCase().includes(q.toLowerCase()));
  return <div className="space-y-4"><Card className="p-5"><h2 className="text-3xl font-black">Compêndio pesquisável</h2><p className="text-zinc-400 text-base mt-1">Conteúdo em formato prático de consulta. Não é transcrição integral do PDF.</p><Input label="Buscar regra, classe, condição, traço ou técnica" value={q} onChange={setQ}/></Card><div className="grid md:grid-cols-2 gap-5">{filtered.map(e=><Card key={`${e.type}-${e.id}`} className="p-5"><div className="flex items-start justify-between gap-5"><div><Badge>{e.type}</Badge><h3 className="text-2xl font-black mt-2">{e.title}</h3></div>{e.page && <Badge>p. {e.page}</Badge>}</div><p className="mt-2 text-base text-zinc-300">{e.summary}</p><div className="mt-3 flex gap-1 flex-wrap">{e.tags?.map(t=><span className="text-sm text-zinc-500" key={t}>#{t}</span>)}</div></Card>)}</div></div>
}
