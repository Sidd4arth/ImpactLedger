import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Search, Briefcase, Heart, Bell, Settings,
  ArrowLeft, MapPin, Phone, Mail, Globe, Calendar,
  Users, IndianRupee, ExternalLink, CheckCircle, Shield
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import SROIBadge from '@/components/csr/SROIBadge'
import ExpressInterestModal from '@/components/csr/ExpressInterestModal'
import ProjectCard from '@/components/ngo/ProjectCard'

const sidebarItems = [
  { label: 'Dashboard', path: '/csr/dashboard', icon: LayoutDashboard },
  { label: 'Discover NGOs', path: '/csr/search', icon: Search },
  { label: 'My Portfolio', path: '/csr/portfolio', icon: Briefcase },
  { label: 'Interests', path: '/csr/interests', icon: Heart },
  { label: 'Notifications', path: '/csr/notifications', icon: Bell },
  { label: 'Settings', path: '/csr/settings', icon: Settings },
]

const ngoData = {
  ngo_id: '1',
  organization_name: 'Water Warriors Foundation',
  icon: '💧',
  location: 'Satara, Maharashtra',
  state: 'Maharashtra',
  districts: ['Satara', 'Solapur', 'Pune'],
  verified: true,
  registration_number: 'MH/2019/0234567',
  registration_type: ['80G', '12A'],
  year_established: 2019,
  description: 'Water Warriors Foundation is a grassroots NGO focused on water conservation and sustainable agriculture in drought-prone regions of Maharashtra.',
  impact_narrative: 'We have implemented rainwater harvesting systems in 50 villages across Satara and Solapur districts, benefiting over 15,000 farming families. Our approach combines traditional watershed management knowledge with modern engineering solutions. In 2023, we helped increase groundwater levels by 30% in target villages, directly improving crop yields and reducing farmer distress migration.',
  cause_areas: ['Water', 'Environment', 'Rural Development'],
  contact: { phone: '+91 98765 43210', email: 'info@waterwarriors.org', website: 'https://waterwarriors.org' },
  predicted_sroi: 4.2,
  sroi_confidence: 'high',
  total_beneficiaries: 15000,
  total_funding_received: 3200000,
}

const projects = [
  {
    id: 1, name: 'Rainwater Harvesting Program', icon: '💧',
    description: 'Installing rainwater harvesting systems in 50 drought-prone villages.',
    status: 'active', location: 'Satara, MH', beneficiaries: 15000,
    funding_required: 5000000, funding_received: 3200000,
    cause_areas: ['Water', 'Environment'], duration: '12 months',
  },
  {
    id: 2, name: 'Clean Drinking Water Initiative', icon: '🚰',
    description: 'Providing clean drinking water through bore wells and filtration.',
    status: 'active', location: 'Solapur, MH', beneficiaries: 8000,
    funding_required: 3000000, funding_received: 1500000,
    cause_areas: ['Water', 'Health'], duration: '8 months',
  },
]

const impactStories = [
  {
    title: 'Reviving a Dried-Up Village',
    description: 'In Malegaon village, our rainwater harvesting system revived 3 dry wells within one monsoon season, transforming agriculture.',
    date: 'Dec 2024',
  },
  {
    title: '50 Women Trained as Water Champions',
    description: 'We trained 50 women from farming families to maintain and manage community water systems independently.',
    date: 'Oct 2024',
  },
]

