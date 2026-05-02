export const QUIRK_TYPES = [
  {id:'emissor', name:'Emissor', summary:'Quirk focado em projetar, liberar, controlar ou afetar algo fora do corpo.'},
  {id:'mutante', name:'Mutante', summary:'Quirk ligado a uma alteração corporal constante ou característica biológica.'},
  {id:'transformacao', name:'Transformação', summary:'Quirk ativado para mudar o corpo, estado, forma ou funcionamento por tempo limitado.'},
  {id:'acumulacao', name:'Acumulação', summary:'Quirk que guarda, converte ou acumula energia, matéria, estímulos ou condições.'},
  {id:'hibrido', name:'Híbrido', summary:'Combina leituras diferentes de funcionamento. Deve ser validado pelo mestre.'}
];
export const QUIRK_BASES = [
  {id:'dano', name:'Dano', summary:'Técnicas voltadas a ferir, romper defesa ou pressionar alvos.', defaultCost:1},
  {id:'defesa', name:'Defesa', summary:'Técnicas de proteção, redução, barreira, reação ou resistência.', defaultCost:1},
  {id:'controle', name:'Controle', summary:'Movimento forçado, restrição, alteração de campo ou manipulação tática.', defaultCost:1},
  {id:'suporte', name:'Suporte', summary:'Buff, cura, auxílio, mobilidade aliada ou amplificação.', defaultCost:1},
  {id:'utilidade', name:'Utilidade', summary:'Investigação, exploração, comunicação, criação e soluções não combatentes.', defaultCost:0}
];
export const TECHNIQUE_TEMPLATES = [
  {id:'golpe-quirk', name:'Golpe de Quirk', base:'Dano', action:'Ação Tática', cost:1, range:'Toque ou curto', area:'Alvo único', damage:'1d6 + atributo', save:'Nenhuma ou CR', summary:'Modelo simples para ataque com Quirk.'},
  {id:'rajada', name:'Rajada', base:'Dano', action:'Ação Tática', cost:1, range:'Médio', area:'Alvo único', damage:'1d6 + atributo', save:'CR', summary:'Ataque à distância baseado em emissão ou projeção.'},
  {id:'area', name:'Área de Efeito', base:'Dano/Controle', action:'Ação Tática', cost:2, range:'Curto', area:'Cone, linha, esfera ou zona', damage:'2d6 ou condição', save:'Salvaguarda adequada', summary:'Modelo para técnica que afeta múltiplos alvos.'},
  {id:'barreira', name:'Barreira', base:'Defesa', action:'Reação ou Ação Tática', cost:1, range:'Próprio/curto', area:'Alvo ou zona', damage:'—', save:'—', summary:'Reduz dano, concede cobertura ou cria obstáculo.'},
  {id:'impulso-movimento', name:'Impulso de Movimento', base:'Suporte', action:'Ação Bônus', cost:1, range:'Próprio', area:'—', damage:'—', save:'—', summary:'Aumenta deslocamento, salto, escalada ou reposicionamento.'}
];
export const NATIVE_ABILITIES = [
  { id:'adaptabilidade-fisiologica', name:'Adaptabilidade Fisiológica', summary:'Permite justificar traços corporais adicionais ligados ao Quirk. Use para personagens cujo poder altera permanentemente o corpo.' },
  { id:'resistencia-fadiga', name:'Resistência à Fadiga', summary:'A fisiologia do Quirk ajuda a suportar desgaste. Útil para personagens que lutam por mais tempo ou ignoram parte do primeiro nível de exaustão conforme aprovação da mesa.' },
  { id:'reserva-energia', name:'Reserva de Energia', summary:'O personagem acumula energia residual do Quirk ao longo do combate. Use para poderes baseados em carga, reserva ou crescimento.' },
  { id:'sentido-quirk', name:'Sentido de Quirk', summary:'O Quirk concede percepção especial ligada ao seu tema: calor, vibração, eletricidade, cheiro, pressão, energia ou outro sinal.' }
];

export const QUIRK_PRESETS = [
  { id:'custom', name:'Quirk personalizado', type:'emissor', base:'dano', attribute:'Força', concept:'Crie o conceito do zero com aprovação do narrador.', weakness:'Defina custo, gatilhos, limites físicos, fraquezas e riscos.', techniques:[] },
  { id:'rajada-elemental', name:'Modelo: Rajada Elemental', type:'emissor', base:'dano', attribute:'Destreza', concept:'O personagem emite um elemento ou energia em rajadas, áreas curtas e efeitos de pressão.', weakness:'Exige foco, pode afetar o ambiente e pode ter resistência específica dependendo do elemento.', techniques:[{ name:'Rajada Elemental', grade:1, base:'Dano', action:'Ação Tática', cost:1, range:'Médio', area:'Alvo único', damage:'1d6 + atributo', save:'CR', notes:'Ataque simples à distância com o elemento do Quirk.' }] },
  { id:'corpo-reforcado', name:'Modelo: Corpo Reforçado', type:'transformacao', base:'defesa', attribute:'Constituição', concept:'O personagem endurece, amplia ou fortalece o próprio corpo para resistir e atacar.', weakness:'Uso prolongado gera fadiga, rigidez, lentidão ou pontos vulneráveis.', techniques:[{ name:'Reforço Corporal', grade:1, base:'Defesa', action:'Ação Tática', cost:1, range:'Próprio', area:'—', damage:'—', save:'—', notes:'Aumenta resistência, proteção ou reduz dano conforme aprovado pelo mestre.' }] },
  { id:'controle-campo', name:'Modelo: Controle de Campo', type:'emissor', base:'controle', attribute:'Vontade', concept:'O personagem manipula o terreno, substâncias, objetos ou forças para limitar inimigos.', weakness:'Depende do ambiente, linha de visão, concentração ou material disponível.', techniques:[{ name:'Zona de Controle', grade:1, base:'Controle', action:'Ação Tática', cost:1, range:'Curto', area:'Zona pequena', damage:'Condição ou deslocamento', save:'Salvaguarda adequada', notes:'Cria obstáculo, zona difícil ou força movimentação.' }] },
  { id:'suporte-sensorial', name:'Modelo: Suporte Sensorial', type:'mutante', base:'utilidade', attribute:'Vontade', concept:'O personagem possui sentidos especiais, comunicação, leitura ambiental ou rastreamento.', weakness:'Pode ser sobrecarregado por estímulos, ruído, luz, dor ou ambientes caóticos.', techniques:[{ name:'Leitura Sensorial', grade:1, base:'Utilidade', action:'Ação Tática', cost:0, range:'Médio', area:'Ambiente', damage:'—', save:'—', notes:'Coleta informação, detecta presença ou melhora investigação/percepção.' }] }
];
