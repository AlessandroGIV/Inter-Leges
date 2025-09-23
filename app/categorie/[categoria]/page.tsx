import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Calendar, User, Search, ArrowLeft, BookOpen } from "lucide-react"
import { getArticlesByCategory, categories } from "@/lib/articles-data"

const categoryMetadata = {
  "diritto-civile": {
    name: "Diritto Civile",
    description: "Articoli su contratti, responsabilità civile, diritti reali e rapporti patrimoniali tra privati",
  },
  "diritto-penale": {
    name: "Diritto Penale",
    description: "Articoli su reati, procedura penale, giustizia penale e tutela dei diritti dell'imputato",
  },
  "diritto-amministrativo": {
    name: "Diritto Amministrativo",
    description: "Articoli su pubblica amministrazione, procedimenti amministrativi e rapporti con i cittadini",
  },
  "diritto-costituzionale": {
    name: "Diritto Costituzionale",
    description: "Articoli su diritti fondamentali, organizzazione costituzionale e giustizia costituzionale",
  },
  "diritto-del-lavoro": {
    name: "Diritto del Lavoro",
    description: "Articoli su rapporti di lavoro, sindacati, previdenza sociale e tutela dei lavoratori",
  },
  "diritto-commerciale": {
    name: "Diritto Commerciale",
    description: "Articoli su società, contratti commerciali, diritto dell'impresa e mercati finanziari",
  },
  altri: {
    name: "Altri",
    description: "Articoli su tematiche giuridiche trasversali e argomenti specialistici",
  },
  annunci: {
    name: "Annunci",
    description: "Comunicazioni ufficiali, novità e aggiornamenti della rivista",
  },
}

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  const categoryInfo = categoryMetadata[params.categoria as keyof typeof categoryMetadata]

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Categoria non trovata</h1>
            <Button asChild>
              <Link href="/articoli">Torna agli articoli</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const categoryArticles = getArticlesByCategory(categoryInfo.name)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/articoli" className="hover:text-primary transition-colors">
                Articoli
              </Link>
              <span>/</span>
              <span className="text-foreground">{categoryInfo.name}</span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
          <div className="container mx-auto px-4">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link href="/articoli">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Torna a tutti gli articoli
              </Link>
            </Button>

            <div className="flex items-start space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-4xl md:text-5xl text-primary mb-4">{categoryInfo.name}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{categoryInfo.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{categoryArticles.length} articoli disponibili</span>
              <span>•</span>
              <span>Aggiornato regolarmente</span>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder={`Cerca in ${categoryInfo.name}...`} className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Ordina per" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Più recenti</SelectItem>
                    <SelectItem value="oldest">Più vecchi</SelectItem>
                    <SelectItem value="title">Titolo A-Z</SelectItem>
                    <SelectItem value="author">Autore A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {categoryArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                    <CardHeader className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{categoryInfo.name}</Badge>
                        <span className="text-sm text-muted-foreground">{article.readTime}</span>
                      </div>
                      <CardTitle className="font-serif text-xl leading-tight hover:text-primary transition-colors">
                        <Link href={`/articoli/${article.id}`}>{article.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground leading-relaxed mb-4 flex-1">{article.excerpt}</p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
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
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nessun articolo trovato</h3>
                <p className="text-muted-foreground mb-6">
                  Non ci sono ancora articoli pubblicati in questa categoria. Torna presto per nuovi contenuti!
                </p>
                <Button asChild>
                  <Link href="/articoli">Esplora altre categorie</Link>
                </Button>
              </div>
            )}

            {/* Related Categories */}
            {categoryArticles.length > 0 && (
              <div className="mt-16 pt-12 border-t">
                <h2 className="font-serif font-bold text-2xl text-center mb-8">Esplora Altre Categorie</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categories
                    .filter((cat) => cat.slug !== params.categoria)
                    .slice(0, 5)
                    .map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categorie/${cat.slug}`}
                        className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{cat.count} articoli</p>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
