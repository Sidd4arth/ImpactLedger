import { useState } from 'react'
import {
  LayoutDashboard, Search, Briefcase, Heart, Bell, Settings,
  SlidersHorizontal, Sparkles
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card, { CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import NGOResultCard from '@/components/csr/NGOResultCard'
import ExpressInterestModal from '@/components/csr/ExpressInterestModal'
import { CAUSE_AREAS, INDIAN_STATES } from '@/utils/constants'

const sidebarItems = [
  { label: 'Dashboard', path: '/csr/dashboard', icon: LayoutDashboard },
  { label: 'Discover NGOs', path: '/csr/search', icon: Search },
  { label: 'My Portfolio', path: '/csr/portfolio', icon: Briefcase },
  { label: 'Interests', path: '/csr/interests', icon: Heart },
  { label: 'Notifications', path: '/csr/notifications', icon: Bell },
  { label: 'Settings', path: '/csr/settings', icon: Settings },
]

const mockResults = [
  {
    ngo_id: '1',
    organization_name: 'Water Warriors Foundation',
    icon: '💧',
    location: 'Satara, Maharashtra',
    verified: true,
    relevance_score: 0.94,
    predicted_sroi: 4.2,
    sroi_confidence: 'high',
    impact_summary: 'Implemented rainwater harvesting in 50 villages, benefiting 15,000 farmers. Groundwater levels increased by 30% in target villages.',
    match_explanation: 'Strong semantic match on water conservation, drought mitigation, and Maharashtra geographic focus.',
    funding_required: 5000000,
    beneficiaries: 15000,
    projects_count: 4,
    cause_areas: ['Water', 'Environment'],
  },
  {
    ngo_id: '2',
    organization_name: 'AquaLife Foundation',
    icon: '🚰',
    location: 'Solapur, Maharashtra',
    verified: true,
    relevance_score: 0.89,
    predicted_sroi: 3.8,
    sroi_confidence: 'high',
    impact_summary: 'Providing clean drinking water access through bore wells and community filtration plants in 30 remote villages.',
    match_explanation: 'Matches on water access, rural development, and drought-prone region focus.',
    funding_required: 3000000,
    beneficiaries: 8000,
    projects_count: 2,
    cause_areas: ['Water', 'Health'],
  },
  {
    ngo_id: '3',
    organization_name: 'Green Earth Maharashtra',
    icon: '🌱',
    location: 'Pune, Maharashtra',
    verified: true,
    relevance_score: 0.82,
    predicted_sroi: 3.5,
    sroi_confidence: 'medium',
    impact_summary: 'Watershed management and soil conservation across 25 villages, combining traditional techniques with modern engineering.',
    match_explanation: 'Related through watershed management and soil conservation in drought-prone areas.',
    funding_required: 4000000,
    beneficiaries: 12000,
    projects_count: 3,
    cause_areas: ['Environment', 'Rural Development'],
  },
  {
    ngo_id: '4',
    organization_name: 'JalDhara Initiative',
    icon: '🌊',
    location: 'Nashik, Maharashtra',
    verified: false,
    relevance_score: 0.78,
    predicted_sroi: 3.2,
    sroi_confidence: 'medium',
    impact_summary: 'Building community-managed water supply systems and training village water committees for sustainable water governance.',
    match_explanation: 'Relevant for community water governance and grassroots capacity building in Maharashtra.',
    funding_required: 2000000,
    beneficiaries: 5000,
    projects_count: 2,
    cause_areas: ['Water', 'Livelihood'],
  },
]

export default function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [searching, setSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedNGO, setSelectedNGO] = useState(null)
  const [interestModalOpen, setInterestModalOpen] = useState(false)

  const handleSearch = (e) => {
    e?.preventDefault()
    if (!query.trim()) return
    setSearching(true)
    setTimeout(() => {
      setSearching(false)
      setSearched(true)
    }, 1500)
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userType="csr">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Discover NGOs 🔍</h1>
        <p className="text-text-secondary mt-1">
          Use natural language to find NGOs that match your CSR goals. Our AI understands intent, not just keywords.
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleSearch}>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Try: "water conservation projects in drought-prone Maharashtra"'
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                />
              </div>
              <Button type="submit" size="lg" icon={Search} loading={searching}>
                Search
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                icon={SlidersHorizontal}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </div>
          </form>

          {/* Quick suggestions */}
          {!searched && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-text-muted mr-2 py-1">Try:</span>
              {[
                'Water conservation in Maharashtra',
                'Women empowerment programs in rural India',
                'Education for tribal children',
                'Healthcare in remote villages',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => { setQuery(suggestion); handleSearch() }}
                  className="text-xs bg-slate-100 hover:bg-primary/10 hover:text-primary text-text-muted px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-slate-100 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-muted uppercase">Cause Area</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">All Causes</option>
                  {CAUSE_AREAS.map((c) => (
                    <option key={c.value} value={c.value}>{c.icon} {c.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-muted uppercase">State</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">All States</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-muted uppercase">Min SROI</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Any</option>
                  <option value="2">2x+</option>
                  <option value="3">3x+</option>
                  <option value="4">4x+</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-muted uppercase">Verification</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">All</option>
                  <option value="verified">Verified Only</option>
                </select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Searching Animation */}
      {searching && (
        <div className="text-center py-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <p className="text-lg font-semibold text-text-primary">AI is searching...</p>
          <p className="text-sm text-text-muted mt-1">Analyzing impact narratives across 10,000+ NGOs</p>
        </div>
      )}

      {/* Search Results */}
      {searched && !searching && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-text-muted">
                Found <strong className="text-text-primary">{mockResults.length} NGOs</strong> matching your query
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="accent">🤖 AI Semantic Search</Badge>
                <span className="text-xs text-text-muted">Query processed in 0.8s</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockResults.map((ngo) => (
              <NGOResultCard
                key={ngo.ngo_id}
                ngo={ngo}
                onExpressInterest={(ngo) => {
                  setSelectedNGO(ngo)
                  setInterestModalOpen(true)
                }}
                onViewDetails={(ngo) => navigate(`/csr/ngo/${ngo.ngo_id}`)}
              />
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {!searched && !searching && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">AI-Powered NGO Discovery</h3>
          <p className="text-text-secondary max-w-lg mx-auto mb-8">
            Unlike traditional keyword search, our semantic engine understands the meaning behind your query.
            Discover hidden gems that traditional platforms miss.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: '🎯', title: 'Intent-Based', desc: 'Understands what you mean, not just what you type' },
              { icon: '📊', title: 'SROI Predicted', desc: 'AI predicts impact return before you invest' },
              { icon: '✅', title: 'Verified NGOs', desc: 'Registration and impact claims verified' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-3xl">{feature.icon}</span>
                <h4 className="font-bold text-text-primary mt-3">{feature.title}</h4>
                <p className="text-xs text-text-muted mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Express Interest Modal */}
      <ExpressInterestModal
        isOpen={interestModalOpen}
        onClose={() => setInterestModalOpen(false)}
        ngo={selectedNGO}
      />

    </DashboardLayout>
  )
}