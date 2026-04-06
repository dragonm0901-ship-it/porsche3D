export const locales = ["en", "es", "de", "ja"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  ja: "日本語",
};

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export type FeaturedSlide = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  location: string;
  imagePath: string;
  modelPath: string | null;
  alt: string;
  specs: {
    year: string;
    mileage: string;
    horsepower: string;
  };
  accent: {
    top: string;
    glow: string;
    haze: string;
  };
  garage: {
    top: string;
    glow: string;
    haze: string;
  };
  garageAccent: {
    top: string;
    haze: string;
  };
};

export const featuredSlides: FeaturedSlide[] = [
  {
    id: "911-GT3",
    title: "911 GT3",
    subtitle: "STUTTGART",
    price: "$197,200",
    location: "Baden-Württemberg",
    imagePath: "/cars/car-01.png",
    modelPath: "/cars/models/car-01/scene.gltf",
    alt: "Porsche 911 GT3 in Racing Yellow",
    specs: {
      year: "2024",
      mileage: "1,240 mi",
      horsepower: "502 hp",
    },
    accent: {
      top: "#bde4f4",
      glow: "rgba(120, 195, 240, 0.50)",
      haze: "rgba(100, 190, 245, 0.35)",
    },
    garage: {
      top: "#ffffff",
      glow: "rgba(255, 238, 0, 0.12)",
      haze: "rgba(255, 230, 0, 0.04)",
    },
    garageAccent: {
      top: "#fffce0",
      haze: "rgba(255, 248, 200, 0.6)",
    },
  },
  {
    id: "GT4-RS",
    title: "GT4 RS",
    subtitle: "LEIPZIG",
    price: "$160,700",
    location: "Saxony, Germany",
    imagePath: "/cars/car-02.png",
    modelPath: "/cars/models/car-02/scene.gltf",
    alt: "718 Cayman GT4 RS",
    specs: {
      year: "2023",
      mileage: "840 mi",
      horsepower: "493 hp",
    },
    accent: {
      top: "#d2dfc4",
      glow: "rgba(140, 170, 100, 0.45)",
      haze: "rgba(130, 165, 90, 0.30)",
    },
    garage: {
      top: "#fdfefe",
      glow: "rgba(0, 150, 255, 0.08)",
      haze: "rgba(0, 140, 255, 0.02)",
    },
    garageAccent: {
      top: "#eef8ff",
      haze: "rgba(220, 242, 255, 0.6)",
    },
  },
  {
    id: "TAYCAN-S",
    title: "TAYCAN S",
    subtitle: "ZUFFENHAUSEN",
    price: "$194,900",
    location: "Stuttgart, Germany",
    imagePath: "/cars/car-03.png",
    modelPath: "/cars/models/car-03/scene.gltf",
    alt: "Porsche Taycan Turbo S",
    specs: {
      year: "2024",
      mileage: "2,100 mi",
      horsepower: "750 hp",
    },
    accent: {
      top: "#e4e5e7",
      glow: "rgba(190, 195, 200, 0.40)",
      haze: "rgba(180, 185, 190, 0.25)",
    },
    garage: {
      top: "#ffffff",
      glow: "rgba(210, 220, 230, 0.1)",
      haze: "rgba(190, 200, 210, 0.03)",
    },
    garageAccent: {
      top: "#f0f4f8",
      haze: "rgba(220, 230, 240, 0.5)",
    },
  },
];

