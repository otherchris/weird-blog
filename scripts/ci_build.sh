#! /bin/bash
apt-get install -y apt-get install nodejs npm
npm install -g sass
npm install -g elm

# Build elm files
elm make src/main.elm --output=site/scripts/main.js

# Build styles
sass sass/main.scss site/css/main.css

# Open site
