/* ==========================================
   Quantum Spintronics Laboratory
   Publications JavaScript
========================================== */

let allPublications = [];
let currentYear = "All";

/* -------------------------
   Load JSON
-------------------------- */

fetch("/quantum-spintronics-lab-v2/data/publications.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Cannot load publications.json");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Loaded publications:", data);

    allPublications = data;

    renderPublications(allPublications);
  })
  .catch((error) => {
    console.error(error);

    document.getElementById("publicationContainer").innerHTML =
      `
      <div style="
        background:#fff;
        padding:30px;
        border-radius:10px;
        margin:30px 0;
        text-align:center;
        color:red;
        font-size:18px;">
        Unable to load publications.
      </div>
      `;
  });

/* -------------------------
   Render Publications
-------------------------- */

function renderPublications(publications) {

  const container = document.getElementById("publicationContainer");

  container.innerHTML = "";

  if (!publications || publications.length === 0) {

    container.innerHTML =
      `
      <div style="
      background:#fff;
      padding:30px;
      border-radius:10px;
      margin:30px 0;
      text-align:center;
      font-size:18px;">
      No publications found.
      </div>
      `;

    return;
  }

  let lastYear = "";

  publications.forEach((pub) => {

    if (pub.year !== lastYear) {

      const heading = document.createElement("h2");

      heading.className = "year-heading";

      heading.textContent = pub.year;

      container.appendChild(heading);

      lastYear = pub.year;
    }

    const card = document.createElement("div");

    card.className = "publication-card";

    const authorText = (pub.authors || "").replace(
      /Braj Bhusan Singh/g,
      "<strong>Braj Bhusan Singh</strong>"
    );

    let doiButton = "";

if (pub.doi && pub.doi.trim() !== "") {

    doiButton =

    `
    <div class="pub-doi">

        <span class="doi-label">

            DOI:

        </span>

        <a

            class="doi-link"

            href="https://doi.org/${pub.doi}"

            target="_blank"

            rel="noopener noreferrer">

            ${pub.doi}

        </a>

    </div>

    `;

}

    let tagsHTML = "";

    if (Array.isArray(pub.tags)) {

      tagsHTML = pub.tags
        .map(tag => `<span>${tag}</span>`)
        .join("");

    }

    card.innerHTML =

      `
      <div class="pub-title">

        ${pub.title || ""}

      </div>

      <div class="pub-authors">

        ${authorText}

      </div>

      <div class="pub-journal">

        <i>${pub.journal || ""}</i>

        ${pub.volume || ""}

        ${pub.pages || ""}

        (${pub.year || ""})

      </div>

      ${doiButton}

      <div class="pub-tags">

        ${tagsHTML}

      </div>

      `;

    container.appendChild(card);

  });

}

/* -------------------------
   Search
-------------------------- */

function searchPublications() {

  const text =
    document
      .getElementById("searchBox")
      .value
      .toLowerCase();

  const filtered = allPublications.filter((pub) => {

    const matchSearch =

      (pub.title || "")
        .toLowerCase()
        .includes(text)

      ||

      (pub.authors || "")
        .toLowerCase()
        .includes(text)

      ||

      (pub.journal || "")
        .toLowerCase()
        .includes(text);

    const matchYear =

      currentYear === "All"

      ||

      String(pub.year) === String(currentYear);

    return matchSearch && matchYear;

  });

  renderPublications(filtered);

}

/* -------------------------
   Year Filter
-------------------------- */

function filterYear(year) {

  currentYear = year;

  searchPublications();

}
