import json, re, os

# Read the HTML file to extract topicImages map
with open('Sliding In.html', 'r') as f:
    html = f.read()

# Extract topicImages from JS
start = html.find('var topicImages = {')
end = html.rfind('}', start) + 1
js_obj = html[start:end]

# Parse keys manually
keys = re.findall(r'"([a-z]+)"\s*:', js_obj)
print(f'Topics with images in JS: {len(keys)}')

# Check filesystem
img_dir = 'Sliding In Images'
local_files = set(os.listdir(img_dir))
print(f'Local images: {len(local_files)}')

# Find missing
missing = []
for k in keys:
    expected = f'{k}.jpg'
    if expected not in local_files:
        missing.append(k)

print(f'\nMissing images ({len(missing)}):')
for m in missing:
    print(f'  {m}.jpg')

# Find local images not referenced
referenced = set(f'{k}.jpg' for k in keys)
unreferenced = sorted(local_files - referenced)
print(f'\nUnreferenced local images ({len(unreferenced)}):')
for u in unreferenced:
    print(f'  {u}')

# Also check what the image-manager.html references
print('\n--- image-manager.html ---')
try:
    with open('image-manager.html', 'r') as f:
        im_html = f.read()
    im_keys = re.findall(r'"([a-z]+)"\s*:', im_html)
    print(f'image-manager topics: {len(im_keys)}')
    im_missing = [k for k in im_keys if f'{k}.jpg' not in local_files]
    print(f'image-manager missing ({len(im_missing)}): {im_missing}')
except Exception as e:
    print(f'Error: {e}')
