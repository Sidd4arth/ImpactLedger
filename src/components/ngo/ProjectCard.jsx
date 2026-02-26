import { MapPin, Users, Calendar } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import Card, { CardContent } from '@/components/ui/Card'

export default function ProjectCard({ project }) {
  // Status color mapping
  const statusVariant = {
    active: 'success',
    draft: 'default',
    completed: 'primary',
    cancelled: 'danger',
  }

  // Calculate funding percentage
  const fundingPercent = project.funding_required
    ? Math.round((project.funding_received / project.funding_required) * 100)
    : 0

  return (
    <Card hover>
      <CardContent className="p-6 space-y-4">

        {/* Header: Name + Status */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{project.icon || '📋'}</span>
              <h3 className="font-bold text-text-primary">{project.name}</h3>
            </div>
            <p className="text-sm text-text-secondary line-clamp-2">{project.description}</p>
          </div>
          <Badge variant={statusVariant[project.status] || 'default'}>
            {project.status}
          </Badge>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <MapPin className="w-4 h-4" />
            <span>{project.location || 'India'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Users className="w-4 h-4" />
            <span>{project.beneficiaries?.toLocaleString() || 0}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Calendar className="w-4 h-4" />
            <span>{project.duration || 'Ongoing'}</span>
          </div>
        </div>

        {/* Funding Progress */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-text-muted">Funding Progress</span>
            <span className="font-semibold text-primary">
              ₹{(project.funding_received || 0).toLocaleString()} / ₹{(project.funding_required || 0).toLocaleString()}
            </span>
          </div>
          <ProgressBar
            value={fundingPercent}
            color={fundingPercent >= 75 ? 'success' : 'primary'}
            showPercentage={false}
          />
        </div>

        {/* Cause area tags */}
        <div className="flex flex-wrap gap-2">
          {(project.cause_areas || []).map((cause) => (
            <span
              key={cause}
              className="text-xs bg-slate-100 text-text-muted px-2.5 py-1 rounded-full font-medium"
            >
              {cause}
            </span>
          ))}
        </div>

      </CardContent>
    </Card>
  )
}