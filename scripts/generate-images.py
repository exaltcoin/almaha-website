"""
Generates a library of brand-consistent, industry-themed illustration images
for the Al Maha website. These are stylized geometric/line-art compositions
in the brand's navy/gold palette — clearly illustrative design assets, not
photographs, so they never risk misrepresenting stock/demo imagery as real
completed Al Maha projects. Swap any of these for real photography later by
replacing the file at the same path.
"""
from PIL import Image, ImageDraw, ImageFilter
import math
import random

NAVY_DARK = (7, 15, 29)
NAVY = (11, 31, 58)
NAVY_MID = (20, 36, 63)
NAVY_LIGHT = (43, 69, 112)
GOLD = (201, 166, 103)
GOLD_LIGHT = (228, 201, 138)
GOLD_DIM = (143, 106, 47)
WHITE_A = (255, 255, 255)

W, H = 1600, 1000

def base_gradient(w, h, c1, c2, angle="diag"):
    im = Image.new("RGB", (w, h), c1)
    px = im.load()
    for y in range(h):
        t = y / h
        for x in range(0, w, 4):
            tx = (x / w + t) / 2 if angle == "diag" else t
            r = int(c1[0] + (c2[0] - c1[0]) * tx)
            g = int(c1[1] + (c2[1] - c1[1]) * tx)
            b = int(c1[2] + (c2[2] - c1[2]) * tx)
            for xx in range(x, min(x + 4, w)):
                px[xx, y] = (r, g, b)
    return im

def add_grain(im, amount=6):
    px = im.load()
    w, h = im.size
    for _ in range(int(w * h * 0.02)):
        x = random.randint(0, w - 1)
        y = random.randint(0, h - 1)
        r, g, b = px[x, y]
        n = random.randint(-amount, amount)
        px[x, y] = (max(0, min(255, r + n)), max(0, min(255, g + n)), max(0, min(255, b + n)))
    return im

def vignette(im, strength=0.55):
    w, h = im.size
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse([-w*0.25, -h*0.35, w*1.25, h*1.35], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(180))
    dark = Image.new("RGB", (w, h), (0, 0, 0))
    return Image.composite(im, dark, mask.point(lambda p: int(255 - strength * (255 - p))))

def diagonal_lines(draw, w, h, color, count=14, width=1, opacity_layer=None):
    for i in range(count):
        x = int(-h + i * (w + h) / count)
        draw.line([(x, h), (x + h, 0)], fill=color, width=width)

def new_canvas(c1=NAVY_DARK, c2=NAVY_LIGHT):
    im = base_gradient(W, H, c1, c2)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    diagonal_lines(od, W, H, (255, 255, 255, 10), count=22, width=1)
    im = Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")
    return im, ImageDraw.Draw(im, "RGBA")

def finish(im, path):
    im = vignette(im, 0.45)
    im = add_grain(im, 5)
    im = im.filter(ImageFilter.GaussianBlur(0.3))
    im.save(path, quality=90)
    print("saved", path)

def gold_accent_bar(draw):
    draw.rectangle([0, H - 10, W, H], fill=GOLD)

# ---------------------------------------------------------------- ICONS ----

def icon_crane(draw, cx, cy, s, color):
    # tower crane silhouette
    draw.line([(cx, cy - s*1.4), (cx, cy + s*0.6)], fill=color, width=int(s*0.05)+2)
    draw.line([(cx - s*1.3, cy - s*1.1), (cx + s*0.9, cy - s*1.1)], fill=color, width=int(s*0.05)+2)
    draw.line([(cx - s*1.3, cy - s*1.1), (cx - s*1.1, cy - s*0.85)], fill=color, width=int(s*0.04)+1)
    draw.line([(cx, cy - s*1.4), (cx - s*1.3, cy - s*1.1)], fill=color, width=int(s*0.03)+1)
    draw.line([(cx, cy - s*1.4), (cx + s*0.9, cy - s*1.1)], fill=color, width=int(s*0.03)+1)
    draw.line([(cx + s*0.6, cy - s*1.1), (cx + s*0.6, cy - s*0.6)], fill=color, width=int(s*0.03)+1)
    for i in range(4):
        yy = cy + s*0.6 - i * s*0.08
        draw.line([(cx - s*0.15, yy), (cx + s*0.15, yy - s*0.12)], fill=color, width=1)

def icon_building(draw, cx, cy, s, color):
    w1, h1 = s*0.9, s*1.6
    draw.rectangle([cx - w1/2, cy - h1, cx + w1/2, cy + s*0.1], outline=color, width=int(s*0.035)+2)
    rows, cols = 6, 4
    for r in range(rows):
        for c in range(cols):
            x0 = cx - w1/2 + s*0.1 + c*(w1-s*0.2)/cols
            y0 = cy - h1 + s*0.15 + r*(h1-s*0.3)/rows
            x1 = x0 + (w1-s*0.2)/cols*0.6
            y1 = y0 + (h1-s*0.3)/rows*0.55
            draw.rectangle([x0, y0, x1, y1], outline=color, width=1)

