document.getElementById('screenerForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const jsonData = {};
  for (let [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  try {
    const response = await fetch("http://localhost:5000/assess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData)
    });

    const resultData = await response.json();
    document.getElementById('result').textContent = resultData.result;
  } catch (error) {
    document.getElementById('result').textContent = "❌ Error submitting form.";
    console.error("Error:", error);
  }
});

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log("✅ Service Worker registered:", reg.scope))
      .catch(err => console.error("❌ Service Worker registration failed:", err));
  });
}
