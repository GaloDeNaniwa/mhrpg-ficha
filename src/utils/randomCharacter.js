import { newSheet } from '../data/defaultSheet.js';
import { ATTRIBUTES, ATTRIBUTE_KEYS, XP_BY_LEVEL } from '../data/core.js';
import { CLASSES } from '../data/classes.js';
import { SUPERIOR_TRAITS, UNIQUE_TRAITS } from '../data/fisionomias.js';
import { QUIRK_PRESETS, TECHNIQUE_TEMPLATES, NATIVE_ABILITIES } from '../data/quirks.js';
import { ITEM_CATALOG } from '../data/items.js';
import { LEGACIES, ALIGNMENTS } from '../data/personalization.js';
import { expectedTechniqueCount, expectedStrategyCount, maxTechniqueGrade } from '../data/progression.js';

const STANDARD_SCORES = [15, 14, 13, 12, 10, 8];
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const sample = (arr, count) => {
  const copy = [...arr];
  const out = [];
  while(copy.length && out.length < count){
    out.push(copy.splice(Math.floor(Math.random()*copy.length), 1)[0]);
  }
  return out;
};
const id = prefix => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
const clampLevel = level => Math.max(1, Math.min(20, Number(level) || 1));

const CIVIL_NAMES = ['Akira Mori', 'Hana Sato', 'Ren Kazama', 'Mika Aoyama', 'Takeshi Kuroda', 'Yuna Ito', 'Daichi Hayashi', 'Nara Kobayashi', 'Riku Tanaka', 'Mei Arakawa'];
const HERO_NAMES = ['Pulso Zero', 'Neon Guard', 'Impacto Azul', 'Vetor Rubro', 'Eco Solar', 'Dínamo', 'Sombra Cívica', 'Resgate Íris', 'Faísca Alta', 'Muralha Nova'];
const PERSONALITIES = ['disciplinado, protetor e direto', 'curioso, impulsivo e leal', 'calmo, observador e estratégico', 'extrovertido, dramático e empático', 'reservado, teimoso e muito responsável'];
const DREAMS = ['tornar-se símbolo de esperança local', 'proteger pessoas que são ignoradas por heróis famosos', 'provar que um Quirk instável também pode salvar vidas', 'fundar uma agência de heróis focada em resgate', 'superar a reputação da família'];
const PATHS = ['Herói em treinamento', 'Vigilante em reabilitação', 'Estudante de academia heroica', 'Aspirante a profissional', 'Agente de resgate'];
const APPEARANCES = ['porte atlético, uniforme prático e olhar atento', 'visual chamativo, cabelo colorido e postura confiante', 'corpo leve, equipamentos discretos e expressão concentrada', 'aparência robusta, roupas reforçadas e presença defensiva', 'traços incomuns ligados ao Quirk e acessórios personalizados'];
const WEAKNESSES = ['uso prolongado causa fadiga intensa e exige pausas regulares', 'o poder perde eficiência sob estresse emocional ou ambiente desfavorável', 'precisa de concentração; interrupções reduzem precisão e controle', 'efeitos muito fortes gastam Vigor rapidamente e deixam aberturas', 'o Quirk tem sinais visíveis, dificultando furtividade e surpresa'];
const MANIFESTATIONS = ['emissão visível de energia ao redor do corpo; mudanças físicas sutis quando o Quirk é ativado', 'aura, som ou alteração sensorial perceptível perto do usuário; resposta instintiva em situação de perigo', 'marcas luminosas, mudança nos olhos e reação corporal clara durante técnicas'];
const STRATEGIES = ['usar o ambiente para criar vantagem, proteger civis antes de atacar e guardar Vigor para emergência', 'abrir combate com controle, economizar técnica forte para alvos prioritários e recuar se acumular exaustão', 'combinar apetrecho e Quirk, focando mobilidade, cobertura e interrupção de inimigos'];
const BACKSTORIES = ['Cresceu acompanhando incidentes heroicos de perto e decidiu treinar para evitar que outras pessoas se sentissem indefesas.', 'Foi subestimado por causa da aparência ou do funcionamento do Quirk, então aprendeu a transformar limitações em tática.', 'Entrou na vida heroica por influência de um mentor, mas ainda precisa provar que sabe agir sob pressão.', 'Carrega uma cobrança familiar forte e tenta descobrir se quer ser herói por escolha própria ou por expectativa dos outros.'];

function distributeAttributes(klass){
  const priorities = [...klass.primary];
  if(!priorities.includes('Constituição')) priorities.push('Constituição');
  for(const attr of ATTRIBUTES){ if(!priorities.includes(attr)) priorities.push(attr); }
  const attrs = {};
  priorities.slice(0, 6).forEach((attr, idx) => { attrs[ATTRIBUTE_KEYS[attr]] = STANDARD_SCORES[idx]; });
  return attrs;
}

function makeTechnique(template, level, index){
  const grade = Math.min(template.grade || maxTechniqueGrade(level), maxTechniqueGrade(level));
  return {
    ...template,
    id: id('tec'),
    name: template.name || `Técnica ${index + 1}`,
    grade,
    notes: template.notes || template.summary || 'Técnica gerada automaticamente. Revise com o mestre se estiver em campanha.'
  };
}

