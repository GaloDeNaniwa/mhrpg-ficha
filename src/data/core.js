export const ATTRIBUTES = ['Força','Destreza','Constituição','Inteligência','Vontade','Carisma'];
export const ATTRIBUTE_KEYS = { 'Força':'forca','Destreza':'destreza','Constituição':'constituicao','Inteligência':'inteligencia','Vontade':'vontade','Carisma':'carisma' };
export const PROFICIENCY_BY_LEVEL = {1:2,2:2,3:2,4:2,5:3,6:3,7:3,8:3,9:4,10:4,11:4,12:4,13:5,14:5,15:5,16:5,17:6,18:6,19:6,20:6};
export const XP_BY_LEVEL = {1:0,2:300,3:900,4:2700,5:6500,6:14000,7:23000,8:34000,9:48000,10:64000,11:85000,12:100000,13:120000,14:140000,15:165000,16:195000,17:225000,18:265000,19:305000,20:355000};
export const POINT_BUY_COST = {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};
export const SKILLS = [
  {id:'atletismo', name:'Atletismo', attribute:'Força', description:'Usada para esforço físico bruto: correr, saltar, escalar, nadar, erguer, empurrar, puxar, resistir a obstáculos físicos e disputar força corporal.'},
  {id:'acrobacia', name:'Acrobacia', attribute:'Destreza', description:'Usada para equilíbrio, manobras ágeis, piruetas, aterrissagens, escapar de quedas, atravessar locais instáveis e executar movimentos precisos com o corpo.'},
  {id:'furtividade', name:'Furtividade', attribute:'Destreza', description:'Usada para se esconder, mover-se em silêncio, evitar ser percebido e se aproximar sem alertar inimigos.'},
  {id:'prestidigitacao', name:'Prestidigitação', attribute:'Destreza', description:'Usada para truques manuais, esconder objetos, furtar itens pequenos, manipular coisas delicadas e executar ações discretas com as mãos.'},
  {id:'mecanica', name:'Mecânica', attribute:'Inteligência', description:'Usada para entender, montar, reparar, sabotar ou modificar máquinas, apetrechos, dispositivos e sistemas tecnológicos.'},
  {id:'historia', name:'História', attribute:'Inteligência', description:'Usada para lembrar fatos sobre acontecimentos, organizações, heróis, vilões, lugares, culturas e registros importantes.'},
  {id:'investigacao', name:'Investigação', attribute:'Inteligência', description:'Usada para procurar pistas, analisar cenas, deduzir conexões, encontrar detalhes escondidos e interpretar evidências.'},
  {id:'natureza', name:'Natureza', attribute:'Inteligência', description:'Usada para conhecimento sobre animais, plantas, clima, terrenos, ambientes naturais e fenômenos biológicos.'},
  {id:'sobrevivencia', name:'Sobrevivência', attribute:'Inteligência', description:'Usada para rastrear, orientar-se, encontrar abrigo, lidar com ambientes hostis e manter-se vivo fora de áreas seguras.'},
  {id:'medicina', name:'Medicina', attribute:'Inteligência', description:'Usada para diagnosticar, estabilizar feridos, tratar doenças, entender ferimentos, aplicar primeiros socorros e avaliar condições físicas.'},
  {id:'intuicao', name:'Intuição', attribute:'Vontade', description:'Usada para perceber intenções, ler comportamento, notar mentiras, pressentir riscos sociais e avaliar o estado emocional de alguém.'},
  {id:'percepcao', name:'Percepção', attribute:'Vontade', description:'Usada para notar sons, movimentos, rastros, emboscadas, detalhes visuais e ameaças no ambiente.'},
  {id:'meta', name:'Meta', attribute:'Vontade', description:'Usada para reconhecer padrões de Quirk, avaliar riscos de poder, entender interações estranhas e interpretar lógica de habilidades.'},
  {id:'sorte', name:'Sorte', attribute:'Vontade', description:'Usada quando o resultado depende de acaso narrativo, coincidência favorável ou pequenas oportunidades não controladas diretamente.'},
  {id:'atuacao', name:'Atuação', attribute:'Carisma', description:'Usada para interpretar, distrair, performar, fingir emoções, entreter plateias e sustentar uma persona.'},
  {id:'enganacao', name:'Enganação', attribute:'Carisma', description:'Usada para mentir, disfarçar intenções, blefar, criar histórias falsas e manipular informação socialmente.'},
  {id:'intimidacao', name:'Intimidação', attribute:'Carisma', description:'Usada para pressionar, assustar, impor presença, ameaçar e forçar hesitação por medo ou autoridade.'},
  {id:'persuasao', name:'Persuasão', attribute:'Carisma', description:'Usada para convencer, negociar, inspirar confiança, argumentar e mudar a atitude de alguém por diálogo.'},
  {id:'provocacao', name:'Provocação', attribute:'Carisma', description:'Usada para irritar, distrair, desafiar, chamar atenção, quebrar concentração ou fazer alguém agir por impulso.'}
];
export const ACTION_TYPES = ['Ação','Deslocamento','Ação Tática','Ação Bônus','Reação','Livre'];
export const ATTRIBUTE_DESCRIPTIONS = {
  'Força':'Representa potência física, atletismo bruto e capacidade de bater, erguer, empurrar, puxar e sustentar esforço muscular. Valores altos sugerem corpo forte e atlético; valores baixos indicam dificuldade com força física.',
  'Destreza':'Representa agilidade, reflexos, coordenação, equilíbrio e precisão corporal. Valores altos indicam movimentos rápidos e controle fino; valores baixos podem indicar desajeito ou lentidão motora.',
  'Constituição':'Representa saúde, resistência, fôlego e tolerância a dano, doença, veneno e esforço prolongado. Valores altos sugerem vigor e robustez; valores baixos indicam fragilidade ou cansaço fácil.',
  'Inteligência':'Representa memória, estudo, raciocínio, investigação, conhecimento técnico e capacidade analítica. Valores altos sugerem mente curiosa e estudiosa; valores baixos indicam dificuldade com detalhes e lógica complexa.',
  'Vontade':'Representa intuição, percepção, determinação, autocontrole e força mental. Valores altos indicam ânimo firme e instinto afiado; valores baixos indicam pessimismo, hesitação ou baixa resistência mental.',
  'Carisma':'Representa presença, comunicação, energia social, influência e expressão. Valores altos indicam presença marcante; valores baixos sugerem timidez, rudeza ou pouca habilidade social.'
};
