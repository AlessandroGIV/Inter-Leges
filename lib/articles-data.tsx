export interface Article {
  id: number
  title: string
  author: string
  category: string
  date: string
  readTime: string
  excerpt: string
  content: string
  tags: string[]
  slug: string
}

// MAIN ARTICLES DATABASE - Add new articles here
export const articles: Article[] = [
  // Welcome/Launch Article - Always visible
  {
    id: 0,
    title: "Benvenuti su Inter Leges - La Rivista è in Fase di Lancio",
    author: "Redazione Inter Leges",
    category: "Annunci",
    date: "21 Settembre 2024",
    readTime: "2 min",
    excerpt:
      "Siamo lieti di presentarvi Inter Leges, la nuova rivista giuridica online che si propone di andare oltre la mera lettera della legge per esplorare il diritto contemporaneo.",
    content: `
      <h2>Benvenuti su Inter Leges</h2>
      <p>Siamo lieti di presentarvi Inter Leges, la nuova rivista giuridica online che si propone di andare oltre la mera lettera della legge per esplorare, con spirito critico e apertura interdisciplinare, le profondità del diritto contemporaneo.</p>
      
      <p>La nostra missione è offrire uno spazio dinamico di confronto e riflessione all'interno della comunità giuridica italiana. Vogliamo dar voce ad analisi ragionate sulle più recenti evoluzioni giurisprudenziali, a commenti critici sulle riforme legislative, a interpretazioni originali che nascono tanto dalla prassi professionale quanto dalla ricerca accademica. Inter Leges è un luogo in cui il diritto viene pensato, discusso, interpretato; dove teoria e applicazione si incontrano in un dialogo costante.</p>
      
      <p>La rivista è attualmente in fase di lancio e stiamo selezionando i primi contributi che inaugureranno il nostro progetto editoriale. Cerchiamo testi di qualità, capaci di coniugare rigore, chiarezza e originalità, senza vincoli di appartenenza accademica o professionale. Crediamo che il diritto viva non solo nei codici, ma soprattutto nelle idee, nelle tensioni interpretative e nelle trasformazioni sociali che lo attraversano.</p>
      
      <p>Se sei un giurista, un ricercatore, un dottorando, un avvocato o semplicemente un appassionato di questioni giuridiche, ti invitiamo a partecipare: proponi un articolo, suggerisci un tema, collabora alla redazione, aiutaci a costruire un luogo libero, autorevole e aperto alla discussione.</p>
      
      <p>Nei prossimi mesi Inter Leges si arricchirà di contenuti sempre più diversificati, mantenendo saldi i suoi principi fondanti: qualità, pluralismo, impegno critico. Il nostro obiettivo è contribuire alla formazione di un pensiero giuridico vivo, consapevole e capace di incidere.</p>
      
      <p>Resta aggiornato e preparati a esplorare il diritto <em>inter leges</em> — tra le leggi, oltre le leggi.</p>
    `,
    tags: ["lancio", "benvenuto", "contributi", "community"],
    slug: "benvenuti-su-inter-leges-la-rivista-e-in-fase-di-lancio",
  },

  // EXAMPLE ARTICLES - Uncomment and modify these templates to add new articles
  /*
  {
    id: 1,
    title: "L'evoluzione della responsabilità civile nel diritto dei contratti",
    author: "Marco Rossi",
    category: "Diritto Civile",
    date: "15 Gennaio 2024",
    readTime: "8 min",
    excerpt: "Un'analisi approfondita delle recenti evoluzioni giurisprudenziali in materia di responsabilità contrattuale, con particolare riferimento alle nuove interpretazioni della Cassazione...",
    content: `
      <h2>Introduzione</h2>
      <p>La responsabilità civile nel diritto dei contratti ha subito significative evoluzioni negli ultimi anni...</p>
      
      <h2>Il quadro normativo di riferimento</h2>
      <p>L'art. 1218 del Codice Civile stabilisce il principio generale...</p>
      
      <blockquote>
      "La responsabilità contrattuale si configura come una forma di responsabilità per inadempimento delle obbligazioni assunte con il contratto" - Cass. Civ. Sez. II, n. 12345/2023
      </blockquote>
      
      <h2>Conclusioni</h2>
      <p>L'evoluzione della responsabilità contrattuale riflette l'esigenza di bilanciare la tutela del creditore con la protezione del debitore diligente...</p>
    `,
    tags: ["contratti", "responsabilità civile", "giurisprudenza"],
    slug: "l-evoluzione-della-responsabilita-civile-nel-diritto-dei-contratti"
  },
  
  {
    id: 2,
    title: "Nuove frontiere del diritto amministrativo digitale",
    author: "Laura Bianchi",
    category: "Diritto Amministrativo",
    date: "12 Gennaio 2024",
    readTime: "6 min",
    excerpt: "L'impatto della digitalizzazione sui procedimenti amministrativi e le sfide per la tutela dei diritti dei cittadini nell'era digitale...",
    content: `
      <h2>La digitalizzazione della PA</h2>
      <p>La trasformazione digitale della Pubblica Amministrazione...</p>
      
      <h2>Nuove sfide per i diritti dei cittadini</h2>
      <p>L'era digitale porta con sé nuove opportunità ma anche nuove sfide...</p>
    `,
    tags: ["digitalizzazione", "procedimenti", "cittadini"],
    slug: "nuove-frontiere-del-diritto-amministrativo-digitale"
  },
  
  {
    id: 3,
    title: "La tutela penale dei dati personali dopo il GDPR",
    author: "Giuseppe Verdi",
    category: "Diritto Penale",
    date: "10 Gennaio 2024",
    readTime: "10 min",
    excerpt: "Analisi delle implicazioni penali del Regolamento Generale sulla Protezione dei Dati e delle nuove fattispecie di reato introdotte...",
    content: `
      <h2>Il GDPR e le sue implicazioni penali</h2>
      <p>Il Regolamento Generale sulla Protezione dei Dati...</p>
      
      <h2>Le nuove fattispecie di reato</h2>
      <p>L'introduzione del GDPR ha comportato...</p>
    `,
    tags: ["GDPR", "privacy", "reati informatici"],
    slug: "la-tutela-penale-dei-dati-personali-dopo-il-gdpr"
  }
  */
]

