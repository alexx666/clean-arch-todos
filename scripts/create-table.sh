aws dynamodb create-table \
  --endpoint-url http://localhost:4566 \
  --region us-east-1 \
  --profile admin@lexx-dev \
  --cli-input-json file://scripts/dynamo-table.json

aws sns create-topic \
  --endpoint-url http://localhost:4566 \
  --region us-east-1 \
  --profile admin@lexx-dev \
  --name todo-api-topic
