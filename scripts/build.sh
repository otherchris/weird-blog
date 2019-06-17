#! /bin/bash

# Build elm files
elm make src/main.elm --output=site/scripts/main.js

# Build styles
sass sass/main.scss site/css/main.css

# Open site
open site/index.html
