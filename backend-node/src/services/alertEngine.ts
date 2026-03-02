/**
 * Alert Engine
 * Proactive alert system for weather risks and farming emergencies
 * Triggers alerts based on risk keywords and weather conditions
 */

import { IntentClassification } from './domainClassifier';
import { query } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export type AlertType = 'weather' | 'pest' | 'disease' | 'market' | 'scheme';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Alert {
  id: string;
  userId: string;
  alertType: AlertType;
  message: string;
  riskLevel: RiskLevel;
  actionRequired: string;
  createdAt: string;
}

export class AlertEngine {
  // Risk keywords for different alert types
  private readonly weatherRiskKeywords = [
    'heavy rain', 'barish', 'flood', 'baarh', 'drought', 'sukha',
    'storm', 'toofan', 'heatwave', 'garmi', 'cold wave', 'sardi',
    'hail', 'ole', 'cyclone', 'chakravat', 'frost', 'pala'
  ];

  private readonly pestRiskKeywords = [
    'infestation', 'attack', 'hamla', 'spreading', 'outbreak',
    'swarm', 'jhund', 'epidemic', 'mahamari'
  ];

  private readonly diseaseRiskKeywords = [
    'wilting', 'murjhana', 'rotting', 'sadna', 'dying', 'marjana',
    'spreading fast', 'tezi se failna'
  ];

  /**
   * Analyze user input and trigger alerts if risk detected
   */
  async analyzeAndTriggerAlerts(
    userInput: string,
    userId: string,
    classification: IntentClassification
  ): Promise<Alert[]> {
    const triggeredAlerts: Alert[] = [];

    try {
      // Check for weather risks
      if (classification === 'agriculture_weather' || this.containsWeatherRisk(userInput)) {
        const weatherAlert = await this.triggerWeatherAlert(userInput, userId);
        if (weatherAlert) triggeredAlerts.push(weatherAlert);
      }

      // Check for pest risks
      if (classification === 'agriculture_pest' || this.containsPestRisk(userInput)) {
        const pestAlert = await this.triggerPestAlert(userInput, userId);
        if (pestAlert) triggeredAlerts.push(pestAlert);
      }

      // Check for disease risks
      if (this.containsDiseaseRisk(userInput)) {
        const diseaseAlert = await this.triggerDiseaseAlert(userInput, userId);
        if (diseaseAlert) triggeredAlerts.push(diseaseAlert);
      }

      return triggeredAlerts;
    } catch (error) {
      console.error('Alert engine error:', error);
      return [];
    }
  }

  /**
   * Trigger weather-related alert
   */
  async triggerWeatherAlert(userInput: string, userId: string): Promise<Alert | null> {
    const lowerInput = userInput.toLowerCase();
    
    // Determine risk level and message
    let riskLevel: RiskLevel = 'low';
    let message = '';
    let actionRequired = '';

    if (lowerInput.includes('heavy rain') || lowerInput.includes('flood')) {
      riskLevel = 'high';
      message = 'Heavy rainfall alert! Risk of waterlogging and crop damage.';
      actionRequired = 'Ensure proper drainage, harvest mature crops if possible, protect stored produce.';
    } else if (lowerInput.includes('drought') || lowerInput.includes('sukha')) {
      riskLevel = 'high';
      message = 'Drought conditions detected. Water scarcity risk.';
      actionRequired = 'Implement water conservation, use drip irrigation, consider drought-resistant crops.';
    } else if (lowerInput.includes('storm') || lowerInput.includes('toofan')) {
      riskLevel = 'critical';
      message = 'Storm warning! Severe weather conditions expected.';
      actionRequired = 'Secure farm equipment, protect livestock, harvest if possible, stay safe.';
    } else if (lowerInput.includes('heatwave') || lowerInput.includes('garmi')) {
      riskLevel = 'medium';
      message = 'Heatwave alert. High temperature stress on crops.';
      actionRequired = 'Increase irrigation frequency, provide shade for livestock, avoid midday field work.';
    } else if (lowerInput.includes('hail') || lowerInput.includes('ole')) {
      riskLevel = 'high';
      message = 'Hailstorm risk! Potential crop damage.';
      actionRequired = 'Cover sensitive crops, protect young plants, check crop insurance coverage.';
    } else {
      // General weather concern
      riskLevel = 'low';
      message = 'Weather monitoring active. Stay updated on forecasts.';
      actionRequired = 'Check daily weather updates, plan farming activities accordingly.';
    }

    // Create alert
    const alert: Alert = {
      id: uuidv4(),
      userId,
      alertType: 'weather',
      message,
      riskLevel,
      actionRequired,
      createdAt: new Date().toISOString()
    };

    // Store alert in database
    await this.storeAlert(alert);

    // Prepare for outbound call (placeholder)
    if (riskLevel === 'high' || riskLevel === 'critical') {
      await this.prepareOutboundCall(alert);
    }

    return alert;
  }

