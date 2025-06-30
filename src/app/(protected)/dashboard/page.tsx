'use client';
import { Suspense } from 'react';
import { 
  BarChart3, 
  ShieldAlert, 
  ShieldCheck,
} from 'lucide-react';
import { StatCard } from '@/components/vink/dashboard/stat-card';
import { ThreatsChart } from '@/components/vink/dashboard/threats-chart';
import { FeedbackTooltip } from '@/components/vink/dashboard/feedback-tooltip';
import { NetworkStatus } from '@/components/vink/dashboard/network-status';

export default function DashboardPage() {
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
        <FeedbackTooltip message="Just scanned 482 packets — no intrusions found.">
          <StatCard title="Live Packets Analyzed" icon={BarChart3}>
            <div className="text-4xl font-bold">482</div>
            <p className="text-xs text-muted-foreground">No intrusions found</p>
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
    </div>
  );
}
