

Promise.all([
    loadFragment('head', 'components/head.html'),
    loadFragment('header', 'components/header.html'),
    loadFragment('footer', 'components/footer.html')
]);