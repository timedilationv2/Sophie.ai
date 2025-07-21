console.log("JS loaded ✅");

let models = [];

fetch('data/ai_models.json')
  .then(response => response.json())
  .then(data => {
    console.log("Data loaded:", data);
    models = data;
    render(models);
  })
  .catch(error => console.error("Fetch error:", error));

document.getElementById('search').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  const filtered = models.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.provider.toLowerCase().includes(q) ||
    m.use_cases.some(use => use.toLowerCase().includes(q))
  );
  render(filtered);
});

function render(modelList) {
  const container = document.getElementById('results');
  container.innerHTML = modelList.map(model => `
    <div class="card">
      <h2>${model.name}</h2>
      <p><strong>Provider:</strong> ${model.provider}</p>
      <p><strong>Context:</strong> ${model.context_length}</p>
      <p><strong>Cost:</strong> ${model.cost}</p>
      <p><strong>Use Cases:</strong> ${model.use_cases.join(', ')}</p>
      <p><strong>Access:</strong> ${model.access}</p>
    </div>
  `).join('');
}
