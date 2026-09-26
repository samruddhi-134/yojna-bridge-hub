import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  EDUCATION_LEVELS,
  INCOME_RANGES,
  INDIAN_STATES,
  OCCUPATIONS,
  SUPPORT_NEEDS,
} from "@/lib/site";
import { emptyAnswers, saveAnswers, type EligibilityAnswers } from "@/lib/eligibility";

export const Route = createFileRoute("/eligibility-checker")({
  head: () => ({
    meta: [
      { title: "Eligibility Checker — Find Your Schemes in 2 Minutes | YojnaSetu" },
      {
        name: "description",
        content:
          "Answer six short steps about your profile, education, work, income and needs to discover government schemes that may match you. Free and takes about two minutes.",
      },
      { property: "og:title", content: "Check Your Government Scheme Eligibility — YojnaSetu" },
      {
        property: "og:description",
        content: "A free two-minute questionnaire that helps you discover schemes that may match your profile.",
      },
      { property: "og:url", content: "/eligibility-checker" },
    ],
    links: [{ rel: "canonical", href: "/eligibility-checker" }],
  }),
  component: EligibilityChecker,
});

const STEP_TITLES = [
  { title: "Basic Information", subtitle: "Tell us a little about yourself." },
  { title: "Education", subtitle: "This helps us match education-linked schemes." },
  { title: "Employment", subtitle: "What best describes your current situation?" },
  { title: "Income", subtitle: "A broad range is enough — no exact figures needed." },
  { title: "Support Needed", subtitle: "Select all the areas where support would help." },
  { title: "Additional Information", subtitle: "A few optional questions to refine your matches." },
];

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string | undefined;
  error?: string | undefined;
  hint?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label}
      </Label>
      {children}
      {hint && !error ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function EligibilityChecker() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<EligibilityAnswers>(emptyAnswers);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof EligibilityAnswers>(key: K, value: EligibilityAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (step === 0) {
      const age = Number(answers.age);
      if (!answers.age) next["age"] = "Please enter your age.";
      else if (!Number.isFinite(age) || age < 1 || age > 120) next["age"] = "Enter a valid age between 1 and 120.";
      if (!answers.state) next["state"] = "Please select your state.";
      if (!answers.areaType) next["areaType"] = "Please select urban or rural.";
    }
    if (step === 1 && !answers.education) next["education"] = "Please select your education level.";
    if (step === 2 && !answers.occupation) next["occupation"] = "Please select your current occupation.";
    if (step === 3 && !answers.income) next["income"] = "Please select an income range.";
    if (step === 4 && answers.needs.length === 0) next["needs"] = "Select at least one type of support.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (!validate()) return;
    if (step === STEP_TITLES.length - 1) {
      saveAnswers(answers);
      navigate({ to: "/eligibility-results" });
      return;
    }
    setStep((s) => s + 1);
  }

  const progress = ((step + 1) / STEP_TITLES.length) * 100;
  const current = STEP_TITLES[step]!;

  return (
    <div className="bg-surface py-12 lg:py-16">
      <div className="container-page max-w-3xl">
        <div className="text-center">
          <Badge variant="soft">Free • Approximately 2 minutes</Badge>
          <h1 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Let's Find Schemes That May Match You
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Answer a few simple questions. You can go back and change any answer.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-primary">
              Step {step + 1} of {STEP_TITLES.length}
            </span>
            <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="mt-3 h-2" aria-label="Form progress" />

          <div key={step} className="mt-8 animate-in fade-in slide-in-from-right-2 duration-300">
            <h2 className="text-xl font-bold text-navy">{current.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{current.subtitle}</p>

            <div className="mt-6 space-y-6">
              {step === 0 ? (
                <>
                  <Field label="Age" htmlFor="age" error={errors["age"]}>
                    <Input
                      id="age"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={120}
                      value={answers.age}
                      onChange={(e) => set("age", e.target.value)}
                      placeholder="e.g. 24"
                      className="h-11 rounded-xl"
                    />
                  </Field>

                  <Field label="Gender (optional)" hint="Some schemes are specific to a gender.">
                    <RadioGroup
                      value={answers.gender}
                      onValueChange={(v) => set("gender", v)}
                      className="flex flex-wrap gap-3"
                    >
                      {["Female", "Male", "Other", "Prefer not to say"].map((g) => (
                        <div key={g} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5">
                          <RadioGroupItem value={g} id={`gender-${g}`} />
                          <Label htmlFor={`gender-${g}`} className="cursor-pointer text-sm font-medium">
                            {g}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Field>

                  <Field label="State" error={errors["state"]}>
                    <Select value={answers.state} onValueChange={(v) => set("state", v)}>
                      <SelectTrigger className="h-11 rounded-xl" aria-label="State">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="District (optional)" htmlFor="district">
                    <Input
                      id="district"
                      value={answers.district}
                      onChange={(e) => set("district", e.target.value)}
                      placeholder="e.g. Pune"
                      className="h-11 rounded-xl"
                    />
                  </Field>

                  <Field label="Do you live in an urban or rural area?" error={errors["areaType"]}>
                    <RadioGroup
                      value={answers.areaType}
                      onValueChange={(v) => set("areaType", v)}
                      className="flex flex-wrap gap-3"
                    >
                      {["Urban", "Rural"].map((a) => (
                        <div key={a} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5">
                          <RadioGroupItem value={a} id={`area-${a}`} />
                          <Label htmlFor={`area-${a}`} className="cursor-pointer text-sm font-medium">
                            {a}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Field>
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <Field label="Highest education level" error={errors["education"]}>
                    <Select value={answers.education} onValueChange={(v) => set("education", v)}>
                      <SelectTrigger className="h-11 rounded-xl" aria-label="Education level">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_LEVELS.map((e) => (
                          <SelectItem key={e} value={e}>
                            {e}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Are you currently studying?">
                    <RadioGroup
                      value={answers.isStudent}
                      onValueChange={(v) => set("isStudent", v)}
                      className="flex flex-wrap gap-3"
                    >
                      {["Yes", "No"].map((v) => (
                        <div key={v} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5">
                          <RadioGroupItem value={v} id={`student-${v}`} />
                          <Label htmlFor={`student-${v}`} className="cursor-pointer text-sm font-medium">
                            {v}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Field>

                  {answers.isStudent === "Yes" ? (
                    <Field label="Course or field of study (optional)" htmlFor="course">
                      <Input
                        id="course"
                        value={answers.course}
                        onChange={(e) => set("course", e.target.value)}
                        placeholder="e.g. B.Sc. Agriculture"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                  ) : null}
                </>
              ) : null}

              {step === 2 ? (
                <Field label="Current occupation" error={errors["occupation"]}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {OCCUPATIONS.map((o) => {
                      const active = answers.occupation === o;
                      return (
                        <button
                          key={o}
                          type="button"
                          onClick={() => set("occupation", o)}
                          aria-pressed={active}
                          className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                            active
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          {o}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              ) : null}

              {step === 3 ? (
                <Field
                  label="Annual family income range"
                  error={errors["income"]}
                  hint="We only ask for a range — never exact financial details."
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {INCOME_RANGES.map((r) => {
                      const active = answers.income === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => set("income", r)}
                          aria-pressed={active}
                          className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                            active
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              ) : null}

              {step === 4 ? (
                <Field label="What kind of support are you looking for?" error={errors["needs"]}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SUPPORT_NEEDS.map((n) => {
                      const checked = answers.needs.includes(n.value);
                      return (
                        <label
                          key={n.value}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors ${
                            checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                          }`}
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(v) =>
                              set(
                                "needs",
                                v
                                  ? [...answers.needs, n.value]
                                  : answers.needs.filter((x) => x !== n.value),
                              )
                            }
                            aria-label={n.label}
                          />
                          {n.label}
                        </label>
                      );
                    })}
                  </div>
                </Field>
              ) : null}

              {step === 5 ? (
                <>
                  {Number(answers.age) >= 55 ? (
                    <Field label="Are you 60 years or above?">
                      <RadioGroup
                        value={answers.seniorCitizen}
                        onValueChange={(v) => set("seniorCitizen", v)}
                        className="flex flex-wrap gap-3"
                      >
                        {["Yes", "No"].map((v) => (
                          <div key={v} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5">
                            <RadioGroupItem value={v} id={`senior-${v}`} />
                            <Label htmlFor={`senior-${v}`} className="cursor-pointer text-sm font-medium">
                              {v}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </Field>
                  ) : null}

                  <Field label="Do you have a disability certificate? (optional)">
                    <RadioGroup
                      value={answers.hasDisability}
                      onValueChange={(v) => set("hasDisability", v)}
                      className="flex flex-wrap gap-3"
                    >
                      {["Yes", "No", "Prefer not to say"].map((v) => (
                        <div key={v} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5">
                          <RadioGroupItem value={v} id={`disability-${v}`} />
                          <Label htmlFor={`disability-${v}`} className="cursor-pointer text-sm font-medium">
                            {v}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Field>

                  <Field
                    label="Anything else we should consider? (optional)"
                    htmlFor="notes"
                    hint="Please do not share Aadhaar numbers, bank details or passwords."
                  >
                    <Input
                      id="notes"
                      value={answers.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="e.g. Looking for support to start a small business"
                      className="h-11 rounded-xl"
                      maxLength={200}
                    />
                  </Field>
                </>
              ) : null}
            </div>
          </div>

          <div className="mt-9 flex items-center justify-between gap-3 border-t border-border pt-6">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft aria-hidden="true" /> Back
            </Button>
            <Button variant="hero" size="lg" onClick={handleNext}>
              {step === STEP_TITLES.length - 1 ? "See My Matches" : "Continue"}
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>

        <p className="mt-6 flex items-start justify-center gap-2 text-center text-xs text-muted-foreground">
          <Lock aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          We never ask for Aadhaar numbers, bank account details or passwords.
        </p>
      </div>
    </div>
  );
}
