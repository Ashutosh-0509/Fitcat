from PIL import Image
import os

os.makedirs('frontend/public/images/dishes', exist_ok=True)
os.makedirs('frontend/public/images/gathering', exist_ok=True)

# 1. Gathering
g = Image.open('frontend/public/images/gathering_full.jpg')
gw, gh = g.size

# Fruit boxes on left
box1 = g.crop((int(gw * 0.09), int(gh * 0.23), int(gw * 0.495), int(gh * 0.64)))
box1.save('frontend/public/images/gathering/fruit_boxes.jpg', quality=95)

# Snack spreads on right
box2 = g.crop((int(gw * 0.505), int(gh * 0.23), int(gw * 0.91), int(gh * 0.64)))
box2.save('frontend/public/images/gathering/snack_spreads.jpg', quality=95)

# Opened box on bottom banner
box3 = g.crop((int(gw * 0.47), int(gh * 0.55), int(gw * 0.91), int(gh * 0.81)))
box3.save('frontend/public/images/gathering/custom_box.jpg', quality=95)

print("Gathering assets cropped.")

# 2. Menu
m = Image.open('frontend/public/images/menu_full.jpg')
mw, mh = m.size

# 4 Hero Dishes
# Chutney Cheese Sandwich
m.crop((int(mw * 0.46), int(mh * 0.045), int(mw * 0.88), int(mh * 0.325))).save('frontend/public/images/dishes/hero_sandwich.jpg', quality=95)
# Chia pudding preview
m.crop((int(mw * 0.79), int(mh * 0.068), int(mw * 0.93), int(mh * 0.145))).save('frontend/public/images/dishes/hero_chia.jpg', quality=95)

# Grid of 12 items: 4 columns x 3 rows
col_xs = [
    (int(mw * 0.078), int(mw * 0.28)),
    (int(mw * 0.292), int(mw * 0.49)),
    (int(mw * 0.507), int(mw * 0.708)),
    (int(mw * 0.72), int(mw * 0.922)),
]

row_ys = [
    (int(mh * 0.508), int(mh * 0.596)),
    (int(mh * 0.668), int(mh * 0.752)),
    (int(mh * 0.812), int(mh * 0.885)),
]

item_names = [
    "chutney_sandwich", "chia_pudding", "assorted_fruits", "peanut_butter_banana",
    "o_sandwich", "gupta_juice", "protein_club", "sangweech",
    "snack_house", "protein_bowl", "fruit_bowl", "nutty_toast"
]

idx = 0
for r, (y1, y2) in enumerate(row_ys):
    for c, (x1, x2) in enumerate(col_xs):
        dish_img = m.crop((x1, y1, x2, y2))
        name = item_names[idx]
        dish_img.save(f'frontend/public/images/dishes/{name}.jpg', quality=95)
        idx += 1

# Hero fruits and juice from row items for the circular carousel:
# Also save as hero_fruits and hero_juice
m.crop((col_xs[2][0], row_ys[0][0], col_xs[2][1], row_ys[0][1])).save('frontend/public/images/dishes/hero_fruits.jpg', quality=95)
m.crop((col_xs[1][0], row_ys[1][0], col_xs[1][1], row_ys[1][1])).save('frontend/public/images/dishes/hero_juice.jpg', quality=95)

print("Menu items cropped successfully.")

