import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/lib/EthiopianDateLib.tsx");
    const content = await readFile(filePath, "utf-8");
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Failed to load date lib code", { status: 500 });
  }
}
