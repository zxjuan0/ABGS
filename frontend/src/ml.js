export async function getRiskPrediction(features) {
  const res = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(features),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Prediction request failed: ${errorText}`);
  }

  return res.json();
}