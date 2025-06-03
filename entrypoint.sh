#!/bin/sh
echo "Database ok, running migrations..."
npm run typeorm migration:run -- -d src/data-source.ts

echo "🚀 Starting app..."
npm start
