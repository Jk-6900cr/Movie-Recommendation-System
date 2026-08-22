import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import FormField from '../components/auth/FormField.jsx'
import PasswordToggle from '../components/auth/PasswordToggle.jsx'
import { hasCompletedProfile, loginUser } from '../utils/auth.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.password) {
    errors.password = 'Password is required.'
  }

  return errors
}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return

    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    setTimeout(() => {
      const result = loginUser({
        email: form.email,
        password: form.password,
      })

      setSubmitting(false)

      if (!result.success) {
        setErrors({ form: result.message })
        return
      }

      navigate(hasCompletedProfile() ? '/dashboard' : '/profile')
    }, 600)
  }

  return (
    <AuthLayout
      eyebrow="Welcome Back"
      title="Welcome back to CineMatch"
      subtitle="Sign in to continue discovering movies made for your taste."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-medium text-[#E3B341] hover:text-[#F0C669]">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <FormField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
          autoComplete="email"
        />

        <FormField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
          rightElement={
            <PasswordToggle show={showPassword} onClick={() => setShowPassword((v) => !v)} />
          }
        />

        {errors.form && (
          <div className="rounded-xl border border-[#E3B341]/40 bg-[#151B22] p-3 text-sm text-[#F4D06F]">
            <p className="font-medium">{errors.form}</p>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-[#E3B341] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#F4D06F] transition-all duration-200 hover:bg-[#E3B341] hover:text-[#07080B]"
            >
              Create an account
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-[#E3B341] px-6 py-3 text-sm font-semibold tracking-wide text-[#07080B] transition-all duration-200 hover:bg-[#F0C669] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'LOGGING IN…' : 'LOGIN'}
        </button>
      </form>
    </AuthLayout>
  )
}