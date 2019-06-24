#! /bin/bash

# Build elm files
elm make src/main.elm --output=site/scripts/main.js

# Build styles
sass sass/main.scss site/css/main.css

# Build js files
npm run build

# Open site
open site/index.html
