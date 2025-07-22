document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("dogs-container");

    try {
        const response = await fetch("./assets/data/dogs.json");
        const dogs = await response.json();

        dogs.forEach(dog => {
            const card = document.createElement("div");
            card.className = "tw-bg-white tw-rounded-xl tw-shadow-md tw-p-4 tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-2";

            card.innerHTML = `
                <img src="${dog.img}" alt="${dog.nome}" class="tw-rounded-lg tw-object-cover tw-w-full tw-h-[250px]" />
                <h2 class="tw-text-xl tw-font-semibold">${dog.nome}</h2>
                <p class="tw-text-sm tw-text-gray-600">${dog.eta} · ${dog.razza}</p>
                <p class="tw-text-sm">${dog.descrizione}</p>
                <button class="tw-mt-2 tw-bg-blue-500 tw-text-white tw-px-4 tw-py-1 tw-rounded hover:tw-bg-blue-600">
                    Contattaci
                </button>
            `;
            container.appendChild(card);
        });

    } catch (err) {
        console.error("Errore nel caricamento dei dati:", err);
        container.innerHTML = "<p class='tw-text-red-500'>Impossibile caricare i cani al momento.</p>";
    }
});
