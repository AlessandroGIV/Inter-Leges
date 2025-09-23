"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send, FileText, Users, Clock, CheckCircle, Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"

export const dynamic = "force-dynamic"

export default function ContattiPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    oggetto: "",
    messaggio: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.cognome || !formData.email || !formData.oggetto || !formData.messaggio) {
      toast({
        title: "Errore",
        description: "Tutti i campi sono obbligatori",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const templateParams = {
        first_name: formData.nome,
        last_name: formData.cognome,
        email: formData.email,
        subject: formData.oggetto,
        message: formData.messaggio,
        submitted_at: new Date().toLocaleString("it-IT"),
        form_url: window.location.href,
      }

      await emailjs.send(
        "service_yd2e7zf", // Service ID
        "template_e1o3ry4", // Template ID
        templateParams,
        "zKTNyIHIPbrFX_CX0", // Public Key
      )

      toast({
        title: "Messaggio inviato!",
        description: "Ti risponderemo entro 48 ore.",
      })

      setIsSubmitted(true)
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        oggetto: "",
        messaggio: "",
      })
    } catch (error) {
      console.error("EmailJS error:", error)
      toast({
        title: "Errore nell'invio",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendAnother = () => {
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-primary mb-6">Contatti</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Entra in contatto con la nostra redazione o scopri come contribuire alla rivista con i tuoi articoli
              giuridici
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl flex items-center space-x-2">
                    <Mail className="h-6 w-6 text-accent" />
                    <span>Invia un Messaggio</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Compila il form per inviarci una richiesta. Ti risponderemo entro 48 ore.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-serif text-xl text-green-700">Messaggio Inviato con Successo!</h3>
                      <p className="text-muted-foreground">
                        Grazie per averci contattato. Il tuo messaggio è stato ricevuto e ti risponderemo entro 48 ore.
                      </p>
                      <Button onClick={handleSendAnother} variant="outline" className="mt-4 bg-transparent">
                        Invia un altro messaggio
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome *</Label>
                          <Input
                            id="nome"
                            placeholder="Il tuo nome"
                            required
                            value={formData.nome}
                            onChange={(e) => handleInputChange("nome", e.target.value)}
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cognome">Cognome *</Label>
                          <Input
                            id="cognome"
                            placeholder="Il tuo cognome"
                            required
                            value={formData.cognome}
                            onChange={(e) => handleInputChange("cognome", e.target.value)}
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="la-tua-email@esempio.it"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="oggetto">Oggetto *</Label>
                        <Select
                          value={formData.oggetto}
                          onValueChange={(value) => handleInputChange("oggetto", value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona l'oggetto del messaggio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="submission">Invio Articolo</SelectItem>
                            <SelectItem value="collaboration">Proposta di Collaborazione</SelectItem>
                            <SelectItem value="feedback">Feedback sulla Rivista</SelectItem>
                            <SelectItem value="technical">Supporto Tecnico</SelectItem>
                            <SelectItem value="other">Altro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="messaggio">Messaggio *</Label>
                        <Textarea
                          id="messaggio"
                          placeholder="Scrivi qui il tuo messaggio..."
                          className="min-h-32"
                          required
                          value={formData.messaggio}
                          onChange={(e) => handleInputChange("messaggio", e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Invio in corso...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Invia Messaggio
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Informazioni di Contatto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Redazione</h3>
                      <p className="text-muted-foreground">redazione@interleges.it</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Link Utili</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="#linee-guida">
                      <FileText className="h-4 w-4 mr-2" />
                      Linee Guida per Autori
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="#processo-revisione">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Processo di Revisione
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="#faq">
                      <Users className="h-4 w-4 mr-2" />
                      FAQ per Autori
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Submission Guidelines Section */}
        <section id="linee-guida" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary mb-4">Scrivi per Noi</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Unisciti alla nostra community di giuristi e condividi la tua expertise con migliaia di lettori
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl">1. Prepara il tuo Articolo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Scrivi un articolo originale di qualità accademica su un tema giuridico di attualità. Lunghezza
                    consigliata: 1500-3000 parole.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Send className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-xl">2. Invia la Proposta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Invia il tuo articolo a <strong>redazione@interleges.it</strong> insieme a una breve biografia e ai
                    tuoi contatti.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl">3. Revisione e Pubblicazione</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Il nostro comitato editoriale valuterà il tuo articolo entro 2 settimane. Se approvato, sarà
                    pubblicato online.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Linee Guide Dettagliate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-primary">Requisiti di Contenuto</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Originalità:</strong> L'articolo deve essere inedito e non pubblicato altrove
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Qualità accademica:</strong> Rigoroso dal punto di vista metodologico e scientifico
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Attualità:</strong> Trattare temi di interesse contemporaneo nel diritto
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Citazioni:</strong> Includere riferimenti normativi e giurisprudenziali pertinenti
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-primary">Formato e Struttura</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Lunghezza:</strong> Tra 1.500 e 3.000 parole (escluse note e bibliografia)
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Formato:</strong> File Word (.docx) o PDF, carattere Times New Roman 12pt
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Struttura:</strong> Titolo, abstract (150 parole), parole chiave, testo, bibliografia
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <strong>Note:</strong> A piè di pagina, numerazione progressiva
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-primary">Chi Può Contribuire</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Studenti</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Laureandi in Giurisprudenza</li>
                        <li>• Dottorandi di ricerca</li>
                        <li>• Specializzandi in professioni legali</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Professionisti</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Avvocati e praticanti</li>
                        <li>• Magistrati</li>
                        <li>• Docenti universitari</li>
                        <li>• Ricercatori in ambito giuridico</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Review Process Section */}
        <section id="processo-revisione" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl text-primary mb-4">Processo di Revisione</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ogni articolo viene attentamente valutato dal nostro comitato editoriale
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ricezione e Verifica Iniziale</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Verifichiamo che l'articolo rispetti i requisiti formali e tematici.
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Tempo stimato: 1-2 giorni</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Revisione Editoriale</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Il comitato editoriale valuta la qualità scientifica, l'originalità e la rilevanza dell'articolo
                      per la nostra rivista.
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Tempo stimato: 7-14 giorni</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Feedback e Revisioni</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Se necessario, richiediamo modifiche o integrazioni. Collaboriamo con l'autore per ottimizzare
                      l'articolo.
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Tempo stimato: 3-7 giorni</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Pubblicazione</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      L'articolo approvato viene formattato e pubblicato online. L'autore riceve notifica della
                      pubblicazione.
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Tempo stimato: 2-3 giorni</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl text-primary mb-4">Domande Frequenti</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Risposte alle domande più comuni degli autori
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">È previsto un compenso per gli articoli pubblicati?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    La rivista è un progetto no-profit. Non prevediamo compensi monetari, ma offriamo visibilità
                    professionale e la possibilità di contribuire alla crescita della comunità giuridica italiana.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Posso inviare un articolo già pubblicato altrove?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No, accettiamo solo contenuti originali e inediti. L'articolo non deve essere stato pubblicato in
                    altre riviste, blog o piattaforme online.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quanto tempo richiede il processo di revisione?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Il processo completo richiede generalmente 2-3 settimane dalla ricezione dell'articolo alla
                    decisione finale. In caso di richieste di revisione, i tempi possono estendersi.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Posso proporre articoli in lingue diverse dall'italiano?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Attualmente accettiamo articoli solo in italiano. Tuttavia, valutiamo proposte in inglese per
                    articoli di particolare rilevanza internazionale.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