export default function NGODetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [interestModalOpen, setInterestModalOpen] = useState(false)

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="csr">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Search Results</span>
      </button>

      {/* Hero Header */}
      <Card className="mb-8 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left: NGO Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-4xl shrink-0">
                  {ngoData.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-text-primary">{ngoData.organization_name}</h1>
                    {ngoData.verified && (
                      <Badge variant="success">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {ngoData.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Est. {ngoData.year_established}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {ngoData.cause_areas.map((cause) => (
                      <Badge key={cause} variant="primary">{cause}</Badge>
                    ))}
                    {ngoData.registration_type.map((type) => (
                      <Badge key={type} variant="accent">{type}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">{ngoData.description}</p>

              {/* Contact */}
              <div className="flex flex-wrap gap-4 mt-4">
                <a href={`tel:${ngoData.contact.phone}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" /> {ngoData.contact.phone}
                </a>
                <a href={`mailto:${ngoData.contact.email}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" /> {ngoData.contact.email}
                </a>
                <a href={ngoData.contact.website} target="_blank" className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors">
                  <Globe className="w-4 h-4" /> Website
                </a>
              </div>
            </div>

            {/* Right: Key Metrics & CTA */}
            <div className="lg:w-80 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xl font-bold text-primary">{ngoData.total_beneficiaries.toLocaleString()}</p>
                  <p className="text-xs text-text-muted">Beneficiaries</p>
                </div>
                <div className="bg-success/5 rounded-xl p-4 text-center">
                  <IndianRupee className="w-5 h-5 text-success mx-auto mb-1" />
                  <p className="text-xl font-bold text-success">₹{(ngoData.total_funding_received / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-text-muted">Funded</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <SROIBadge score={ngoData.predicted_sroi} confidence={ngoData.sroi_confidence} />
              </div>

              <div className="bg-accent/5 border border-accent/10 rounded-xl p-3 text-center">
                <p className="text-xs text-accent font-medium">
                  🤖 AI Predicted SROI: Every ₹1 invested generates ₹{ngoData.predicted_sroi} in social value
                </p>
              </div>

              <Button className="w-full" size="lg" icon={Heart} onClick={() => setInterestModalOpen(true)}>
                Express Interest & Fund
              </Button>
              <Button variant="secondary" className="w-full" size="sm" icon={ExternalLink}>
                Download NGO Report
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Impact Narrative */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">Impact Narrative</h3>
                <Badge variant="accent">🤖 Indexed for Semantic Search</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary leading-relaxed">{ngoData.impact_narrative}</p>
            </CardContent>
          </Card>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-bold text-text-primary mb-4">Active Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Impact Stories */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-primary">Impact Stories</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {impactStories.map((story, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-text-primary">{story.title}</h4>
                    <span className="text-xs text-text-muted">{story.date}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{story.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Verification */}
          <Card>
            <CardHeader>
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" /> Verification
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: '80G Registration', verified: true },
                { label: '12A Registration', verified: true },
                { label: 'PAN Verification', verified: true },
                { label: 'NGO Darpan', verified: true },
                { label: 'Annual Reports (3yr)', verified: true },
                { label: 'FCRA', verified: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <span className="text-sm text-text-secondary">{item.label}</span>
                  <span>{item.verified ? '✅' : '❌'}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SROI Analysis */}
          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/10">
            <CardHeader>
              <h3 className="font-bold text-text-primary">🤖 AI SROI Analysis</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-accent">{ngoData.predicted_sroi}x</p>
                <p className="text-sm text-text-muted mt-1">Predicted Social Return on Investment</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase">Key Factors</p>
                {[
                  { factor: 'Track Record', score: 90 },
                  { factor: 'Geographic Impact', score: 85 },
                  { factor: 'Cost Efficiency', score: 88 },
                  { factor: 'Scalability', score: 75 },
                  { factor: 'Sustainability', score: 82 },
                ].map((f) => (
                  <div key={f.factor}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-text-secondary">{f.factor}</span>
                      <span className="font-semibold text-text-primary">{f.score}%</span>
                    </div>
                    <ProgressBar value={f.score} showPercentage={false} color={f.score >= 85 ? 'success' : 'primary'} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted pt-2 border-t border-slate-200">
                Confidence: <strong>High</strong> (based on 3+ years of data)
              </p>
            </CardContent>
          </Card>

          {/* Geographic Focus */}
          <Card>
            <CardHeader>
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Geographic Focus
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold text-text-primary mb-2">{ngoData.state}</p>
              <div className="flex flex-wrap gap-2">
                {ngoData.districts.map((d) => (
                  <Badge key={d} variant="default">{d}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Express Interest Modal */}
      <ExpressInterestModal
        isOpen={interestModalOpen}
        onClose={() => setInterestModalOpen(false)}
        ngo={ngoData}
      />

    </DashboardLayout>
  )
}