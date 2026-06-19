import os
dir = r"C:\Users\irieb\Documents\William's Projects\workspace\esl-materials\Sliding In Images"
files = os.listdir(dir)
print(f"Image files found: {len(files)}")
for f in files[:10]:
    print(f"  {f}")
