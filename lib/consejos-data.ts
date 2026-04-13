import { siteImages } from "@/lib/site-images";

export type ConsejoCategory =
  | "Bienestar"
  | "Prevención"
  | "Salud familiar"
  | "Asistencia"
  | "Seguros"
  | "Empresas"
  | "Consejos prácticos";

/** Figma BLOG listing chips (`71:990` → filter row): Telemedicina, Farmacia, Bienestar, Salud. */
export type ConsejosListingTopicId = "telemedicina" | "farmacia" | "bienestar" | "salud";

export type ConsejoPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Shorter title for cards/listing; full `title` stays on article + metadata. */
  listingTitle?: string;
  /** Shorter blurb for cards/listing; full `excerpt` stays for hero + meta description when desired. */
  listingExcerpt?: string;
  /** Optional short line under the title on the article hero (defaults to `excerpt` when omitted). */
  subtitle?: string;
  category: ConsejoCategory;
  /** ISO date for machine; format in UI. */
  date: string;
  readingTime: string;
  /** Card + article hero image (see `siteImages.consejos.*`). */
  coverSrc: string;
  /**
   * Which listing chips include this post. If omitted, derived from `category` via `consejosListingTopicsForCategory`.
   */
  listingTopics?: readonly ConsejosListingTopicId[];
  /** Simple, typed editorial content blocks (no CMS yet). */
  content: readonly ConsejoContentBlock[];
  /** Optional related suggestions by slug for internal linking. */
  relatedSlugs?: readonly string[];
};

export type ConsejoContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "quote"; text: string; byline?: string }
  | { type: "callout"; title: string; text: string; tone?: "info" | "tip" }
  | { type: "image"; src: string; alt: string; caption?: string };

const listingTopicsByCategory: Record<ConsejoCategory, readonly ConsejosListingTopicId[]> = {
  Asistencia: ["telemedicina"],
  Seguros: ["farmacia"],
  Bienestar: ["bienestar"],
  Prevención: ["salud"],
  "Salud familiar": ["salud"],
  "Consejos prácticos": ["salud"],
  Empresas: ["salud"],
};

export function consejosListingTopicsForPost(post: ConsejoPost): readonly ConsejosListingTopicId[] {
  return post.listingTopics?.length ? post.listingTopics : listingTopicsByCategory[post.category];
}

