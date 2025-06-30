'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { TestLab } from "@/components/vink/settings/test-lab";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';

function SettingsToggle({ id, label, description, defaultChecked = true }: { id: string, label: string, description: string, defaultChecked?: boolean }) {
    return (
        <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 glass-card">
            <div className="space-y-0.5">
              <Label htmlFor={id} className="text-base">{label}</Label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Switch id={id} defaultChecked={defaultChecked} />
        </div>
    );
}

function UsageBar({ label, value, colorClass }: { label: string, value: number, colorClass: string }) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-bold text-primary">{value}%</span>
            </div>
            <Progress value={value} indicatorClassName={colorClass} />
        </div>
    );
}

export default function SettingsPage() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('vink-auth');
        router.push('/');
    };

    return (
        <div className="w-full animate-fade-in space-y-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Settings & Test Lab</h1>
                <p className="text-muted-foreground">Customize your protection and test our AI.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Protection Settings</CardTitle>
                        <CardDescription>Configure VINK's core security features.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <SettingsToggle 
                            id="realtime-protection"
                            label="Real-Time Protection"
                            description="Actively scan for threats in pop-ups and messages."
                        />
                         <SettingsToggle 
                            id="auto-block"
                            label="Auto-Block Threats"
                            description="Automatically block content identified as dangerous."
                        />
                         <SettingsToggle 
                            id="demo-mode"
                            label="Demo Mode"
                            description="Enable simulated threat alerts for demonstration."
                            defaultChecked={false}
                        />
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Resource Usage</CardTitle>
                        <CardDescription>VINK is designed for minimal performance impact.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <UsageBar label="CPU Usage" value={8} colorClass="bg-[hsl(var(--chart-2))]" />
                       <UsageBar label="Battery Usage" value={3} colorClass="bg-[hsl(var(--chart-1))]" />
                    </CardContent>
                </Card>
            </div>

            <TestLab />
            
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Manage your account settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
