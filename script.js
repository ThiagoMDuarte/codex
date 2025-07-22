document.addEventListener("DOMContentLoaded", () => {
  const allDetails = document.querySelectorAll("details");

  allDetails.forEach((details) => {
    details.addEventListener("toggle", () => {
      if (details.open) {
        // Força o fechamento de outros details do mesmo contexto
        allDetails.forEach((other) => {
          if (other !== details) {
            const detailsContext = getDetailContext(details);
            const otherContext = getDetailContext(other);
            
            if (detailsContext === otherContext) {
              // Força o fechamento completo
              other.open = false;
              other.removeAttribute('open');
              
              // Remove qualquer iframe que possa existir
              const otherVideoContainer = other.querySelector(".video-container");
              if (otherVideoContainer) {
                otherVideoContainer.innerHTML = "";
              }
            }
          }
        });
        
        // Carrega o iframe do details atual se tiver video-container
        loadVideoIfNeeded(details);
      } else {
        // Remove iframe ao fechar
        const videoContainer = details.querySelector(".video-container");
        if (videoContainer) {
          videoContainer.innerHTML = "";
        }
      }
    });
  });

  function loadVideoIfNeeded(details) {
    const videoContainer = details.querySelector(".video-container");
    if (videoContainer && !videoContainer.querySelector("iframe")) {
      const src = videoContainer.getAttribute("data-src");
      if (src) {
        const finalSrc = src.replace("/d/", "/e/");
        const iframe = document.createElement("iframe");
        iframe.src = finalSrc;
        iframe.width = "100%";
        iframe.height = "480";
        iframe.allowFullscreen = true;
        videoContainer.appendChild(iframe);
      }
    }
  }

  function getDetailContext(detail) {
    // Verifica se o details está dentro de outro details (episódio)
    const parentDetail = detail.parentElement.closest("details");
    
    if (parentDetail) {
      // É um episódio - retorna o ID único baseado no texto da série pai
      const parentSummary = parentDetail.querySelector("summary");
      const parentText = parentSummary ? parentSummary.textContent.trim() : "";
      return 'episode-of-' + parentText;
    } else {
      // É uma série/filme principal
      // Verifica se tem episódios filhos
      const hasChildDetails = detail.querySelector("details");
      if (hasChildDetails) {
        return 'series-main'; // Séries com episódios
      } else {
        return 'movie-main';  // Filmes ou séries sem episódios expandidos
      }
    }
  }
});