import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, pageHead } from "@/components/InfoPage";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead("/privacy", "Privacy Policy — YojnaSetu", "How YojnaSetu collects, uses and protects the limited information you share."),
  component: () => (
    <InfoPage title="Privacy Policy" intro="We collect only what is needed to help you discover relevant schemes.">
      <section>
        <h2>What we collect</h2>
        <p>Your name and email when you create an account, and broad profile details such as age, state, education, occupation and an income range when you use the eligibility checker.</p>
      </section>
      <section>
        <h2>What we never collect</h2>
        <p>We never ask for Aadhaar numbers, bank account details or other unnecessary sensitive information.</p>
      </section>
      <section>
        <h2>How your data is protected</h2>
        <p>Your saved schemes and results are visible only to you. You can ask us to delete your account at any time.</p>
      </section>
    </InfoPage>
  ),
});
