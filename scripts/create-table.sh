aws dynamodb create-table \
  --endpoint-url http://localhost:8000 \
  --profile admin@lexx-dev \
  --table-name todo-api-event-store \
  --cli-input-json file://scripts/dynamo-table.json
