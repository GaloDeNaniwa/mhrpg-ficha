export function rollDie(sides){ return Math.floor(Math.random()*sides)+1; }
export function roll(amount, sides){ return Array.from({length: amount}, () => rollDie(sides)); }
export function rollExpression(expr){
  const clean = String(expr).replace(/\s+/g,'').toLowerCase();
  const match = clean.match(/^(\d*)d(\d+)([+-]\d+)?$/);
  if(!match) return {error:'Use formato NdM+X, exemplo 2d6+3'};
  const amount = Number(match[1] || 1), sides = Number(match[2]), mod = Number(match[3] || 0);
  if(amount > 50 || sides > 1000) return {error:'Rolagem bloqueada por limite de segurança'};
  const rolls = roll(amount, sides);
  return {expr, rolls, mod, total: rolls.reduce((a,b)=>a+b,0)+mod};
}
