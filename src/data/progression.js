export const QUIRK_PATHS = [
  { id:'primario', name:'Quirk Primário', summary:'O Quirk é a principal arma do personagem. Recebe técnicas com mais frequência.' },
  { id:'auxiliar', name:'Quirk Auxiliar', summary:'O Quirk apoia o estilo geral do personagem. Recebe menos técnicas, mas mantém utilidade e estratagemas.' }
];

export const QUIRK_PROGRESSION = {
  primario: [
    { level:0, label:'2 Manifestações de Quirk' },
    { level:1, label:'Técnica de 1º Grau e Estratagema', technique:true, grade:1, strategy:true },
    { level:3, label:'Técnica de 2º Grau', technique:true, grade:2 },
    { level:6, label:'Técnica de 3º Grau e Estratagema', technique:true, grade:3, strategy:true },
    { level:9, label:'Técnica de 4º Grau', technique:true, grade:4 },
    { level:12, label:'Técnica de 5º Grau e 1 Estratagema', technique:true, grade:5, strategy:true },
    { level:12, label:'Despertar: +1 Manifestação de Quirk', awakened:true },
    { level:16, label:'Técnica de 6º Grau', technique:true, grade:6, awakened:true },
    { level:18, label:'Técnica de 7º Grau', technique:true, grade:7, awakened:true }
  ],
  auxiliar: [
    { level:0, label:'2 Manifestações de Quirk' },
    { level:1, label:'Técnica de 1º Grau e Estratagema', technique:true, grade:1, strategy:true },
    { level:6, label:'Técnica de 3º Grau e Estratagema', technique:true, grade:3, strategy:true },
    { level:12, label:'1 Estratagema', strategy:true },
    { level:12, label:'Despertar: +1 Manifestação de Quirk', awakened:true },
    { level:16, label:'Técnica de 6º Grau', technique:true, grade:6, awakened:true },
    { level:18, label:'Técnica de 7º Grau', technique:true, grade:7, awakened:true }
  ]
};

export const TECHNIQUE_GRADE_BY_LEVEL = [
  { level:1, grade:1 },
  { level:3, grade:2 },
  { level:6, grade:3 },
  { level:9, grade:4 },
  { level:12, grade:5 },
  { level:15, grade:6 },
  { level:18, grade:7 }
];

export function quirkMilestones(path='primario', level=1){
  return (QUIRK_PROGRESSION[path] || QUIRK_PROGRESSION.primario).filter(x => x.level <= Number(level));
}
export function expectedTechniqueCount(path='primario', level=1){
  return quirkMilestones(path, level).filter(x => x.technique).length;
}
export function expectedStrategyCount(path='primario', level=1){
  return quirkMilestones(path, level).filter(x => x.strategy).length;
}
export function maxTechniqueGrade(level=1){
  return TECHNIQUE_GRADE_BY_LEVEL.filter(x => x.level <= Number(level)).at(-1)?.grade || 1;
}
