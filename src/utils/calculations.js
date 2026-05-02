import { ATTRIBUTE_KEYS, POINT_BUY_COST, PROFICIENCY_BY_LEVEL, SKILLS, XP_BY_LEVEL } from '../data/core.js';
import { CLASSES } from '../data/classes.js';
import { UNIQUE_TRAITS, SUPERIOR_TRAITS } from '../data/fisionomias.js';
export const getClass = id => CLASSES.find(c => c.id === id) || CLASSES[0];
export const getUniqueTrait = id => UNIQUE_TRAITS.find(t => t.id === id);
export const getSuperiorTrait = id => SUPERIOR_TRAITS.find(t => t.id === id);
export const attrMod = score => Math.floor((Number(score || 0) - 10) / 2);
export const fmt = n => Number(n) >= 0 ? `+${n}` : `${n}`;
export const proficiency = level => PROFICIENCY_BY_LEVEL[Math.min(20, Math.max(1, Number(level)||1))] || 2;
export const levelFromXp = xp => Object.entries(XP_BY_LEVEL).reduce((lvl,[k,v]) => Number(xp) >= v ? Number(k) : lvl, 1);
export const pointBuySpent = attrs => Object.values(attrs).reduce((sum, v) => sum + (POINT_BUY_COST[v] ?? 999), 0);
export const pointBuyValid = attrs => pointBuySpent(attrs) <= 27 && Object.values(attrs).every(v => v >= 8 && v <= 15);
export function derived(sheet){
  const klass = getClass(sheet.classId);
  const prof = proficiency(sheet.level);
  const mainAttr = sheet.primaryAttribute || klass.primary[0];
  const mainKey = ATTRIBUTE_KEYS[mainAttr];
  const con = attrMod(sheet.attributes.constituicao);
  const traitHp = (sheet.uniqueTraits || []).map(getUniqueTrait).filter(Boolean).reduce((s,t)=>s+(t.mechanical?.hpPerLevel||0),0) * sheet.level;
  const traitCr = (sheet.uniqueTraits || []).map(getUniqueTrait).filter(Boolean).reduce((s,t)=>s+(t.mechanical?.crBonus||0),0);
  const speedBonus = (sheet.uniqueTraits || []).map(getUniqueTrait).filter(Boolean).reduce((s,t)=>s+(t.mechanical?.speedBonus||0),0);
  const hp = 10 + klass.hitDie + con + Math.max(0, sheet.level-1) * (klass.fixedHp + con) + traitHp + Number(sheet.manual?.hpBonus || 0);
  const cr = 10 + attrMod(sheet.attributes[mainKey]) + traitCr + Number(sheet.manual?.crBonus || 0);
  const vigor = sheet.level * klass.vigorPerLevel + Number(sheet.manual?.vigorBonus || 0);
  const quirkKey = ATTRIBUTE_KEYS[sheet.quirk.attribute || mainAttr];
  const quirkMod = attrMod(sheet.attributes[quirkKey]);
  const quirkAttack = prof + quirkMod;
  const quirkDc = 8 + prof + quirkMod;
  const speed = 9 + speedBonus + Number(sheet.manual?.speedBonus || 0);
  return {klass, prof, hp, cr, vigor, speed, quirkAttack, quirkDc, con, mainAttr, mainMod: attrMod(sheet.attributes[mainKey])};
}
export function skillValue(sheet, skillName){
  const sk = SKILLS.find(s => s.name === skillName);
  if(!sk) return 0;
  const val = attrMod(sheet.attributes[ATTRIBUTE_KEYS[sk.attribute]]) + ((sheet.skillProfs||[]).includes(skillName) ? proficiency(sheet.level) : 0);
  return val;
}

export const MANIFESTATION_ACTION_MODIFIERS = {
  passiva: -1,
  inacao: 0,
  acao_bonus: 1,
  reacao: 1,
  acao_tatica: 3,
};

export function manifestationVirtualPoints(quirk = {}){
  const activation = quirk.manifestationActivation || 'inacao';
  const base = 3;
  const modifier = MANIFESTATION_ACTION_MODIFIERS[activation] ?? 0;
  const awakened = Boolean(quirk.awakenedManifestation);
  const cap = awakened ? 12 : 8;
  const total = Math.max(0, Math.min(cap, base + modifier));
  const used = Math.max(0, Number(quirk.virtualPointsUsed || 0));
  return { base, modifier, cap, total, used, free: Math.max(0, total - used), activation, awakened };
}
