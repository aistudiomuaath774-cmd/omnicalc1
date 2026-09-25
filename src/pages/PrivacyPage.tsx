import { ShieldCheck } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import { useSEO } from "@/hooks/useSEO"

const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: September 25, 2026",
    sections: [
      ["Information we collect", "OmniCalc works without user accounts. Calculator inputs and results are processed in your browser, and we do not intentionally collect them on an OmniCalc server."],
      ["Local storage", "The site may store your language preference, theme preference, calculator history, and advertising-consent choice in your browser's local storage. You can remove this data through your browser settings."],
      ["GDPR and ePrivacy", "For visitors in the European Economic Area, the United Kingdom, and Switzerland, we aim to process personal data in accordance with applicable data-protection and ePrivacy rules. Non-essential advertising technologies are not loaded by the site before the required consent flow completes. The consent record is stored locally in your browser."],
      ["Legal basis and your rights", "Depending on the activity, processing is based on consent or legitimate interests required to operate and secure the service. Subject to applicable law, you may request access, correction, deletion, restriction, objection, or portability, and you may withdraw consent at any time by clearing the site's stored data and revisiting the site."],
      ["Advertising and cookies", "OmniCalc may use Google AdSense after the relevant consent and account settings are in place. Google and its advertising partners may use cookies or similar technologies for advertising, measurement, and personalization according to their policies and your consent choices. Review Google's privacy and advertising disclosures for details about its processing."],
      ["Contact messages", "The Contact page uses a mailto link. Your device opens your configured email application, and the message is handled by your email provider rather than an OmniCalc server."],
      ["Third-party services", "The site may use Vercel hosting, Google Fonts, and Google AdSense. These providers may process technical information under their own privacy policies. No other external advertising network is intentionally loaded by the current application."],
      ["Changes and contact", "We may update this policy when the site or its services change. For privacy questions, use the Contact page."],
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: 25 سبتمبر 2026",
    sections: [
      ["المعلومات التي نجمعها", "تعمل OmniCalc دون حسابات للمستخدمين. تتم معالجة مدخلات الحاسبات ونتائجها داخل متصفحك، ولا نتعمد جمعها عبر خادم تابع لـ OmniCalc."],
      ["التخزين المحلي", "قد يخزن الموقع تفضيل اللغة والمظهر وسجل الحاسبات واختيار الموافقة على الإعلانات في التخزين المحلي لمتصفحك. يمكنك حذف هذه البيانات من إعدادات المتصفح."],
      ["اللائحة العامة لحماية البيانات والخصوصية الإلكترونية", "بالنسبة لزوار المنطقة الاقتصادية الأوروبية والمملكة المتحدة وسويسرا، نسعى إلى معالجة البيانات الشخصية وفق قواعد حماية البيانات والخصوصية الإلكترونية السارية. لا تحمّل تقنيات الإعلان غير الضرورية من الموقع قبل اكتمال مسار الموافقة المطلوب. ويُحفظ سجل الموافقة محلياً في متصفحك."],
      ["الأساس القانوني وحقوقك", "بحسب النشاط، تستند المعالجة إلى موافقتك أو إلى المصالح المشروعة اللازمة لتشغيل الخدمة وتأمينها. ووفق القانون الساري، يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها أو تقييدها أو الاعتراض على معالجتها أو نقلها، كما يمكنك سحب موافقتك في أي وقت بحذف بيانات الموقع من المتصفح ثم زيارة الموقع مجدداً."],
      ["الإعلانات وملفات تعريف الارتباط", "قد تستخدم OmniCalc Google AdSense بعد إعداد الموافقة والحسابات اللازمة. وقد تستخدم Google وشركاؤها الإعلانيون ملفات تعريف الارتباط أو تقنيات مشابهة للإعلانات والقياس والتخصيص وفق سياساتهم وخيارات الموافقة. راجع إفصاحات Google المتعلقة بالخصوصية والإعلانات لمعرفة تفاصيل المعالجة."],
      ["رسائل التواصل", "تستخدم صفحة اتصل بنا رابط mailto. يفتح جهازك تطبيق البريد الإلكتروني المهيأ عليه، وتتم معالجة الرسالة بواسطة مزود بريدك وليس خادم OmniCalc."],
      ["الخدمات الخارجية", "قد يستخدم الموقع استضافة Vercel وGoogle Fonts وGoogle AdSense. وقد تعالج هذه الجهات معلومات تقنية وفق سياسات الخصوصية الخاصة بها. لا يحمّل التطبيق الحالي عن قصد أي شبكة إعلانية خارجية أخرى."],
      ["التعديلات والتواصل", "قد نحدّث هذه السياسة عند تغيير الموقع أو خدماته. للاستفسارات المتعلقة بالخصوصية، استخدم صفحة اتصل بنا."],
    ],
  },
} as const

export default function PrivacyPage() {
  const { lang } = useLanguage()
  const page = content[lang]
  useSEO({ title: `${page.title} — OmniCalc`, description: page.sections[0][1], lang })

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:py-14">
      <header className="mb-8 flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{page.title}</h1>
          <p className="mt-2 text-muted-foreground">{page.updated}</p>
        </div>
      </header>
      <article className="card divide-y divide-border p-6 sm:p-8">
        {page.sections.map(([title, text]) => (
          <section key={title} className="py-5 first:pt-0 last:pb-0">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2 leading-7 text-muted-foreground">{text}</p>
          </section>
        ))}
      </article>
    </main>
  )
}
