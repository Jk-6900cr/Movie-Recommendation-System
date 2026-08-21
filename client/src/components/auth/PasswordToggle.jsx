export default function PasswordToggle({ show, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label || (show ? 'Hide password' : 'Show password')}
      className="text-[#8B8E9C] transition-colors hover:text-[#E3B341]"
      tabIndex={-1}
    >
      {show ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 3l18 18M10.6 10.7a2.5 2.5 0 003.5 3.5M6.5 6.7C4.3 8.2 2.7 10 2 12c1.6 4 5.5 7 10 7 1.7 0 3.3-.4 4.7-1.2M9.9 4.2A10.6 10.6 0 0112 4c4.5 0 8.4 3 10 7-.5 1.3-1.3 2.6-2.3 3.7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M2 12c1.6-4 5.5-7 10-7s8.4 3 10 7c-1.6 4-5.5 7-10 7s-8.4-3-10-7z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </button>
  )
}