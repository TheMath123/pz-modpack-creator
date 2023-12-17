import Markdown from "marked-react";

interface MarkProps {
  text?: string;
}

export function Mark({ text }: MarkProps) {
  let filtered = text?.replaceAll("\\n", "\n");

  const proseLi =
    "prose-li:my-0 prose-li:marker:text-black prose-li:text-zinc-900";
  const proseUl = " prose-ul:my-0";
  const proseP = "prose-p:my-0 prose-p:text-zinc-900";
  return (
    <div className={`prose ${proseLi} ${proseUl} ${proseP}`}>
      <Markdown value={filtered} gfm={true} breaks={true} />
    </div>
  );
}
