export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  rightElement,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#B8B9C2]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-[#14161D] px-4 py-3 text-sm text-[#F3F1EA] placeholder:text-[#3A3F4E] outline-none transition-colors duration-200 focus:border-[#E3B341] ${
            rightElement ? 'pr-11' : ''
          } ${error ? 'border-[#C2495A]' : 'border-[#282C38]'}`}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightElement}</div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-[#C2495A]">
          {error}
        </p>
      )}
    </div>
  )
}