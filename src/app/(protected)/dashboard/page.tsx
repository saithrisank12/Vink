'use client';
import { useState, Suspense } from 'react';
import { 
  Scan, 
  BarChart3, 
  ShieldAlert, 
  Voicemail
} from 'lucide-react';
import { StatCard } from '@/components/vink/dashboard/stat-card';
import { ThreatsChart } from '@/components/vink/dashboard/threats-chart';
import { Button } from '@/components/ui/button';
import { ThreatAlertModal } from '@/components/vink/threat-alert-modal';
import { FeedbackTooltip } from '@/components/vink/dashboard/feedback-tooltip';
import type { ClassifyMessageOutput } from '@/ai/flows/classify-message';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ClassifyMessageOutput | null>(null);

  const handleQuickScan = () => {
    setModalContent({
        riskLevel: 'Dangerous',
        explanation: 'A simulated phishing attempt was detected and blocked during the quick scan.'
    });
    setIsModalOpen(true);
  };
  
  return (
    <div className="w-full animate-fade-in space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Real-time network monitoring and threat analysis.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FeedbackTooltip message="Blocked 1 suspicious screen cast & 2 risky file links.">
          <StatCard
            title="Threats (Last 24h)"
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

        <FeedbackTooltip message="Just scanned 482 packets — no intrusions found.">
          <StatCard title="Live Packets Analyzed" icon={BarChart3}>
            <div className="text-4xl font-bold">482</div>
            <p className="text-xs text-muted-foreground">No intrusions found</p>
          </StatCard>
        </FeedbackTooltip>

        <FeedbackTooltip message="Voice pattern matched known scam — muted and blocked.">
          <StatCard title="Voice Clone Detector" icon={Voicemail}>
            <div className="text-4xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Scam Muted</p>
          </StatCard>
        </FeedbackTooltip>

        <FeedbackTooltip message="Finished in 4.2 seconds — all apps verified safe.">
          <StatCard title="Quick Scan" icon={Scan}>
            <div className="flex flex-col items-start justify-center gap-4">
              <p className="text-muted-foreground text-sm">
                All apps verified safe.
              </p>
              <Button size="sm" className="font-bold" onClick={handleQuickScan}>
                <Scan className="mr-2 h-4 w-4" />
                Scan Again
              </Button>
            </div>
          </StatCard>
        </FeedbackTooltip>

      </div>
      <ThreatAlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        threatDetails={modalContent}
      />
    </div>
  );
}
