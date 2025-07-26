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

    let pages = [];
    for (const section of config_1.sections) {
      for (const page of section.pages) {
        if (page.link) {
          pages.push([section.title, page]);
        }
      }
    }

    let prevPage = null;
    let nextPage = null;
    let currentPage = null;
    let currentSectionTitle = null;

    for (let i = 0; i < pages.length; i++) {
      let p = pages[i];

      if (p[1].link === currentFile || p[1].link.endsWith('/' + currentFile)) {
        currentSectionTitle = p[0];
        currentPage = p[1];
        if (i != 0) {
          prevPage = pages[i - 1][1];
        }
        if (i < pages.length - 1) {
          nextPage = pages[i + 1][1];
        }
        break;
      }
    }

    if (currentPage) {
      const breadcrumbList = document.querySelector('.breadcrumb');
      const currentItem = document.getElementById('breadcrumb-current');

      if (breadcrumbList && currentItem && currentSectionTitle) {
        const sectionItem = document.createElement('li');
        sectionItem.className = 'breadcrumb-item';
        sectionItem.textContent = currentSectionTitle;
        breadcrumbList.insertBefore(sectionItem, currentItem);
      }

      currentItem.textContent = currentPage.title;
      document.getElementById('subtitle-current').textContent = currentPage.title;
      document.getElementById('document-title').textContent += (" | " + currentPage.title);

      console.log("NEXT ", nextPage ? nextPage.title : "-");
      console.log("PREV ", prevPage ? prevPage.title : "-");

      const navBtnsDiv = document.getElementById('nav-btns');
      if (prevPage || nextPage) {
        const btnGroup = document.createElement('div');
        btnGroup.className = "btn-group";
        btnGroup.setAttribute("role", "group");
        btnGroup.setAttribute("aria-label", "Basic outlined example");

        if (prevPage) {
          const prevBtn = document.createElement('button');
          prevBtn.type = "button";
          prevBtn.className = "btn btn-outline-primary";
          prevBtn.id = "prev-btn";
          prevBtn.textContent = ("← " + prevPage.title);
          prevBtn.onclick = () => window.location.href = prevPage.link;
          btnGroup.appendChild(prevBtn);
        }

        if (nextPage) {
          const nextBtn = document.createElement('button');
          nextBtn.type = "button";
          nextBtn.className = "btn btn-outline-primary";
          nextBtn.id = "next-btn";
          nextBtn.textContent = (nextPage.title + " →");
          nextBtn.onclick = () => window.location.href = nextPage.link;
          btnGroup.appendChild(nextBtn);
        }

        navBtnsDiv.appendChild(btnGroup);
      }
    }

    //await new Promise(r => setTimeout(r, 450));
    workCompleted = true;
  } finally {
    if (shownModal || !workCompleted) {
      workCompleted = true;
      myModalEl.classList.add("fade");
      myModal.hide();
    }
  }
});
