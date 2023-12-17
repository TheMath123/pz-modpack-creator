import DOMPurify from "dompurify";

interface RawHTMLProps {
  html: string;
}

export function RawHTML({ html }: RawHTMLProps) {
  const safeHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
