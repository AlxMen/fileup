import { arrayBuffer } from "stream/consumers"


export async function POST(request: Request) {
  
  const data = await request.formData()
  const file = data.get('file')  

  return new Response(JSON.stringify({message:"uploading File"}))
}