// UTILITY FUNCTIONS FOR ARTICLE MANAGEMENT

export function getAllArticles(): Article[] {
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleById(id: number): Article | null {
  return articles.find((article) => article.id === id) || null
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category === category)
}

export function getFeaturedArticles(limit = 4): Article[] {
  return getAllArticles().slice(0, limit)
}

export function searchArticles(query: string): Article[] {
  const searchTerm = query.toLowerCase()
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.author.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
  )
}

export function getRelatedArticles(currentArticleId: number, limit = 3): Article[] {
  const currentArticle = getArticleById(currentArticleId)
  if (!currentArticle) return []

  return articles
    .filter(
      (article) =>
        article.id !== currentArticleId &&
        (article.category === currentArticle.category || article.tags.some((tag) => currentArticle.tags.includes(tag))),
    )
    .slice(0, limit)
}

// Navigation functions for previous/next articles
export function getPreviousArticle(currentId: number): Article | null {
  const sortedArticles = getAllArticles()
  const currentIndex = sortedArticles.findIndex((article) => article.id === currentId)

  if (currentIndex === -1 || currentIndex === sortedArticles.length - 1) {
    return null
  }

  return sortedArticles[currentIndex + 1]
}

export function getNextArticle(currentId: number): Article | null {
  const sortedArticles = getAllArticles()
  const currentIndex = sortedArticles.findIndex((article) => article.id === currentId)

  if (currentIndex === -1 || currentIndex === 0) {
    return null
  }

  return sortedArticles[currentIndex - 1]
}

// Function to generate article URL slug
export function generateArticleSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ç]/g, "c")
    .replace(/[ñ]/g, "n")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// CATEGORIES CONFIGURATION
export const categories = [
  { name: "Diritto Civile", count: 0, slug: "diritto-civile" },
  { name: "Diritto Penale", count: 0, slug: "diritto-penale" },
  { name: "Diritto Amministrativo", count: 0, slug: "diritto-amministrativo" },
  { name: "Diritto Costituzionale", count: 0, slug: "diritto-costituzionale" },
  { name: "Diritto del Lavoro", count: 0, slug: "diritto-del-lavoro" },
  { name: "Diritto Commerciale", count: 0, slug: "diritto-commerciale" },
  { name: "Altri", count: 0, slug: "altri" },
  { name: "Annunci", count: 1, slug: "annunci" },
]

// Update category counts dynamically
export function getCategoriesWithCounts() {
  return categories.map((category) => ({
    ...category,
    count: articles.filter((article) => article.category === category.name).length,
  }))
}
