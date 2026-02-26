import { Eye, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Badge from '@/components/ui/Badge'

export default function ReceiptCard({ receipt }) {
  // Status configuration
  const statusConfig = {
    completed: { icon: CheckCircle, label: 'Processed', variant: 'success' },
    processing: { icon: Clock, label: 'Processing', variant: 'warning' },
    failed: { icon: AlertCircle, label: 'Failed', variant: 'danger' },
    pending: { icon: Clock, label: 'Pending', variant: 'default' },
  }

  const status = statusConfig[receipt.status] || statusConfig.pending
  const StatusIcon = status.icon

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">

        {/* Thumbnail */}
        <div className="w-24 h-24 shrink-0 bg-slate-100 flex items-center justify-center">
          {receipt.thumbnail ? (
            <img
              src={receipt.thumbnail}
              alt="Receipt"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl">🧾</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-text-primary text-sm">
                {receipt.vendor || 'Processing...'}
              </p>
              <p className="text-lg font-bold text-primary mt-0.5">
                {receipt.amount ? `₹${receipt.amount.toLocaleString()}` : '—'}
              </p>
            </div>
            <Badge variant={status.variant}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </Badge>
          </div>

          <div className="flex items-center justify-between mt-3">
            {/* Date and category */}
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>{receipt.date || 'Date pending'}</span>
              <span>•</span>
              <span>{receipt.category || 'Uncategorized'}</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-1">
              <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                <Eye className="w-4 h-4 text-text-muted" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                <Download className="w-4 h-4 text-text-muted" />
              </button>
            </div>
          </div>

          {/* Confidence bar */}
          {receipt.confidence && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-success rounded-full h-1.5"
                  style={{ width: `${receipt.confidence * 100}%` }}
                />
              </div>
              <span className="text-xs text-text-muted">
                {Math.round(receipt.confidence * 100)}% confidence
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}