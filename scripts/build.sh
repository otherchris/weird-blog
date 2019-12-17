#! /bin/bash

# Build styles
sass sass/main.scss site/css/main.css

# Build js files
npm run build

# Copy html
cp index.html site/index.html
cp picture-list.html site/picture-list.html

# Open site
open site/index.html
