import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import FormField from '../components/auth/FormField.jsx'
import PasswordToggle from '../components/auth/PasswordToggle.jsx'
import { registerUser } from '../utils/auth.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
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
      const result = registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      })

      setSubmitting(false)

      if (!result.success) {
        setErrors({ form: result.message })
        return
      }

      navigate('/profile')
    }, 600)
  }

  return (
    <AuthLayout
      eyebrow="Get Started"
      title="Create your CineMatch account"
      subtitle="Create your account and discover movies matched to your taste."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#E3B341] hover:text-[#F0C669]">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <FormField
          id="name"
          label="Name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter your name"
          autoComplete="name"
        />

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
          autoComplete="new-password"
          rightElement={
            <PasswordToggle show={showPassword} onClick={() => setShowPassword((v) => !v)} />
          }
        />

        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirm ? 'text' : 'password'}
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          autoComplete="new-password"
          rightElement={
            <PasswordToggle show={showConfirm} onClick={() => setShowConfirm((v) => !v)} />
          }
        />

        {errors.form && (
          <p className="text-sm font-medium text-[#F4D06F]">{errors.form}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-[#E3B341] px-6 py-3 text-sm font-semibold tracking-wide text-[#07080B] transition-all duration-200 hover:bg-[#F0C669] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'CREATING ACCOUNT…' : 'CREATE ACCOUNT'}
        </button>
      </form>
    </AuthLayout>
  )
}