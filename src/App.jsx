import { useEffect, useMemo, useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const topicCards = [
  {
    icon: "🧪",
    title: "Tiuringo testas",
    text: "Tiuringo testas padeda įvertinti, ar kompiuterio atsakymai pokalbyje gali būti tokie panašūs į žmogaus atsakymus, kad vertintojui būtų sunku atskirti, kas kalba – žmogus ar mašina.",
    interpretation:
      "Tai svarbu, nes parodo, kiek natūraliai DI gali bendrauti su žmogumi.",
  },
  {
    icon: "🏥",
    title: "Trys DI taikymo sritys",
    text: "Medicinoje DI padeda analizuoti tyrimus, versle spartina klientų aptarnavimą, o saugumo srityje naudojamas atpažinimo ir autentifikavimo sistemose.",
    interpretation:
      "Svarbiausia nauda – greitis, tikslumas ir automatizavimas.",
  },
  {
    icon: "🌐",
    title: "Daiktų internetas ir DI",
    text: "Daiktų internetas jungia išmanius įrenginius, kurie renka duomenis, o dirbtinis intelektas šiuos duomenis analizuoja ir padeda priimti sprendimus.",
    interpretation:
      "Pavyzdžiui, išmanūs namai gali mokytis iš vartotojo įpročių ir automatiškai reguliuoti aplinką.",
  },
  {
    icon: "⚖️",
    title: "Etinė problema",
    text: "Viena svarbiausių problemų yra privatumas, nes DI sistemoms dažnai reikia daug duomenų.",
    interpretation:
      "Galimi sprendimai: rinkti tik būtinus duomenis ir aiškiai informuoti žmones, kaip tie duomenys naudojami.",
  },
  {
    icon: "😟",
    title: "Kodėl žmonės nerimauja?",
    text: "Žmonės baiminasi dėl darbo automatizavimo, klaidingų sprendimų, šališkų algoritmų ir per didelės priklausomybės nuo technologijų.",
    interpretation:
      "Todėl svarbu kurti DI atsakingai ir prižiūrėti jo taikymą.",
  },
  {
    icon: "🔐",
    title: "Identifikavimas ir autentifikavimas",
    text: "DI gali atpažinti veidą, piršto atspaudą ar kitus biometrinius požymius.",
    interpretation:
      "Privalumas – greitas, patogus ir saugus prisijungimas. Pavyzdžiai: telefono atrakinimas veidu ir įėjimo kontrolės sistemos.",
  },
  {
    icon: "🧠",
    title: "Neuroninis tinklas",
    text: "Neuroninis tinklas yra modelis, sudarytas iš sluoksnių, kurie apdoroja informaciją panašiai kaip žmogaus smegenys – mokosi iš pavyzdžių ir ieško dėsningumų.",
    interpretation: "Tai leidžia sistemai atpažinti vaizdus, garsus ar tekstą.",
  },
  {
    icon: "🎙️",
    title: "Virtualus asistentas",
    text: "Virtualus asistentas supranta vartotojo komandą ir atlieka veiksmą, pavyzdžiui, nustato žadintuvą ar suranda informaciją.",
    interpretation:
      "Jo funkcijos dažniausiai platesnės ir susijusios su veiksmų vykdymu.",
  },
  {
    icon: "💬",
    title: "Pokalbių robotai",
    text: "Pokalbių robotai bendrauja tekstu arba balsu ir dažniausiai padeda atlikti konkrečią užduotį.",
    interpretation:
      "Jie plačiai naudojami klientų aptarnavime ir internetinėse svetainėse.",
  },
  {
    icon: "🔎",
    title: "Pokalbių robotų ir virtualių asistentų skirtumai",
    text: "Pokalbių robotas dažniausiai sprendžia vieną siauresnę užduotį, o virtualus asistentas gali atlikti daugiau veiksmų ir valdyti įrenginį ar programą.",
    interpretation:
      "Todėl virtualus asistentas paprastai turi platesnes galimybes.",
  },
];

const chartData = [
  {
    label: "Medicina",
    value: 92,
    detail:
      "DI padeda greičiau analizuoti tyrimus ir pastebėti požymius, kuriuos žmogus gali praleisti.",
  },
  {
    label: "Verslas",
    value: 85,
    detail:
      "Automatizuojamas klientų aptarnavimas, dokumentų analizė ir duomenų apdorojimas.",
  },
  {
    label: "Saugumas",
    value: 88,
    detail:
      "Atpažinimo sistemos padeda greitai patikrinti tapatybę ir valdyti prieigą.",
  },
];

const workflowSteps = [
  "Duomenų surinkimas",
  "Modelio apmokymas",
  "Vaizdo analizė",
  "Sprendimo pateikimas",
];

const conclusions = [
  "Dirbtinis intelektas jau dabar padeda daugelyje sričių: nuo medicinos iki kasdienių išmaniųjų įrenginių.",
  "Didžiausia DI nauda yra greitis, automatizavimas ir gebėjimas analizuoti didelį kiekį duomenų.",
  "Kartu būtina atsakomybė: svarbu saugoti privatumą, vengti šališkumo ir aiškiai paaiškinti, kaip sistema priima sprendimus.",
  "Teachable Machine leidžia praktiškai suprasti, kaip apmokomas ir veikia dirbtinio intelekto modelis.",
];

const futureQuestions = [
  "Kaip pagerinti modelio tikslumą surinkus daugiau mokymo pavyzdžių?",
  "Kaip skirtingas apšvietimas arba fonas veikia modelio atpažinimą?",
  "Kuriose dar situacijose būtų naudinga panaudoti rankų gestų atpažinimą?",
];

const sources = [
  {
    label: "Teachable Machine",
    href: "https://teachablemachine.withgoogle.com/",
  },
  { label: "TensorFlow", href: "https://www.tensorflow.org/" },
  {
    label: "IBM – What is artificial intelligence?",
    href: "https://www.ibm.com/think/topics/artificial-intelligence",
  },
  {
    label: "Microsoft – Responsible AI",
    href: "https://www.microsoft.com/ai/responsible-ai",
  },
];

const initialModels = [
  {
    id: "model1",
    shortLabel: "1 modelis",
    title: "Širdutė ir 5 pirštai",
    description:
      "Pirmasis modelis yra image tipo ir apmokytas atpažinti širdutės gestą bei atvirą delną.",
    path: `${import.meta.env.BASE_URL}my_model/`,
    watchedClass: "Heart",
    classHints: ["Heart", "5 fingers"],
    type: "image",
  },
  {
    id: "model2",
    shortLabel: "2 modelis",
    title: "Like ir 2 pirštai",
    description:
      "Antrasis modelis yra pose tipo ir apmokytas atpažinti like gestą bei du pakeltus pirštus.",
    path: `${import.meta.env.BASE_URL}my_model_2/`,
    watchedClass: "like",
    classHints: ["like", "2 fingers"],
    type: "pose",
  },
];

function normalizeModelBase(input) {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("Įvesk modelio kelią arba nuorodą.");
  }

  if (trimmed.endsWith("model.json")) {
    return trimmed.replace(/model\.json$/, "");
  }

  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function getPoseLibrary() {
  const tmPose = window.tmPose;

  if (!tmPose) {
    throw new Error(
      "Pose biblioteka neužsikrovė. Perkrauk puslapį ir pabandyk dar kartą.",
    );
  }

  return tmPose;
}

export default function App() {
  const [models, setModels] = useState(initialModels);
  const [activeModelId, setActiveModelId] = useState(initialModels[0].id);
  const [threshold, setThreshold] = useState(0.8);
  const [status, setStatus] = useState("Pasirink modelį ir paleisk kamerą.");
  const [predictions, setPredictions] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isDetected, setIsDetected] = useState(false);

  const webcamWrapperRef = useRef(null);
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const animationFrameRef = useRef(null);
  const runningRef = useRef(false);
  const isMountedRef = useRef(true);
  const lastPredictionUpdateRef = useRef(0);
  const predictionInFlightRef = useRef(false);
  const thresholdRef = useRef(threshold);

  const activeModel = useMemo(
    () => models.find((model) => model.id === activeModelId) ?? models[0],
    [models, activeModelId],
  );

  const sortedPredictions = useMemo(
    () => [...predictions].sort((a, b) => b.probability - a.probability),
    [predictions],
  );

  useEffect(() => {
    thresholdRef.current = threshold;
  }, [threshold]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("detection-active", isDetected);

    return () => {
      document.body.classList.remove("detection-active");
    };
  }, [isDetected]);

  useEffect(() => {
    stopCamera(false);
    setPredictions([]);
    setIsDetected(false);
    setStatus(
      `Pasirinktas ${activeModel.shortLabel.toLowerCase()} (${activeModel.type}). Paleisk kamerą, kad modelis pradėtų atpažinimą. Stebėk prognozes ir bandyk atpažinti „${activeModel.watchedClass}“ gestą!`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModelId]);

  useEffect(() => {
    return () => {
      stopCamera(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateActiveModel(field, value) {
    setModels((current) =>
      current.map((model) =>
        model.id === activeModelId
          ? {
              ...model,
              [field]: value,
            }
          : model,
      ),
    );
  }

  async function createModelAndWebcam(selectedModel, modelURL, metadataURL) {
    if (selectedModel.type === "image") {
      const model = await tmImage.load(modelURL, metadataURL);
      const webcam = new tmImage.Webcam(420, 315, true);
      return { model, webcam };
    }

    const tmPose = getPoseLibrary();
    const model = await tmPose.load(modelURL, metadataURL);
    const webcam = new tmPose.Webcam(420, 315, true);
    return { model, webcam };
  }

  async function runPrediction(selectedModel) {
    if (!modelRef.current || !webcamRef.current) {
      return [];
    }

    if (selectedModel.type === "image") {
      return modelRef.current.predict(webcamRef.current.canvas);
    }

    const { posenetOutput } = await modelRef.current.estimatePose(
      webcamRef.current.canvas,
    );
    return modelRef.current.predict(posenetOutput);
  }

  async function startCamera() {
    const selectedModel = activeModel;

    try {
      await stopCamera(false);
      await new Promise((resolve) => setTimeout(resolve, 120));

      setStatus("Kraunamas modelis ir ruošiama kamera...");
      setPredictions([]);
      setIsDetected(false);
      predictionInFlightRef.current = false;
      lastPredictionUpdateRef.current = 0;

      const modelBase = normalizeModelBase(selectedModel.path);
      const modelURL = `${modelBase}model.json`;
      const metadataURL = `${modelBase}metadata.json`;

      const { model, webcam } = await createModelAndWebcam(
        selectedModel,
        modelURL,
        metadataURL,
      );

      await webcam.setup();
      await webcam.play();
      webcam.update();

      modelRef.current = model;
      webcamRef.current = webcam;
      runningRef.current = true;

      if (webcamWrapperRef.current) {
        webcamWrapperRef.current.innerHTML = "";
        webcamWrapperRef.current.appendChild(webcam.canvas);
      }

      setIsRunning(true);
      setStatus(
        `Veikia ${selectedModel.shortLabel.toLowerCase()} (${selectedModel.type}). Aptikus klasę „${selectedModel.watchedClass}“, puslapio fonas taps žalias.`,
      );

      const predictionInterval = selectedModel.type === "pose" ? 240 : 140;

      const tick = () => {
        if (
          !runningRef.current ||
          !webcamRef.current ||
          !modelRef.current ||
          !isMountedRef.current
        ) {
          return;
        }

        webcamRef.current.update();
        const now = performance.now();

        if (
          !predictionInFlightRef.current &&
          now - lastPredictionUpdateRef.current > predictionInterval
        ) {
          predictionInFlightRef.current = true;

          runPrediction(selectedModel)
            .then((nextPredictions) => {
              if (!runningRef.current || !isMountedRef.current) {
                return;
              }

              setPredictions(nextPredictions);

              const matchedClass = nextPredictions.find(
                (item) =>
                  item.className.trim().toLowerCase() ===
                  selectedModel.watchedClass.trim().toLowerCase(),
              );

              setIsDetected(
                (matchedClass?.probability ?? 0) >= thresholdRef.current,
              );
              lastPredictionUpdateRef.current = performance.now();
            })
            .catch((error) => {
              console.error(error);
              runningRef.current = false;
              setIsRunning(false);
              setIsDetected(false);
              setStatus(
                `Įvyko klaida nuskaitant ${selectedModel.shortLabel.toLowerCase()}. Patikrink modelio failus, tipą ir kameros leidimą.`,
              );
            })
            .finally(() => {
              predictionInFlightRef.current = false;
            });
        }

        animationFrameRef.current = window.requestAnimationFrame(tick);
      };

      animationFrameRef.current = window.requestAnimationFrame(tick);
    } catch (error) {
      console.error(error);
      runningRef.current = false;
      predictionInFlightRef.current = false;
      setIsRunning(false);
      setIsDetected(false);
      setStatus(
        error?.message ||
          "Nepavyko paleisti modelio. Patikrink modelio kelią, failus ir kameros leidimus.",
      );
    }
  }

  async function stopCamera(resetStatus = true) {
    runningRef.current = false;
    predictionInFlightRef.current = false;

    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (webcamRef.current) {
      try {
        const stream = webcamRef.current.webcam?.srcObject;
        if (stream && typeof stream.getTracks === "function") {
          stream.getTracks().forEach((track) => track.stop());
        }

        webcamRef.current.stop();
      } catch (error) {
        console.error(error);
      }

      webcamRef.current = null;
    }

    modelRef.current = null;
    setIsRunning(false);
    setIsDetected(false);

    if (webcamWrapperRef.current) {
      webcamWrapperRef.current.innerHTML =
        '<div class="camera-placeholder">Kamera dar nepaleista</div>';
    }

    if (resetStatus) {
      setStatus("Kamera sustabdyta.");
      setPredictions([]);
    }
  }

  return (
    <div className="page-shell">
      <header className="hero" id="pradzia">
        <nav className="top-nav">
          <div className="brand">
            <span className="brand-mark">DI</span>
            <span>Interaktyvus pristatymas</span>
          </div>
          <div className="nav-links">
            <a href="#ivadas">Įvadas</a>
            <a href="#turinys">Pagrindinė dalis</a>
            <a href="#vizualizacijos">Vizualizacijos</a>
            <a href="#demo">Modeliai</a>
            <a href="#isvados">Išvados</a>
            <a href="#saltiniai">Šaltiniai</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div>
            <span className="eyebrow">React + Vite + Teachable Machine</span>
            <h1>
              Dirbtinio intelekto pristatymas su dviem interaktyviais modeliais
            </h1>
            <p className="lead">
              Ši svetainė pateikia svarbiausias dirbtinio intelekto temas,
              trumpą analizę ir vizualizacijas, o pabaigoje leidžia praktiškai
              išbandyti du atskirus Teachable Machine modelius.
            </p>

            <div className="hero-stats">
              <div className="stat-card">
                <strong>10</strong>
                <span>Pagrindinių temų</span>
              </div>
              <div className="stat-card">
                <strong>3</strong>
                <span>Analizuojamos sritys</span>
              </div>
              <div className="stat-card">
                <strong>2</strong>
                <span>Interaktyvūs modeliai</span>
              </div>
            </div>

            <div className="hero-actions">
              <a className="primary-button" href="#demo">
                Išbandyti modelius
              </a>
              <a className="secondary-button" href="#vizualizacijos">
                Peržiūrėti vizualizacijas
              </a>
            </div>
          </div>

          <div className="info-card flow-card">
            <h2>Kaip veikia šis projektas?</h2>
            <div className="flow-list">
              {workflowSteps.map((step, index) => (
                <div key={step}>
                  <strong>{index + 1}.</strong> {step}
                </div>
              ))}
            </div>
            <p className="flow-note">
              Teachable Machine leidžia apmokyti modelį su savo pavyzdžiais, o
              ši svetainė parodo, kaip tas modelis pritaikomas realiame
              tinklalapyje.
            </p>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="section" id="ivadas">
          <div className="section-heading">
            <span className="section-tag">Įvadas</span>
            <h2>Kas nagrinėjama šiame pristatyme?</h2>
            <p>
              Šiame projekte nagrinėjama, kas yra dirbtinis intelektas, kur jis
              taikomas, kokių naudų suteikia ir kokias rizikas sukuria.
              Praktinėje dalyje parodoma, kaip veikia rankų gestų atpažinimo
              modeliai.
            </p>
          </div>
        </section>

        <section className="section" id="turinys">
          <div className="section-heading">
            <span className="section-tag">Pagrindinė dalis</span>
            <h2>Surinkta informacija, analizė ir interpretacija</h2>
            <p>
              Toliau pateikiamos pagrindinės sąvokos ir jų paaiškinimai.
              Kiekviena tema papildyta trumpa interpretacija, kad pristatymą
              būtų lengva sekti.
            </p>
          </div>

          <div className="card-grid">
            {topicCards.map((section) => (
              <article className="info-card topic-card" key={section.title}>
                <div className="card-icon">{section.icon}</div>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
                <div className="interpretation-box">
                  <strong>Interpretacija:</strong> {section.interpretation}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="vizualizacijos">
          <div className="section-heading">
            <span className="section-tag">Vizualinė medžiaga</span>
            <h2>Diagramos ir schemos</h2>
            <p>
              Vizualizacijos padeda aiškiau parodyti, kokiose srityse DI
              naudingas, kaip veikia modelio mokymas ir kuo skiriasi skirtingi
              DI įrankiai.
            </p>
          </div>

          <div className="visual-grid">
            <article className="info-card chart-card">
              <div className="card-headline">
                <h3>DI taikymo sričių palyginimas</h3>
                <span className="small-badge">Palyginamoji analizė</span>
              </div>
              <div className="chart-wrapper">
                {chartData.map((item) => (
                  <div className="chart-row" key={item.label}>
                    <div className="chart-labels">
                      <span>{item.label}</span>
                      <strong>{item.value}%</strong>
                    </div>
                    <div className="chart-track">
                      <div
                        className="chart-fill"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <p className="chart-detail">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="analysis-note">
                Iš šios diagramos matyti, kad DI ypač vertinamas ten, kur reikia
                greitai apdoroti daug informacijos ir sumažinti žmogiškų klaidų
                tikimybę.
              </p>
            </article>

            <article className="info-card diagram-card">
              <div className="card-headline">
                <h3>Kaip veikia DI modelio mokymas?</h3>
                <span className="small-badge">Schema</span>
              </div>
              <div className="process-steps">
                {workflowSteps.map((step, index) => (
                  <div className="process-step" key={step}>
                    <div className="process-index">{index + 1}</div>
                    <div>
                      <strong>{step}</strong>
                      <p>
                        {
                          [
                            "Surenkami pavyzdžiai, pagal kuriuos modelis mokosi atpažinti dėsningumus.",
                            "Modelis mokomas atskirti pasirinktų klasių pavyzdžius.",
                            "Kamera pateikia naują vaizdą, kurį modelis palygina su tuo, ko išmoko.",
                            "Sistema pateikia prognozę ir parodo labiausiai tikėtiną rezultatą.",
                          ][index]
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="info-card comparison-card wide-card">
              <div className="card-headline">
                <h3>Pokalbių robotas ir virtualus asistentas</h3>
                <span className="small-badge">Palyginimas</span>
              </div>
              <div className="comparison-grid">
                <div className="comparison-column">
                  <h4>Pokalbių robotas</h4>
                  <ul>
                    <li>Dažniausiai sprendžia vieną siauresnę užduotį.</li>
                    <li>Dažnai naudojamas klientų aptarnavime.</li>
                    <li>
                      Pagrindinė funkcija – atsakyti į klausimus arba nukreipti
                      vartotoją.
                    </li>
                  </ul>
                </div>
                <div className="comparison-column">
                  <h4>Virtualus asistentas</h4>
                  <ul>
                    <li>Turi platesnes funkcijas ir gali vykdyti veiksmus.</li>
                    <li>
                      Gali nustatyti žadintuvą, ieškoti informacijos ar valdyti
                      įrenginius.
                    </li>
                    <li>
                      Pagrindinė funkcija – padėti vartotojui atlikti daugiau
                      užduočių.
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="demo">
          <div className="section-heading">
            <span className="section-tag">Interaktyvi medžiaga</span>
            <h2>Du Teachable Machine modeliai vienoje svetainėje</h2>
            <p>
              Žemiau pateikti abu modeliai. Pasirink vieną iš jų ir paleisk kamerą. Kai pasirinktas gestas
              atpažįstamas, puslapio fonas pažaliuoja.
            </p>
          </div>

          <div className="model-selector-grid">
            {models.map((model) => (
              <button
                key={model.id}
                type="button"
                className={`model-card ${model.id === activeModelId ? "active" : ""}`}
                onClick={() => setActiveModelId(model.id)}
              >
                <div className="model-card-top">
                  <span className="small-badge">{model.shortLabel}</span>
                  <span className="model-state">
                    {model.id === activeModelId ? "Aktyvus" : "Pasirinkti"}
                  </span>
                </div>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
                <div className="chip-row">
                  {model.classHints.map((hint) => (
                    <span className="chip" key={hint}>
                      {hint}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="demo-grid">
            <div className="info-card demo-controls">
              <div className="card-headline">
                <h3>Aktyvaus modelio nustatymai</h3>
                <span className="small-badge">{activeModel.shortLabel}</span>
              </div>

              <div className="button-row">
                <button
                  className="primary-button"
                  type="button"
                  onClick={startCamera}
                >
                  Paleisti kamerą
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => stopCamera()}
                >
                  Sustabdyti
                </button>
              </div>

              <div className={`status-box ${isDetected ? "success" : ""}`}>
                <strong>Statusas:</strong> {status}
              </div>
            </div>

            <div className="info-card demo-preview">
              <div className="camera-frame" ref={webcamWrapperRef}>
                <div className="camera-placeholder">Kamera dar nepaleista</div>
              </div>

              <div className="prediction-list">
                {sortedPredictions.length === 0 ? (
                  <p className="muted-text">
                    Čia matysi modelio prognozes ir jų tikimybes.
                  </p>
                ) : (
                  sortedPredictions.map((item) => (
                    <div className="prediction-item" key={item.className}>
                      <div className="prediction-header">
                        <span>{item.className}</span>
                        <strong>{formatPercent(item.probability)}</strong>
                      </div>
                      <div className="prediction-track">
                        <div
                          className="prediction-fill"
                          style={{
                            width: `${Math.max(item.probability * 100, 4)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="isvados">
          <div className="section-heading">
            <span className="section-tag">Išvados</span>
            <h2>Pagrindiniai atradimai ir tolesni klausimai</h2>
          </div>

          <div className="sources-grid">
            <div className="info-card summary-card">
              <h3>Pagrindiniai atradimai</h3>
              <ul>
                {conclusions.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="info-card summary-card">
              <h3>Tolesnio tyrimo kryptys</h3>
              <ul>
                {futureQuestions.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="discussion-card info-card">
            <h3>Diskusijos klausimas</h3>
            <p>
              Ar ateityje dirbtinis intelektas labiau padės žmonėms, ar kels
              daugiau iššūkių? Kuriose srityse jo naudojimas turėtų būti
              griežčiausiai prižiūrimas?
            </p>
          </div>
        </section>

        <section className="section" id="saltiniai">
          <div className="section-heading">
            <span className="section-tag">Šaltiniai</span>
            <h2>Naudoti šaltiniai ir DI užklausos pavyzdys</h2>
            <p>
              Šaltinių blokas rodo, kad informacija rinkta iš patikimų
              svetainių. Jei pristatyme naudojamas ChatGPT ar kita DI priemonė,
              verta pateikti ir užklausos pavyzdį.
            </p>
          </div>

          <div className="sources-grid">
            <div className="info-card">
              <h3>Naudoti šaltiniai</h3>
              <ul className="source-list">
                {sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <h3>ChatGPT užklausos pavyzdys</h3>
              <p className="prompt-box">
                „Paaiškink paprastai, kas yra neuroninis tinklas, palygink
                pokalbių robotą su virtualiu asistentu ir pateik trumpą
                interpretaciją, tinkamą mokykliniam pristatymui.“
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
