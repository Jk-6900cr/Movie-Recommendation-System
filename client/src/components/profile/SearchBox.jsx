export default function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#8B8E9C]">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#282C38] bg-[#14161D] py-3 pl-11 pr-4 text-sm text-[#F3F1EA] placeholder:text-[#3A3F4E] outline-none transition-colors duration-200 focus:border-[#E3B341]"
      />
    </div>
  )
}