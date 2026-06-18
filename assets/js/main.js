/* ==========================================
   Quantum Spintronics Laboratory (Q-SPIN LAB)
   Main JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Highlight current navigation link

    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll("nav a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === current || (current === "" && href === "index.html")) {

            link.classList.add("active");

        }

    });

    // Fade-in animation

    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0px)";

            }

        });

    }, {

        threshold: 0.1

    });

    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        card.style.transition = "all 0.8s ease";

        observer.observe(card);

    });

});

// Scroll to top button

const scrollButton = document.createElement("button");

scrollButton.innerHTML = "↑";

scrollButton.id = "topButton";

document.body.appendChild(scrollButton);

scrollButton.style.position = "fixed";
scrollButton.style.bottom = "30px";
scrollButton.style.right = "30px";
scrollButton.style.width = "50px";
scrollButton.style.height = "50px";
scrollButton.style.border = "none";
scrollButton.style.borderRadius = "50%";
scrollButton.style.background = "#002147";
scrollButton.style.color = "white";
scrollButton.style.fontSize = "22px";
scrollButton.style.cursor = "pointer";
scrollButton.style.display = "none";
scrollButton.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
scrollButton.style.zIndex = "999";

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        scrollButton.style.display = "block";

    } else {

        scrollButton.style.display = "none";

    }

});

scrollButton.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

