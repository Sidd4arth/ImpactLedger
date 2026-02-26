import { useState } from 'react'
import {
  LayoutDashboard, User, Upload, FileText, Mic, FolderOpen,
  Bell, CheckCircle, Clock, AlertCircle
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import ReceiptUploader from '@/components/ngo/ReceiptUploader'
import ReceiptCard from '@/components/ngo/ReceiptCard'

const sidebarItems = [
  { label: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', path: '/ngo/profile', icon: User },
  { label: 'Upload Receipts', path: '/ngo/receipts', icon: Upload },
  { label: 'Compliance', path: '/ngo/compliance', icon: FileText },
  { label: 'Voice Input', path: '/ngo/voice', icon: Mic },
  { label: 'My Projects', path: '/ngo/projects', icon: FolderOpen },
  { label: 'Notifications', path: '/ngo/notifications', icon: Bell },
]

const mockReceipts = [
  { id: 1, vendor: 'ABC Suppliers', amount: 15000, date: '2025-01-10', category: 'Equipment Purchase', status: 'completed', confidence: 0.92, thumbnail: null },
  { id: 2, vendor: 'Rural Hardware Store', amount: 8500, date: '2025-01-08', category: 'Construction Materials', status: 'completed', confidence: 0.88, thumbnail: null },
  { id: 3, vendor: null, amount: null, date: null, category: null, status: 'processing', confidence: null, thumbnail: null },
  { id: 4, vendor: 'Transport Services', amount: 3200, date: '2025-01-05', category: 'Travel', status: 'completed', confidence: 0.95, thumbnail: null },
  { id: 5, vendor: null, amount: null, date: null, category: null, status: 'failed', confidence: null, thumbnail: null },
]

export default function ReceiptsPage() {
  const [filter, setFilter] = useState('all')

  const filteredReceipts = filter === 'all'
    ? mockReceipts
    : mockReceipts.filter((r) => r.status === filter)

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="ngo">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Upload Receipts</h1>
        <p className="text-text-secondary mt-1">
          Upload photos of handwritten receipts. Our AI will extract and structure the data automatically.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Receipts" value="47" icon={Upload} color="primary" />
        <StatCard title="Processed" value="42" icon={CheckCircle} color="success" />
        <StatCard title="Processing" value="3" icon={Clock} color="warning" />
        <StatCard title="Failed" value="2" icon={AlertCircle} color="warning" />
      </div>

      {/* Upload Area */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-primary">Upload New Receipts</h3>
            <Badge variant="accent">🤖 AI-Powered OCR</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ReceiptUploader onUpload={(files) => console.log('Uploading:', files)} />
        </CardContent>
      </Card>

      {/* AI Processing Preview */}
      <Card className="mb-8 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
        <CardContent className="p-6">
          <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
            🤖 AI Processing Preview
          </h3>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Original Image placeholder */}
            <div>
              <p className="text-sm font-medium text-text-muted mb-2">Uploaded Image</p>
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-text-muted">
                    <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Receipt image will appear here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Extracted Data */}
            <div>
              <p className="text-sm font-medium text-text-muted mb-2">AI Extracted Data</p>
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                {[
                  { label: 'Vendor', value: 'ABC Suppliers', conf: 92 },
                  { label: 'Amount', value: '₹15,000', conf: 89 },
                  { label: 'Date', value: '10 Jan 2025', conf: 94 },
                  { label: 'Category', value: 'Equipment Purchase', conf: 87 },
                  { label: 'Items', value: 'Water pumps (x2)', conf: 91 },
                ].map((field) => (
                  <div key={field.label} className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-text-muted">{field.label}</span>
                      <p className="text-sm font-semibold text-text-primary">{field.value}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      field.conf >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {field.conf}%
                    </span>
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-accent font-medium">
                    🤖 SDG Mapping: SDG 6 (Clean Water and Sanitation)
                  </p>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Receipt History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-primary">Receipt History</h3>
            <div className="flex gap-2">
              {['all', 'completed', 'processing', 'failed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                    filter === f
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-text-muted hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredReceipts.map((receipt) => (
            <ReceiptCard key={receipt.id} receipt={receipt} />
          ))}
          {filteredReceipts.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              <Upload className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No receipts found with this filter</p>
            </div>
          )}
        </CardContent>
      </Card>

    </DashboardLayout>
  )
}