  /**
   * Trigger pest-related alert
   */
  async triggerPestAlert(userInput: string, userId: string): Promise<Alert | null> {
    const lowerInput = userInput.toLowerCase();

    let riskLevel: RiskLevel = 'medium';
    let message = 'Pest activity detected in your area.';
    let actionRequired = 'Inspect crops regularly, use IPM practices, consult agriculture officer.';

    if (lowerInput.includes('infestation') || lowerInput.includes('attack')) {
      riskLevel = 'high';
      message = 'Pest infestation alert! Immediate action required.';
      actionRequired = 'Apply appropriate pesticide, remove infected plants, monitor spread daily.';
    } else if (lowerInput.includes('swarm') || lowerInput.includes('outbreak')) {
      riskLevel = 'critical';
      message = 'Pest outbreak warning! Large-scale infestation risk.';
      actionRequired = 'Contact agriculture department immediately, coordinate with neighbors, emergency pest control.';
    }

    const alert: Alert = {
      id: uuidv4(),
      userId,
      alertType: 'pest',
      message,
      riskLevel,
      actionRequired,
      createdAt: new Date().toISOString()
    };

    await this.storeAlert(alert);

    if (riskLevel === 'high' || riskLevel === 'critical') {
      await this.prepareOutboundCall(alert);
    }

    return alert;
  }

  /**
   * Trigger disease-related alert
   */
  async triggerDiseaseAlert(userInput: string, userId: string): Promise<Alert | null> {
    const lowerInput = userInput.toLowerCase();

    let riskLevel: RiskLevel = 'medium';
    let message = 'Crop disease symptoms detected.';
    let actionRequired = 'Identify disease, isolate affected plants, apply appropriate treatment.';

    if (lowerInput.includes('spreading') || lowerInput.includes('dying')) {
      riskLevel = 'high';
      message = 'Disease spreading rapidly! Urgent intervention needed.';
      actionRequired = 'Remove infected plants immediately, apply fungicide, improve air circulation.';
    }

    const alert: Alert = {
      id: uuidv4(),
      userId,
      alertType: 'disease',
      message,
      riskLevel,
      actionRequired,
      createdAt: new Date().toISOString()
    };

    await this.storeAlert(alert);

    if (riskLevel === 'high') {
      await this.prepareOutboundCall(alert);
    }

    return alert;
  }

  /**
   * Check if input contains weather risk keywords
   */
  private containsWeatherRisk(input: string): boolean {
    const lowerInput = input.toLowerCase();
    return this.weatherRiskKeywords.some(keyword => lowerInput.includes(keyword));
  }

  /**
   * Check if input contains pest risk keywords
   */
  private containsPestRisk(input: string): boolean {
    const lowerInput = input.toLowerCase();
    return this.pestRiskKeywords.some(keyword => lowerInput.includes(keyword));
  }

