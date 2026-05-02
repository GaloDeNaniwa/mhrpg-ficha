const KEY = 'mhrpg-v2-character';
export const saveLocal = data => localStorage.setItem(KEY, JSON.stringify(data));
export const loadLocal = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } };
export const exportJson = (data, filename='mhrpg-ficha.json') => {
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click(); URL.revokeObjectURL(a.href);
};
export const importJsonFile = file => new Promise((resolve,reject)=>{ const r = new FileReader(); r.onload=()=>{try{resolve(JSON.parse(r.result))}catch(e){reject(e)}}; r.onerror=reject; r.readAsText(file); });
