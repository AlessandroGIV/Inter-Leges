"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Calendar, User, Search, Filter } from "lucide-react"
import { getAllArticles } from "@/lib/articles-data"

function HighlightText({ text, searchTerm }: { text: string; searchTerm: string }) {
  if (!searchTerm) return <>{text}</>

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={index} className="bg-accent/30 text-accent-foreground">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default function ArticoliPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  const allArticles = getAllArticles()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = allArticles

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      const categoryMap: { [key: string]: string } = {
        civile: "Diritto Civile",
        penale: "Diritto Penale",
        amministrativo: "Diritto Amministrativo",
        costituzionale: "Diritto Costituzionale",
        lavoro: "Diritto del Lavoro",
        commerciale: "Diritto Commerciale",
        annunci: "Annunci",
      }
      filtered = filtered.filter((article) => article.category === categoryMap[selectedCategory])
    }

    // Sort articles
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

    return sorted
  }, [debouncedSearchTerm, selectedCategory, sortBy, allArticles])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="font-serif font-bold text-4xl md:text-5xl text-primary mb-4">Tutti gli Articoli</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Esplora la nostra collezione completa di articoli giuridici di qualità accademica
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cerca articoli per titolo, autore o contenuto..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtra per categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutte le categorie</SelectItem>
                    <SelectItem value="civile">Diritto Civile</SelectItem>
                    <SelectItem value="penale">Diritto Penale</SelectItem>
                    <SelectItem value="amministrativo">Diritto Amministrativo</SelectItem>
                    <SelectItem value="costituzionale">Diritto Costituzionale</SelectItem>
                    <SelectItem value="lavoro">Diritto del Lavoro</SelectItem>
                    <SelectItem value="commerciale">Diritto Commerciale</SelectItem>
                    <SelectItem value="annunci">Annunci</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Ordina per" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Più recenti</SelectItem>
                    <SelectItem value="oldest">Più vecchi</SelectItem>
                    <SelectItem value="title">Titolo A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-center text-muted-foreground mb-4">
                {filteredAndSortedArticles.length} articoli trovati
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredAndSortedArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">Nessun risultato trovato</p>
                <p className="text-sm text-muted-foreground">
                  Prova a modificare i filtri di ricerca o a utilizzare termini diversi
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedArticles.map((article, index) => (
                  <Card
                    key={article.id}
                    className="hover:shadow-lg transition-all duration-300 h-full flex flex-col animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-sm text-muted-foreground">{article.readTime}</span>
                      </div>
                      <CardTitle className="font-serif text-xl leading-tight hover:text-primary transition-colors">
                        <Link href={`/articoli/${article.id}`}>
                          <HighlightText text={article.title} searchTerm={debouncedSearchTerm} />
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                        <HighlightText text={article.excerpt} searchTerm={debouncedSearchTerm} />
                      </p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>
                              (<HighlightText text={article.author} searchTerm={debouncedSearchTerm} />)
                            </span>
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
            )}

            {/* Pagination - only show if there are results */}
            {filteredAndSortedArticles.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Precedente
                  </Button>
                  <Button className="bg-accent" variant="default" size="sm">
                    1
                  </Button>
                  <Button className="" variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Successivo
                  </Button>
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
