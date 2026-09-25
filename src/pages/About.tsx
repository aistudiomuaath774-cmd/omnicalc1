import { Link } from "react-router-dom"
import { useLanguage } from "@/i18n/LanguageContext"
import { useSEO } from "@/hooks/useSEO"

export default function About() {
  const { lang, withLang } = useLanguage()
  const isAr = lang === "ar"

  useSEO({
    title: isAr ? "من نحن — OmniCalc" : "About OmniCalc — Accurate Free Online Calculators",
    description: isAr
      ? "تعرّف على OmniCalc وطريقة تطوير الحاسبات ومراجعة دقتها والتزام المنصة بالخصوصية وسهولة الاستخدام."
      : "Learn who maintains OmniCalc, how its calculators are developed, and how we aim to provide accurate, private, and accessible calculation tools.",
    keywords: isAr
      ? "من نحن OmniCalc، حاسبات مجانية، دقة الحسابات، الخصوصية، منهجية الحاسبات"
      : "about OmniCalc, free calculators, calculator methodology, calculation accuracy, privacy-friendly tools",
    lang,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "OmniCalc",
        alternateName: "أومني كالك",
        url: window.location.origin,
        logo: `${window.location.origin}/icon.svg`,
        description: isAr
          ? "منصة مجانية للحاسبات الذكية والدقيقة في مجالات الرياضيات والعلوم والصحة والتمويل والتخطيط اليومي."
          : "A free platform for practical calculators across mathematics, science, health, finance, and daily planning.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "hello@omnicalc.app",
          url: `${window.location.origin}/contact`,
        },
      },
    ],
  })

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12" dir={isAr ? "rtl" : "ltr"}>
      <article className="card border-muted p-6 shadow-sm sm:p-8">
        <header>
          <h1 className="text-center text-3xl font-bold">
            {isAr ? "من نحن — OmniCalc" : "About Us — OmniCalc"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {isAr
              ? "منصة مجانية تساعدك على إجراء الحسابات اليومية والتقنية بسرعة ووضوح، مع شرح مبسط لحدود كل نتيجة."
              : "A free calculator platform for everyday and technical calculations, with clear explanations of what each result means and where its limits lie."}
          </p>
        </header>

        <div className="mt-8 space-y-7 text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">
              {isAr ? "رسالتنا وقيمنا" : "Our Mission & Values"}
            </h2>
            <p className="mt-2">
              {isAr
                ? "نسعى لتقديم تجربة مستخدم سريعة، بديهية، ومجانية للجميع مع الحفاظ على أعلى معايير الخصوصية ودقة البيانات. تعمل الحسابات داخل المتصفح قدر الإمكان، ولا يحتاج المستخدم إلى إنشاء حساب لاستخدام الأدوات."
                : "We aim to provide an intuitive, fast, and free experience while respecting privacy and mathematical clarity. Calculations run in the browser whenever practical, and users do not need an account to use the tools."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              {isAr ? "كيف نطوّر الحاسبات" : "How We Develop the Calculators"}
            </h2>
            <p className="mt-2">
              {isAr
                ? "نحوّل المعادلات والخطوات الحسابية المعروفة إلى أدوات تفاعلية، ونضيف لكل حاسبة دليلاً للاستخدام وبياناً بالحدود المهمة. نراجع منطق الإدخال والنتائج أثناء التطوير، ونحدّث الأدوات عندما تتغير المتطلبات أو نكتشف حاجة إلى توضيح إضافي."
                : "We turn established formulas and calculation steps into interactive tools. Each calculator includes usage guidance and important limitations. During development we review input handling and results, and we update tools when requirements change or clarification is needed."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              {isAr ? "الدقة والحدود" : "Accuracy and Limitations"}
            </h2>
            <p className="mt-2">
              {isAr
                ? "النتائج مصممة للتثقيف والتخطيط العام وليست بديلاً عن الاستشارة الطبية أو المالية أو القانونية أو الهندسية. تختلف بعض النتائج حسب الافتراضات والوحدات والبيانات المدخلة؛ لذلك نوصي بالتحقق المستقل من النتائج المهمة قبل اتخاذ قرار."
                : "Results are intended for education and general planning, not as a substitute for medical, financial, legal, or engineering advice. Some results depend on assumptions, units, and user inputs, so important results should be independently verified before a decision is made."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              {isAr ? "الشفافية والخصوصية" : "Transparency and Privacy"}
            </h2>
            <p className="mt-2">
              {isAr
                ? "لا تتطلب OmniCalc حساباً للمستخدم. قد تُحفظ اللغة والمظهر وسجل الحسابات محلياً في المتصفح. نوضح في سياسة الخصوصية كيفية تعامل الموقع مع التخزين المحلي والخدمات الخارجية والموافقة على الإعلانات."
                : "OmniCalc does not require user accounts. Language, theme, and calculation history may be stored locally in the browser. Our Privacy Policy explains local storage, third-party services, and advertising consent."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              {isAr ? "فريق العمل والتواصل" : "Our Team and Contact"}
            </h2>
            <p className="mt-2">
              {isAr
                ? "يُدار المشروع ويُطوّر بشكل مستمر من قِبل فريق متخصص. إذا وجدت خطأً أو لديك اقتراح لتحسين حاسبة، يرجى التواصل معنا عبر صفحة الاتصال."
                : "The project is continuously maintained and developed by a dedicated team. If you find an error or have a suggestion for a calculator, please contact us through the Contact page."}
            </p>
            <p className="mt-3">
              <Link to={withLang("/contact")} className="font-medium text-primary underline underline-offset-4">
                {isAr ? "انتقل إلى صفحة اتصل بنا" : "Go to our Contact page"}
              </Link>
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}

export { About }
