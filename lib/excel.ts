import * as XLSX from "xlsx";
import type { LeadRow } from "@/lib/lead-types";

const SHEET = "Leads";
const HEADERS: (keyof LeadRow)[] = ["nome", "telefone", "mensagem", "horario"];

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
    rows = raw.filter((r) => r.some((c) => String(c).trim() !== ""));
    if (!rows.length) {
      rows = [HEADERS.map(String)];
    } else {
      const first = rows[0].map((c) => String(c).trim().toLowerCase());
      const looksLikeHeader =
        first[0] === "nome" && first.includes("telefone") && first.includes("mensagem");
      if (!looksLikeHeader) {
        rows = [HEADERS.map(String), ...rows];
      }
    }
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
