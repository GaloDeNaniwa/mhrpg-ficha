export const RULES = [
  {id:'sumario', chapter:'Estrutura', page:3, tags:['capítulos','consulta'], title:'Estrutura do livro', summary:'O sistema é dividido em criação, fisionomias, classes, quirk, itens, personalização, atributos, técnicas, aventura, combate e bases.'},
  {id:'d20', chapter:'Regras Gerais', page:6, tags:['d20','teste','salvaguarda','ataque'], title:'Teste com d20', summary:'Role d20, some modificador adequado e proficiência quando aplicável. Se o total alcançar a CD ou CR, a ação tem sucesso.'},
  {id:'vantagem', chapter:'Regras Gerais', page:6, tags:['vantagem','desvantagem'], title:'Vantagem e desvantagem', summary:'Com vantagem, role dois d20 e use o maior. Com desvantagem, use o menor.'},
  {id:'especifico-geral', chapter:'Regras Gerais', page:6, tags:['exceção','regra'], title:'Específico vence geral', summary:'Quando uma regra específica de traço, técnica, quirk ou item contradiz uma regra geral, aplique a específica.'},
  {id:'acoes-padrao', chapter:'Combate', page:6, tags:['ação','combate'], title:'Atividades padrão', summary:'No turno, o personagem normalmente pode usar ação, deslocamento e ação tática. Técnicas de Quirk geralmente usam ação tática.'},
  {id:'acoes-restritas', chapter:'Combate', page:6, tags:['reação','ação bônus'], title:'Atividades restritas', summary:'Reação e ação bônus só são usadas quando algum traço, técnica ou efeito permite.'},
  {id:'criacao', chapter:'Criação', page:7, tags:['personagem','ficha'], title:'Base da criação', summary:'A ficha é formada por fisionomia, classe, quirk, atributos, personalidade, aparência e passado.'},
  {id:'atributos-metodos', chapter:'Criação', page:9, tags:['atributos','compra de pontos','rolagem'], title:'Métodos de atributo', summary:'Métodos previstos: valores predefinidos, rolagem 4d6 descartando o menor ou compra de pontos com 27 pontos.'},
  {id:'pv-nivel1', chapter:'Criação', page:8, tags:['PV','dado de vida'], title:'PV no 1º nível', summary:'No primeiro nível, some 10 de base, o dado de vida máximo da classe, o modificador de Constituição e outros bônus.'},
  {id:'prof', chapter:'Criação', page:9, tags:['proficiência'], title:'Bônus de proficiência', summary:'Aplica-se a ataques proficientes, técnicas de Quirk, perícias proficientes, ferramentas, salvaguardas e CD de técnicas.'},
  {id:'cr', chapter:'Criação', page:11, tags:['CR','defesa'], title:'Classe de Resistência', summary:'Por padrão, CR = 10 + modificador do atributo principal da classe, somando bônus de traços, itens ou efeitos.'},
  {id:'fisionomia-base', chapter:'Fisionomia', page:14, tags:['fisionomia','traços'], title:'Montando fisionomia', summary:'Escolha um Traço Superior e dois Traços Únicos. O app trava escolhas excedentes, salvo efeitos como Evoluído.'},
  {id:'classe-beneficios', chapter:'Classes', page:21, tags:['classe','proficiência','vigor'], title:'Benefícios de classe', summary:'Classe fornece PV por dado de vida, proficiências, perícias, atributo primário, equipamentos, talentos e vigor.'},
  {id:'vigor', chapter:'Classes', page:21, tags:['vigor','técnicas'], title:'Vigor', summary:'Representa esforço físico ou mental usado por traços, técnicas e alguns treinamentos. O app registra gasto e recuperação.'},
  {id:'apetrechos', chapter:'Itens', page:61, tags:['item','apetrecho'], title:'Apetrechos', summary:'Equipamentos heroicos complementam o Quirk e podem mudar estratégia. O app separa apetrechos, itens comuns e melhorias.'},
  {id:'descanso', chapter:'Aventura', page:132, tags:['descanso','recuperação'], title:'Descanso', summary:'O app terá botões para descanso curto/longo e aplicará recuperação conforme regras cadastradas pelo mestre.'},
  {id:'modo-campanha', chapter:'Segurança do App', page:null, tags:['anti-burla','mestre'], title:'Modo campanha', summary:'Em campanha, alterações mecânicas críticas exigem aprovação do mestre e ficam registradas em log.'}
];

import { CONDITIONS_EXACT } from './conditionsExact.js';
export const CONDITIONS = CONDITIONS_EXACT;
