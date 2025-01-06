import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-sm leading-loose text-center text-muted-foreground md:text-left md:pl-5">
            Built by{" "}
            <Link
              href="https://www.linkedin.com/in/temesgen-hailegiorgis/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Temesgen Hailegiorgis
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com/in/temesgen-hailegiorgis/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/temesgen-mulugeta"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
