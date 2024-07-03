// pages/api/upload.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Obtener el archivo del cuerpo de la solicitud
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    // Guardar el archivo en el servidor
    const filename = file
      ? `${Date.now()}_${file.name}`
      : "defaultFile";
    console.log(file?.name, filename);

    const filePath = `./public/uploads/${filename}`;

    if (file instanceof File) {
      const buffer = await new Response(file).arrayBuffer();
      +(await fs.promises.writeFile(filePath, Buffer.from(buffer)));
    } else {
      return NextResponse.json(
        { message: "No se encontró el archivo" },
        { status: 400 }
      );
    }

    // Devolver la ruta del archivo
    const relativePath = path.relative(process.cwd(), filePath);

    return NextResponse.json({
      message: "Archivo subido correctamente",
      filePath: relativePath,
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 }
    );
  }
}
