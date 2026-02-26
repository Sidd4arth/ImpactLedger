import { useState } from 'react'
import { IndianRupee, Send, Building2 } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function ExpressInterestModal({ isOpen, onClose, ngo }) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  // Don't render if no NGO selected
  if (!ngo) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Express Interest" size="md">

      {/* Success State */}
      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">✉️</span>
          </div>
          <h3 className="text-xl font-bold text-text-primary">Interest Sent!</h3>
          <p className="text-text-secondary">
            Your interest has been sent to <strong>{ngo.organization_name}</strong>.
            They will respond within 48 hours.
          </p>
          <Button onClick={() => { setSubmitted(false); onClose() }}>
            Done
          </Button>
        </div>
      ) : (

        /* Form State */
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NGO Info */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
              {ngo.icon || '🏘️'}
            </div>
            <div>
              <p className="font-bold text-text-primary">{ngo.organization_name}</p>
              <p className="text-sm text-text-muted">{ngo.location}</p>
            </div>
            {ngo.verified && <Badge variant="success">Verified</Badge>}
          </div>

          {/* Funding Amount */}
          <Input
            label="Proposed Funding Amount (₹)"
            placeholder="e.g., 5,00,000"
            icon={IndianRupee}
            type="number"
            required
          />

          {/* Project Selection */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-primary">
              Select Project
            </label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="">All Projects</option>
              <option value="water">Water Conservation Initiative</option>
              <option value="edu">Rural Education Program</option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-primary">
              Message to NGO
            </label>
            <textarea
              rows={4}
              placeholder="Tell the NGO about your interest, expectations, and how you'd like to collaborate..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          {/* CSR Alignment Info */}
          <div className="bg-accent/5 rounded-xl p-4">
            <p className="text-sm font-medium text-accent flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              CSR Alignment Score: <strong>89%</strong>
            </p>
            <p className="text-xs text-text-muted mt-1">
              This NGO aligns well with your preferred cause areas and geographic focus.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" icon={Send} loading={loading}>
              Send Interest
            </Button>
          </div>

        </form>
      )}

    </Modal>
  )
}