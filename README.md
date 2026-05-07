# DI pristatymas su Teachable Machine (React + Vite)

Paruoštas **React + Vite** projektas interaktyviam mokykliniam pristatymui apie dirbtinį intelektą.

## Ką projektas jau turi

- aiškią struktūrą: **įvadas → pagrindinė dalis → vizualizacijos → interaktyvi dalis → išvados → šaltiniai**
- profesionalesnį dizainą, pritaikytą pristatymui
- įterptą vizualinę medžiagą: **diagramas, palyginimus ir schemas**
- **du Teachable Machine modelius vienoje svetainėje**
- prognozių rodymą realiu laiku
- automatinį fono pakeitimą į žalią, kai aptinkama pasirinkta klasė
- šaltinių ir ChatGPT užklausos pavyzdžio bloką
- paruoštą GitHub Pages deploy workflow

## Kaip paleisti lokaliai

```bash
npm install
npm run dev
```

## Kaip įkelti abu modelius

Svetainė paruošta naudoti su dviem modeliais:

- **1 modelis** → `public/my_model/`
- **2 modelis** → `public/my_model_2/`

Į kiekvieną aplanką įkelk to modelio failus:

- `model.json`
- `metadata.json`
- `weights.bin`

Pavyzdinė struktūra:

```text
project-folder/
├─ public/
│  ├─ my_model/
│  │  ├─ model.json
│  │  ├─ metadata.json
│  │  └─ weights.bin
│  └─ my_model_2/
│     ├─ model.json
│     ├─ metadata.json
│     └─ weights.bin
├─ src/
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
```

## Kaip eksportuoti modelį iš Teachable Machine

1. Eik į **Teachable Machine**.
2. Sukurk ir apmokyk modelį.
3. Pasirink **Export Model**.
4. Pasirink **TensorFlow.js**.
5. Parsisiųsk failus.
6. Įdėk juos į atitinkamą aplanką `public/my_model/` arba `public/my_model_2/`.

## Modeliai šiame projekte

- **1 modelis:** širdutė ir 5 pirštai
- **2 modelis:** like ir 2 pirštai

Svetainėje galima pasirinkti aktyvų modelį ir stebimą klasę.

## Kur keisti turinį

Pagrindinis turinys yra faile:

```bash
src/App.jsx
```

Dizainas yra faile:

```bash
src/index.css
```

## Kaip įkelti į GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin TAVO_GITHUB_REPO_URL
git push -u origin main
```

## GitHub Pages publikavimas

Šiame projekte jau yra:

```bash
.github/workflows/deploy.yml
```

Toliau:

1. Įkelk projektą į GitHub.
2. GitHub repozitorijoje atsidaryk **Settings → Pages**.
3. Pasirink **Build and deployment → Source: GitHub Actions**.
4. Po `push` veiks deploy workflow.
