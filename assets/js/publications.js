javascript
/* ==========================================
   Quantum Spintronics Laboratory
   Publications JavaScript
========================================== */

let allPublications = [];
let currentYear = "All";

/* Load JSON */

fetch("/quantum-spintronics-lab-v2/data/publications.json")
    .then(response => response.json())
    .then(data => {

        allPublications = data;

        renderPublications(data);

    });

/* Render Publications */

function renderPublications(publications) {

    const container = document.getElementById("publicationContainer");

    container.innerHTML = "";

    let lastYear = "";

    publications.forEach(pub => {

        if (pub.year !== lastYear) {

            const yearHeading = document.createElement("h2");

            yearHeading.className = "year-heading";

            yearHeading.textContent = pub.year;

            container.appendChild(yearHeading);

            lastYear = pub.year;

        }

        const card = document.createElement("div");

        card.className = "publication-card";

        let doiButton = "";

        if (pub.doi !== "") {

            doiButton =

            `<a class="pub-doi"

                href="https://doi.org/${pub.doi}"

                target="_blank">

                View DOI

             </a>`;

        }

        let authorText = pub.authors.replace(

            /Braj Bhusan Singh/g,

            "<strong>Braj Bhusan Singh</strong>"

        );

        card.innerHTML = `

            <div class="pub-title">

                ${pub.title}

            </div>

            <div class="pub-authors">

                ${authorText}

            </div>

            <div class="pub-journal">

                <i>${pub.journal}</i>

                ${pub.volume},

                ${pub.pages}

                (${pub.year})

            </div>

            ${doiButton}

            <div class="pub-tags">

                ${pub.tags.map(tag =>

                    `<span>${tag}</span>`).join("")}

            </div>

        `;

        container.appendChild(card);

    });

}

/* Search */

function searchPublications() {

    const text =

        document.getElementById("searchBox")

        .value

        .toLowerCase();

    const filtered = allPublications.filter(pub => {

        const matchSearch =

            pub.title.toLowerCase().includes(text)

            ||

            pub.authors.toLowerCase().includes(text)

            ||

            pub.journal.toLowerCase().includes(text);

        const matchYear =

            currentYear === "All"

            ||

            pub.year == currentYear;

        return matchSearch && matchYear;

    });

    renderPublications(filtered);

}

/* Year Filter */

function filterYear(year) {

    currentYear = year;

    searchPublications();

}

