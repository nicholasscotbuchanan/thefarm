import PageShell from "@/components/PageShell";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the TheFarm team.",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Get in touch"
      subtitle="Questions, partnerships, or want to claim your brand? We'd love to hear from you."
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-6 text-sm">
          <div>
            <h3 className="font-semibold text-soil-900">General</h3>
            <p className="text-soil-600">
              <a href="mailto:hello@thefarm.com">hello@thefarm.com</a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-soil-900">Brand partnerships</h3>
            <p className="text-soil-600">
              <a href="mailto:brands@thefarm.com">brands@thefarm.com</a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-soil-900">Press</h3>
            <p className="text-soil-600">
              <a href="mailto:press@thefarm.com">press@thefarm.com</a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-soil-900">Mailing address</h3>
            <p className="text-soil-600">
              TheFarm.com, Inc.
              <br />
              100 Meadow Lane
              <br />
              Ithaca, NY 14850
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
