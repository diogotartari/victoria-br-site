import * as XLSX from "xlsx";
import type { LeadRow } from "@/lib/lead-types";

const SHEET = "Leads";
const HEADERS: (keyof LeadRow)[] = ["nome", "telefone", "produto", "mensagem", "horario"];

function normalizeExistingRows(rawRows: string[][]): string[][] {
  const rows = rawRows.filter((r) => r.some((c) => String(c).trim() !== ""));
  if (!rows.length) return [HEADERS.map(String)];

  const first = rows[0].map((c) => String(c).trim().toLowerCase());
  const looksLikeHeader = first[0] === "nome" && first.includes("telefone");
  if (!looksLikeHeader) return [HEADERS.map(String), ...rows];

  const indexByHeader = new Map(first.map((header, index) => [header, index]));
  const normalized = rows.slice(1).map((row) =>
    HEADERS.map((header) => {
      const oldIndex = indexByHeader.get(header);
      return oldIndex === undefined ? "" : String(row[oldIndex] ?? "");
    }),
  );

  return [HEADERS.map(String), ...normalized];
}

/**
 * Lê um .xlsx existente (ou vazio) e devolve um buffer com uma linha nova no fim.
 * Usado apenas no servidor (API route).
 */
export function appendLeadToWorkbookBuffer(existing: Buffer | null, lead: LeadRow): Buffer {
  let rows: string[][];

  if (existing?.length) {
    const wb = XLSX.read(existing, { type: "buffer" });
    const ws = wb.Sheets[SHEET] ?? wb.Sheets[wb.SheetNames[0]];
    const raw = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1, defval: "" }) as string[][];
    rows = normalizeExistingRows(raw);
  } else {
    rows = [HEADERS.map(String)];
  }

  const line = HEADERS.map((key) => String(lead[key] ?? "").replace(/\r\n/g, "\n"));
  rows.push(line);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, SHEET);
  return Buffer.from(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
}
