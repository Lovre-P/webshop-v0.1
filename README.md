# TechShop - Frontend Webshop

TechShop je frontend projekt webshopa za prodaju tehnoloških proizvoda, izrađen koristeći HTML5 i CSS3. Projekt je razvijen kao dio zadatka za izradu statičnog frontend dijela webshopa.

## Sadržaj projekta

Projekt sadrži sljedeće stranice:

1. **Naslovna stranica (index.html)**
   - Hero sekcija s glavnom slikom i CTA gumbom
   - Istaknuti proizvodi
   - Kategorije proizvoda
   - Promotivni banneri
   - Sekcija "Zašto odabrati nas"

2. **Stranica kataloga proizvoda (proizvodi.html)**
   - Prikaz proizvoda u grid layoutu
   - Sidebar s filterima (kategorije, cijena, brend, ocjena)
   - Opcije sortiranja
   - Paginacija

3. **Stranica pojedinačnog proizvoda (pojedinacni-proizvod.html)**
   - Galerija slika proizvoda
   - Detalji proizvoda (naziv, cijena, opis, specifikacije)
   - Opcije proizvoda (boja, memorija)
   - Recenzije korisnika
   - Povezani proizvodi

4. **Stranica košarice (kosarica.html)**
   - Prikaz proizvoda u košarici
   - Mogućnost promjene količine
   - Sažetak narudžbe
   - Cross-sell proizvodi

5. **Stranica plaćanja (placanje.html)**
   - Forma za unos podataka o kupcu
   - Opcije plaćanja
   - Pregled narudžbe

6. **Stranica "O nama" (o-nama.html)**
   - Priča o tvrtki
   - Misija i vizija
   - Vrijednosti tvrtke
   - Tim

7. **Stranica "Kontakt" (kontakt.html)**
   - Kontakt forma
   - Kontakt informacije
   - Karta
   - FAQ sekcija

## Tehnologije

- HTML5
- CSS3
  - Flexbox
  - Grid
  - CSS varijable
  - Media queries za responzivnost

## Struktura projekta

```
webshop/
├── index.html
├── pages/
│   ├── proizvodi.html
│   ├── pojedinacni-proizvod.html
│   ├── kosarica.html
│   ├── placanje.html
│   ├── o-nama.html
│   └── kontakt.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── variables.css
├── img/
│   ├── products/
│   ├── banners/
│   ├── icons/
│   └── team/
├── fonts/
└── README.md
```

## Responzivnost

Webshop je u potpunosti responzivan i prilagođen za različite veličine ekrana:
- Desktop (1200px i više)
- Laptop (992px - 1199px)
- Tablet (768px - 991px)
- Mobilni uređaji - landscape (576px - 767px)
- Mobilni uređaji - portrait (do 575px)

## Značajke

- Semantički HTML5 elementi
- Responzivni dizajn
- CSS varijable za konzistentnost boja i fontova
- Flexbox i Grid za moderne layoute
- Optimizirane slike
- Pristupačnost (alt atributi, strukturirani naslovi)

## Kako pokrenuti projekt

1. Klonirajte repozitorij
2. Otvorite `index.html` u web pregledniku

## Autor

Ime i prezime autora

## Licenca

Ovaj projekt je licenciran pod MIT licencom.