export function generateRandomCharacter(targetLevel = 1){
  const level = clampLevel(targetLevel);
  const klass = rand(CLASSES);
  const preset = rand(QUIRK_PRESETS.filter(q => q.id !== 'custom')) || QUIRK_PRESETS[0];
  const path = Math.random() > 0.35 ? 'primario' : 'auxiliar';
  const superior = rand(SUPERIOR_TRAITS);
  const uniqueLimit = superior.id === 'evoluido' ? 4 : 2;
  const legacy = rand(LEGACIES.filter(l => l.id !== 'sem-legado')) || LEGACIES[0];
  const chosenTraits = sample(UNIQUE_TRAITS.map(t => t.id), uniqueLimit);
  const expectedTech = expectedTechniqueCount(path, level);
  const expectedStrat = expectedStrategyCount(path, level);
  const baseTechs = [...(preset.techniques || []), ...sample(TECHNIQUE_TEMPLATES, Math.max(0, expectedTech))];
  const techniques = baseTechs.slice(0, Math.max(1, expectedTech)).map((t, i) => makeTechnique(t, level, i));
  while(techniques.length < expectedTech){ techniques.push(makeTechnique(rand(TECHNIQUE_TEMPLATES), level, techniques.length)); }
  const skills = sample(klass.skillOptions, klass.skillChoices);
  const items = [
    ...(klass.equipment || []).map((name, i) => ({ id:id('item'), name, type:i===0?'Apetrecho':'Essencial', kind:i===0?'Classe':'Kit', quantity:1, weight:0, price:'—', attribute:klass.primary[0], proficient:true, equipped:i===0, damage:i===0?'1d4 + atributo':'—', notes:'Equipamento inicial de classe gerado automaticamente.' })),
    ...sample(ITEM_CATALOG, 2).map(item => ({...item, id:id('item'), quantity:1, weight:0, attribute:klass.primary[0], proficient:item.type==='Apetrecho', equipped:item.type==='Apetrecho', notes:item.summary || ''}))
  ];
  const name = rand(CIVIL_NAMES);
  const heroName = rand(HERO_NAMES);
  const quirkName = preset.name?.replace('Modelo: ', '') || rand(['Impulso Cinético', 'Véu Sensorial', 'Campo Modular']);
  const sheet = newSheet();
  return {
    ...sheet,
    id: id('sheet'),
    name,
    heroName,
    player: 'Gerado aleatoriamente',
    concept: `${klass.name} de nível ${level} com Quirk ${quirkName}.`,
    age: String(14 + Math.floor(Math.random()*18)),
    height: `${150 + Math.floor(Math.random()*45)} cm`,
    weight: `${48 + Math.floor(Math.random()*55)} kg`,
    appearance: rand(APPEARANCES),
    clothing: 'Traje heroico funcional, com espaço para apetrechos e ajustes de segurança.',
    voice: rand(['voz firme e baixa', 'fala rápida e animada', 'tom calmo e analítico', 'voz energética e teatral']),
    personality: rand(PERSONALITIES),
    dream: rand(DREAMS),
    path: rand(PATHS),
    backstory: rand(BACKSTORIES),
    alignment: rand(ALIGNMENTS),
    legacyId: legacy.id,
    legacyNotes: `${legacy.summary} Gerado automaticamente; ajuste detalhes com o mestre.`,
    qualities: sample(['Determinação','Recuperação Espantosa','Fã Número 1','Coragem Civil','Disciplina de Treino','Senso de Justiça'], 3),
    flaws: sample(['Teimoso','Sonolência','Linhagem Marcada','Impulsivo','Medo de Falhar','Excesso de Confiança'], 3),
    trainings: sample(['Treino físico intenso','Simulações de resgate','Estudo de vilões','Patrulha supervisionada','Controle de Quirk'], 2),
    level,
    xp: XP_BY_LEVEL[level] || 0,
    attributeMethod: 'standard',
    classId: klass.id,
    primaryAttribute: klass.primary[0],
    attributes: distributeAttributes(klass),
    superiorTrait: superior.id,
    uniqueTraits: chosenTraits,
    skillProfs: skills,
    saveProfs: klass.saves,
    quirk: {
      name: quirkName,
      type: preset.type || 'emissor',
      base: preset.base || 'dano',
      attribute: preset.attribute || klass.primary[0],
      concept: preset.concept || `Quirk focado em ${quirkName.toLowerCase()}, adaptado ao papel de ${klass.name}.`,
      weakness: preset.weakness || rand(WEAKNESSES),
      path,
      presetId: preset.id,
      nativeAbilities: sample(NATIVE_ABILITIES.map(a=>a.id), Math.min(2, NATIVE_ABILITIES.length)),
      manifestations: rand(MANIFESTATIONS),
      strategies: `${rand(STRATEGIES)}\nEstratagemas esperados pelo nível: ${expectedStrat}.`
    },
    techniques,
    items,
    inventory: {
      money: klass.startingMoney || '5d10 ¥',
      carryingNotes: 'Carga inicial dentro do limite. Revise peso real quando o catálogo completo estiver cadastrado.',
      storageNotes: 'Sem depósito/base definida.'
    },
    missions: [{ id:id('mis'), title:'Primeira patrulha', status:'Aberta', reward:'XP inicial e reconhecimento local', notes:'Missão gerada para testar a ficha em jogo.', objectives:['Proteger civis','Identificar ameaça principal','Evitar dano colateral'] }],
    state: { currentHp:null, currentVigor:null, conditions:[], tempHp:0, exhaustion:0, shortRests:0, longRests:0, lastHpInput:0, lastVigorInput:0 },
    manual: { hpBonus:0, crBonus:0, vigorBonus:0, speedBonus:0 },
    notes: 'Personagem gerado automaticamente usando o conjunto predefinido 15, 14, 13, 12, 10 e 8. Revise nomes e detalhes narrativos antes de usar em campanha.',
    auditPreview: [{ at:new Date().toISOString(), type:'random_character_generated', level }]
  };
}
