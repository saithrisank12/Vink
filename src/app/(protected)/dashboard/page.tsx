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

const livePacketMessages = [
  "Scanning 1,240 live packets flowing through your network... No threats found.",
  "Blocked 2 unauthorized casting attempts from IP 192.168.1.12.",
  "Analyzed 976 data packets in the last 30 seconds — all clean.",
  "DLNA protocol detected. Monitoring for screen-cast hijack attempts.",
  "Stopped 1 smart TV trying to mirror your screen without permission.",
  "Live traffic spike detected — inspecting 17 suspicious media packets.",
  "All 4 connected devices are being monitored in real time.",
];

export default function DashboardPage() {
  const [livePackets, setLivePackets] = useState(482);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate the number +/- 50 around a baseline of 480
      const base = 480;
      const fluctuation = Math.floor(Math.random() * 101) - 50; // -50 to +50
      setLivePackets(base + fluctuation);
    }, 1500); // Update every 1.5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
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
            <div className="text-4xl font-bold">{livePackets}</div>
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

      <TestLab />
    </div>
  );
}
