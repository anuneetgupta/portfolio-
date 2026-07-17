import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    // Read the PDF from the public folder
    const filePath = join(process.cwd(), "public", "resume.pdf");
    const fileBuffer = readFileSync(filePath);

    // Return the PDF with proper headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="AnuneetGupta_Resume.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error downloading resume:", error);
    return new NextResponse("Resume not found", { status: 404 });
  }
}
