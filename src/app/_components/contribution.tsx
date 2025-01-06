import { Github } from "lucide-react";
import Link from "next/link";

export default function Contribution() {
  return (
    <div className="mt-14 mb-8">
      <h2 className="text-xl font-bold tracking-tight mb-6">Contribute</h2>
      <div className="bg-muted rounded-lg p-8 text-center">
        <Github className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-3">Open Source Project</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          This project is open source and welcomes contributions from the
          community. Whether you want to fix a bug, add a feature, or improve
          documentation, your help is appreciated.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://github.com/temesgen-mulugeta/ethiopian-date-picker/issues/new"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Create an Issue
          </Link>
          <Link
            href="https://github.com/temesgen-mulugeta/ethiopian-date-picker"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