def icon_road(draw, cx, cy, s, color):
    draw.line([(cx - s*1.4, cy + s*0.8), (cx - s*0.3, cy - s*0.9)], fill=color, width=int(s*0.06)+2)
    draw.line([(cx + s*1.4, cy + s*0.8), (cx + s*0.3, cy - s*0.9)], fill=color, width=int(s*0.06)+2)
    for i in range(5):
        t = i / 4
        y = cy + s*0.8 - t * s*1.6
        xoff = s*0.05 * (1 - t)
        draw.line([(cx - xoff, y), (cx + xoff, y)], fill=color, width=2)

def icon_window_frame(draw, cx, cy, s, color):
    draw.rectangle([cx - s, cy - s*1.2, cx + s, cy + s*1.2], outline=color, width=int(s*0.05)+2)
    draw.line([(cx, cy - s*1.2), (cx, cy + s*1.2)], fill=color, width=int(s*0.03)+1)
    draw.line([(cx - s, cy), (cx + s, cy)], fill=color, width=int(s*0.03)+1)
    draw.rectangle([cx - s*0.75, cy - s*0.9, cx - s*0.05, cy - s*0.1], outline=color, width=1)
    draw.rectangle([cx + s*0.05, cy - s*0.9, cx + s*0.75, cy - s*0.1], outline=color, width=1)

def icon_ibeam(draw, cx, cy, s, color):
    draw.line([(cx - s*0.9, cy - s*1.3), (cx + s*0.9, cy - s*1.3)], fill=color, width=int(s*0.08)+2)
    draw.line([(cx, cy - s*1.3), (cx, cy + s*1.3)], fill=color, width=int(s*0.08)+2)
    draw.line([(cx - s*0.9, cy + s*1.3), (cx + s*0.9, cy + s*1.3)], fill=color, width=int(s*0.08)+2)

def icon_weld_spark(draw, cx, cy, s, color):
    draw.line([(cx - s, cy + s*0.6), (cx + s*0.4, cy - s*0.6)], fill=color, width=int(s*0.06)+2)
    random.seed(42)
    for _ in range(14):
        ang = random.uniform(0, math.pi*2)
        r0 = random.uniform(s*0.1, s*0.15)
        r1 = r0 + random.uniform(s*0.25, s*0.55)
        x0 = cx + s*0.4 + r0*math.cos(ang)
        y0 = cy - s*0.6 + r0*math.sin(ang)
        x1 = cx + s*0.4 + r1*math.cos(ang)
        y1 = cy - s*0.6 + r1*math.sin(ang)
        draw.line([(x0,y0),(x1,y1)], fill=GOLD_LIGHT, width=2)

def icon_scrap_stack(draw, cx, cy, s, color):
    random.seed(7)
    for i in range(6):
        w = random.uniform(s*0.7, s*1.4)
        h = s*0.22
        x = cx + random.uniform(-s*0.3, s*0.3)
        y = cy + s*0.9 - i*h*0.95
        ang = random.uniform(-8, 8)
        rect = Image.new("RGBA", (int(w), int(h)), (0,0,0,0))
        rd = ImageDraw.Draw(rect)
        rd.rectangle([0,0,int(w),int(h)], outline=color, width=2)
        rect = rect.rotate(ang, expand=True)
        draw._image.paste(rect, (int(x - rect.width/2), int(y - rect.height/2)), rect)

def icon_recycle(draw, cx, cy, s, color):
    pts = []
    for i in range(3):
        ang0 = math.radians(90 + i*120)
        ang1 = math.radians(90 + i*120 + 95)
        for t in [0, 0.5, 1]:
            a = ang0 + (ang1-ang0)*t
            pts.append((cx + s*math.cos(a), cy + s*math.sin(a)))
    for i in range(0, len(pts)-2, 3):
        draw.line([pts[i], pts[i+1]], fill=color, width=int(s*0.06)+2)
        draw.line([pts[i+1], pts[i+2]], fill=color, width=int(s*0.06)+2)
        # arrow head
        x, y = pts[i+2]
        draw.polygon([(x, y), (x-s*0.18, y-s*0.05), (x-s*0.05, y-s*0.2)], fill=color)

def icon_globe(draw, cx, cy, s, color):
    draw.ellipse([cx-s, cy-s, cx+s, cy+s], outline=color, width=int(s*0.045)+1)
    draw.ellipse([cx-s*0.4, cy-s, cx+s*0.4, cy+s], outline=color, width=1)
    draw.line([(cx-s, cy), (cx+s, cy)], fill=color, width=1)
    draw.line([(cx-s*0.87, cy-s*0.5), (cx+s*0.87, cy-s*0.5)], fill=color, width=1)
    draw.line([(cx-s*0.87, cy+s*0.5), (cx+s*0.87, cy+s*0.5)], fill=color, width=1)

