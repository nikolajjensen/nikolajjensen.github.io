document.getElementById("content-wrapper").classList.add("container", "custom-container", "shadow-lg", "d-flex", "justify-content-center", "extra-rounded");

function loadFragment(id, url) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

loadFragment('head', 'components/head.html');
loadFragment('header', 'components/header.html');
loadFragment('footer', 'components/footer.html');
loadFragment('scripts', 'components/scripts.html');

fetch('config.json') // adjust path as needed
      .then(response => response.json())
      .then(config => {
        document.getElementById('document-title').textContent = config.title;
        document.getElementById('page-title').textContent = config.title;

        return config;
      })
      .then(config => config.sections)
      .then(sections => {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);

        let matchedPage = null;
        let matchedSectionTitle = null;

        for (const section of sections) {
          for (const page of section.pages) {
            if (page.link === currentFile || page.link.endsWith('/' + currentFile)) {
              matchedPage = page;
              matchedSectionTitle = section.title;
              break;
            }
          }
          if (matchedPage) break;
        }

        if (matchedPage) {
          const breadcrumbList = document.querySelector('.breadcrumb');
          const currentItem = document.getElementById('breadcrumb-current');

          // Insert section breadcrumb before the current one
          if (breadcrumbList && currentItem && matchedSectionTitle) {
            const sectionItem = document.createElement('li');
            sectionItem.className = 'breadcrumb-item';
            sectionItem.textContent = matchedSectionTitle;

            breadcrumbList.insertBefore(sectionItem, currentItem);
          }

          // Update final breadcrumb title
          currentItem.textContent = matchedPage.title;
          document.getElementById('subtitle-current').textContent = matchedPage.title;
          document.getElementById('document-title').textContent += (" | " + matchedPage.title);
        }
      })
      .catch(error => {
        console.error('Failed to update breadcrumb:', error);
      });