import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, pageHead } from "@/components/InfoPage";
import { FOOTER_DISCLAIMER, GLOBAL_DISCLAIMER } from "@/lib/site";

export const Route = createFileRoute("/disclaimer")({
  head: () => pageHead("/disclaimer", "Disclaimer — YojnaSetu", "YojnaSetu is an independent information platform and not a government website."),
  component: () => (
    <InfoPage title="Disclaimer">
      <section>
        <h2>Not a government website</h2>
        <p>{FOOTER_DISCLAIMER}</p>
      </section>
      <section>
        <h2>Eligibility decisions</h2>
        <p>{GLOBAL_DISCLAIMER}</p>
      </section>
      <section>
        <h2>Demo data</h2>
        <p>Schemes marked "Demo data" are sample records shown for illustration until verified government scheme data is added.</p>
      </section>
    </InfoPage>
  ),
});
