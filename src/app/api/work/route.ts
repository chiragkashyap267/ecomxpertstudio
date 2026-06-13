import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "work-items.json");

export async function GET() {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    const items = JSON.parse(raw);
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
