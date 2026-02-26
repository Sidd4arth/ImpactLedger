import { useState } from 'react'
import {
  LayoutDashboard, User, Upload, FileText, Mic, FolderOpen,
  Bell, Download, Eye, CheckCircle, Sparkles, FileCheck, Edit3
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'

const sidebarItems = [
  { label: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', path: '/ngo/profile', icon: User },
  { label: 'Upload Receipts', path: '/ngo/receipts', icon: Upload },
  { label: 'Compliance', path: '/ngo/compliance', icon: FileText },
  { label: 'Voice Input', path: '/ngo/voice', icon: Mic },
  { label: 'My Projects', path: '/ngo/projects', icon: FolderOpen },
  { label: 'Notifications', path: '/ngo/notifications', icon: Bell },
]

const receipts = [
  { id: 1, vendor: 'ABC Suppliers', amount: 15000, date: '2025-01-10', category: 'Equipment' },
  { id: 2, vendor: 'Rural Hardware', amount: 8500, date: '2025-01-08', category: 'Materials' },
  { id: 3, vendor: 'Fresh Produce Co.', amount: 4200, date: '2025-01-06', category: 'Supplies' },
  { id: 4, vendor: 'Transport Services', amount: 3200, date: '2025-01-05', category: 'Travel' },
  { id: 5, vendor: 'Office Stationery', amount: 1800, date: '2025-01-03', category: 'Admin' },
]

export default function CompliancePage() {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [selectedReceipts, setSelectedReceipts] = useState([1, 2, 4])

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 3000)
  }

  const toggleReceipt = (id) => {
    setSelectedReceipts((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const totalAmount = receipts
    .filter((r) => selectedReceipts.includes(r.id))
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="ngo">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Compliance & Forms</h1>
        <p className="text-text-secondary mt-1">
          Generate Form 10BD and other compliance documents using AI in minutes, not hours.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Forms Generated" value="12" icon={FileText} color="primary" />
        <StatCard title="Time Saved" value="88 hrs" icon={CheckCircle} color="success" />
        <StatCard title="Money Saved" value="₹2.4L" icon={Sparkles} color="accent" />
        <StatCard title="Pending Forms" value="2" icon={FileCheck} color="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Generate Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">Generate Form 10BD</h3>
                <Badge variant="accent">🤖 AI-Powered</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Financial Year & Form Type */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-primary">Financial Year</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>2024-25</option>
                    <option>2023-24</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-primary">Form Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Form 10BD</option>
                    <option>Form 10BE</option>
                    <option>Annual Report</option>
                  </select>
                </div>
              </div>

              {/* Receipt Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-text-primary">Select Receipts to Include</p>
                  <button
                    onClick={() => setSelectedReceipts(receipts.map((r) => r.id))}
                    className="text-xs text-primary font-semibold cursor-pointer hover:text-primary-dark"
                  >
                    Select All
                  </button>
                </div>
                <div className="space-y-2">
                  {receipts.map((receipt) => (
                    <label
                      key={receipt.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedReceipts.includes(receipt.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedReceipts.includes(receipt.id)}
                        onChange={() => toggleReceipt(receipt.id)}
                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-text-primary">{receipt.vendor}</p>
                        <p className="text-xs text-text-muted">{receipt.date} • {receipt.category}</p>
                      </div>
                      <p className="text-sm font-bold text-primary">₹{receipt.amount.toLocaleString()}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary & Generate Button */}
              <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Selected: {selectedReceipts.length} receipts</p>
                  <p className="text-xl font-bold text-primary">Total: ₹{totalAmount.toLocaleString()}</p>
                </div>
                <Button
                  icon={Sparkles}
                  size="lg"
                  onClick={handleGenerate}
                  loading={generating}
                  disabled={selectedReceipts.length === 0}
                >
                  {generating ? 'AI Generating...' : 'Generate Form 10BD'}
                </Button>
              </div>

            </CardContent>
          </Card>

          {/* Generated Form Preview */}
          {generated && (
            <Card className="border-success/30 bg-success/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <h3 className="text-lg font-bold text-text-primary">Form 10BD Generated!</h3>
                  </div>
                  <Badge variant="success">AI Generated</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">

                  {/* Form header */}
                  <div className="text-center border-b border-slate-100 pb-4">
                    <p className="text-xs text-text-muted uppercase tracking-wider">Government of India</p>
                    <h4 className="text-lg font-bold text-text-primary">FORM NO. 10BD</h4>
                    <p className="text-sm text-text-secondary">Statement of donations received</p>
                  </div>

                  {/* Form fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Name of Donee', value: 'Water Warriors Foundation' },
                      { label: 'PAN of Donee', value: 'AABCW1234X' },
                      { label: 'Financial Year', value: '2024-25' },
                      { label: 'Total Donations', value: `₹${totalAmount.toLocaleString()}` },
                      { label: 'Number of Donors', value: `${selectedReceipts.length}` },
                      { label: 'Section', value: '80G' },
                    ].map((field) => (
                      <div key={field.label} className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-text-muted">{field.label}</p>
                        <p className="text-sm font-semibold text-text-primary">{field.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-accent/5 border border-accent/10 rounded-lg p-3 text-xs text-accent">
                    🤖 AI Confidence: 94% — All fields auto-populated from processed receipts. Please review before submission.
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button variant="secondary" icon={Eye} className="flex-1">Preview PDF</Button>
                  <Button variant="secondary" icon={Edit3} className="flex-1">Edit Fields</Button>
                  <Button icon={Download} className="flex-1">Download PDF</Button>
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Previous Forms */}
          <Card>
            <CardHeader>
              <h3 className="font-bold text-text-primary">Previous Forms</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { type: 'Form 10BD', year: '2023-24', status: 'Submitted', date: 'Mar 15, 2024' },
                { type: 'Annual Report', year: '2023-24', status: 'Approved', date: 'Jun 30, 2024' },
                { type: 'Form 10BD', year: '2022-23', status: 'Approved', date: 'Mar 10, 2023' },
                { type: 'Form 10BE', year: '2022-23', status: 'Approved', date: 'May 20, 2023' },
              ].map((form, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{form.type}</p>
                    <p className="text-xs text-text-muted">{form.year} • {form.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={form.status === 'Approved' ? 'success' : 'warning'}>
                      {form.status}
                    </Badge>
                    <button className="p-1 hover:bg-slate-100 rounded cursor-pointer">
                      <Download className="w-4 h-4 text-text-muted" />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/10">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                🤖 How AI Generation Works
              </h3>
              {[
                { step: '1', text: 'Select processed receipts for the financial year' },
                { step: '2', text: 'AI aggregates data and maps to Form 10BD fields' },
                { step: '3', text: 'Review generated form and edit if needed' },
                { step: '4', text: 'Download PDF and submit to authorities' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {s.step}
                  </span>
                  <p className="text-sm text-text-secondary">{s.text}</p>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-xs text-text-muted">
                  ⚡ Average time: <strong>10 minutes</strong> vs 8 hours manually
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

    </DashboardLayout>
  )
}