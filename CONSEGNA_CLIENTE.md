# Farmacia Mozart — Sito Web

## Panoramica

Sito web moderno e responsive per **Farmacia Mozart** (Via Mozart 41, 20096 Pioltello MI), sviluppato con Next.js 16 e Sanity CMS.

**URL di produzione:** https://www.farmaciamozart.com

---

## Funzionalità Realizzate

### 🏠 Homepage
- **Hero Section** con pulsanti WhatsApp e Chiama, valutazione Google (4.7★ su 164+ recensioni)
- **Servizi** — 6 card con icone: Farmaci, Cosmetica Naturale, Veterinaria, Integratori, Consulenza, Consegna a Domicilio
- **Offerte** — Gestibili da CMS, raggruppate per data di validità con overlay su offerte future
- **Volantini** — Caricabili da CMS con lightbox per visualizzazione ingrandita
- **Catalogo Prodotti** — Con filtri per categoria, gestibile da CMS
- **Galleria** — Foto della farmacia (interno ed esterno)
- **Perché Sceglierci** — 4 punti di forza
- **FAQ** — Accordion con 6 domande frequenti
- **Recensioni** — 12 recensioni clienti con punteggio medio
- **Orari e Mappa** — Orari apertura + mappa Google Maps integrata
- **Contatti** — WhatsApp, telefono, indirizzo, email

### 📱 Esperienza Utente
- **Design responsive** — Ottimizzato per mobile, tablet e desktop
- **Pulsanti flottanti** — WhatsApp e Telefono sempre visibili
- **Scroll to Top** — Pulsante per tornare in cima
- **Animazioni** — Effetti di comparsa al scroll (Scroll Reveal)
- **Navigazione** — Menu con evidenziazione automatica della sezione corrente
- **Logo** — Click per tornare in cima con scroll morbido
- **Traduzione** — Widget Google Translate (Italiano, Inglese, Spagnolo, Arabo)

### 🔒 Sicurezza e Privacy
- **GDPR compliant** — Cookie banner con consenso esplicito
- **Privacy Policy** — Pagina dedicata completa
- **Cookie Policy** — Pagina dedicata con dettagli sui cookie utilizzati
- **Header di sicurezza** — CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **Sanitizzazione dati** — Protezione XSS su tutti i contenuti da CMS
- **Cookie sicuri** — httpOnly, secure, sameSite

### 🔍 SEO
- **Metadata** ottimizzati per Google (title, description, keywords)
- **Schema.org** — Dati strutturati Pharmacy per Google
- **Open Graph** — Anteprima corretta su WhatsApp, Facebook, ecc.
- **Sitemap XML** — Generata automaticamente
- **Robots.txt** — Configurato per l'indicizzazione

---

## Come Gestire i Contenuti (Sanity CMS)

Il pannello di gestione è accessibile su:

**https://www.farmaciamozart.com/studio**

### Offerte
1. Vai su **Offerte** nel menu laterale
2. Clicca **"+"** per una nuova offerta
3. Compila: titolo, descrizione, prezzo originale, prezzo scontato, immagine
4. Imposta **data inizio** e **data fine** per la validità
5. Attiva il flag **"Attivo"**
6. Clicca **Pubblica**

### Prodotti e Categorie
1. Crea prima una **Categoria** (es. "Cosmetica", "Integratori")
2. Poi crea un **Prodotto** assegnando la categoria
3. I filtri sul sito si aggiornano automaticamente

### Volantini
1. Vai su **Volantini**
2. Carica l'immagine del volantino
3. Imposta date di validità
4. Attiva e pubblica

> Le modifiche vengono pubblicate automaticamente in pochi secondi grazie alla revalidazione in tempo reale.

---

## Informazioni Tecniche

| Voce | Dettaglio |
|------|-----------|
| **Framework** | Next.js 16 (React 19) |
| **CMS** | Sanity v5 |
| **Hosting** | Vercel |
| **Linguaggio** | TypeScript |
| **Stile** | CSS personalizzato (design system "Armonia Mozart") |
| **Analytics** | Vercel Analytics |

### Contatti configurati nel sito
| Dato | Valore |
|------|--------|
| **Telefono** | 02 9214 0862 |
| **WhatsApp** | wa.me/390292140862 |
| **Email** | farmaciamozart@gmail.com |
| **Indirizzo** | Via Mozart 41, 20096 Pioltello (MI) |

---

## File di Configurazione

Per il deploy in produzione, creare un file `.env.local` con:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=b9t6jgo1
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<token da Sanity>
SANITY_REVALIDATE_SECRET=<segreto per webhook>
```

---

## Supporto

Per modifiche tecniche o assistenza: contattare lo sviluppatore.  
Per la gestione contenuti (offerte, prodotti, volantini): utilizzare il pannello Sanity Studio.