export const consejosPosts: readonly ConsejoPost[] = [
  {
    slug: "rutina-preventiva-para-tu-familia",
    title: "Una rutina preventiva simple para cuidar a tu familia todo el año",
    excerpt:
      "Pequeños hábitos y señales a monitorear que reducen urgencias evitables y te ayudan a tomar decisiones con calma.",
    listingTitle: "Rutina preventiva para tu familia",
    listingExcerpt: "Hábitos y señales que reducen urgencias y ayudan a decidir con calma.",
    category: "Prevención",
    date: "2026-03-18",
    readingTime: "6 min",
    coverSrc: siteImages.consejos.post01,
    relatedSlugs: [
      "cuando-usar-telemedicina",
      "primeros-pasos-ante-una-emergencia",
      "seguros-que-preguntar-antes-de-contratar",
    ],
    content: [
      {
        type: "p",
        text:
          "La prevención no se trata de hacer todo perfecto, sino de crear un sistema simple que se sostenga en el tiempo. Una rutina preventiva funciona cuando es fácil, repetible y se adapta a tu realidad.",
      },
      {
        type: "image",
        src: siteImages.consejos.post02,
        alt: "Atención clínica y bienestar familiar",
        caption: "Una rutina simple se sostiene cuando el entorno te acompaña.",
      },
      { type: "h2", text: "Una idea guía: menos urgencias, más claridad" },
      {
        type: "p",
        text:
          "Si tu familia cuenta con un par de hábitos bien elegidos, una lista breve de señales a monitorear y un plan para pedir ayuda, la mayoría de decisiones se toman con menos estrés y con mejor información.",
      },
      { type: "h2", text: "Checklist mensual (10 minutos)" },
      {
        type: "ul",
        items: [
          "Actualiza números de contacto y una lista corta de alergias/medicación.",
          "Revisa el botiquín: termómetro, analgésicos habituales, apósitos y antiséptico.",
          "Agenda controles pendientes y define una ventana de tiempo realista para hacerlo.",
          "Asegura que todos sepan qué hacer ante fiebre alta o dolor fuerte.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Tip calmado",
        text:
          "Evita listas largas: una rutina pequeña pero constante gana a un plan perfecto que no se cumple.",
      },
      { type: "h2", text: "Señales que conviene no ignorar" },
      {
        type: "p",
        text:
          "Si algo cambia de forma marcada (dolor que aumenta, dificultad para respirar, deshidratación, somnolencia excesiva), vale la pena pedir orientación. En muchos casos, una consulta temprana evita complicaciones.",
      },
      {
        type: "quote",
        text:
          "La tranquilidad no es ausencia de problemas: es saber qué hacer cuando aparece una duda.",
        byline: "Equipo TAMMA",
      },
      { type: "h2", text: "Cómo pedir ayuda sin perder tiempo" },
      {
        type: "p",
        text:
          "Ten a mano tres datos: síntomas principales, tiempo de evolución y antecedentes relevantes. Con eso, la orientación es más precisa y la decisión (telemedicina vs. presencial) se vuelve más simple.",
      },
    ],
  },
  {
    slug: "cuando-usar-telemedicina",
    title: "¿Cuándo conviene usar telemedicina? Una guía práctica",
    excerpt:
      "Cómo preparar tu consulta remota, qué información tener a mano y qué casos requieren evaluación presencial.",
    listingTitle: "¿Cuándo conviene la telemedicina?",
    listingExcerpt: "Qué preparar, qué datos tener y cuándo es mejor ir en persona.",
    category: "Asistencia",
    date: "2026-03-08",
    readingTime: "5 min",
    coverSrc: siteImages.consejos.post02,
    relatedSlugs: [
      "rutina-preventiva-para-tu-familia",
      "primeros-pasos-ante-una-emergencia",
      "bienestar-en-tiempos-de-estres",
    ],
    content: [
      {
        type: "p",
        text:
          "La telemedicina es ideal cuando necesitas orientación rápida, seguimiento o una primera evaluación. No reemplaza todo, pero sí reduce fricción y te ayuda a decidir el siguiente paso con calma.",
      },
      { type: "h2", text: "Cuándo sí conviene" },
      {
        type: "ul",
        items: [
          "Síntomas leves a moderados que quieres evaluar temprano.",
          "Seguimiento de un cuadro ya conocido o resultados recientes.",
          "Dudas sobre medicación, dosis o interacciones comunes.",
          "Orientación para saber si conviene ir a consulta presencial.",
        ],
      },
      { type: "h2", text: "Cuándo es mejor presencial" },
      {
        type: "p",
        text:
          "Si hay dolor intenso, dificultad respiratoria, signos neurológicos, sangrado importante o empeoramiento rápido, una evaluación presencial es la opción más segura.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Antes de la llamada",
        text:
          "Ten a mano: temperatura, síntomas, desde cuándo empezaron, medicación actual y antecedentes relevantes. Un minuto de preparación mejora mucho la orientación.",
      },
      { type: "h2", text: "Cómo aprovechar la consulta" },
      {
        type: "p",
        text:
          "Describe lo principal en una frase, luego agrega contexto. Al final, pide un plan: qué observar, qué hacer hoy y qué sería una señal para escalar a presencial.",
      },
    ],
  },
  {
    slug: "bienestar-en-tiempos-de-estres",
    title: "Bienestar en tiempos de estrés: decisiones pequeñas que ayudan",
    excerpt:
      "Estrategias realistas para dormir mejor, recuperar energía y sostener hábitos sin sentirte abrumado.",
    listingTitle: "Bienestar en tiempos de estrés",
    listingExcerpt: "Ideas simples para dormir mejor y sostener hábitos sin abrumarte.",
    category: "Bienestar",
    date: "2026-02-28",
    readingTime: "7 min",
    coverSrc: siteImages.consejos.post03,
    relatedSlugs: ["rutina-preventiva-para-tu-familia", "cuando-usar-telemedicina"],
    content: [
      {
        type: "p",
        text:
          "Cuando todo se siente intenso, lo útil suele ser simple: dormir un poco mejor, comer más regular y reducir decisiones. No necesitas una transformación completa; necesitas continuidad.",
      },
      { type: "h2", text: "Tres anclas para la semana" },
      {
        type: "ul",
        items: [
          "Sueño: una hora de cierre (luz baja, pantallas fuera, rutina corta).",
          "Movimiento: 12–20 minutos diarios, aunque sea caminando.",
          "Alimentación: un plato base que repitas sin pensar demasiado.",
        ],
      },
      { type: "h2", text: "Tu energía es un indicador" },
      {
        type: "p",
        text:
          "Si la energía cae varios días seguidos, vale la pena revisar: hidratación, descanso y niveles de estrés. Pedir orientación temprana es parte del autocuidado.",
      },
      {
        type: "quote",
        text:
          "La constancia gana: pequeñas decisiones diarias cambian más que un plan perfecto una vez al mes.",
      },
    ],
  },
  {
    slug: "seguros-que-preguntar-antes-de-contratar",
    title: "Seguros: 8 preguntas para contratar con claridad (sin sorpresas)",
    excerpt:
      "Coberturas, exclusiones y activación: un checklist rápido para conversar con tu asesor y decidir con confianza.",
    listingTitle: "Seguros: 8 preguntas clave",
    listingExcerpt: "Coberturas, exclusiones y activación: checklist para decidir con claridad.",
    category: "Seguros",
    date: "2026-02-20",
    readingTime: "6 min",
    coverSrc: siteImages.consejos.post04,
    relatedSlugs: [
      "primeros-pasos-ante-una-emergencia",
      "rutina-preventiva-para-tu-familia",
      "bienestar-corporativo-con-claridad",
    ],
    content: [
      {
        type: "p",
        text:
          "Un seguro aporta tranquilidad cuando sabes cómo se activa, qué cubre y qué necesitas en un caso real. Estas preguntas te ayudan a comparar opciones sin perderte en la letra pequeña.",
      },
      { type: "h2", text: "Preguntas clave" },
      {
        type: "ul",
        items: [
          "¿Qué eventos están cubiertos y cuáles son las exclusiones más frecuentes?",
          "¿Cómo se activa la cobertura y en qué plazos responden?",
          "¿Qué documentos suelen solicitar en un siniestro?",
          "¿Hay deducibles, copagos o límites por evento/año?",
          "¿La red de atención aplica donde vivo y trabajo?",
          "¿Qué canales de soporte existen y en qué horarios?",
          "¿Cómo es el proceso de reembolso, si aplica?",
          "¿Qué cambia al renovar: precios, condiciones, continuidad?",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Tip para decidir mejor",
        text:
          "Pide un ejemplo concreto: “Si pasa X, ¿qué hago paso a paso?”. La respuesta revela si el seguro es claro y operativo.",
      },
    ],
  },
  {
    slug: "primeros-pasos-ante-una-emergencia",
    title: "Primeros pasos ante una emergencia: qué hacer y qué no hacer",
    excerpt:
      "Una ruta de acción sencilla para mantener la calma, pedir ayuda y acompañar el proceso sin perder tiempo crítico.",
    listingTitle: "Primeros pasos ante una emergencia",
    listingExcerpt: "Calma, ayuda y tiempo: una ruta breve para no perder minutos críticos.",
    category: "Consejos prácticos",
    date: "2026-02-10",
    readingTime: "4 min",
    coverSrc: siteImages.consejos.post05,
    relatedSlugs: ["cuando-usar-telemedicina", "rutina-preventiva-para-tu-familia"],
    content: [
      {
        type: "p",
        text:
          "En una emergencia, el objetivo es reducir el riesgo y ganar tiempo. Un plan sencillo evita discusiones y ayuda a actuar con claridad.",
      },
      { type: "h2", text: "Primero: calma y seguridad" },
      {
        type: "p",
        text:
          "Asegura el entorno. Luego evalúa: respiración, conciencia y sangrado. Si hay señales graves, pide ayuda inmediatamente.",
      },
      { type: "h2", text: "Qué sí hacer" },
      {
        type: "ul",
        items: [
          "Pide ayuda y describe síntomas principales + tiempo de evolución.",
          "Mantén a la persona cómoda y acompaña sin moverla innecesariamente.",
          "Si hay medicación habitual, ten el nombre y dosis a mano.",
        ],
      },
      { type: "h2", text: "Qué evitar" },
      {
        type: "ul",
        items: [
          "No demores buscando “la explicación perfecta” si el cuadro empeora.",
          "No mezcles medicación sin orientación profesional.",
          "No conduzcas si no estás en condiciones: prioriza apoyo.",
        ],
      },
    ],
  },
  {
    slug: "bienestar-corporativo-con-claridad",
    title: "Bienestar corporativo con claridad: cómo cuidar equipos sin fricción",
    excerpt:
      "Qué revisar para implementar soporte real: canales, continuidad, tiempos de respuesta y comunicación interna.",
    listingTitle: "Bienestar corporativo con claridad",
    listingExcerpt: "Canales, continuidad y respuesta: soporte real para equipos sin fricción.",
    category: "Empresas",
    date: "2026-01-30",
    readingTime: "6 min",
    coverSrc: siteImages.consejos.post06,
    relatedSlugs: ["seguros-que-preguntar-antes-de-contratar"],
    content: [
      {
        type: "p",
        text:
          "El bienestar corporativo funciona cuando es operativo: canales claros, continuidad, tiempos de respuesta y comunicación simple. No se trata de sumar beneficios; se trata de reducir fricción.",
      },
      { type: "h2", text: "Qué revisar antes de implementar" },
      {
        type: "ul",
        items: [
          "Canales: ¿quién atiende, por dónde y en qué horarios?",
          "Continuidad: ¿hay seguimiento o cada caso empieza de cero?",
          "Respuesta: ¿hay SLA o tiempos esperados por tipo de solicitud?",
          "Comunicación: ¿cómo se informa a los equipos sin saturar?",
        ],
      },
      {
        type: "quote",
        text:
          "La confianza en un servicio se construye cuando el proceso es claro y repetible.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Señal de buena implementación",
        text:
          "Si el equipo sabe qué hacer ante una duda y recibe respuesta consistente, el programa se sostiene y genera confianza.",
      },
    ],
  },
] as const;

