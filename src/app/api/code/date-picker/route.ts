import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/components/date-picker.tsx");
    const content = await readFile(filePath, "utf-8");
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Failed to load date picker code", { status: 500 });
  }
}