def icon_gear(draw, cx, cy, s, color, teeth=10):
    pts = []
    for i in range(teeth*2):
        ang = math.pi*2*i/(teeth*2)
        r = s if i % 2 == 0 else s*0.78
        pts.append((cx + r*math.cos(ang), cy + r*math.sin(ang)))
    draw.polygon(pts, outline=color, width=3)
    draw.ellipse([cx-s*0.35, cy-s*0.35, cx+s*0.35, cy+s*0.35], outline=color, width=3)

def icon_truck(draw, cx, cy, s, color):
    draw.rectangle([cx - s*1.3, cy - s*0.5, cx + s*0.3, cy + s*0.5], outline=color, width=int(s*0.05)+2)
    draw.polygon([(cx+s*0.3, cy-s*0.1),(cx+s*0.9, cy-s*0.1),(cx+s*1.1, cy+s*0.2),(cx+s*0.3, cy+s*0.5)], outline=color, width=int(s*0.05)+2)
    draw.ellipse([cx-s*0.95, cy+s*0.35, cx-s*0.55, cy+s*0.75], outline=color, width=2)
    draw.ellipse([cx+s*0.35, cy+s*0.35, cx+s*0.75, cy+s*0.75], outline=color, width=2)

def icon_forklift(draw, cx, cy, s, color):
    draw.line([(cx - s, cy - s*1.2), (cx - s, cy + s*0.6)], fill=color, width=int(s*0.06)+2)
    draw.line([(cx - s*0.75, cy - s*1.2), (cx - s*0.75, cy + s*0.6)], fill=color, width=int(s*0.06)+2)
    draw.rectangle([cx - s*0.7, cy - s*0.1, cx + s*0.6, cy + s*0.6], outline=color, width=int(s*0.05)+2)
    draw.line([(cx - s*1.1, cy + s*0.2), (cx - s*0.7, cy + s*0.2)], fill=color, width=int(s*0.05)+2)
    draw.line([(cx - s*1.1, cy + s*0.4), (cx - s*0.7, cy + s*0.4)], fill=color, width=int(s*0.05)+2)
    draw.ellipse([cx-s*0.55, cy+s*0.45, cx-s*0.2, cy+s*0.8], outline=color, width=2)
    draw.ellipse([cx+s*0.15, cy+s*0.45, cx+s*0.5, cy+s*0.8], outline=color, width=2)

def icon_shelves(draw, cx, cy, s, color):
    draw.rectangle([cx - s*1.2, cy - s*1.3, cx + s*1.2, cy + s*1.3], outline=color, width=int(s*0.04)+2)
    for i in range(1, 4):
        y = cy - s*1.3 + i * (s*2.6/4)
        draw.line([(cx - s*1.2, y), (cx + s*1.2, y)], fill=color, width=1)
    for i in range(1, 3):
        x = cx - s*1.2 + i * (s*2.4/3)
        draw.line([(x, cy - s*1.3), (x, cy + s*1.3)], fill=color, width=1)

def icon_wrench_gear(draw, cx, cy, s, color):
    icon_gear(draw, cx - s*0.3, cy - s*0.2, s*0.75, color, teeth=9)
    draw.line([(cx + s*0.3, cy + s*0.5), (cx + s*1.2, cy - s*0.4)], fill=color, width=int(s*0.12)+2)
    draw.ellipse([cx+s*1.05, cy-s*0.55, cx+s*1.35, cy-s*0.25], outline=color, width=int(s*0.08)+2)

def icon_container(draw, cx, cy, s, color):
    draw.rectangle([cx - s*1.3, cy - s*0.7, cx + s*1.3, cy + s*0.7], outline=color, width=int(s*0.05)+2)
    n = 8
    for i in range(1, n):
        x = cx - s*1.3 + i * (s*2.6/n)
        draw.line([(x, cy - s*0.7), (x, cy + s*0.7)], fill=color, width=1)

def icon_factory(draw, cx, cy, s, color):
    draw.rectangle([cx - s*1.3, cy - s*0.3, cx + s*1.3, cy + s*0.9], outline=color, width=int(s*0.05)+2)
    draw.polygon([(cx - s*1.1, cy - s*0.3), (cx - s*0.8, cy - s*0.9), (cx - s*0.5, cy - s*0.3)], outline=color, width=int(s*0.04)+2)
    draw.polygon([(cx - s*0.3, cy - s*0.3), (cx, cy - s*1.1), (cx + s*0.3, cy - s*0.3)], outline=color, width=int(s*0.04)+2)
    draw.line([(cx + s*0.75, cy - s*0.3), (cx + s*0.75, cy - s*1.3)], fill=color, width=int(s*0.05)+2)

