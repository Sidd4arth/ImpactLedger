import { MapPin, Users, TrendingUp, ExternalLink, Heart } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import SROIBadge from './SROIBadge'
import Button from '@/components/ui/Button'
import Card, { CardContent } from '@/components/ui/Card'

export default function NGOResultCard({ ngo, onExpressInterest, onViewDetails }) {
  return (
    <Card hover className="overflow-hidden">
      <CardContent className="p-0">

        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-secondary" />

        <div className="p-6 space-y-4">

          {/* Header: Name + SROI */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {ngo.icon || '🏘️'}
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{ngo.organization_name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-text-muted" />
                  <span className="text-sm text-text-muted">{ngo.location}</span>
                  {ngo.verified && (
                    <Badge variant="success" className="text-[10px]">✓ Verified</Badge>
                  )}
                </div>
              </div>
            </div>
            <SROIBadge score={ngo.predicted_sroi} confidence={ngo.sroi_confidence} />
          </div>

          {/* Match Score Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-accent rounded-full h-2 transition-all"
                style={{ width: `${(ngo.relevance_score || 0) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary">
              {Math.round((ngo.relevance_score || 0) * 100)}% match
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
            {ngo.impact_summary}
          </p>

          {/* AI Match Explanation */}
          {ngo.match_explanation && (
            <div className="bg-accent/5 border border-accent/10 rounded-xl p-3">
              <p className="text-xs text-accent font-medium">
                🤖 AI Match: {ngo.match_explanation}
              </p>
            </div>
          )}

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-lg font-bold text-primary">
                ₹{((ngo.funding_required || 0) / 100000).toFixed(1)}L
              </p>
              <p className="text-xs text-text-muted">Funding Need</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-lg font-bold text-success">
                {(ngo.beneficiaries || 0).toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">Beneficiaries</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-lg font-bold text-accent">
                {ngo.projects_count || 0}
              </p>
              <p className="text-xs text-text-muted">Projects</p>
            </div>
          </div>

          {/* Cause tags */}
          <div className="flex flex-wrap gap-2">
            {(ngo.cause_areas || []).map((cause) => (
              <Badge key={cause} variant="primary">{cause}</Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="primary"
              size="sm"
              icon={Heart}
              className="flex-1"
              onClick={() => onExpressInterest?.(ngo)}
            >
              Express Interest
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={ExternalLink}
              className="flex-1"
              onClick={() => onViewDetails?.(ngo)}
            >
              View Details
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}