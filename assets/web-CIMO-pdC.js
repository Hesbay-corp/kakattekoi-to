import{W as p}from"./index-CeEkNSFV.js";class f extends p{constructor(){super(...arguments),this.group="CapacitorStorage"}async configure({group:e}){typeof e=="string"&&(this.group=e)}async get(e){return{value:this.impl.getItem(this.applyPrefix(e.key))}}async set(e){this.impl.setItem(this.applyPrefix(e.key),e.value)}async remove(e){this.impl.removeItem(this.applyPrefix(e.key))}async keys(){return{keys:this.rawKeys().map(t=>t.substring(this.prefix.length))}}async clear(){for(const e of this.rawKeys())this.impl.removeItem(e)}async migrate(){var e;const t=[],s=[],n="_cap_",o=Object.keys(this.impl).filter(i=>i.indexOf(n)===0);for(const i of o){const r=i.substring(n.length),a=(e=this.impl.getItem(i))!==null&&e!==void 0?e:"",{value:l}=await this.get({key:r});typeof l=="string"?s.push(r):(await this.set({key:r,value:a}),t.push(r))}return{migrated:t,existing:s}}async removeOld(){const e="_cap_",t=Object.keys(this.impl).filter(s=>s.indexOf(e)===0);for(const s of t)this.impl.removeItem(s)}get impl(){return window.localStorage}get prefix(){return this.group==="NativeStorage"?"":`${this.group}.`}rawKeys(){return Object.keys(this.impl).filter(e=>e.indexOf(this.prefix)===0)}applyPrefix(e){return this.prefix+e}}export{f as PreferencesWeb};
