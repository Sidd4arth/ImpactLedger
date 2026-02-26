import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Users, Building2, ArrowRight, ArrowLeft, Phone, Mail, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { CAUSE_AREAS, INDIAN_STATES } from '@/utils/constants'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(false)

  const totalSteps = 4

  // Final submit
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (userType === 'ngo') {
        navigate('/ngo/dashboard')
      } else {
        navigate('/csr/dashboard')
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center p-4">

      {/* Background blob */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-lg">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-text-primary">
              Impact<span className="text-primary">Ledger</span>
            </span>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s <= step
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-slate-100 text-text-muted'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div className={`w-8 h-0.5 ${s < step ? 'bg-primary' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/50 p-8">

          {/* ========== STEP 1: Choose Role ========== */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-text-primary">Join ImpactLedger</h2>
                <p className="text-text-secondary mt-1">Choose your role to get started</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    type: 'ngo',
                    icon: Users,
                    title: 'NGO',
                    desc: 'Register your organization to access funding',
                    color: 'border-primary bg-primary/5',
                  },
                  {
                    type: 'csr',
                    icon: Building2,
                    title: 'CSR Investor',
                    desc: 'Discover and fund impactful projects',
                    color: 'border-accent bg-accent/5',
                  },
                ].map((role) => {
                  const Icon = role.icon
                  return (
                    <button
                      key={role.type}
                      onClick={() => {
                        setUserType(role.type)
                        setStep(2)
                      }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg cursor-pointer ${
                        userType === role.type ? role.color : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-bold text-text-primary">{role.title}</h3>
                      <p className="text-xs text-text-muted mt-1">{role.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ========== STEP 2: Basic Info ========== */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-text-primary">Basic Information</h2>
                <p className="text-text-secondary mt-1">Tell us about yourself</p>
              </div>
              <Input label="Full Name" placeholder="Enter your full name" required />
              <Input label="Phone Number" placeholder="+91 98765 43210" icon={Phone} required />
              <Input label="Email Address" placeholder="you@example.com" icon={Mail} required />
              <Input label="Password" type="password" placeholder="Create a password" required />
            </div>
          )}

          {/* ========== STEP 3: Organization Details ========== */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-text-primary">Organization Details</h2>
                <p className="text-text-secondary mt-1">
                  {userType === 'ngo' ? 'Tell us about your NGO' : 'Tell us about your company'}
                </p>
              </div>

              <Input
                label={userType === 'ngo' ? 'Organization Name' : 'Company Name'}
                placeholder="Enter name"
                icon={Building2}
                required
              />
              <Input
                label={userType === 'ngo' ? 'Registration Number (80G/12A)' : 'CIN Number'}
                placeholder="Enter registration number"
                icon={FileText}
                required
              />

              {/* State dropdown */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-primary">
                  {userType === 'ngo' ? 'State' : 'Headquarter State'}
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Cause areas (NGO only) */}
              {userType === 'ngo' && (
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-primary">
                    Cause Areas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CAUSE_AREAS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        className="px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all cursor-pointer"
                      >
                        {c.icon} {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========== STEP 4: OTP Verification ========== */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Verify Your Phone</h2>
                <p className="text-text-secondary mt-1">
                  We&apos;ve sent a 6-digit code to your phone
                </p>
              </div>

              {/* OTP input boxes */}
              <div className="flex justify-center gap-3">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                ))}
              </div>

              <p className="text-sm text-text-muted">
                Didn&apos;t receive?{' '}
                <button className="text-primary font-semibold cursor-pointer">
                  Resend OTP
                </button>
              </p>
            </div>
          )}

          {/* ========== Navigation Buttons ========== */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            {/* Back button */}
            {step > 1 ? (
              <Button variant="ghost" icon={ArrowLeft} onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div />
            )}

            {/* Next / Submit button */}
            {step < totalSteps ? (
              <Button
                icon={ArrowRight}
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !userType}
              >
                Continue
              </Button>
            ) : (
              <Button icon={ArrowRight} onClick={handleSubmit} loading={loading}>
                Complete Registration
              </Button>
            )}
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-text-muted mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}