const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

        const passwordInput = document.getElementById('password');
        const togglePasswordButton = document.getElementById('togglePassword');

        togglePasswordButton.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
const sidebar = document.querySelector("aside");
const maxSidebar = document.querySelector(".max");
const miniSidebar = document.querySelector(".mini");
const roundout = document.querySelector(".roundout");
const maxToolbar = document.querySelector(".max-toolbar");
const logo = document.querySelector(".logo");
const content = document.querySelector(".content");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");

function setDark(val) {
  if (val === "dark") {
    document.documentElement.classList.add("dark");
    moon.classList.add("hidden");
    sun.classList.remove("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    sun.classList.add("hidden");
    moon.classList.remove("hidden");
  }
}

function openNav() {
  if (sidebar.classList.contains("-translate-x-48")) {
    // max sidebar
    sidebar.classList.remove("-translate-x-48");
    sidebar.classList.add("translate-x-none");
    maxSidebar.classList.remove("hidden");
    maxSidebar.classList.add("flex");
    miniSidebar.classList.remove("flex");
    miniSidebar.classList.add("hidden");
    maxToolbar.classList.add("translate-x-0");
    maxToolbar.classList.remove("translate-x-24", "scale-x-0");
    logo.classList.remove("ml-12");
    content.classList.remove("ml-12");
    content.classList.add("ml-12", "md:ml-60");
  } else {
    // mini sidebar
    sidebar.classList.add("-translate-x-48");
    sidebar.classList.remove("translate-x-none");
    maxSidebar.classList.add("hidden");
    maxSidebar.classList.remove("flex");
    miniSidebar.classList.add("flex");
    miniSidebar.classList.remove("hidden");
    maxToolbar.classList.add("translate-x-24", "scale-x-0");
    maxToolbar.classList.remove("translate-x-0");
    logo.classList.add("ml-12");
    content.classList.remove("ml-12", "md:ml-60");
    content.classList.add("ml-12");
  }
}
//afficher les psy

async function fetchPsychologues() {
            const response = await fetch('http://localhost:5000/admin/findallpsy');
            const data = await response.json();
            return data;
        }

        async function displayPsychologues() {
            const psychologues = await fetchPsychologues();

            const tableBody = document.getElementById('psychologues-table');
            tableBody.innerHTML = '';

            psychologues.forEach(psy => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${psy.nom}</td>
                    <td>${psy.email}</td>
                    <td><button onclick="showDetails('${psy._id}')">Voir détails</button></td>
                `;
                tableBody.appendChild(row);
            });
        }

        async function showDetails(psyId) {
            const response = await fetch(`http://localhost:5000/admin/findpsy/${psyId}`);
            const psyDetails = await response.json();

            const detailsDiv = document.getElementById('details');
            detailsDiv.innerHTML = `
                <h2>Détails de ${psyDetails.nom}</h2>
                <p>Email: ${psyDetails.email}</p>
                <p>Autres informations: ${psyDetails.informations}</p>
                <button onclick="approvePsy('${psyDetails._id}')">Approuver</button>
                <button onclick="rejectPsy('${psyDetails._id}')">Rejeter</button>
            `;
        }

        async function approvePsy(psyId) {
            // Logique pour approuver le psychologue
            // Vous pouvez envoyer une requête POST à votre API pour mettre à jour le statut du psychologue, par exemple.
        }

        async function rejectPsy(psyId) {
            // Logique pour rejeter le psychologue
            // Vous pouvez envoyer une requête DELETE à votre API pour supprimer le psychologue, par exemple.
        }

        // Au chargement de la page, afficher les psychologues
        displayPsychologues();
    
    
