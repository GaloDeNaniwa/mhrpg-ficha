export const ITEM_TYPES = ['Item comum','Essencial','Apetrecho','Ferramenta','Consumível','Suporte','Documento','Outro'];
export const APETRECHO_TYPES = ['Corpo a corpo','Distância','Defensivo','Utilitário','Suporte','Mobilidade','Customizado'];
export const ITEM_CATALOG = [
  { id:'apetrecho-basico-corpo', name:'Apetrecho Básico Corpo a Corpo', type:'Apetrecho', kind:'Corpo a corpo', damage:'1d4 + atributo', price:'—', summary:'Modelo inicial para ataques próximos. Use Força por padrão, salvo propriedade especial.' },
  { id:'apetrecho-basico-distancia', name:'Apetrecho Básico à Distância', type:'Apetrecho', kind:'Distância', damage:'1d4 + atributo', price:'—', summary:'Modelo inicial para disparos, projéteis ou rajadas. Use Destreza por padrão, salvo propriedade especial.' },
  { id:'kit-primeiros-socorros', name:'Kit de Primeiros Socorros', type:'Essencial', kind:'Consumível', damage:'—', price:'—', summary:'Suporte de missão para estabilizar, tratar ferimentos leves ou justificar testes de Medicina.' },
  { id:'comida-agua', name:'Comida e Água', type:'Essencial', kind:'Suprimento', damage:'—', price:'—', summary:'Mantimentos para missões longas; falta de suprimentos pode gerar desgaste, risco ou exaustão.' },
  { id:'ferramentas-tecnicas', name:'Ferramentas Técnicas', type:'Ferramenta', kind:'Mecânica', damage:'—', price:'—', summary:'Usadas para reparar, criar, adaptar ou sabotar mecanismos e apetrechos.' }
];
