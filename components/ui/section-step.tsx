import { splitItalicTitle } from "@/components/ui/italic-headline";

interface SectionStepProps {
  title: string;
  body: string;
  dark?: boolean;
}

export function SectionStep({ title, body, dark = false }: SectionStepProps) {
  const { head, tail } = splitItalicTitle(title);

  return (
    <div className="lp-step-card">
      <h3 className={`lp-step-title${dark ? " lp-step-title-dark" : ""}`}>
        {head}
        {tail ? <span className="lp-italic"> {tail}</span> : null}
      </h3>
      <p className={`lp-step-body${dark ? " lp-step-body-dark" : ""}`}>{body}</p>
    </div>
  );
}
