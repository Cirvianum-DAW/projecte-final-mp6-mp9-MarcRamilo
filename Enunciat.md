# Tailwind Project

## Arxius i instruccions d'execució

El projecte té els següents fitxers:

- `src/index.html`: Aquest fitxer conté el codi HTML de la pàgina web.
- `src/index.js`: Aquest fitxer conté el codi JavaScript que s'executa a la pàgina web.
- `src/styles.css`: Aquest fitxer conté el codi CSS de la pàgina web, escrit amb Tailwind CSS.
- `package.json`: Aquest fitxer és el fitxer de configuració de npm. Llista les dependències i scripts del projecte.
- `postcss.config.js`: Aquest fitxer és utilitzat per Parcel per processar el codi CSS.
- `README.ca.md`: Aquest fitxer conté la documentació del projecte.

### Per executar el projecte, segueix aquests passos:

1. Clona el repositori a la teva màquina local.
2. Executa `npm install` per instal·lar les dependències del projecte.
3. Executa `npm run dev` per iniciar el servidor de desenvolupament.
4. Obre el teu navegador i navega a `http://localhost:1234` per veure la pàgina web.

Aquest projecte utilitza Tailwind CSS i Parcel com exemple d'ús d'eines modernes en el desenvolupament web.

## Descripció del Projecte

Aquest projecte té com a objectiu el desenvolupament d'un lloc web senzill amb estil i contingut lliure, utilitzant Tailwind CSS com a eina principal per a l'estil i Parcel per a la gestió de recursos. **El projecte és de temàtica lliure però ha de seguir una estructura específica.**

## Directrius

### Part 1: Desenvolupament

#### Configuració Inicial

Iniciar el projecte amb un arxiu HTML bàsic i utilitzar les següents eines:

- [Tailwind CSS](https://tailwindcss.com/)
- [Parcel](https://v2.parceljs.org/)

Tailwind i Parcel ja estan disponibles en aquest Boilerplate. Tailwind ja sabem què ens permet fer. Esbrina quin és l'objectiu de Parcel i explica-ho breument a la documentació.

#### SiteMap i Wireframe

Comença llegint bé què et demana el projecte. Un cop hagis entès bé l'estructura del projecte, crea un SiteMap esquemàtic que expliqui com s'estructura el lloc web. Figma pot ajudar-te ja amb això: https://www.figma.com/templates/sitemap-generator/ (no és necessari que utilitzes aquesta plantilla, però pot ser útil).

També hauràs de crear un Wireframe que mostri l'estructura de les pàgines del lloc web. Això sí que ho hauries de fer amb Figma. Tingues en compte que el lloc web ha de tenir almenys 4 pàgines diferents.

#### Disseny amb Tailwind CSS

Utilitzar les principals característiques de Tailwind CSS, incloent classes per a:

- Mides
- Colors
- Fonts
- Marges i Paddings
- Flexbox i/o Grid
- Assegurar-te que el lloc sigui totalment **responsive**

#### Estructura i Contingut

Crear un petit portal amb contingut lliure. La pàgina ha de contenir, com a mínim (suposem l'exmple d'un lloc web sobre gastronomia):

- **Portada**: : Presenta el contingut, amb enllaços a la resta de pàgines.
- **Categoria**: Aquesta pàgina ha d'oferir un llistat d'elements relacionats amb la temàtica general.
  - Per exemple: llistat de plats tradicionals de la regió de Piemont o un llistat d'històries relacionades amb el menjar en l'antiga
    Roma
- **Detall**: En la categoria, ha d'haver-hi almenys una pàgina de detall que ha de seguir un format d'article i incloure informació relacionada amb l'element a descriure. És necessari que cada pàgina contingui un mínim de 3 paràgrafs de text, un llistat, i algun element multimèdia: imatge, vídeo, etc. Tingues en compte els elements d'HTML que s'usen per a estructurar la informació de la pàgina com a paràgrafs,llistes, cites o capçaleres.

  - Un exemple de pàgines interiors podria ser una recepta de cuina o la història d'un plat concret. També pots ser més original ;)

- **Presentació**: Una pàgina que expliqui detalladament el contingut del lloc web. Si la portada presenta breument el contingut i enllaça a les pàgines, aquesta pàgina ha 'explicar de manera més detalladament el contingut. La pàgina ha d'incloure elements multimèdia com a imatges o vídeos i almenys 3 paràgrafs de text.
- **Enllaços**: Una pàgina amb documentació a les fonts de les quals s'ha tret el contingut i atribucions als drets copyleft quan sigui necessari. Feu atenció de no utilitzar imatges i continguts en general amb drets d'autor ja que no podreu publicar el lloc web.

#### Navegació

- La portada ha d'enllaçar a la pàgina de categoria, de presentació i d'enllaços.
- La pàgina de categoria ha d'enllaçar la pàgina de detall.
- Les pàgines de detall han d'incloure enllaços a altres pàgines de detall de la mateixa categoria o a altres pàgines relacionades.

#### Figma i Tailwind CSS

Crea al menys un component (pot ser la capçalera o un botó... has de pensar en elements reutilitzables) amb Figma i tracta d'exporar-lo a TailwindCSS amb les eines que incorpora. Existeixen diversos plugins de Figma que et poden ajudar a resoldre aquesta tasca amb més o menys facilitat.

Durant el transcurs de la pràctica farem algunes proves. Mira d'explicar com ho has dut a terme en la documentació.

#### Publicació

Desplegar el lloc web en un servidor públic i assegurar-se que siga accessible des d'internet. Recomanem Github Pages per a això o si vols investigar més, pots utilitzar [Netlify](https://www.netlify.com/) o [Vercel](https://vercel.com/).

### Part 2: Documentació

Documentar tot el procés de desenvolupament, incloent:

- Explicació de les eine utilitzades i com ens ajuden a desenvolupar el nostre web (Tailwind CSS, Parcel, etc.).
- Presentació del Wireframe i del SiteMap.
- Explicació de les decisions preses en el disseny i desenvolupament del lloc web.
- Enllaços i recursos utilitzats.

### Criteris d'Avaluació

#### :computer: **Desenvolupament** [70%]

- [15%] Ús correcte de l'entorn de desenvolupament i les eines utilitzades.
- [15%] Presentació del Wireframe i del SiteMap.
- [25%] Ús dels components de Tailwind CSS i responsivitat
- [10%] Estils i adequació a l'estructura de la pràctica
- [5%] Publicació a internet

#### ✏️ Documentació [30%]

- [10%] Documentació del procés de desenvolupament.
- [10%] Justificació de les decisions preses.
- [10%] Anàlisi dels resultats obtinguts.
