path = "/home/irieb/William's Projects/Eloquenta/Learning Materials/Speaking/fibromyalgia.html"
with open(path, 'r') as f:
    content = f.read()

# Replace em-dashes and en-dashes in the JS section with plain hyphens
# Find the script block and fix it
import re
script_match = re.search(r'<script>([\s\S]+?)</script>', content)
if script_match:
    js = script_match.group(1)
    # Replace em-dashes and en-dashes with plain hyphens
    js_fixed = js.replace('\u2014', '-').replace('\u2013', '-')
    # Replace smart quotes with straight quotes
    js_fixed = js_fixed.replace('\u201c', '"').replace('\u201d', '"')
    js_fixed = js_fixed.replace('\u2018', "'").replace('\u2019', "'")
    content = content[:script_match.start(1)] + js_fixed + content[script_match.end(1):]

with open(path, 'w') as f:
    f.write(content)

# Now validate
js_new = re.search(r'<script>([\s\S]+?)</script>', content).group(1)
try:
    new Function(js_new)
    print('PASS: JS valid')
except e:
    print('FAIL:', e.message)

print('Size:', len(content))
