# Monitoring Guide

## CloudWatch Logs

View Lambda logs:
```bash
aws logs tail /aws/lambda/krishimitra-backend --follow
```

## CloudWatch Metrics

Key metrics to monitor:
- Invocations
- Duration
- Errors
- Throttles

View metrics:
```bash
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --dimensions Name=FunctionName,Value=krishimitra-backend \
  --start-time 2026-03-01T00:00:00Z \
  --end-time 2026-03-02T00:00:00Z \
  --period 3600 \
  --statistics Sum
```

## Alarms

Create alarm for errors:
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name krishimitra-errors \
  --alarm-description "Alert on Lambda errors" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1
```

## X-Ray Tracing

Enable X-Ray:
```bash
aws lambda update-function-configuration \
  --function-name krishimitra-backend \
  --tracing-config Mode=Active
```

## Cost Monitoring

Monitor Lambda costs:
```bash
aws ce get-cost-and-usage \
  --time-period Start=2026-03-01,End=2026-03-02 \
  --granularity DAILY \
  --metrics BlendedCost \
  --filter file://cost-filter.json
```
