"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, BookOpen, Star, Banknote, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    paypal?: any
  }
}

interface PayPalButtonProps {
  amount?: number
  onSuccess?: () => void
  onError?: () => void
  onCancel?: () => void
  className?: string
  children: React.ReactNode
}

const donationTiers = [
  {
    name: "Sostenitore",
    amount: 10,
    description: "Contribuisci alla crescita della rivista",
    benefits: ["Accesso prioritario ai nuovi articoli", "Newsletter mensile esclusiva"],
    popular: false,
  },
  {
    name: "Patrono",
    amount: 25,
    description: "Sostieni attivamente la qualità dei contenuti",
    benefits: [
      "Tutti i benefici del Sostenitore",
      "Menzione nei ringraziamenti annuali",
      "Accesso anticipato agli articoli speciali",
    ],
    popular: true,
  },
  {
    name: "Mecenate",
    amount: 50,
    description: "Diventa parte integrante del progetto",
    benefits: [
      "Tutti i benefici del Patrono",
      "Possibilità di proporre temi per articoli",
      "Invito agli eventi esclusivi online",
    ],
    popular: false,
  },
]

const impactStats = [
  {
    icon: BookOpen,
    value: "50+",
    label: "Articoli pubblicati gratuitamente",
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Lettori raggiunti ogni mese",
  },
  {
    icon: Star,
    value: "25+",
    label: "Autori supportati",
  },
  {
    icon: Heart,
    value: "100%",
    label: "Contenuti sempre gratuiti",
  },
]

