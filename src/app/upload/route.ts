import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al procesar el archivo" });
      }

      const file = files.file as unknown as formidable.File;
      if (!file) {
        return res
          .status(400)
          .json({ error: "No se ha seleccionado ningún archivo" });
      }

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const newFilePath = file.originalFilename
        ? path.join(uploadDir, file.originalFilename)
        : path.join(uploadDir, "defaultFileName.txt");
      await fs.promises.rename(file.filepath, newFilePath);

      return res
        .status(200)
        .json({
          message: "Archivo subido correctamente",
          url: `/uploads/${file.originalFilename}`,
        });
    });
  } else {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Método no permitido");
  }
}
