// Isolated checks: no real browser storage or external requests are changed.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const base=readFileSync(new URL('../src/layouts/Base.astro',import.meta.url),'utf8');
const prepaint=base.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
for(const [random,expected] of [[0,'atelier'],[.3,'studio'],[.6,'editorial'],[.99,'solaire']]){
 const stored=new Map();const document={documentElement:{dataset:{},classList:{add(){}}}};
 const context=vm.createContext({document,Math:{random:()=>random,floor:Math.floor},localStorage:{getItem:k=>stored.get(k),setItem:(k,v)=>stored.set(k,v)},window:{matchMedia:()=>({matches:false})}});
 vm.runInContext(prepaint,context);
 assert.equal(document.documentElement.dataset.visualStyle,expected);
 vm.runInContext(prepaint,context);
 assert.equal(document.documentElement.dataset.visualStyle,expected,'The selected style must persist');
}
const source=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
const invitationCode=source.slice(source.indexOf('function initStyleInvitation('));
function setup(seen=false){
 const stored=new Map(seen?[['portfolio-style-invitation-v1','seen']]:[]);const timers=[];const events={};
 const invitation={hidden:true,querySelector:s=>({addEventListener:(event,fn)=>{events[s]=fn}})};
 const picker={open:false,addEventListener:(event,fn)=>{events[event]=fn},querySelector:()=>({focus(){}})};
 const document={hidden:false,activeElement:{matches:()=>false},querySelector:()=>invitation,addEventListener:(event,fn)=>{events[event]=fn}};
 const context=vm.createContext({document,localStorage:{getItem:k=>stored.get(k),setItem:(k,v)=>stored.set(k,v)},setTimeout:(fn,delay)=>{timers.push({fn,delay});return timers.length},clearTimeout(){},picker});
 vm.runInContext(invitationCode+';initStyleInvitation(picker);',context);
 return {invitation,picker,document,stored,timers,events};
}
const fresh=setup();assert.equal(fresh.invitation.hidden,true);assert.equal(fresh.timers[0].delay,25000);
fresh.document.activeElement.matches=()=>true;fresh.timers[0].fn();assert.equal(fresh.invitation.hidden,true,'Never interrupt a form');
fresh.document.activeElement.matches=()=>false;fresh.timers[1].fn();assert.equal(fresh.invitation.hidden,false);
fresh.events['.invitation-close']();assert.equal(fresh.invitation.hidden,true);assert.equal(fresh.stored.get('portfolio-style-invitation-v1'),'seen');
const returning=setup(true);assert.equal(returning.timers.length,0,'Do not repeat the invitation on return visits');
assert.ok(!readFileSync(new URL('../src/components/StylePicker.astro',import.meta.url),'utf8').includes('formspree'),'Votes must not consume the contact quota');
console.log('Passed: four random styles, persistence, delayed invitation, form protection, dismissal, return visits and separated votes.');