function PayPalButton({ amount = 10, onSuccess, onError, onCancel, className, children }: PayPalButtonProps) {
  const [isPayPalReady, setIsPayPalReady] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPayPal, setShowPayPal] = useState(false)
  const paypalRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (window.paypal) {
      setIsPayPalReady(true)
      return
    }

    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=Aa8R-65I58xZFEv5RJMiDSds5D8HdIHSsO3XmvRpyeqsLCQBk7Nkt9_v4flXRqYrztM4uin4OUAy8LuQ&currency=EUR`
    script.async = true
    script.onload = () => setIsPayPalReady(true)
    script.onerror = () => {
      toast({
        title: "Errore",
        description: "Impossibile caricare PayPal. Riprova più tardi.",
        variant: "destructive",
      })
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [toast])

  useEffect(() => {
    if (showPayPal && isPayPalReady && window.paypal && paypalRef.current) {
      // Clear any existing PayPal buttons
      paypalRef.current.innerHTML = ""

      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                    currency_code: "EUR",
                  },
                  description: `Donazione a Inter Leges - €${amount}`,
                },
              ],
            })
          },
          onApprove: async (data: any, actions: any) => {
            try {
              const details = await actions.order.capture()
              setIsProcessing(false)
              setShowPayPal(false)
              toast({
                title: "Donazione completata!",
                description: `Grazie per la tua donazione di €${amount}. Il tuo supporto è fondamentale per noi.`,
              })
              onSuccess?.()
            } catch (error) {
              setIsProcessing(false)
              setShowPayPal(false)
              toast({
                title: "Errore nel pagamento",
                description: "Si è verificato un errore durante il pagamento. Riprova più tardi.",
                variant: "destructive",
              })
              onError?.()
            }
          },
          onCancel: () => {
            setIsProcessing(false)
            setShowPayPal(false)
            toast({
              title: "Pagamento annullato",
              description: "Hai annullato il pagamento. Puoi riprovare quando vuoi.",
            })
            onCancel?.()
          },
          onError: (err: any) => {
            setIsProcessing(false)
            setShowPayPal(false)
            toast({
              title: "Errore PayPal",
              description: "Si è verificato un errore con PayPal. Riprova più tardi.",
              variant: "destructive",
            })
            onError?.()
          },
        })
        .render(paypalRef.current)
    }
  }, [showPayPal, isPayPalReady, amount, toast, onSuccess, onError, onCancel])

  const handlePayment = () => {
    if (!isPayPalReady || !window.paypal) {
      toast({
        title: "Errore",
        description: "PayPal non è ancora caricato. Riprova tra qualche secondo.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setShowPayPal(true)
  }

  if (showPayPal) {
    return (
      <div className="space-y-4">
        <div ref={paypalRef} className="min-h-[45px]"></div>
        <Button
          onClick={() => {
            setShowPayPal(false)
            setIsProcessing(false)
          }}
          variant="outline"
          className="w-full"
        >
          Annulla
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={handlePayment} disabled={!isPayPalReady || isProcessing} className={className}>
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Caricamento PayPal...
        </>
      ) : (
        children
      )}
    </Button>
  )
}

function ThankYouModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-primary mb-4">Grazie di Cuore!</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            La tua donazione è stata completata con successo. Grazie per aver scelto di sostenere Inter Leges. Il tuo
            contributo ci aiuterà a continuare a fornire contenuti giuridici di qualità gratuitamente.
          </p>
          <Button onClick={onClose} className="w-full">
            Chiudi
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SostieniciPage() {
  const [customAmount, setCustomAmount] = useState<number>(10)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [showThankYouModal, setShowThankYouModal] = useState(false)

  const handlePaymentSuccess = () => {
    setPaymentStatus("success")
    setShowThankYouModal(true)
  }

  const handlePaymentError = () => {
    setPaymentStatus("error")
  }

  const scrollToDonationTiers = () => {
    const donationSection = document.getElementById("donation-tiers")
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-accent" />
            </div>
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-primary mb-6">Sostieni il Progetto</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Aiutaci a mantenere la rivista giuridica gratuita e di qualità per tutti. Il tuo contributo fa la
              differenza nella crescita della comunità giuridica italiana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToDonationTiers} className="bg-accent hover:bg-accent/90">
                <Heart className="h-4 w-4 mr-2" />
                Dona Ora
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl text-primary mb-4">Il Nostro Impatto</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Grazie al supporto della community, stiamo costruendo una risorsa giuridica gratuita in Italia
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>

                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Donation Tiers */}
        <section id="donation-tiers" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl text-primary mb-4">Scegli il Tuo Contributo</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ogni contributo, grande o piccolo, ci aiuta a migliorare la qualità e l'accessibilità dei contenuti
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {donationTiers.map((tier, index) => (
                <Card key={index} className={`relative ${tier.popular ? "ring-2 ring-accent shadow-lg" : ""}`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent">
                      Più Popolare
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="font-serif text-2xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">€{tier.amount}</div>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start space-x-2">
                          
                          
                        </li>
                      ))}
                    </ul>
                    <PayPalButton
                      amount={tier.amount}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Dona €{tier.amount}
                    </PayPalButton>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="text-center mt-12">
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <p className="text-muted-foreground">Scegli tu quanto donare</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-semibold text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="flex-1 text-2xl font-bold text-center border-0 border-b-2 border-muted focus:border-primary outline-none bg-transparent"
                      min="1"
                    />
                  </div>
                  <PayPalButton
                    amount={customAmount}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Dona €{customAmount}
                  </PayPalButton>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl text-primary mb-4">Metodi di Pagamento</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Dona in modo sicuro attraverso i nostri partner di pagamento certificati
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow text-center shadow-md">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Banknote className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">PayPal</h3>
                  <p className="text-muted-foreground text-sm">
                    Paga rapidamente e in sicurezza con il tuo account PayPal.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow text-center shadow-md">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Carta di Credito</h3>
                  <p className="text-muted-foreground text-sm">
                    Paga con Visa, Mastercard o altre carte tramite PayPal Guest.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Support Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl text-primary mb-4">Perché Sostenerci</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Il tuo contributo ha un impatto diretto sulla qualità e l'accessibilità della conoscenza giuridica
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl">Contenuti Sempre Gratuiti</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Manteniamo tutti i nostri articoli completamente gratuiti e accessibili a studenti, professionisti e
                    appassionati di diritto, indipendentemente dalle loro possibilità economiche.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-xl">Supporto agli Autori</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Investiamo nel supporto editoriale per giovani giuristi e ricercatori, offrendo loro una piattaforma
                    di qualità per condividere le loro ricerche e competenze.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl">Qualità Accademica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Manteniamo elevati standard di qualità attraverso un rigoroso processo di revisione editoriale e
                    l'investimento in strumenti e risorse per migliorare continuamente i nostri contenuti.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-xl">Crescita della Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Organizziamo eventi, webinar e iniziative per far crescere la community giuridica italiana,
                    favorendo lo scambio di conoscenze e il networking professionale.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl text-primary mb-4">Trasparenza</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Crediamo nella trasparenza totale su come utilizziamo i fondi ricevuti
              </p>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-center">Come Utilizziamo le Donazioni</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-primary">Costi Operativi (60%)</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Hosting e infrastruttura tecnica</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Strumenti di editing e pubblicazione</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Servizi di revisione e correzione</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-accent">Sviluppo e Crescita (40%)</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Nuove funzionalità della piattaforma</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Eventi e iniziative per la community</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Marketing e promozione dei contenuti</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Thank You Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Grazie per il Tuo Supporto</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Ogni donazione, indipendentemente dall'importo, ci avvicina al nostro obiettivo di rendere la conoscenza
              giuridica accessibile a tutti. Insieme stiamo costruendo qualcosa di importante per la comunità giuridica
              italiana.
            </p>
            <PayPalButton
              amount={15}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Heart className="h-4 w-4 mr-2" />
              Dona Ora
            </PayPalButton>
          </div>
        </section>
      </main>

      <Footer />

      <ThankYouModal isOpen={showThankYouModal} onClose={() => setShowThankYouModal(false)} />
    </div>
  )
}
