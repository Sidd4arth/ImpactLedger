import { useState } from 'react'
import {
  LayoutDashboard, User, Upload, FileText, Mic, FolderOpen,
  Bell, Plus, Search
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card, { CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ProjectCard from '@/components/ngo/ProjectCard'

const sidebarItems = [
  { label: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', path: '/ngo/profile', icon: User },
  { label: 'Upload Receipts', path: '/ngo/receipts', icon: Upload },
  { label: 'Compliance', path: '/ngo/compliance', icon: FileText },
  { label: 'Voice Input', path: '/ngo/voice', icon: Mic },
  { label: 'My Projects', path: '/ngo/projects', icon: FolderOpen },
  { label: 'Notifications', path: '/ngo/notifications', icon: Bell },
]

const mockProjects = [
  {
    id: 1, name: 'Rainwater Harvesting Program', icon: '💧',
    description: 'Installing rainwater harvesting systems in 50 drought-prone villages across Satara district.',
    status: 'active', location: 'Satara, MH', beneficiaries: 15000,
    funding_required: 5000000, funding_received: 3200000,
    cause_areas: ['Water', 'Environment'], duration: '12 months',
  },
  {
    id: 2, name: 'Clean Drinking Water Initiative', icon: '🚰',
    description: 'Providing access to clean drinking water through bore wells and filtration systems.',
    status: 'active', location: 'Solapur, MH', beneficiaries: 8000,
    funding_required: 3000000, funding_received: 1500000,
    cause_areas: ['Water', 'Health'], duration: '8 months',
  },
  {
    id: 3, name: 'Women Farmer Training', icon: '👩‍🌾',
    description: 'Training 500 women in sustainable agriculture and water management techniques.',
    status: 'completed', location: 'Pune, MH', beneficiaries: 500,
    funding_required: 1500000, funding_received: 1500000,
    cause_areas: ['Women Empowerment', 'Livelihood'], duration: '6 months',
  },
  {
    id: 4, name: 'School Water & Sanitation', icon: '🏫',
    description: 'Installing water purifiers and toilet facilities in 20 rural schools.',
    status: 'draft', location: 'Nashik, MH', beneficiaries: 3000,
    funding_required: 2000000, funding_received: 0,
    cause_areas: ['Education', 'Water'], duration: '10 months',
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all')

  const filteredProjects = filter === 'all'
    ? mockProjects
    : mockProjects.filter((p) => p.status === filter)

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="ngo">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">My Projects</h1>
          <p className="text-text-secondary mt-1">Manage your social impact projects and track funding</p>
        </div>
        <Button icon={Plus}>New Project</Button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {['all', 'active', 'completed', 'draft'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors cursor-pointer ${
                filter === f
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-text-muted hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {f} {f !== 'all' && `(${mockProjects.filter((p) => p.status === f).length})`}
            </button>
          ))}
        </div>
        <div className="w-64">
          <Input placeholder="Search projects..." icon={Search} />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="py-16 text-center">
          <CardContent>
            <FolderOpen className="w-16 h-16 text-text-muted/30 mx-auto mb-4" />
            <p className="text-lg font-semibold text-text-primary">No projects found</p>
            <p className="text-text-muted mt-1">Create your first project to start attracting investors</p>
            <Button className="mt-4" icon={Plus}>Create Project</Button>
          </CardContent>
        </Card>
      )}

    </DashboardLayout>
  )
}