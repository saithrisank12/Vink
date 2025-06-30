'use client';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Scan, 
  BarChart3, 
  ShieldAlert, 
  MailWarning, 
  MicOff, 
  BrainCircuit, 
  History, 
  Voicemail, 
  ScreenShareOff 
} from 'lucide-react';
import { NetworkStatus } from '@/components/vink/dashboard/network-status';
import { StatCard } from '@/components/vink/dashboard/stat-card';
import { ThreatsChart } from '@/components/vink/dashboard/threats-chart';
import { Button } from '@/components/ui/button';
import { ThreatAlertModal } from '@/components/vink/threat-alert-modal';
import { FeedbackTooltip } from '@/components/vink/dashboard/feedback-tooltip';
import type { ClassifyMessageOutput } from '@/ai/flows/classify-message';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ClassifyMessageOutput | null>(null);
  const router = useRouter();

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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <FeedbackTooltip message="Your device is currently Safe — no active threats.">
          <div className="flex flex-col items-center justify-center gap-4 sm:col-span-2 lg:col-span-2 glass-card rounded-lg p-4 cursor-pointer transition-transform hover:scale-[1.02]">
            <NetworkStatus />
          </div>
        </FeedbackTooltip>

        <FeedbackTooltip message="Blocked 1 suspicious screen cast & 2 risky file links.">
          <div className="sm:col-span-2 lg:col-span-2">
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
          </div>
        </FeedbackTooltip>

        <FeedbackTooltip message="Just scanned 482 packets — no intrusions found.">
          <div>
            <StatCard title="Live Packets Analyzed" icon={BarChart3}>
              <div className="text-4xl font-bold">482</div>
              <p className="text-xs text-muted-foreground">No intrusions found</p>
            </StatCard>
          </div>
        </FeedbackTooltip>

        <FeedbackTooltip message="Stopped a fake login page from opening via browser tab.">
          <div>
            <StatCard title="Phishing Attempts" icon={MailWarning}>
              <div className="text-4xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Blocked Today</p>
            </StatCard>
          </div>
        </FeedbackTooltip>
        
        <FeedbackTooltip message="Prevented 1 app from accessing your microphone.">
          <div>
            <StatCard title="Spyware Watch" icon={MicOff}>
              <div className="text-4xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">App Prevented</p>
            </StatCard>
          </div>
        </FeedbackTooltip>

        <FeedbackTooltip message="AI just flagged 1 deepfake video and blocked it instantly.">
          <div>
            <StatCard title="AI Scan Summary" icon={BrainCircuit}>
                <div className="text-4xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Deepfake Blocked</p>
            </StatCard>
          </div>
        </FeedbackTooltip>

        <FeedbackTooltip message="Logged 3 events in the last 10 minutes — tap to view.">
          <div onClick={() => router.push('/threat-log')}>
            <StatCard title="Threat Log" icon={History}>
              <div className="text-4xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">New Events</p>
            </StatCard>
          </div>
        </FeedbackTooltip>

        <FeedbackTooltip message="Finished in 4.2 seconds — all apps verified safe.">
          <div>
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
          </div>
        </FeedbackTooltip>

        <FeedbackTooltip message="Voice pattern matched known scam — muted and blocked.">
          <div>
            <StatCard title="Voice Clone Detector" icon={Voicemail}>
              <div className="text-4xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Scam Muted</p>
            </StatCard>
          </div>
        </FeedbackTooltip>

        <FeedbackTooltip message="Blocked a graphic image auto-casting from unknown IP.">
          <div>
            <StatCard title="Fake Media Shield" icon={ScreenShareOff}>
              <div className="text-4xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Graphic Blocked</p>
            </StatCard>
          </div>
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
