import React from 'react';
import { Card, Badge, Help } from './ui.jsx';

const Step = ({n,title,children}) => <Card className="p-6 space-y-3"><div className="flex items-start gap-3"><Badge>{n}</Badge><h3 className="text-2xl font-black leading-tight">{title}</h3></div><div className="text-lg text-zinc-300 space-y-2 leading-relaxed">{children}</div></Card>;
const Mini = ({title,children}) => <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-2"><h4 className="text-xl font-black">{title}</h4><div className="text-lg text-zinc-300 leading-relaxed">{children}</div></div>;

const quirkExamples = [
  {
    name:'Explosões Cinéticas',
    anime:'Arquétipo de usuário que transforma suor, energia ou pressão corporal em explosões.',
    type:'Emissor ou Acumulação', base:'Dano', attr:'Destreza ou Força', path:'Quirk Primário',
    concept:'O personagem libera explosões curtas pelas mãos, pés ou pontos de contato. Funciona bem como dano direto, impulso de movimento e pressão em área.',
    weakness:'Exige preparo físico e controle fino. Pode causar recuo, barulho, dano colateral e fadiga se usado sem planejamento.',
    techniques:['1º grau: Disparo Explosivo — ataque à distância ou corpo a corpo com dano.', '2º/3º grau: Impulso Explosivo — movimentação rápida, salto ou reposicionamento.', 'Graus altos: Zona de Detonação — área de efeito com salvaguarda.']
  },
  {
    name:'Gelo e Calor Duplo',
    anime:'Arquétipo de domínio elemental dividido em dois lados ou duas fontes.',
    type:'Emissor ou Híbrido', base:'Dano/Controle', attr:'Vontade ou Constituição', path:'Quirk Primário',
    concept:'O personagem alterna entre criar barreiras, congelar terreno, lançar chamas e controlar zonas. É versátil, mas exige balancear efeitos opostos.',
    weakness:'Uso excessivo de um lado pode desequilibrar o corpo. O mestre pode exigir limites térmicos, concentração ou risco ambiental.',
    techniques:['1º grau: Rajada Térmica — dano elemental simples.', '3º grau: Muralha de Gelo — defesa/cobertura e controle de campo.', '5º grau: Onda Termal — dano em área ou condição ligada a calor/frio.']
  },
  {
    name:'Gravidade Local',
    anime:'Arquétipo de tocar algo e alterar peso, queda ou flutuação.',
    type:'Emissor', base:'Controle/Suporte', attr:'Vontade', path:'Quirk Auxiliar ou Primário',
    concept:'O personagem muda a relação de um alvo com a gravidade: levitar, aliviar peso, derrubar, suspender objetos e ajudar resgates.',
    weakness:'Costuma depender de toque, massa do alvo, concentração e náusea/fadiga em usos grandes.',
    techniques:['1º grau: Alívio Gravitacional — reduz peso ou ajuda deslocamento.', '3º grau: Queda Forçada — tenta aplicar Caído ou mover alvo.', '6º grau: Campo Antigravitacional — zona de controle para vários alvos.']
  },
  {
    name:'Endurecimento Corporal',
    anime:'Arquétipo de pele rígida, carapaça, pedra, metal ou reforço defensivo.',
    type:'Transformação ou Mutante', base:'Defesa', attr:'Constituição', path:'Quirk Auxiliar',
    concept:'O personagem transforma o corpo em defesa viva. Serve para tanque, guarda-costas, investidas e absorção de impacto.',
    weakness:'Pode reduzir mobilidade, exigir ativação, ter pontos frágeis ou falhar contra danos específicos.',
    techniques:['1º grau: Reforço Parcial — bônus defensivo ou redução de dano.', '3º grau: Investida Blindada — deslocamento + impacto.', '6º grau: Fortaleza Viva — defesa ampla ou proteção de aliado.']
  },
  {
    name:'Motor Biológico',
    anime:'Arquétipo de motores, turbinas, corrida extrema ou propulsão corporal.',
    type:'Mutante ou Transformação', base:'Suporte/Dano', attr:'Destreza ou Constituição', path:'Quirk Primário ou Auxiliar',
    concept:'O personagem converte combustível, respiração ou energia corporal em velocidade. Combina bem com Velocista, Resgate ou Marcial.',
    weakness:'Pode depender de combustível, superaquecimento, linhas retas e desgaste muscular.',
    techniques:['1º grau: Arranque — aumento de deslocamento.', '3º grau: Chute Propulsor — ataque com movimento.', '5º grau: Velocidade de Resgate — atravessar campo e carregar aliado.']
  },
  {
    name:'Cópia ou Adaptação Temporária',
    anime:'Arquétipo de copiar, roubar, espelhar ou adaptar poderes por janela curta.',
    type:'Híbrido ou Acumulação', base:'Utilidade/Controle', attr:'Inteligência ou Vontade', path:'Quirk Auxiliar',
    concept:'O personagem depende da situação e brilha quando identifica recursos do ambiente ou de outros usuários.',
    weakness:'Deve ter limites rígidos: toque, tempo curto, custo alto, número máximo de cópias e aprovação do mestre.',
    techniques:['1º grau: Leitura de Padrão — entende um efeito observado.', '3º grau: Imitação Parcial — replica uma função menor.', 'Graus altos: Adaptação Instável — efeito forte com risco claro.']
  }
];

