#!/bin/sh
echo "Waiting database"
until nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "Database ok, running migrations..."
npm run typeorm migration:run -- -d dist/data-source.js

echo "🚀 Starting app..."
npm start
