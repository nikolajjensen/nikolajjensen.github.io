function loadFragment(id, url) {
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

Promise.all([
  loadFragment('head', 'components/head.html'),
  loadFragment('header', 'components/header.html'),
  loadFragment('footer', 'components/footer.html'),
  loadFragment('scripts', 'components/scripts.html'),
]).then(async () => {
  document.getElementById("content-wrapper").classList.add(
    "container", "custom-container", "d-flex", "justify-content-center", "extra-rounded"
  );

  const response = await fetch('config.json') // adjust path as needed
    ;
  const config = await response.json();
  document.getElementById('document-title').textContent = config.title;
  document.getElementById('page-title').textContent = config.title;
  const config_1 = config;
  const currentPath = window.location.pathname;
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  let matchedPage = null;
  let matchedSectionTitle = null;
  for (const section of config_1.sections) {
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

    if (breadcrumbList && currentItem && matchedSectionTitle) {
      const sectionItem = document.createElement('li');
      sectionItem.className = 'breadcrumb-item';
      sectionItem.textContent = matchedSectionTitle;
      breadcrumbList.insertBefore(sectionItem, currentItem);
    }

    currentItem.textContent = matchedPage.title;
    document.getElementById('subtitle-current').textContent = matchedPage.title;
    document.getElementById('document-title').textContent += (" | " + matchedPage.title);
  }
}).catch(error => {
  console.error('Error loading layout or page data:', error);
});
