import { Card, Badge } from './ui.jsx';
export default function SecurityPanel(){
  const rules = [
    ['Console/LocalStorage','O front-end só orienta; campanha usa validação server-side e RLS.'],
    ['Atributos abusivos','Constraints no banco, validador de compra de pontos e logs de mudança.'],
    ['Traços duplicados','Índices únicos e função de validação antes de salvar.'],
    ['Nível sem XP','Trigger bloqueia nível acima da tabela de XP sem override do mestre.'],
    ['Técnica adulterada','Custo, grau, área e dano passam por função validate_character_sheet.'],
    ['Item raro grátis','Itens de campanha exigem concessão pelo mestre/admin.'],
    ['Editar ficha alheia','RLS: dono edita a própria ficha; mestre edita fichas da campanha; público só lê.'],
    ['Remover condição negativa','Em modo campanha, condições aplicadas pelo mestre só o mestre remove.'],
    ['Falsificar mestre','Papéis ficam em profiles e membership, não no payload do cliente.'],
    ['Apagar histórico','Audit logs são append-only por trigger.']
  ];
  return <Card className="p-5"><h2 className="text-3xl font-black">Plano anti-burla implementado</h2><p className="text-base text-zinc-400 mt-1">Esta tela documenta as proteções que acompanham o schema do Supabase.</p><div className="mt-4 grid md:grid-cols-2 gap-5">{rules.map(([risk,guard])=><div key={risk} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"><Badge>risco</Badge><h3 className="font-bold mt-2">{risk}</h3><p className="text-base text-zinc-400">{guard}</p></div>)}</div></Card>
}
