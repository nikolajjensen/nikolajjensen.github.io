async function loadFragment(id, url) {
  const response = await fetch(url);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

document.getElementById("content-wrapper").classList.add(
  "container", "custom-container", "d-flex", "justify-content-center", "extra-rounded"
);

Promise.all([
    loadFragment('head', 'components/head.html'),
    loadFragment('header', 'components/header.html'),
    loadFragment('footer', 'components/footer.html')
]);