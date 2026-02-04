type FeatureCardProps = {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#181B1F] border border-transparent rounded-xl p-8 shadow-lg shadow-black/30 hover:border-orange-500 hover:shadow-orange-500/40 transition-all duration-300">
      <div className="text-orange-400 text-4xl mb-5">
        {icon}
      </div>
      <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  )
}
