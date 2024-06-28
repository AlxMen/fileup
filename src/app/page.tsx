"use client";

import { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState({});
  

  return (
    <>
      <form onSubmit={async (e) => {
        e.preventDefault()
        if (!file) return
        
        const form = new FormData()
        form.set('file', JSON.stringify(file))

        const res = await fetch('/upload', {
          method: "POST",
          body: form
        })
        const data = res.json()
        console.log(data);
        
      }}>
        <label htmlFor="file">Upload File:</label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => {
            if (!e.target.files) return
            setFile(e.target.files[0])
          }}
        />
        <button className="bg-slate-400 border border-black p-1">
          Upload
        </button>
      </form>
    </>
  );
}
