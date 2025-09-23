import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, User, Clock, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import {
  getArticleById,
  getRelatedArticles,
  getCategoriesWithCounts,
  getPreviousArticle,
  getNextArticle,
} from "@/lib/articles-data"
import type { Metadata } from "next"
import { SocialShare } from "@/components/social-share"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const articleId = Number.parseInt(params.id)
  const article = getArticleById(articleId)

  if (!article) {
    return {
      title: "Articolo non trovato - Inter Leges",
      description: "L'articolo che stai cercando non esiste o è stato rimosso.",
    }
  }

  return {
    title: `${article.title} - Inter Leges`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      siteName: "Inter Leges",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      creator: "@InterLeges",
    },
  }
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const articleId = Number.parseInt(params.id)
  const article = getArticleById(articleId)
  const relatedArticles = getRelatedArticles(articleId, 3)
  const categories = getCategoriesWithCounts()
  const previousArticle = getPreviousArticle(articleId)
  const nextArticle = getNextArticle(articleId)

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Articolo non trovato</h1>
            <p className="text-muted-foreground mb-6">L'articolo che stai cercando non esiste o è stato rimosso.</p>
            <Button asChild>
              <Link href="/articoli">Torna agli articoli</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
              <Link
                href={`/categorie/${article.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-primary transition-colors"
              >
                {article.category}
              </Link>
              <span>/</span>
              <span className="text-foreground truncate">{article.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Article Content */}
            <article className="lg:col-span-3">
              {/* Article Header */}
              <div className="mb-8">
                <Button variant="ghost" size="sm" asChild className="mb-4">
                  <Link href="/articoli">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Torna agli articoli
                  </Link>
                </Button>

                <Badge variant="secondary" className="mb-4">
                  {article.category}
                </Badge>

                <h1 className="font-serif font-bold text-3xl md:text-4xl text-primary mb-6 leading-tight text-balance">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime} di lettura</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="pb-6 border-b">
                  <SocialShare title={article.title} url={`/articoli/${article.id}`} excerpt={article.excerpt} />
                </div>
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:leading-relaxed prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:italic prose-strong:text-primary prose-ul:space-y-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className="mt-8 pt-6 border-t">
                <SocialShare title={article.title} url={`/articoli/${article.id}`} excerpt={article.excerpt} />
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    {previousArticle && (
                      <Link href={`/articoli/${previousArticle.id}`} className="group">
                        <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                          <div className="text-left">
                            <p className="text-sm text-muted-foreground">Articolo precedente</p>
                            <p className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                              {previousArticle.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>

                  <div className="flex-1">
                    {nextArticle && (
                      <Link href={`/articoli/${nextArticle.id}`} className="group">
                        <div className="flex items-center justify-end space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Articolo successivo</p>
                            <p className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                              {nextArticle.title}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-muted/30 rounded-lg">
                <h3 className="font-serif font-bold text-xl mb-3">Sull'autore</h3>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{article.author}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {article.author === "Redazione Inter Leges"
                        ? "La redazione di Inter Leges si occupa di coordinare i contributi e mantenere gli standard editoriali della rivista."
                        : "Esperto del settore giuridico, contribuisce regolarmente con articoli di approfondimento su tematiche di attualità legale."}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Articoli Correlati</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedArticles.map((relatedArticle) => (
                        <div key={relatedArticle.id} className="pb-4 border-b last:border-b-0 last:pb-0">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {relatedArticle.category}
                          </Badge>
                          <h4 className="font-medium leading-tight hover:text-primary transition-colors">
                            <Link href={`/articoli/${relatedArticle.id}`}>{relatedArticle.title}</Link>
                          </h4>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Categorie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories
                        .filter((category) => category.count > 0)
                        .map((category) => (
                          <Link
                            key={category.name}
                            href={`/categorie/${category.slug}`}
                            className="block text-sm hover:text-primary transition-colors py-1"
                          >
                            {category.name} ({category.count})
                          </Link>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
