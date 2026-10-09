import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, pageHead } from "@/components/InfoPage";

export const Route = createFileRoute("/terms")({
  head: () => pageHead("/terms", "Terms of Use — YojnaSetu", "The terms that apply when you use YojnaSetu to discover government schemes."),
  component: () => (
    <InfoPage title="Terms of Use" intro="By using YojnaSetu you agree to these terms.">
      <section>
        <h2>Information only</h2>
        <p>YojnaSetu provides information to help you discover schemes. It does not process applications or guarantee eligibility.</p>
      </section>
      <section>
        <h2>Your account</h2>
        <p>Keep your login details safe and provide accurate information. Do not misuse the service.</p>
      </section>
      <section>
        <h2>Verify before applying</h2>
        <p>Always confirm eligibility, benefits and deadlines on the official government source before applying.</p>
      </section>
    </InfoPage>
  ),
});
