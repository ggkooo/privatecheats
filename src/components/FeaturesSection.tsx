import FeatureCard from './FeatureCard'

const features = [
  {
    icon: '🔒',
    title: 'Segurança comprovada',
    description:
      'Seus dados ficam protegidos com práticas robustas de segurança e controle de acesso.',
  },
  {
    icon: '⚡',
    title: 'Alta performance',
    description:
      'Resposta rápida e estabilidade para você entregar resultados sem interrupções.',
  },
  {
    icon: '✨',
    title: 'Suporte premium',
    description:
      'Atendimento prioritário e acompanhamento dedicado para garantir o melhor resultado.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h3 className="text-3xl font-bold text-white mb-12 text-center">
        Por que nos escolher?
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  )
}