export default function Tutorial(){
  return <div className="space-y-6">
    <Card className="p-6 bg-emerald-950/10 border-emerald-900/60">
      <h2 className="text-4xl font-black">Tutorial do jogador</h2>
      <p className="mt-2 text-xl text-zinc-300 leading-relaxed">Use esta aba como guia de mesa: criação inicial, atualização de nível e criação de Quirk. O app usa a ficha como centro, então tudo que altera número deve aparecer na aba <b>Ficha</b> e tudo que é controle de sessão deve ficar em <b>Combate</b>.</p>
    </Card>

    <section className="space-y-3">
      <h2 className="text-3xl font-black">Como preencher a ficha do zero</h2>
      <div className="grid lg:grid-cols-2 gap-5">
        <Step n="1" title="Identidade e conceito">
          <p>Preencha nome civil, nome heroico, jogador, aparência, personalidade, sonho, caminho e passado. Esses campos não são enfeite: eles ajudam o mestre a decidir consequências, cenas sociais e conflitos pessoais.</p>
        </Step>
        <Step n="2" title="Fisionomia">
          <p>Escolha 1 Traço Superior e 2 Traços Únicos. Se escolher <b>Evoluído</b>, o app libera 4 Traços Únicos. A fisionomia deve combinar com corpo, mutação, história ou Quirk do personagem.</p>
        </Step>
        <Step n="3" title="Classe e função">
          <p>Escolha a Classe. Ela define dado de vida, perícias disponíveis, salvaguardas, estilo de combate e atributo principal. O campo <b>Alinhamento/Função</b> é narrativo/social: Herói, Estudante, Vigilante, Profissional etc. Ele não substitui a Classe.</p>
        </Step>
        <Step n="4" title="Atributos predefinidos">
          <p>A ficha usa sempre o conjunto <b>15, 14, 13, 12, 10 e 8</b>. Distribua uma vez cada. Normalmente coloque 15 no atributo principal da Classe e uma pontuação alta em Constituição se quiser mais PV.</p>
        </Step>
        <Step n="5" title="Quirk">
          <p>Escolha tipo, base, caminho, atributo do Quirk, conceito, fraqueza e manifestações. O Quirk deve ter limites claros. Poder forte sem fraqueza vira problema de mesa e o app vai cobrar campos mínimos.</p>
        </Step>
        <Step n="6" title="Técnicas, itens e legado">
          <p>Adicione técnicas conforme o nível e caminho do Quirk. Depois preencha itens, apetrechos, dinheiro, inventário, legado, qualidades, defeitos, treinamentos e missões.</p>
        </Step>
      </div>
    </section>

    <section className="space-y-3">
      <h2 className="text-3xl font-black">Como atualizar após ganhar nível</h2>
      <Card className="p-6 space-y-4">
        <ol className="list-decimal pl-6 space-y-3 text-lg text-zinc-300 leading-relaxed">
          <li><b>Aumente o nível</b> na aba Criação. O app recalcula proficiência quando chegar nos marcos corretos.</li>
          <li><b>Atualize PV máximo.</b> O app usa dado fixo médio da classe + modificador de Constituição por nível, além dos bônus manuais.</li>
          <li><b>Veja se a Classe ganhou talento.</b> Registre na ficha/notas enquanto a base de talentos completa estiver sendo expandida.</li>
          <li><b>Confira o Quirk.</b> Em alguns níveis você ganha técnica, estratagema, manifestação ou grau máximo maior.</li>
          <li><b>Atualize técnicas.</b> Se ganhou técnica nova, use modelo ou escreva manualmente. Se o grau máximo aumentou, revise técnicas antigas com o mestre.</li>
          <li><b>Registre mudanças importantes</b> em Notas ou Missões: itens ganhos, recompensas, treinamento, mudanças de legado e efeitos permanentes.</li>
        </ol>
      </Card>
    </section>

    <section className="space-y-3">
      <h2 className="text-3xl font-black">Progressão de Quirk</h2>
      <Card className="p-6 space-y-4">
        <p className="text-lg text-zinc-300 leading-relaxed">O livro separa o Quirk em caminho <b>Primário</b> e <b>Auxiliar</b>. Primário recebe técnicas mais frequentemente. Auxiliar recebe menos técnicas, mas ainda começa com manifestações, técnica e estratagema. O app calcula a expectativa pelo nível escolhido.</p>
        <div className="grid lg:grid-cols-2 gap-5">
          <Mini title="Quirk Primário">
            <ul className="list-disc pl-5 space-y-1">
              <li>Base: 2 Manifestações de Quirk.</li>
              <li>Nível 1: Técnica de 1º grau e Estratagema.</li>
              <li>Nível 3: Técnica de 2º grau.</li>
              <li>Nível 6: Técnica de 3º grau e Estratagema.</li>
              <li>Nível 9: Técnica de 4º grau.</li>
              <li>Nível 12: Técnica de 5º grau, Estratagema e despertar.</li>
              <li>Níveis altos: técnicas de 6º e 7º grau.</li>
            </ul>
          </Mini>
          <Mini title="Quirk Auxiliar">
            <ul className="list-disc pl-5 space-y-1">
              <li>Base: 2 Manifestações de Quirk.</li>
              <li>Nível 1: Técnica de 1º grau e Estratagema.</li>
              <li>Nível 6: Técnica de 3º grau e Estratagema.</li>
              <li>Nível 12: Estratagema e despertar.</li>
              <li>Níveis altos: técnicas de 6º e 7º grau.</li>
              <li>Ideal para personagem que usa Quirk como suporte, mobilidade, defesa, investigação ou complemento.</li>
            </ul>
          </Mini>
        </div>
      </Card>
    </section>

    <section className="space-y-3">
      <h2 className="text-3xl font-black">Como criar um Quirk bom</h2>
      <div className="grid lg:grid-cols-3 gap-5">
        <Mini title="1. Defina o verbo do poder"><p>Escolha o que o Quirk faz em uma frase: emitir fogo, endurecer pele, alterar gravidade, copiar padrões, criar fios, acelerar o corpo.</p></Mini>
        <Mini title="2. Escolha tipo e base"><p><b>Tipo</b> explica como o poder existe. <b>Base</b> explica para que ele serve nas regras: dano, defesa, controle, suporte ou utilidade.</p></Mini>
        <Mini title="3. Escreva limites"><p>Defina custo, alcance, gatilho, fraqueza, risco de uso excessivo e situações em que o Quirk falha. Isso impede abuso e ajuda o mestre.</p></Mini>
      </div>
    </section>

    <section className="space-y-3">
      <h2 className="text-3xl font-black">Exemplos de Quirk inspirados em anime</h2>
      <p className="text-lg text-zinc-400">São modelos prontos para adaptar, não cópias fechadas de personagens. Ajuste dano, custo e alcance com o mestre.</p>
      <div className="grid xl:grid-cols-2 gap-5">{quirkExamples.map(q=><Card key={q.name} className="p-6 space-y-3"><div className="flex flex-wrap items-center gap-2"><Badge>{q.type}</Badge><Badge>{q.base}</Badge><Badge>{q.path}</Badge></div><h3 className="text-2xl font-black">{q.name}</h3><p className="text-lg text-zinc-400">{q.anime}</p><p className="text-lg text-zinc-300"><b>Atributo indicado:</b> {q.attr}</p><p className="text-lg text-zinc-300"><b>Conceito:</b> {q.concept}</p><p className="text-lg text-zinc-300"><b>Fraqueza:</b> {q.weakness}</p><div><b className="text-lg">Técnicas sugeridas:</b><ul className="mt-1 list-disc pl-5 text-lg text-zinc-300 space-y-1">{q.techniques.map(t=><li key={t}>{t}</li>)}</ul></div></Card>)}</div>
    </section>

    <section className="space-y-3">
      <h2 className="text-3xl font-black">Checklist rápido antes da sessão</h2>
      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-4 text-lg text-zinc-300">
          <p>□ PV atual e Vigor atual conferidos.</p>
          <p>□ Condições e exaustão atualizadas.</p>
          <p>□ Técnicas têm custo, ação, alcance, área e efeito.</p>
          <p>□ Itens e apetrechos equipados estão marcados.</p>
          <p>□ Missões e objetivos estão atualizados.</p>
          <p>□ Mudanças mecânicas foram aprovadas pelo mestre.</p>
        </div>
      </Card>
    </section>
  </div>
}