  /**
   * Check if input contains disease risk keywords
   */
  private containsDiseaseRisk(input: string): boolean {
    const lowerInput = input.toLowerCase();
    return this.diseaseRiskKeywords.some(keyword => lowerInput.includes(keyword));
  }

  /**
   * Store alert in database
   */
  private async storeAlert(alert: Alert): Promise<void> {
    try {
      await query(
        `INSERT INTO alerts (id, user_id, alert_type, message, risk_level, action_required, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          alert.id,
          alert.userId,
          alert.alertType,
          alert.message,
          alert.riskLevel,
          alert.actionRequired,
          alert.createdAt
        ]
      );

      console.log('Alert stored:', {
        alertId: alert.id,
        type: alert.alertType,
        riskLevel: alert.riskLevel
      });
    } catch (error) {
      console.error('Failed to store alert:', error);
    }
  }

  /**
   * Prepare outbound call for high-risk alerts (placeholder)
   * This will integrate with Amazon Connect in production
   */
  private async prepareOutboundCall(alert: Alert): Promise<void> {
    try {
      // Store outbound call request
      await query(
        `INSERT INTO outbound_call_queue (alert_id, user_id, priority, status, created_at) 
         VALUES ($1, $2, $3, $4, NOW())`,
        [alert.id, alert.userId, alert.riskLevel === 'critical' ? 1 : 2, 'pending']
      );

      console.log('Outbound call queued:', {
        alertId: alert.id,
        userId: alert.userId,
        priority: alert.riskLevel
      });

      // TODO: Integrate with Amazon Connect for actual outbound calling
      // const connectService = new AmazonConnectService();
      // await connectService.initiateOutboundCall(alert.userId, alert.message);
    } catch (error) {
      console.error('Failed to prepare outbound call:', error);
    }
  }

  /**
   * Get active alerts for a user
   */
  async getActiveAlerts(userId: string, limit: number = 5): Promise<Alert[]> {
    try {
      const result = await query(
        `SELECT id, user_id, alert_type, message, risk_level, action_required, created_at 
         FROM alerts 
         WHERE user_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [userId, limit]
      );

      return result.rows.map(row => ({
        id: row.id,
        userId: row.user_id,
        alertType: row.alert_type,
        message: row.message,
        riskLevel: row.risk_level,
        actionRequired: row.action_required,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error('Failed to get active alerts:', error);
      return [];
    }
  }

  /**
   * Mark alert as acknowledged
   */
  async acknowledgeAlert(alertId: string, userId: string): Promise<boolean> {
    try {
      await query(
        `UPDATE alerts SET acknowledged = true, acknowledged_at = NOW() 
         WHERE id = $1 AND user_id = $2`,
        [alertId, userId]
      );
      return true;
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
      return false;
    }
  }

  /**
   * Get alert statistics for analytics
   */
  async getAlertStatistics(userId: string): Promise<{
    totalAlerts: number;
    criticalAlerts: number;
    weatherAlerts: number;
    pestAlerts: number;
  }> {
    try {
      const result = await query(
        `SELECT 
          COUNT(*) as total_alerts,
          COUNT(CASE WHEN risk_level = 'critical' THEN 1 END) as critical_alerts,
          COUNT(CASE WHEN alert_type = 'weather' THEN 1 END) as weather_alerts,
          COUNT(CASE WHEN alert_type = 'pest' THEN 1 END) as pest_alerts
         FROM alerts 
         WHERE user_id = $1`,
        [userId]
      );

      const row = result.rows[0];
      return {
        totalAlerts: parseInt(row.total_alerts, 10),
        criticalAlerts: parseInt(row.critical_alerts, 10),
        weatherAlerts: parseInt(row.weather_alerts, 10),
        pestAlerts: parseInt(row.pest_alerts, 10)
      };
    } catch (error) {
      console.error('Failed to get alert statistics:', error);
      return {
        totalAlerts: 0,
        criticalAlerts: 0,
        weatherAlerts: 0,
        pestAlerts: 0
      };
    }
  }
}

export default new AlertEngine();
