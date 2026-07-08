interface ItalicHeadlineProps {
  text: string;
  as?: "h2" | "h3" | "h4";
  className?: string;
  dark?: boolean;
}

export function ItalicHeadline({
  text,
  as: Tag = "h3",
  className = "",
  dark = false,
}: ItalicHeadlineProps) {
  const lastSpace = text.lastIndexOf(" ");
  const head = lastSpace > -1 ? text.slice(0, lastSpace) : text;
  const tail = lastSpace > -1 ? text.slice(lastSpace + 1) : "";

  return (
    <Tag className={className}>
      {head}
      {tail ? <span className="lp-italic"> {tail}</span> : null}
    </Tag>
  );
}

export function splitItalicTitle(text: string) {
  const lastSpace = text.lastIndexOf(" ");
  return {
    head: lastSpace > -1 ? text.slice(0, lastSpace) : text,
    tail: lastSpace > -1 ? text.slice(lastSpace + 1) : "",
  };
}
