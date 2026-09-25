import { useLanguage } from "@/i18n/LanguageContext"

export default function About() {
  const { lang } = useLanguage()
  const isAr = lang === "ar"

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12" dir={isAr ? "rtl" : "ltr"}>
      <article className="card border-muted p-6 shadow-sm sm:p-8">
        <header>
          <h1 className="text-center text-3xl font-bold">
            {isAr ? "من نحن — OmniCalc" : "About Us — OmniCalc"}
          </h1>
        </header>
        <div className="mt-6 space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            {isAr
              ? "مرحباً بكم في OmniCalc، منصتكم الموثوقة للأدوات الحسابية الذكية والدقيقة. تم تصميم OmniCalc بهدف تبسيط العمليات الحسابية المعقدة في مجالات التمويل، والرياضيات، والصحة، والهندسة، والحياة اليومية."
              : "Welcome to OmniCalc, your comprehensive destination for smart, accurate, and accessible calculation tools. OmniCalc was built to simplify everyday and complex computations across finance, health, science, math, and practical daily planning."}
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">
            {isAr ? "رسالتنا وقيمنا" : "Our Mission & Values"}
          </h2>
          <p>
            {isAr
              ? "نسعى لتقديم تجربة مستخدم سريعة، بديهية، ومجانية للجميع مع الحفاظ على أعلى معايير الخصوصية ودقة البيانات."
              : "We strive to deliver an intuitive, lightning-fast, and entirely free experience for learners, professionals, and everyday users while upholding the highest standards of data privacy and mathematical precision."}
          </p>
          <h2 className="pt-2 text-xl font-semibold text-foreground">
            {isAr ? "فريق العمل والتطوير" : "Our Team & Transparency"}
          </h2>
          <p>
            {isAr
              ? "يُدار المشروع ويُطور بشكل مستمر من قِبل فريق متخصص لضمان دقة العمليات الحسابية وتوافقها مع المعايير القياسية."
              : "The platform is continuously maintained by dedicated engineers to ensure reliable mathematical accuracy and usability."}
          </p>
        </div>
      </article>
    </main>
  )
}

export { About }
