# API Examples

## Weather API

Get current weather:
```bash
curl https://your-api-gateway.amazonaws.com/weather?location=Bangalore
```

Response:
```json
{
  "temperature": 28,
  "humidity": 65,
  "conditions": "Sunny",
  "wind_speed": 12
}
```

## Government Schemes API

Get all schemes:
```bash
curl https://your-api-gateway.amazonaws.com/schemes
```

Response:
```json
{
  "schemes": [
    {
      "id": "pm-kisan",
      "name": "PM-KISAN",
      "description": "Direct income support",
      "benefit": "Rs. 6000/year"
    }
  ]
}
```

## Crop Information API

Get crop details:
```bash
curl https://your-api-gateway.amazonaws.com/crops?name=wheat
```

Response:
```json
{
  "crop": "wheat",
  "season": "Rabi",
  "duration": "120-150 days",
  "water_requirement": "Medium"
}
```

## Market Prices API

Get current market prices:
```bash
curl https://your-api-gateway.amazonaws.com/market-prices?commodity=wheat
```

Response:
```json
{
  "commodity": "wheat",
  "price": 2275,
  "unit": "per quintal",
  "market": "Delhi",
  "date": "2026-03-02"
}
```
