#!/bin/sh
echo "Database ok, running migrations..."
npm run typeorm migration:run -- -d dist/data-source.js

echo "🚀 Starting app..."
npm start
