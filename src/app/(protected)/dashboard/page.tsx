
'use client';
import { Suspense, useState, useEffect } from 'react';
import { 
  BarChart3, 
  ShieldAlert, 
  ShieldCheck,
} from 'lucide-react';
import { StatCard } from '@/components/vink/dashboard/stat-card';
import { ThreatsChart } from '@/components/vink/dashboard/threats-chart';
import { FeedbackTooltip } from '@/components/vink/dashboard/feedback-tooltip';
import { NetworkStatus } from '@/components/vink/dashboard/network-status';
import { TestLab } from '@/components/vink/settings/test-lab';
import { ThreatAlertModal } from '@/components/vink/threat-alert-modal';
import type { ClassifyMessageOutput } from '@/ai/flows/classify-message';

const livePacketMessages = [
  "Scanning 1,240 live packets flowing through your network... No threats found.",
  "Blocked 2 unauthorized casting attempts from IP 192.168.1.12.",
  "Analyzed 976 data packets in the last 30 seconds — all clean.",
  "DLNA protocol detected. Monitoring for screen-cast hijack attempts.",
  "Stopped 1 smart TV trying to mirror your screen without permission.",
  "Live traffic spike detected — inspecting 17 suspicious media packets.",
  "All 4 connected devices are being monitored in real time.",
];

const mockThreats: ClassifyMessageOutput[] = [
    { riskLevel: 'Dangerous', explanation: 'A phishing link was detected trying to steal your banking credentials.' },
    { riskLevel: 'Suspicious', explanation: 'An app tried to access your contacts without permission. Access was blocked.' },
    { riskLevel: 'Dangerous', explanation: 'Malware detected in a downloaded file. The file has been quarantined.' },
    { riskLevel: 'Critical', explanation: 'A potential ransomware attack was identified and neutralized.' },
];

export default function DashboardPage() {
  const [livePackets, setLivePackets] = useState(482);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ClassifyMessageOutput | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add a random positive number to the current value so it only increases
      setLivePackets(prevPackets => prevPackets + Math.floor(Math.random() * 20) + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const isDemoMode = localStorage.getItem('vink-demo-mode') === 'true';
    if (!isDemoMode) return;

    const interval = setInterval(() => {
      const randomThreat = mockThreats[Math.floor(Math.random() * mockThreats.length)];
      setModalContent(randomThreat);
      setIsModalOpen(true);
    }, 12000); // every 12 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full animate-fade-in space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Real-time network monitoring and threat analysis.</p>
      </header>
      
      <FeedbackTooltip message="Your device is currently Safe — no active threats.">
          <StatCard title="Security Status" icon={ShieldCheck} className="flex flex-col items-center justify-center min-h-[300px]">
              <NetworkStatus />
          </StatCard>
      </FeedbackTooltip>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackTooltip message={livePacketMessages}>
          <StatCard title="Live Packets Analyzed" icon={BarChart3}>
            <div className="text-4xl font-bold">{livePackets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Packets processed per second</p>
          </StatCard>
        </FeedbackTooltip>

        <FeedbackTooltip message="Blocked 1 suspicious screen cast & 2 risky file links.">
          <StatCard
            title="Threats Detected"
            icon={ShieldAlert}
            className="h-full"
          >
            <div className="h-64">
              <Suspense fallback={<div>Loading chart...</div>}>
                <ThreatsChart />
              </Suspense>
            </div>
          </StatCard>
        </FeedbackTooltip>
      </div>

      <TestLab onAnalyze={(result) => {
        setModalContent(result);
        setIsModalOpen(true);
      }} />
      <ThreatAlertModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        threatDetails={modalContent}
      />
    </div>
  );
}
