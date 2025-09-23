"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    "Diritto Civile",
    "Diritto Penale",
    "Diritto Amministrativo",
    "Diritto Costituzionale",
    "Diritto del Lavoro",
    "Diritto Commerciale",
    "Altri",
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center mr-3">
                <span className="text-accent-foreground font-serif text-lg font-bold">{"IL"}</span>
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl text-primary">Inter Leges</h1>
                
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/articoli" className="text-sm font-medium hover:text-primary transition-colors">
              Articoli
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Categorie <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link href={`/categorie/${category.toLowerCase().replace(/\s+/g, "-")}`}>{category}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/contatti" className="text-sm font-medium hover:text-primary transition-colors">
              Contatti
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/sostienici">Sostienici</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/articoli" className="text-sm font-medium hover:text-primary transition-colors">
                Articoli
              </Link>
              <div className="pl-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Categorie:</p>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categorie/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-sm hover:text-primary transition-colors py-1"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <Link href="/contatti" className="text-sm font-medium hover:text-primary transition-colors">
                Contatti
              </Link>
              <Button variant="outline" size="sm" asChild className="w-fit bg-transparent">
                <Link href="/sostienici">Sostienici</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
