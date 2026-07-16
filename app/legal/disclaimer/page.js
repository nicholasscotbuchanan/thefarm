import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Wellness & Health Disclaimer",
  description:
    "Important health, medical, and FDA disclosures for content shared on TheFarm.",
};

export default function DisclaimerPage() {
  return (
    <PageShell
      title="Wellness & Health Disclaimer"
      subtitle="Please read this carefully before acting on anything you see on TheFarm."
      updated="July 1, 2026"
    >
      <div className="mb-6 rounded-xl border border-harvest-400/50 bg-harvest-400/10 p-4 text-sm font-medium text-soil-800">
        These statements have not been evaluated by the Food and Drug
        Administration. Products and content discussed on TheFarm are not
        intended to diagnose, treat, cure, or prevent any disease.
      </div>

      <h2>1. Informational purposes only</h2>
      <p>
        TheFarm (&ldquo;the Platform&rdquo;) is a social network where
        independent growers, makers, and alternative health brands share
        content. All posts, comments, product descriptions, images, and links
        are provided for general informational and educational purposes only.
        They do not constitute medical, nutritional, or professional advice.
      </p>

      <h2>2. Not a substitute for professional care</h2>
      <p>
        Nothing on the Platform is a substitute for the advice, diagnosis, or
        treatment of a qualified healthcare provider. Never disregard
        professional medical advice or delay seeking it because of something you
        read on TheFarm. If you think you may have a medical emergency, call
        your doctor or your local emergency number immediately.
      </p>

      <h2>3. Dietary supplements &amp; herbal products</h2>
      <p>
        Many brands on TheFarm discuss dietary supplements, botanicals, herbal
        preparations, and functional foods. In the United States, these products
        are not reviewed by the FDA for safety or efficacy before sale. Statements
        about such products:
      </p>
      <ul>
        <li>Have not been evaluated by the Food and Drug Administration;</li>
        <li>Are not intended to diagnose, treat, cure, or prevent any disease;</li>
        <li>
          May not be appropriate for you, particularly if you are pregnant or
          nursing, have a medical condition, or take prescription medication.
        </li>
      </ul>
      <p>
        Always consult a physician or licensed healthcare professional before
        beginning any supplement, herbal, detox, fasting, or wellness regimen.
      </p>

      <h2>4. Third-party content &amp; brands</h2>
      <p>
        Brands and members are solely responsible for the content they post and
        the products they sell. TheFarm does not manufacture, test, endorse, or
        guarantee any product discussed on the Platform, and does not verify the
        accuracy of health claims made by users. References to certificates of
        analysis (COAs) or third-party testing are provided by the brands
        themselves; you should independently verify any documentation that
        matters to your purchasing decision.
      </p>

      <h2>5. No practitioner–patient relationship</h2>
      <p>
        Some members identify themselves as naturopaths, herbalists, coaches, or
        other practitioners. Interacting with them on the Platform does not create
        a practitioner–patient relationship, and general comments made in the feed
        are not personalized medical advice.
      </p>

      <h2>6. Individual results vary</h2>
      <p>
        Testimonials and anecdotes shared on TheFarm reflect individual
        experiences and are not a guarantee that you will achieve the same
        results. Wellness outcomes depend on many factors unique to each person.
      </p>

      <h2>7. Assumption of risk</h2>
      <p>
        You use the Platform and act on its content at your own risk. To the
        fullest extent permitted by law, TheFarm.com, Inc. disclaims all
        liability for any loss or harm arising from reliance on information shared
        on the Platform.
      </p>

      <p className="text-sm text-soil-500">
        Questions about this disclaimer? Contact us at{" "}
        <a href="mailto:wellness@thefarm.com">
          wellness@thefarm.com
        </a>
        .
      </p>
    </PageShell>
  );
}
