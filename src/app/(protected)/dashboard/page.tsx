'use client';
import { useState, useEffect, Suspense } from 'react';
import { Scan, BarChart3, ShieldAlert } from 'lucide-react';
import { NetworkStatus } from '@/components/vink/dashboard/network-status';
import { StatCard } from '@/components/vink/dashboard/stat-card';
import { ThreatsChart } from '@/components/vink/dashboard/threats-chart';
import { Button } from '@/components/ui/button';
import { ThreatAlertModal } from '@/components/vink/threat-alert-modal';
import type { ClassifyMessageOutput } from '@/ai/flows/classify-message';

function LivePackets() {
  const [count, setCount] = useState(133742);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + Math.floor(Math.random() * 10) + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-4xl font-bold text-primary">{count.toLocaleString()}</div>;
}

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

      <div className="flex flex-col items-center gap-8">
        <NetworkStatus />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Live Packets Analyzed"
          icon={BarChart3}
        >
          <LivePackets />
        </StatCard>
        <StatCard
          title="Threats (Last 24h)"
          icon={ShieldAlert}
          className="lg:col-span-2"
        >
          <div className="h-48">
            <Suspense fallback={<div>Loading chart...</div>}>
              <ThreatsChart />
            </Suspense>
          </div>
        </StatCard>
        <StatCard
          title="Manual Scan"
          icon={Scan}
          className="md:col-span-2 lg:col-span-3"
        >
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground">
              Initiate a full system scan for potential vulnerabilities.
            </p>
            <Button size="lg" className="font-bold" onClick={handleQuickScan}>
              <Scan className="mr-2 h-5 w-5" />
              Start Quick Scan
            </Button>
          </div>
        </StatCard>
      </div>
      <ThreatAlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        threatDetails={modalContent}
      />
    </div>
  );
}
