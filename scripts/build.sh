#! /bin/bash

# Build styles
sass sass/main.scss site/css/main.css

# # Build js files
# npm run build

# Copy html
cp index.html site/index.html
cp old_page.html site/old_page.html
cp pictures.html site/pictures.html
cp gallery.html site/gallery.html
cp calc.html site/calc.html
cp src/calc.js site/scripts/calc.js
cp picture-list.html site/picture-list.html
cp arttrip.html site/arttrip.html
cp picture_pages/* site/

# Open site
