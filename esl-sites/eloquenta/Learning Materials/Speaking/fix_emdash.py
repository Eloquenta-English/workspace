import re
path = "/home/irieb/William's Projects/Eloquenta/Learning Materials/Speaking/fibromyalgia.html"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

script_match = re.search(r'<script>([\s\S]+?)</script>', content)
if script_match:
    js = script_match.group(1)
    count = js.count('\u2014')
    print('Found', count, 'em-dashes')
    js = js.replace('\u2014', '--').replace('\u2013', '-')
    content = content[:script_match.start(1)] + js + content[script_match.end(1):]

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Replaced em-dashes, size:', len(content))
