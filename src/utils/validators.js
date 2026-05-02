import { CLASSES } from '../data/classes.js';
import { SUPERIOR_TRAITS } from '../data/fisionomias.js';
import { levelFromXp } from './calculations.js';
const ATTR_KEYS = ['forca','destreza','constituicao','inteligencia','vontade','carisma'];
const STANDARD_SCORES = '8,10,12,13,14,15';
export function validateCharacter(sheet, mode='draft'){
  const errors = [];
  const klass = CLASSES.find(c => c.id === sheet.classId);
  if(!klass) errors.push('Classe inválida.');
  if(sheet.level < 1 || sheet.level > 20) errors.push('Nível deve ficar entre 1 e 20.');
  if(Number(sheet.xp || 0) < 0) errors.push('XP não pode ser negativo.');
  if(mode === 'campaign' && levelFromXp(sheet.xp) < sheet.level) errors.push('Nível maior que o permitido pelo XP registrado.');
  for(const key of ATTR_KEYS){
    const value = Number(sheet.attributes?.[key]);
    if(!Number.isFinite(value) || value < 1 || value > 30) errors.push(`Atributo ${key} fora do limite 1–30.`);
  }
  const sortedScores = ATTR_KEYS.map(k => Number(sheet.attributes?.[k])).sort((a,b)=>a-b).join(',');
  if(sortedScores !== STANDARD_SCORES) errors.push('A ficha deve usar o modelo predefinido de atributos: 15, 14, 13, 12, 10 e 8, distribuídos uma vez cada.');
  if(!SUPERIOR_TRAITS.some(t => t.id === sheet.superiorTrait)) errors.push('Traço Superior inválido.');
  const uniqueCount = new Set(sheet.uniqueTraits || []).size;
  const allowedUnique = sheet.superiorTrait === 'evoluido' ? 4 : 2;
  if(uniqueCount !== (sheet.uniqueTraits || []).length) errors.push('Traços únicos duplicados.');
  if(uniqueCount > allowedUnique) errors.push(`Traços únicos excedem o limite permitido: ${allowedUnique}.`);
  if((sheet.skillProfs || []).length > 8 && mode === 'campaign') errors.push('Perícias excedem limite de segurança; peça aprovação do mestre.');
  for(const t of sheet.techniques || []){
    if(Number(t.cost) < 0 || Number(t.cost) > 20) errors.push(`Custo inválido na técnica ${t.name || 'sem nome'}.`);
    if(Number(t.grade) < 1 || Number(t.grade) > 9) errors.push(`Grau inválido na técnica ${t.name || 'sem nome'}.`);
  }
  return errors;
}
export function canEditCharacter({role, ownerId, userId, mode}){
  if(role === 'admin') return true;
  if(role === 'mestre' && mode === 'campaign') return true;
  return ownerId === userId && mode !== 'locked';
}
