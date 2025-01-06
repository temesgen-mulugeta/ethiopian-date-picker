import { IconCheck, IconCopy } from "@tabler/icons-react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type TerminalBlockProps = {
  code: string;
  prompt?: string;
};

export const TerminalBlock = ({ code, prompt = "$" }: TerminalBlockProps) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded-lg bg-slate-900 p-4 font-mono text-sm">
      <div className="flex justify-end mb-2">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
        </button>
      </div>
      <SyntaxHighlighter
        language="bash"
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: 0,
          background: "transparent",
          fontSize: "0.875rem",
        }}
        showLineNumbers={false}
        PreTag="div"
      >
        {code
          .split("\n")
          .map((line) => `${prompt} ${line}`)
          .join("\n")}
      </SyntaxHighlighter>
    </div>
  );
};
