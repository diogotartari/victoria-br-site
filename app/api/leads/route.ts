import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";
import { appendLeadToWorkbookBuffer } from "@/lib/excel";
import { LEAD_FIELD_LIMITS, type LeadRow } from "@/lib/lead-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOCAL_XLSX = path.join(process.cwd(), "data", "leads.xlsx");
const BLOB_PATH = "victoria-br/leads.xlsx";

/** Em `next dev` / `next start` local, grava sempre em `data/leads.xlsx`. Blob só em deploy Vercel (VERCEL=1). */
function shouldUseVercelBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN && process.env.VERCEL === "1");
}

function sanitize(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function parseLead(body: unknown): LeadRow | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const nome = sanitize(o.nome, LEAD_FIELD_LIMITS.nome);
  const telefone = sanitize(o.telefone, LEAD_FIELD_LIMITS.telefone);
  if (!nome || !telefone) return null;
  const produto = sanitize(o.produto, LEAD_FIELD_LIMITS.produto);
  const mensagemLivre = sanitize(o.mensagem, LEAD_FIELD_LIMITS.mensagem);
  const blocos = [
    produto ? `Produto / interesse: ${produto}` : "",
    mensagemLivre ? mensagemLivre : "",
  ].filter(Boolean);
  const mensagem = blocos.join("\n\n");
  return {
    nome,
    telefone,
    mensagem,
    horario: formatHorarioBr(),
  };
}

function formatHorarioBr(): string {
  return new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "medium",
  });
}

async function readExistingBuffer(): Promise<Buffer | null> {
  if (shouldUseVercelBlob()) {
    const token = process.env.BLOB_READ_WRITE_TOKEN!;
    try {
      const meta = await head(BLOB_PATH, { token });
      const res = await fetch(meta.url);
      if (!res.ok) return null;
      return Buffer.from(await res.arrayBuffer());
    } catch {
      return null;
    }
  }
  try {
    return await fs.readFile(LOCAL_XLSX);
  } catch {
    return null;
  }
}

async function persistBuffer(buf: Buffer): Promise<void> {
  if (shouldUseVercelBlob()) {
    const token = process.env.BLOB_READ_WRITE_TOKEN!;
    await put(BLOB_PATH, buf, {
      access: "public",
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return;
  }
  await fs.mkdir(path.dirname(LOCAL_XLSX), { recursive: true });
  await fs.writeFile(LOCAL_XLSX, buf);
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const row = parseLead(json);
  if (!row) {
    return NextResponse.json({ ok: false, error: "Nome e telefone são obrigatórios." }, { status: 400 });
  }

  try {
    const existing = await readExistingBuffer();
    const next = appendLeadToWorkbookBuffer(existing, row);
    await persistBuffer(next);
  } catch (e) {
    console.error("[leads]", e);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não foi possível gravar o lead. Na Vercel, defina BLOB_READ_WRITE_TOKEN (Blob) para persistir entre deploys. Em ambiente local, o arquivo data/leads.xlsx é criado automaticamente.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