# --------------------------------------------------------------- BUILD -----

def render(path, icon_fn, c1=NAVY_DARK, c2=NAVY_LIGHT, icon_color=None, scale=1.0, cx_ratio=0.5, extra=None):
    im, draw = new_canvas(c1, c2)
    icon_color = icon_color or (*GOLD, 235)
    cx, cy = int(W * cx_ratio), int(H * 0.52)
    icon_fn(draw, cx, cy, int(240*scale), icon_color)
    if extra:
        extra(draw)
    gold_accent_bar(draw)
    finish(im, path)

SVC = "/home/claude/almaha/public/images/services"
GEN = "/home/claude/almaha/public/images/general"
PROJ = "/home/claude/almaha/public/images/projects"
GAL = "/home/claude/almaha/public/images/gallery"

render(f"{SVC}/construction-contracting.jpg", icon_crane)
render(f"{SVC}/building-construction.jpg", icon_building)
render(f"{SVC}/infrastructure-projects.jpg", icon_road)
render(f"{SVC}/aluminum-works.jpg", icon_window_frame, c1=NAVY_MID, c2=NAVY_DARK)
render(f"{SVC}/steel-metal-works.jpg", icon_ibeam)
render(f"{SVC}/scrap-trading.jpg", icon_scrap_stack, c1=NAVY_DARK, c2=NAVY_MID)
render(f"{SVC}/recycling-services.jpg", icon_recycle)
render(f"{SVC}/import-export.jpg", icon_globe)
render(f"{SVC}/used-vehicle-spare-parts.jpg", icon_wrench_gear)
render(f"{SVC}/heavy-equipment-parts.jpg", icon_gear, scale=1.1)
render(f"{SVC}/logistics-transportation.jpg", icon_truck)
render(f"{SVC}/industrial-solutions.jpg", icon_factory)
render(f"{SVC}/warehouse-storage.jpg", icon_shelves)

# Hero (home) — wide banner, crane + building composite, more cinematic
def hero_extra(draw):
    pass
im, draw = new_canvas(NAVY_DARK, NAVY_MID)
icon_building(draw, int(W*0.24), int(H*0.58), 260, (*GOLD, 130))
icon_crane(draw, int(W*0.62), int(H*0.42), 300, (*GOLD, 210))
icon_road(draw, int(W*0.85), int(H*0.75), 160, (*GOLD, 90))
gold_accent_bar(draw)
finish(im, f"{GEN}/hero-home.jpg")

# About page
im, draw = new_canvas(NAVY_MID, NAVY_DARK)
icon_factory(draw, int(W*0.3), int(H*0.55), 260, (*GOLD, 160))
icon_gear(draw, int(W*0.72), int(H*0.4), 150, (*GOLD, 200))
gold_accent_bar(draw)
finish(im, f"{GEN}/about.jpg")

# CEO — abstract monogram medallion (not a fabricated photo of the person)
im = base_gradient(1000, 1250, NAVY_DARK, NAVY_MID)
draw = ImageDraw.Draw(im, "RGBA")
cx, cy = 500, 560
for r, w_ in [(280, 3), (300, 1)]:
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], outline=(*GOLD, 200), width=w_)
icon_gear(draw, cx, cy, 60, (*GOLD_DIM, 120), teeth=14)
try:
    from PIL import ImageFont
    f = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf", 190)
    bbox = draw.textbbox((0,0), "MH", font=f)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    draw.text((cx - tw/2, cy - th/2 - bbox[1]), "MH", font=f, fill=(*GOLD_LIGHT, 255))
except Exception as e:
    print(e)
draw.rectangle([0, 1250-14, 1000, 1250], fill=GOLD)
im = vignette(im.convert("RGB"), 0.4)
im = add_grain(im, 4)
im.save(f"{GEN}/ceo-monogram.jpg", quality=92)
print("saved ceo-monogram")

# Projects sample set (6)
proj_icons = [icon_building, icon_window_frame, icon_scrap_stack, icon_ibeam, icon_road, icon_wrench_gear]
for i, fn in enumerate(proj_icons):
    render(f"{PROJ}/sample-{i+1}.jpg", fn, c1=random.choice([NAVY_DARK, NAVY_MID]), c2=NAVY_LIGHT, scale=0.95)

# Gallery set (8) reusing icon variety
gal_icons = [icon_crane, icon_window_frame, icon_ibeam, icon_scrap_stack, icon_wrench_gear, icon_truck, icon_shelves, icon_factory]
for i, fn in enumerate(gal_icons):
    render(f"{GAL}/item-{i+1}.jpg", fn, c1=NAVY_DARK, c2=NAVY_MID, scale=0.85, cx_ratio=0.5)

print("ALL IMAGES GENERATED")
