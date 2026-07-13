from PIL import Image, ImageDraw
from pathlib import Path

img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
d.rectangle((2, 2, 29, 29), fill=(11, 11, 11, 255))
d.rectangle((6, 6, 25, 25), fill=(0, 200, 83, 255))
d.text((9, 9), 'J', fill=(255, 255, 255, 255))

out = Path(r'c:/Users/KL/foto-kita-blur/journal forex/src/app/favicon.ico')
img.save(out, format='ICO', sizes=[(32, 32)])
print(out)
