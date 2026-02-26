import {
  LayoutDashboard, Search, Briefcase, Heart, Bell, Settings,
  TrendingUp, Users, IndianRupee, Target, ArrowUpRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/ui/StatCard'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { CauseAreaChart, GeographicChart, ImpactTimelineChart } from '@/components/csr/PortfolioCharts'

const sidebarItems = [
  { label: 'Dashboard', path: '/csr/dashboard', icon: LayoutDashboard },
  { label: 'Discover NGOs', path: '/csr/search', icon: Search },
  { label: 'My Portfolio', path: '/csr/portfolio', icon: Briefcase },
  { label: 'Interests', path: '/csr/interests', icon: Heart, badge: '3' },
  { label: 'Notifications', path: '/csr/notifications', icon: Bell, badge: '7' },
  { label: 'Settings', path: '/csr/settings', icon: Settings },
]

const causeAreaData = [
  { name: 'Education', value: 2000000 },
  { name: 'Water', value: 1500000 },
  { name: 'Health', value: 1000000 },
  { name: 'Environment', value: 800000 },
  { name: 'Livelihood', value: 500000 },
]

const geoData = [
  { name: 'Maharashtra', value: 2500000 },
  { name: 'Karnataka', value: 1500000 },
  { name: 'Tamil Nadu', value: 1000000 },
  { name: 'Rajasthan', value: 600000 },
  { name: 'UP', value: 400000 },
]

const timelineData = [
  { month: 'Jul', beneficiaries: 5000, funding: 10 },
  { month: 'Aug', beneficiaries: 8000, funding: 15 },
  { month: 'Sep', beneficiaries: 12000, funding: 18 },
  { month: 'Oct', beneficiaries: 18000, funding: 25 },
  { month: 'Nov', beneficiaries: 25000, funding: 35 },
  { month: 'Dec', beneficiaries: 35000, funding: 42 },
  { month: 'Jan', beneficiaries: 42000, funding: 50 },
]

export default function CSRDashboard() {
  const navigate = useNavigate()

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="csr">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">CSR Dashboard 📊</h1>
          <p className="text-text-secondary mt-1">Track your social impact portfolio and discover new opportunities</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" icon={Search} onClick={() => navigate('/csr/search')}>
            Discover NGOs
          </Button>
          <Button size="sm" icon={TrendingUp}>Export Report</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Funding Committed"
          value="₹5.8 Cr"
          change="+₹80L this quarter"
          changeType="positive"
          icon={IndianRupee}
          color="primary"
        />
        <StatCard
          title="Beneficiaries Reached"
          value="1,25,000"
          change="+15,000 this month"
          changeType="positive"
          icon={Users}
          color="success"
        />
        <StatCard
          title="Active Projects"
          value="12"
          change="3 new this quarter"
          changeType="positive"
          icon={Target}
          color="accent"
        />
        <StatCard
          title="Average SROI"
          value="3.8x"
          change="+0.4 from last year"
          changeType="positive"
          icon={TrendingUp}
          color="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <CauseAreaChart data={causeAreaData} />
        <GeographicChart data={geoData} />
      </div>

      {/* Impact Timeline */}
      <div className="mb-8">
        <ImpactTimelineChart data={timelineData} />
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Active Projects Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">Active Projects</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">NGO / Project</th>
                      <th className="text-left py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Cause</th>
                      <th className="text-right py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Funded</th>
                      <th className="text-right py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">SROI</th>
                      <th className="text-right py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { ngo: 'Water Warriors', project: 'Rainwater Harvesting', cause: 'Water', funded: '₹32L', sroi: '4.2x', status: 'On Track', icon: '💧' },
                      { ngo: 'EduFirst NGO', project: 'Digital Literacy', cause: 'Education', funded: '₹25L', sroi: '3.8x', status: 'On Track', icon: '📚' },
                      { ngo: 'GreenEarth', project: 'Tree Plantation', cause: 'Environment', funded: '₹18L', sroi: '3.5x', status: 'Delayed', icon: '🌱' },
                      { ngo: 'HealthBridge', project: 'Mobile Clinics', cause: 'Health', funded: '₹40L', sroi: '4.5x', status: 'On Track', icon: '🏥' },
                      { ngo: 'SkillIndia NGO', project: 'Women Training', cause: 'Livelihood', funded: '₹15L', sroi: '3.2x', status: 'Completed', icon: '👩‍💼' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{row.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-text-primary">{row.ngo}</p>
                              <p className="text-xs text-text-muted">{row.project}</p>
                            </div>
                          </div>
                        </td>
                        <td><Badge variant="primary">{row.cause}</Badge></td>
                        <td className="text-right text-sm font-semibold text-text-primary">{row.funded}</td>
                        <td className="text-right text-sm font-bold text-success">{row.sroi}</td>
                        <td className="text-right">
                          <Badge variant={
                            row.status === 'On Track' ? 'success' :
                            row.status === 'Completed' ? 'primary' : 'warning'
                          }>
                            {row.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">

          {/* AI Recommendations */}
          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/10">
            <CardHeader>
              <h3 className="font-bold text-text-primary">🤖 AI Recommendations</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'AquaLife Foundation', match: '94%', cause: 'Water', location: 'Rajasthan' },
                { name: 'EduRise Trust', match: '91%', cause: 'Education', location: 'Bihar' },
                { name: 'Green Villages NGO', match: '87%', cause: 'Environment', location: 'Maharashtra' },
              ].map((rec, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-lg">
                    {rec.cause === 'Water' ? '💧' : rec.cause === 'Education' ? '📚' : '🌱'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary">{rec.name}</p>
                    <p className="text-xs text-text-muted">{rec.cause} • {rec.location}</p>
                  </div>
                  <span className="text-sm font-bold text-accent">{rec.match}</span>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full" icon={ArrowUpRight} onClick={() => navigate('/csr/search')}>
                View All Recommendations
              </Button>
            </CardContent>
          </Card>

          {/* Compliance */}
          <Card>
            <CardHeader>
              <h3 className="font-bold text-text-primary">📋 Compliance Status</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Form 10BE (FY 2024-25)', status: 'Pending', date: 'Due: Mar 31', urgency: 'danger' },
                { label: 'Annual CSR Report', status: 'Draft', date: 'Due: Jun 30', urgency: 'warning' },
                { label: 'Form 10BE (FY 2023-24)', status: 'Submitted', date: 'Dec 15, 2024', urgency: 'success' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.label}</p>
                    <p className="text-xs text-text-muted">{item.date}</p>
                  </div>
                  <Badge variant={item.urgency}>{item.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>

    </DashboardLayout>
  )
}