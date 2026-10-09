const fs = await import('node:fs');
const {spawnSync} = await import('node:child_process');
const {createHash} = await import('node:crypto');
const files=fs.readdirSync('src/data/projects').filter(f=>f.endsWith('.json'));
const sources=new Set();
for(const file of files){
 const data=JSON.parse(fs.readFileSync('src/data/projects/'+file,'utf8'));
 for(const block of data.blocks){
  if(block.type==='video')sources.add(block.src);
  for(const v of block.videos||[])sources.add(v.src);
 }
}
fs.mkdirSync('public/video-posters',{recursive:true});
const manifest={};
for(const src of sources){
 const file='public/'+src;
 const probe=spawnSync('ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','json',file],{encoding:'utf8'});
 if(probe.status!==0)throw new Error(probe.stderr);
 const {width,height}=JSON.parse(probe.stdout).streams[0];
 const poster='video-posters/'+createHash('sha256').update(src).digest('hex').slice(0,12)+'.jpg';
 const result=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-ss','1','-i',file,'-frames:v','1','-update','1','-y','public/'+poster],{encoding:'utf8'});
 if(result.status!==0)throw new Error(result.stderr);
 manifest[src]={poster,width,height};
}
fs.writeFileSync('src/data/video-posters.json',JSON.stringify(manifest,null,2)+'\n');
console.log('Posters generated for '+sources.size+' project videos.');
