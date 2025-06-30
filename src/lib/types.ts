export type ThreatLevel = 'Safe' | 'Suspicious' | 'Dangerous' | 'Critical';

export interface ThreatLogEntry {
  id: string;
  timestamp: Date;
  sourceIp: string;
  attackType: string;
  confidence: number; // 0 to 1
  level: ThreatLevel;
  description: string;
}