export const dictionaries: Record<Locale, any> = {
  en: {
    metaTitle: "porsche. Premium Showcase",
    labels: {
      year: "Production",
      mileage: "Distance",
      horsepower: "Output",
    },
    nav: {
      collection: "Collection",
      garage: "Garage",
      about: "About",
      quickLinks: "Quick Access",
      close: "Dismiss",
      searchHint: "Jump to section...",
    },
    hero: {
      availability: "Available Now",
      viewDetail: "View Details",
      fullDetails: "Registry Detail",
    },
    overview: {
      kicker: "Perspective",
      title: "The Collector's Standard",
      body: "We redefine the automotive acquisition experience through digital fidelity and historical transparency.",
      cards: [
        { title: "Authentication", body: "Every vehicle undergoes a rigorous 150-point inspection." },
        { title: "Global Logistics", body: "White-glove delivery to your doorstep, anywhere in the world." },
        { title: "Curation", body: "Only the most significant models with documented provenance." },
      ],
    },
    garage: {
      kicker: "The Atelier",
      title: "Model Configurator",
      body: "Experience our finest selection in a controlled studio environment. Interact with full 3D fidelity.",
      selector: "Select Model",
      hint: "Drag to rotate view",
      badge: "Full 3D",
    },
    collection: {
      kicker: "Registry",
      title: "Active Collection",
      body: "Our curated lineup of high-performance vehicles, each with a unique narrative.",
      viewMore: "Inspect",
    },
    details: {
      kicker: "Focus",
      title: "Refined Engineering",
      body: "Every curve, every stitch, every roar. We celebrate the intersection of art and mechanics.",
      primary: "Enter Studio",
      secondary: "Back to Home",
    },
    footer: {
      note: "Curating excellence since 1948.",
      builtWith: "Built with Next.js & Framer Motion",
      rights: "© 2026 porsche.",
    },
  },
  es: {
    metaTitle: "porsche. Exhibición Premium",
    labels: {
      year: "Producción",
      mileage: "Distancia",
      horsepower: "Potencia",
    },
    nav: {
      collection: "Colección",
      garage: "Garaje",
      about: "Nosotros",
      quickLinks: "Acceso Rápido",
      close: "Cerrar",
      searchHint: "Saltar a sección...",
    },
    hero: {
      availability: "Disponible",
      viewDetail: "Ver Detalles",
      fullDetails: "Detalle del Registro",
    },
    overview: {
      kicker: "Perspectiva",
      title: "El Estándar del Coleccionista",
      body: "Redefinimos la experiencia de adquisición automotriz a través de la fidelidad digital y la transparencia histórica.",
      cards: [
        { title: "Autenticicón", body: "Cada vehículo se somete a una rigurosa inspección de 150 puntos." },
        { title: "Logística Global", body: "Entrega de guante blanco en su puerta, en cualquier lugar." },
        { title: "Curación", body: "Solo los modelos más significativos con procedencia documentada." },
      ],
    },
    garage: {
      kicker: "El Taller",
      title: "Configurador",
      body: "Experimente nuestra selección en un estudio controlado. Interacción 3D de alta fidelidad.",
      selector: "Seleccionar",
      hint: "Arrastre para rotar",
      badge: "3D Real",
    },
    collection: {
      kicker: "Registro",
      title: "Colección Activa",
      body: "Nuestra selección de vehículos de alto rendimiento, cada uno con una historia única.",
      viewMore: "Inspeccionar",
    },
    details: {
      kicker: "Enfoque",
      title: "Ingeniería Refinada",
      body: "Cada curva, cada puntada, cada rugido. Celebramos la unión del arte y la mecánica.",
      primary: "Entrar al Estudio",
      secondary: "Volver al Inicio",
    },
    footer: {
      note: "Curando la excelencia desde 1948.",
      builtWith: "Creado con Next.js y Framer Motion",
      rights: "© 2026 porsche.",
    },
  },
  de: {
    metaTitle: "porsche. Premium-Showcase",
    labels: {
      year: "Produktion",
      mileage: "Laufleistung",
      horsepower: "Leistung",
    },
    nav: {
      collection: "Kollektion",
      garage: "Garage",
      about: "Über",
      quickLinks: "Schnellzugriff",
      close: "Schließen",
      searchHint: "Zum Bereich springen...",
    },
    hero: {
      availability: "Sofort Verfügbar",
      viewDetail: "Details Anzeigen",
      fullDetails: "Register Details",
    },
    overview: {
      kicker: "Perspektive",
      title: "Der Sammlerstandard",
      body: "Wir definieren das Erlebnis des Autokaufs neu durch digitale Präzision und historische Transparenz.",
      cards: [
        { title: "Authentifizierung", body: "Jedes Fahrzeug wird einer strengen 150-Punkte-Inspektion unterzogen." },
        { title: "Globale Logistik", body: "Lieferung direkt vor Ihre Haustür, überall auf der Welt." },
        { title: "Kuration", body: "Nur die bedeutendsten Modelle mit dokumentierter Herkunft." },
      ],
    },
    garage: {
      kicker: "Das Atelier",
      title: "Konfigurator",
      body: "Erleben Sie unsere Auswahl in einer Studioumgebung. Volle 3D-Präzision.",
      selector: "Modell Wählen",
      hint: "Zum Drehen ziehen",
      badge: "Echtes 3D",
    },
    collection: {
      kicker: "Register",
      title: "Aktive Kollektion",
      body: "Unsere Auswahl an Hochleistungsfahrzeugen, jedes mit einer eigenen Geschichte.",
      viewMore: "Ansehen",
    },
    details: {
      kicker: "Fokus",
      title: "Feinmechanik",
      body: "Jede Kurve, jede Naht, jedes Brüllen. Wir feiern die Kunst der Mechanik.",
      primary: "Studio Betreten",
      secondary: "Zum Start",
    },
    footer: {
      note: "Exzellenz kuratiert seit 1948.",
      builtWith: "Erstellt mit Next.js & Framer Motion",
      rights: "© 2026 porsche.",
    },
  },
  ja: {
    metaTitle: "porsche. プレミアムショーケース",
    labels: {
      year: "生産年度",
      mileage: "走行距離",
      horsepower: "出力",
    },
    nav: {
      collection: "コレクション",
      garage: "ガレージ",
      about: "概要",
      quickLinks: "クイックアクセス",
      close: "閉じる",
      searchHint: "セクションへ...",
    },
    hero: {
      availability: "購入可能",
      viewDetail: "詳細を見る",
      fullDetails: "登録詳細",
    },
    overview: {
      kicker: "パースペクティブ",
      title: "コレクターズ・スタンダード",
      body: "デジタル精度と歴史的透明性を通じて、自動車購入体験を再定義します。",
      cards: [
        { title: "認証", body: "すべての車両に厳格な150項目の検査を実施しています。" },
        { title: "グローバル・ロジスティクス", body: "世界中どこへでも。最高級の配送サービスをお届けします。" },
        { title: "キュレーション", body: "確かな出自を持つ、歴史的に重要なモデルのみを厳選。" },
      ],
    },
    garage: {
      kicker: "アトリエ",
      title: "コンフィギュレーター",
      body: "スタジオ環境での精鋭セレクション。フル3Dの忠実度をご体験ください。",
      selector: "モデル選択",
      hint: "ドラッグで回転",
      badge: "フル3D",
    },
    collection: {
      kicker: "レジストリ",
      title: "アクティブコレクション",
      body: "独自の物語を持つ、高性能車両の厳選ラインナップ。",
      viewMore: "詳細情報",
    },
    details: {
      kicker: "フォーカス",
      title: "洗練されたエンジニアリング",
      body: "曲線、ステッチ、咆哮。アートとメカニクスの融合を称えます。",
      primary: "スタジオに入る",
      secondary: "ホームに戻る",
    },
    footer: {
      note: "1948年以来、卓越性を追求。",
      builtWith: "Next.jsとFramer Motionで構築",
      rights: "© 2026 porsche.",
    },
  },
};
