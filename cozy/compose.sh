#!/bin/bash

# Check for exactly one argument: the target subfolder
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 path/to/subfolder"
  exit 1
fi

INPUT_SUBDIR="$(realpath "$1")"

# Ensure the input is a directory
if [ ! -d "$INPUT_SUBDIR" ]; then
  echo "Error: '$INPUT_SUBDIR' is not a directory"
  exit 1
fi

# Compute the output directory (parent of the subfolder)
OUTPUT_DIR="$(dirname "$INPUT_SUBDIR")"

echo "Searching in: $INPUT_SUBDIR"
echo "Outputting to: $OUTPUT_DIR"

# Find all HTML files in the subdirectory (recursive)
find "$INPUT_SUBDIR" -type f -name "*.html" | while read -r INPUT_FILE; do
  FILE_NAME="$(basename "$INPUT_FILE")"
  OUTPUT_FILE="$OUTPUT_DIR/$FILE_NAME"

  echo "Processing: $INPUT_FILE → $OUTPUT_FILE"

  {
    cat <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title id="document-title"></title>

  <!-- Bootstrap core CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />

  <link href="../../prism/prism-vs.css" rel="stylesheet" />

  <!-- Custom styles for this template -->
  <link href="../../style.css" rel="stylesheet">
</head>

<div class="modal" id="myModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog fit-width modal-dialog-centered">
    <div class="modal-content d-flex justify-content-center align-items-center p-3">
      <div class="spinner-border text-secondary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</div>

<body>
  <main role="main" class="container custom-container d-flex justify-content-center extra-rounded">
    <div class="col">
      <div class="col h-pad d-flex justify-content-center">
        <div class="col d-flex align-items-center">
          <div>
            <h3 id="page-title" class="pb-0 mb-0">Cozy Mk IV</h3>
            <h1 class="header-name pt-0"><strong id="subtitle-current">...</strong></h1>
            <nav
              style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);"
              aria-label="breadcrumb">
              <ol class="breadcrumb mb-0 mt-1">
                <li class="breadcrumb-item"><a href="/cozy/overview.html">Overview</a></li>
                <!-- Section breadcrumb will be inserted here -->
                <li id="breadcrumb-current" class="breadcrumb-item active" aria-current="page">...</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <!-- PAGE CONTENT -->
EOF

    cat "$INPUT_FILE"

    cat <<EOF

      <!-- PAGE CONTENT -->

      <div class="col h-pad">
        <div class="d-flex justify-content-center">
          <div id="nav-btns"></div>
        </div>
      </div>

      <div class="col h-pad">
        <hr class="solid">
      </div>
      <div class="col">
        <div class="d-flex justify-content-center">
          <a href="https://github.com/nikolajjensen" target="_blank" class=""><i
              class="contact-icon fab fa-github fa-2x"></i></a>
          <a href="https://www.linkedin.com/in/nikolaj-banke-jensen-b77b721bb" target="_blank" class=""><i
              class="contact-icon fab fa-linkedin fa-2x"></i></a>
          <a href="mailto:hello@nikolajjensen.com" class=""><i class="contact-icon fas fa-envelope fa-2x"></i></a>
        </div>
      </div>

      <div class="col">
        <div class="d-flex justify-content-center">
          <p class="text-secondary"><small><a href="https://www.nikolajjensen.com">nikolajjensen.com</a> &copy;
              Nikolaj
              Banke Jensen <span id="year"></span></small></p>
        </div>
      </div>
    </div>
  </main>
</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="../prism/prism.js"></script>

<script src="./page.js"></script>

</html>
EOF
  } >"$OUTPUT_FILE"
done

echo "Done."
