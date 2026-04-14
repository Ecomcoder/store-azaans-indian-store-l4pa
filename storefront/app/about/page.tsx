import { Metadata } from 'next'

export const metadata: Metadata = { title: 'About Azaan' }

export default function AboutPage() {
  return (
    <>
      <div className="border-b">
        <div className="container-custom py-section-sm text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">Meet the Founder</p>
          <h1 className="text-h1 font-heading font-semibold">About Azaan</h1>
        </div>
      </div>

      <div className="container-custom py-section max-w-3xl">
        <div className="prose prose-lg mx-auto space-y-8 text-muted-foreground leading-relaxed">
          <p className="text-foreground text-xl font-heading leading-relaxed">
            Hi, I&apos;m Azaan — and this store is my love letter to India&apos;s rich culture,
            vibrant flavours, and timeless traditions.
          </p>

          <p>
            Growing up surrounded by the sights, smells, and warmth of Indian life, I always
            believed that the best of India deserved to reach every corner of the world. Azaan&apos;s
            Indian Store was born from that belief — a carefully curated collection of authentic
            Indian products, brought to you with pride and passion.
          </p>

          <p>
            Every item in this store is personally selected by me. Whether it&apos;s a fragrant spice
            blend from a family kitchen, a handcrafted piece of décor, or a flavour that takes you
            straight back to your dadi&apos;s home — I want every purchase to feel personal, genuine,
            and full of heart.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 py-8 border-y not-prose">
            <div>
              <p className="text-3xl font-heading font-semibold text-foreground">100%</p>
              <p className="text-sm text-muted-foreground mt-1">Authentic Indian products</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-semibold text-foreground">Handpicked</p>
              <p className="text-sm text-muted-foreground mt-1">Every item personally chosen by Azaan</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-semibold text-foreground">India-rooted</p>
              <p className="text-sm text-muted-foreground mt-1">Sourced straight from the heart of India</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-semibold text-foreground">With Love</p>
              <p className="text-sm text-muted-foreground mt-1">Built on culture, tradition & passion</p>
            </div>
          </div>

          <h2 className="text-h3 font-heading font-semibold text-foreground">Why I Started This</h2>
          <p>
            I noticed how hard it was to find truly authentic Indian products — ones that weren&apos;t
            watered down or mass-produced. I wanted to bridge that gap and create a space where
            the real India shines through in every product, every package, every order.
          </p>

          <h2 className="text-h3 font-heading font-semibold text-foreground">My Promise to You</h2>
          <p>
            When you shop with me, you&apos;re not just buying a product — you&apos;re supporting a
            dream, a culture, and a community. I stand behind everything I sell, and I&apos;m always
            here if you have any questions, feedback, or just want to talk about India. 🇮🇳
          </p>
        </div>
      </div>
    </>
  )
}
