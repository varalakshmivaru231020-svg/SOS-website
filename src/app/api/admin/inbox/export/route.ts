import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Quote a CSV field when it contains a quote, comma, or newline; double the quotes. */
function csvField(v: string): string {
  return /["\n\r,]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export async function GET(): Promise<Response> {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await db.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  const header = ["date", "name", "email", "company", "need", "brief", "status"];
  const lines = [header.join(",")];
  for (const s of submissions) {
    lines.push(
      [s.createdAt.toISOString(), s.name, s.email, s.company ?? "", s.need, s.brief, s.status]
        .map(csvField)
        .join(","),
    );
  }

  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="enquiries.csv"',
    },
  });
}
