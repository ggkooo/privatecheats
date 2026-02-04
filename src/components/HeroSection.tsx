export default function HeroSection() {
  return (
    <section 
      className="relative w-full bg-cover bg-top"
      style={{
        height: "calc(100vh - 6rem)",
        backgroundImage: "url('/src/assets/banner.png')"
      }}
    >
      {/* Overlay mais claro */}
      <div className="absolute inset-0" style={{ backgroundColor: "#07080a80" }}></div>
      
      {/* Conteúdo - Botões na parte de baixo */}
      <div className="relative h-full flex items-end justify-center px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex gap-4">
          <button className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition">
            Começar Agora
          </button>
          <button className="border border-gray-400 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition">
            Saiba Mais
          </button>
        </div>
      </div>
    </section>
  )
}
