from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json

root=Path(__file__).resolve().parents[1]/'dist'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.refs=[];self.ids=set();self.lang=None;self.h1=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='html':self.lang=a.get('lang')
  if tag=='h1':self.h1+=1
  if 'id' in a:self.ids.add(a['id'])
  for k in ['href','src','poster','data-src']:
   if a.get(k):self.refs.append(a[k])
pages={p:Page() for p in root.rglob('*.html')}
for p,doc in pages.items():doc.feed(p.read_text(encoding='utf8'))
errors=[];checked=0
for p,doc in pages.items():
 if doc.h1!=1:errors.append(f'{p}: {doc.h1} H1')
 expected='en' if p.relative_to(root).parts[0]=='en' else 'fr'
 if doc.lang!=expected:errors.append(f'{p}: lang mismatch')
 for ref in doc.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  target=(root/unquote(u.path).lstrip('/')) if u.path.startswith('/') else (p.parent/unquote(u.path)) if u.path else p
  if target.is_dir():target=target/'index.html'
  checked+=1
  if not target.exists():errors.append(f'{p.relative_to(root)}: missing {ref}')
  elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:errors.append(f'{p.relative_to(root)}: missing anchor {ref}')
result={'pages':len(pages),'local_references_checked':checked,'errors':errors}
print(json.dumps(result,ensure_ascii=False,indent=2))
(Path(__file__).parent/'site-checks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
raise SystemExit(bool(errors))
