import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "work-items.json");

function requireAuth(req: NextRequest) {
  const cookie = req.cookies.get("admin_auth");
  const correct = process.env.ADMIN_PASSWORD ?? "chirag";
  return cookie?.value === correct;
}

type WorkItem = {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  scope: string;
  img: string;
  liveUrl: string;
  desc: string;
  outcome: string;
};

async function readItems(): Promise<WorkItem[]> {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeItems(items: WorkItem[]) {
  await writeFile(DATA_PATH, JSON.stringify(items, null, 2));
}

// GET – list all work items
export async function GET(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await readItems();
  return NextResponse.json(items);
}

// POST – add a new work item
export async function POST(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const items = await readItems();
  const newItem: WorkItem = {
    id: body.id || `item-${Date.now()}`,
    title: body.title ?? "",
    category: body.category ?? "",
    client: body.client ?? "",
    year: body.year ?? new Date().getFullYear().toString(),
    scope: body.scope ?? "",
    img: body.img ?? "",
    liveUrl: body.liveUrl ?? "/contact",
    desc: body.desc ?? "",
    outcome: body.outcome ?? "",
  };
  items.push(newItem);
  await writeItems(items);
  return NextResponse.json(newItem);
}

// PUT – update an existing work item
export async function PUT(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const items = await readItems();
  const idx = items.findIndex((i) => i.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  items[idx] = { ...items[idx], ...body };
  await writeItems(items);
  return NextResponse.json(items[idx]);
}

// DELETE – remove a work item
export async function DELETE(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  let items = await readItems();
  items = items.filter((i) => i.id !== id);
  await writeItems(items);
  return NextResponse.json({ ok: true });
}
