document.querySelectorAll('details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    const container = detail.querySelector('.video-container');

    if (detail.open) {
      if (!container.querySelector('iframe')) {
        const src = container.dataset.src;
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.width = 560;
        iframe.height = 315;
        iframe.title = "Filme";
        iframe.allowFullscreen = true;
        iframe.style.border = "none"; // substitui frameBorder
        container.appendChild(iframe);
      }
    } else {
      // Remove o iframe ao fechar para liberar memória
      container.innerHTML = '';
    }
  });
});
