export default function SectionCard({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6 ${className}`}>
      {children}
    </div>
  );
}