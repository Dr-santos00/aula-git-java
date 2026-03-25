export default async function handler(req, res) {
  const dados = req.body;

  const prompt = `
Gere uma petição inicial do Juizado Especial Cível.

Dados:
${JSON.stringify(dados)}

Estrutura:
DOS FATOS
DO DIREITO
DOS PEDIDOS
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();

  res.status(200).json({
    peticao: data.choices[0].message.content
  });
}
