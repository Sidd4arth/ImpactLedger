import {
  LayoutDashboard, User, Upload, FileText, Mic, FolderOpen,
  Bell, TrendingUp, Users, IndianRupee, FileCheck, Plus
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/ui/StatCard'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { useNavigate } from 'react-router-dom'

const sidebarItems = [
  { label: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', path: '/ngo/profile', icon: User },
  { label: 'Upload Receipts', path: '/ngo/receipts', icon: Upload, badge: '3' },
  { label: 'Compliance', path: '/ngo/compliance', icon: FileText },
  { label: 'Voice Input', path: '/ngo/voice', icon: Mic },
  { label: 'My Projects', path: '/ngo/projects', icon: FolderOpen },
  { label: 'Notifications', path: '/ngo/notifications', icon: Bell, badge: '5' },
]

export default function NGODashboard() {
  const navigate = useNavigate()

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="ngo">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Welcome back, Priya! 👋</h1>
          <p className="text-text-secondary mt-1">Here&apos;s what&apos;s happening with your organization today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" icon={Mic} onClick={() => navigate('/ngo/voice')}>
            Voice Input
          </Button>
          <Button size="sm" icon={Plus} onClick={() => navigate('/ngo/projects')}>
            New Project
          </Button>
        </div>
      </div>

      {/* Profile Completeness Banner */}
      <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-text-primary">Complete your profile to attract more investors</h3>
              <p className="text-sm text-text-secondary">A complete profile gets 3x more visibility</p>
            </div>
            <Button size="sm" variant="primary" onClick={() => navigate('/ngo/profile')}>
              Complete Profile
            </Button>
          </div>
          <ProgressBar value={65} label="Profile Completeness" color="primary" />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Funding Received"
          value="₹25,00,000"
          change="+12% this month"
          changeType="positive"
          icon={IndianRupee}
          color="primary"
        />
        <StatCard
          title="Beneficiaries Reached"
          value="5,230"
          change="+340 this month"
          changeType="positive"
          icon={Users}
          color="success"
        />
        <StatCard
          title="Active Projects"
          value="4"
          change="2 pending review"
          changeType="positive"
          icon={FolderOpen}
          color="accent"
        />
        <StatCard
          title="Compliance Forms"
          value="12"
          change="2 pending"
          changeType="positive"
          icon={FileCheck}
          color="warning"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-primary">Recent Activity</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: '📸', title: 'Receipt uploaded', desc: 'Water pump purchase - ₹15,000', time: '2 hours ago', status: 'Processed', statusColor: 'success' },
                  { icon: '💰', title: 'Funding received', desc: 'TechCorp CSR - ₹5,00,000', time: '1 day ago', status: 'Completed', statusColor: 'success' },
                  { icon: '📄', title: 'Form 10BD generated', desc: 'FY 2023-24 compliance form', time: '3 days ago', status: 'Review', statusColor: 'warning' },
                  { icon: '🤝', title: 'New interest from investor', desc: 'GreenFuture Capital wants to connect', time: '5 days ago', status: 'New', statusColor: 'accent' },
                  { icon: '🎤', title: 'Voice report submitted', desc: 'Monthly impact update in Marathi', time: '1 week ago', status: 'Saved', statusColor: 'primary' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-primary text-sm">{activity.title}</p>
                      <p className="text-sm text-text-muted truncate">{activity.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge variant={activity.statusColor}>{activity.status}</Badge>
                      <p className="text-xs text-text-muted mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-primary">Quick Actions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Upload, label: 'Upload Receipt', desc: 'Scan & process receipts with AI', path: '/ngo/receipts' },
                { icon: FileText, label: 'Generate Form 10BD', desc: 'Auto-generate compliance forms', path: '/ngo/compliance' },
                { icon: Mic, label: 'Voice Report', desc: 'Speak in Hindi or Marathi', path: '/ngo/voice' },
                { icon: FolderOpen, label: 'Update Project', desc: 'Add latest impact data', path: '/ngo/projects' },
              ].map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all text-left cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{action.label}</p>
                      <p className="text-xs text-text-muted">{action.desc}</p>
                    </div>
                  </button>
                )
              })}
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-primary">📅 Upcoming Deadlines</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Form 10BD Submission', date: 'Mar 31, 2025', urgency: 'danger' },
                { label: 'Q4 Impact Report', date: 'Apr 15, 2025', urgency: 'warning' },
                { label: 'Annual Report', date: 'Jun 30, 2025', urgency: 'default' },
              ].map((deadline) => (
                <div key={deadline.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <span className="text-sm font-medium text-text-primary">{deadline.label}</span>
                  <Badge variant={deadline.urgency}>{deadline.date}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>

    </DashboardLayout>
  )
}