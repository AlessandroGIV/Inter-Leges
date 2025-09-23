"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Facebook, Twitter, Linkedin, MessageCircle, Copy } from "lucide-react"

interface SocialShareProps {
  title: string
  url: string
  excerpt?: string
}

export function SocialShare({ title, url, excerpt }: SocialShareProps) {
  const { toast } = useToast()

  const shareText = `${title} - Via @InterLeges`
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      toast({
        title: "Link copiato!",
        description: "Il link è stato copiato negli appunti.",
      })
    } catch (err) {
      toast({
        title: "Errore",
        description: "Impossibile copiare il link.",
        variant: "destructive",
      })
    }
  }

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${fullUrl}`)}`,
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-muted-foreground">Condividi:</span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.open(shareUrls.facebook, "_blank")}
        className="hover:text-blue-600"
      >
        <Facebook className="h-4 w-4" />
        <span className="sr-only">Condividi su Facebook</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.open(shareUrls.twitter, "_blank")}
        className="hover:text-blue-400"
      >
        <Twitter className="h-4 w-4" />
        <span className="sr-only">Condividi su Twitter</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.open(shareUrls.linkedin, "_blank")}
        className="hover:text-blue-700"
      >
        <Linkedin className="h-4 w-4" />
        <span className="sr-only">Condividi su LinkedIn</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.open(shareUrls.whatsapp, "_blank")}
        className="hover:text-green-600"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="sr-only">Condividi su WhatsApp</span>
      </Button>

      <Button variant="ghost" size="sm" onClick={handleCopyLink} className="hover:text-primary">
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copia link</span>
      </Button>
    </div>
  )
}
