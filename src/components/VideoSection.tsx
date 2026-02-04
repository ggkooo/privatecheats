export default function VideoSection() {
  return (
    <section className="mt-20 py-16 px-4 sm:px-6 lg:px-8 bg-dark">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/f3Zj0P23IgQ"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  )
}
