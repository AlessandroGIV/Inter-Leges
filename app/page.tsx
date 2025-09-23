import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, User, ArrowRight, BookOpen, Scale, Users } from "lucide-react"
import { getFeaturedArticles, getCategoriesWithCounts } from "@/lib/articles-data"

export const dynamic = "force-dynamic"

export default function HomePage() {
  const featuredArticles = getFeaturedArticles(4)
  const categories = getCategoriesWithCounts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24 text-foreground bg-secondary rounded-full">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-primary mb-6 text-balance">Inter Leges</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 text-balance">Oltre la lettera della legge</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/articoli">
                  Esplora gli Articoli <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contatti">Scrivi per Noi</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary mb-4">Ultimi Articoli</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Scopri le ultime pubblicazioni della nostra community di esperti legali
              </p>
            </div>

            {featuredArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {featuredArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="text-foreground bg-accent" variant="secondary">{article.category}</Badge>
                          <span className="text-sm text-muted-foreground">{article.readTime}</span>
                        </div>
                        <CardTitle className="font-serif text-xl leading-tight hover:text-primary transition-colors">
                          <Link href={`/articoli/${article.id}`}>{article.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>({article.author})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{article.date}</span>
                            </div>
                          </div>
                          <Link
                            href={`/articoli/${article.id}`}
                            className="text-primary hover:text-accent transition-colors font-medium"
                          >
                            Leggi tutto →
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/articoli">
                      Vedi Tutti gli Articoli <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">Nessun articolo disponibile al momento</p>
                <Button variant="outline" asChild>
                  <Link href="/contatti">Contribuisci con un Articolo</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary mb-4">Categorie Principali</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Esplora i nostri articoli organizzati per area del diritto
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories
                .filter((category) => category.count > 0)
                .map((category) => {
                  const IconComponent =
                    category.name.includes("Civile") || category.name.includes("Costituzionale")
                      ? Scale
                      : category.name.includes("Lavoro")
                        ? Users
                        : BookOpen
                  return (
                    <Card key={category.name} className="hover:shadow-lg transition-shadow group">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors bg-accent">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              <Link href={`/categorie/${category.slug}`}>{category.name}</Link>
                            </h3>
                            <p className="text-sm text-muted-foreground">{category.count} articoli</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Unisciti alla Nostra Community</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Condividi la tua expertise giuridica e contribuisci alla crescita della conoscenza legale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contatti">
                    Invia un Articolo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                  asChild
                >
                  <Link href="/sostienici">Sostieni il Progetto</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
