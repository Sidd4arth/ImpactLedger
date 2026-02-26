import { useState } from 'react'
import {
  LayoutDashboard, User, Upload, FileText, Mic, FolderOpen,
  Bell, Save, MapPin, Phone, Mail, Globe, Camera
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { CAUSE_AREAS, INDIAN_STATES } from '@/utils/constants'

const sidebarItems = [
  { label: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', path: '/ngo/profile', icon: User },
  { label: 'Upload Receipts', path: '/ngo/receipts', icon: Upload },
  { label: 'Compliance', path: '/ngo/compliance', icon: FileText },
  { label: 'Voice Input', path: '/ngo/voice', icon: Mic },
  { label: 'My Projects', path: '/ngo/projects', icon: FolderOpen },
  { label: 'Notifications', path: '/ngo/notifications', icon: Bell },
]

export default function NGOProfile() {
  const [selectedCauses, setSelectedCauses] = useState(['water', 'environment'])
  const [saving, setSaving] = useState(false)

  const toggleCause = (value) => {
    setSelectedCauses((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    )
  }

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="ngo">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Organization Profile</h1>
          <p className="text-text-secondary mt-1">Keep your profile updated to attract more CSR investors</p>
        </div>
        <Button icon={Save} onClick={handleSave} loading={saving}>Save Changes</Button>
      </div>

      {/* Profile Completeness */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-text-primary">Profile Completeness</h3>
              <p className="text-sm text-text-muted">Complete profiles get 3x more investor views</p>
            </div>
            <span className="text-2xl font-bold text-primary">65%</span>
          </div>
          <ProgressBar value={65} color="primary" showPercentage={false} />
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="success">✓ Basic Info</Badge>
            <Badge variant="success">✓ Registration</Badge>
            <Badge variant="warning">⚠ Impact Narrative</Badge>
            <Badge variant="danger">✗ Documents</Badge>
            <Badge variant="danger">✗ Team Members</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-primary">Basic Information</h3>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Organization Name" defaultValue="Water Warriors Foundation" required />
                <Input label="Registration Number" defaultValue="MH/2019/0234567" icon={FileText} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-primary">Registration Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="80G">80G</option>
                    <option value="12A">12A</option>
                    <option value="FCRA">FCRA</option>
                  </select>
                </div>
                <Input label="Year Established" defaultValue="2019" type="number" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-primary">Description</label>
                <textarea
                  rows={3}
                  defaultValue="We work towards water conservation and sustainable agriculture in drought-prone regions of Maharashtra."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Impact Narrative */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">Impact Narrative</h3>
                <Badge variant="accent">🤖 Used for AI Matching</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-text-muted">
                Write a detailed narrative about your work. This is used by our AI for semantic matchmaking with CSR investors.
              </p>
              <textarea
                rows={6}
                defaultValue="We have implemented rainwater harvesting systems in 50 villages across Satara and Solapur districts, benefiting over 15,000 farming families. Our approach combines traditional watershed management knowledge with modern engineering solutions. In 2023, we helped increase groundwater levels by 30% in target villages, directly improving crop yields and reducing farmer distress migration."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
              <div className="flex items-center gap-2 text-sm text-success">
                <span>✓</span>
                <span>Good narrative! This gives AI enough context for accurate matching.</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Location */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-primary">Contact & Location</h3>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Primary Phone" defaultValue="+91 98765 43210" icon={Phone} />
                <Input label="Email" defaultValue="info@waterwarriors.org" icon={Mail} />
              </div>
              <Input label="Website" defaultValue="https://waterwarriors.org" icon={Globe} />
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-primary">State</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <Input label="Districts" defaultValue="Satara, Solapur, Pune" icon={MapPin} />
              </div>
              <Input label="Address" defaultValue="123 Community Lane, Satara, Maharashtra 415001" />
            </CardContent>
          </Card>

          {/* Cause Areas */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-primary">Cause Areas</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted mb-4">Select all cause areas your organization works on</p>
              <div className="flex flex-wrap gap-3">
                {CAUSE_AREAS.map((cause) => (
                  <button
                    key={cause.value}
                    onClick={() => toggleCause(cause.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ${
                      selectedCauses.includes(cause.value)
                        ? 'border-primary bg-primary/10 text-primary shadow-sm'
                        : 'border-slate-200 text-text-secondary hover:border-slate-300'
                    }`}
                  >
                    {cause.icon} {cause.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">

          {/* Profile Photo */}
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-4xl">
                💧
              </div>
              <div>
                <p className="font-bold text-text-primary">Water Warriors Foundation</p>
                <p className="text-sm text-text-muted">Maharashtra, India</p>
              </div>
              <Button variant="secondary" size="sm" icon={Camera} className="w-full">
                Upload Logo
              </Button>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <h3 className="font-bold text-text-primary">Verification Status</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: '80G Registration', icon: '✅' },
                { label: '12A Registration', icon: '⏳' },
                { label: 'PAN Verification', icon: '✅' },
                { label: 'NGO Darpan', icon: '❌' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-medium text-text-primary">{item.label}</span>
                  <span className="text-lg">{item.icon}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <Card>
            <CardHeader>
              <h3 className="font-bold text-text-primary">Profile Stats</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Profile Views', value: '234', change: '+12 this week' },
                { label: 'Investor Interests', value: '8', change: '+3 this month' },
                { label: 'Search Appearances', value: '56', change: '+18 this month' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{stat.label}</p>
                    <p className="text-xs text-success">{stat.change}</p>
                  </div>
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>

    </DashboardLayout>
  )
}