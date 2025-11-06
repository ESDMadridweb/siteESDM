export async function handler(event) {
  const API_TOKEN = process.env.API_TOKEN;
  const BASE_URL_API = process.env.API;

  if (!API_TOKEN || !BASE_URL_API) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: true, message: "Falta API_TOKEN o API en .env" })
    };
  }

  let buffer;
  try {
    const body = JSON.parse(event.body);
    if (!body.image) throw new Error("No se envió ninguna imagen");

    // Limpiar el Base64
    const base64Data = body.image.replace(/^data:image\/\w+;base64,/, '');
    buffer = Buffer.from(base64Data, 'base64');
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: true, message: "Base64 inválido o sin imagen", details: err.message })
    };
  }

  try {
    // Usar FormData y Blob nativos de Node 18+
    const formData = new FormData();
    const blob = new Blob([buffer], { type: 'image/png' });
    formData.append('file', blob, 'dibujo.png');

    const wpResponse = await fetch(`${BASE_URL_API}/post-draw`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });

    const json = await wpResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        url: json.url || null,
        message: "Imagen subida correctamente",
        data: json
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: true, message: "Error subiendo la imagen a WP", details: err.message })
    };
  }
}
