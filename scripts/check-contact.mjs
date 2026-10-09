// Exercise the real submit handler with a mocked fetch; no email is sent.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
for (const outcome of ['success','rejected','offline']) {
  const button={disabled:false};const message={style:{},textContent:''};let submit;let reset=false;let request;
  const form={action:'https://formspree.io/f/mwvrjrvq',addEventListener:(event,handler)=>{if(event==='submit')submit=handler},querySelector:()=>button,reset:()=>{reset=true}};
  const storage=new Map();
  const document={readyState:'loading',body:{},documentElement:{classList:{contains:()=>false}},querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){},getElementById:id=>id==='contact-form'?form:id==='form-msg'?message:null};
  const context=vm.createContext({document,navigator:{language:'fr'},window:{addEventListener(){}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},matchMedia:()=>({matches:false,addEventListener(){}}),IntersectionObserver:class{observe(){}},FormData:class{constructor(value){this.form=value}},fetch:async(url,options)=>{request={url,options};if(outcome==='offline')throw new Error('offline');return {ok:outcome==='success'};}});
  vm.runInContext(source,context);context.init();
  assert.equal(typeof submit,'function');
  await submit.call(form,{preventDefault(){}});
  assert.equal(request.url,form.action);assert.equal(request.options.method,'POST');
  assert.equal(request.options.headers.Accept,'application/json');
  assert.equal(request.options.body.form,form);
  assert.equal(button.disabled,false,'Submit must become available again');
  assert.equal(reset,outcome==='success','Keep the message when sending fails');
  assert.ok(message.textContent.includes(outcome==='success'?'envoyé':'Erreur'));
}
console.log('Passed: contact submission, success, rejected response and offline recovery; no external requests.');
