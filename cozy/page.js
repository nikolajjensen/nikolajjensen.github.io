new Promise(async () => {
  // Get a reference to the modal element
  const myModalEl = document.getElementById('myModal');

  // Create a Bootstrap modal instance
  const myModal = new bootstrap.Modal(myModalEl);

  let workCompleted = false;
  let shownModal = false;

  try {
    // Show the modal
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 750));
      if (!workCompleted) {
        myModal.show();
        shownModal = true;
      }
    })();

    document.getElementById("year").innerHTML = new Date().getFullYear();

    const response = await fetch('config.json');
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

    //await new Promise(r => setTimeout(r, 450));
    workCompleted = true;
  } finally {
    if (shownModal) {
      myModalEl.classList.add("fade");
      myModal.hide();
    }
  }
});
