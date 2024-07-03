"use client";

import { useState } from "react";

export default function uploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/pages/api/upload", {
          method: "POST",
          body: formData,
        });

        console.log(response.ok);

        if (response.ok) {
          const { filePath } = await response.json();
          console.log("Archivo subido correctamente:", filePath);
        } else {
          try {
            const errorData = await response.json();
            console.error("Error al subir el archivo:", errorData.message);
          } catch (parseError) {
            console.error(
              "Error al procesar la respuesta de la API:",
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error al subir el archivo:", (error as Error).message);
      }
    }
  };

  return (
    <div>
      <h1>Subir archivo PDF</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <button type="submit">Subir</button>
      </form>
    </div>
  );
}
