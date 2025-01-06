import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/lib/EthiopianDateUtils.tsx");
    const content = await readFile(filePath, "utf-8");
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    return new NextResponse("Failed to load date utils code", { status: 500 });
  }
}
