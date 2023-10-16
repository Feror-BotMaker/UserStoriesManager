class UserStory extends HTMLElement {
    userStory; // Conteneur de la User Story (div)
    id; // Champ ID (input)
    titre; // Champ Titre (input)
    classification; // Conteneur de la classification (div)
    priorite; // Champ Priorité (input)
    charge; // Champ Charge (input)
    description; // Champ Description (textarea)
    test; // Champ Test (textarea)
    button; // Bouton Retourner (button)
    suppButton; // Bouton Supprimer (button)

    constructor(id="", titre="", priorite="", charge="", description="", test="") {
        super();
        // Construction de la structure HTML
        this.userStory = document.createElement("div");
        this.id = document.createElement("input");
        this.titre = document.createElement("input");
        this.classification = document.createElement("div");
        this.priorite = document.createElement("input");
        this.charge = document.createElement("input");
        this.description = document.createElement("textarea");
        this.test = document.createElement("textarea");
        this.button = document.createElement("button");
        this.suppButton = document.createElement("button");

        // Attribution des classes CSS
        this.classList.add("pack");
        this.userStory.classList.add("userStory");
        this.id.classList.add("id");
        this.titre.classList.add("titre");
        this.classification.classList.add("classification");
        this.priorite.classList.add("priorite");
        this.charge.classList.add("charge");
        this.description.classList.add("description");
        this.test.classList.add("test");

        // Attribution des valeurs
        this.id.value = id;
        this.id.placeholder = "ID";
        this.titre.value = titre;
        this.titre.placeholder = "Titre";
        this.priorite.value = priorite;
        this.priorite.placeholder = "Priorité";
        this.charge.value = charge;
        this.charge.placeholder = "Charge";
        this.description.value = description;
        this.description.placeholder = "Description";
        this.test.value = test;
        this.test.placeholder = "Test";
        this.test.style.display = "none";
        this.button.innerHTML = "Retourner"
        this.suppButton.innerHTML = "Supprimer"

        // Ajout des éléments dans le DOM
        this.appendChild(this.userStory);
        this.userStory.appendChild(this.id);
        this.userStory.appendChild(this.titre);
        this.userStory.appendChild(this.classification);
        this.classification.appendChild(this.priorite);
        this.classification.appendChild(this.charge);
        this.userStory.appendChild(this.description);
        this.appendChild(this.test);
        this.appendChild(this.button);
        this.appendChild(this.suppButton);
        
        // Gestion des événements
        this.button.addEventListener("click", () => {
            this.reverse();
        });

        this.suppButton.addEventListener("click", () => {
            this.remove();
            delete this;
        });
    }

    reverse() {
        if (this.test.style.display == "none") {
            this.test.style.display = "block";
        } else {
            this.test.style.display = "none";
        }
    }

    toJson() {
        return {
            'id':this.id.value,
            'titre':this.titre.value,
            'priorite':this.priorite.value,
            'charge':this.charge.value,
            'description':this.description.value,
            'test':this.test.value
        }
    }
} window.customElements.define("user-story", UserStory);

let container = document.getElementById("container");
let addUserStory = document.getElementById("addUserStory");
let saveButton = document.getElementById("save");
let fileInput = document.getElementById('fileInput');

addUserStory.addEventListener("click", () => {
    container.insertBefore(new UserStory(), addUserStory);
});

document.addEventListener("keydown", (e) => {
    if (e.key == "s" && e.ctrlKey) {
        save();
    } else if (e.key == "+" && e.ctrlKey) {
        container.appendChild(new UserStory());
    }
});

saveButton.addEventListener("click", () => {
    save();
});

fileInput.addEventListener('change', handleFileSelect, false);

function save() {
    let userStoriesToSave = [];
    for (userStory of document.getElementsByTagName("user-story")) {
        userStoriesToSave.push(userStory.toJson());
    }
    let data = JSON.stringify(userStoriesToSave);
    var blob = new Blob([data], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'UserStories.json';
    document.body.appendChild(a);  // This line is needed for Firefox
    a.click();
    document.body.removeChild(a);  // This line is needed for Firefox
}

function handleFileSelect(event) {
    var file = event.target.files[0];
    if (!file) {
        console.log('No file selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
        var fileContent = event.target.result;
        try {
            var parsedData = JSON.parse(fileContent);
            var userStoriesToLoad = parsedData.map(item => new UserStory(item.id, item.titre, item.priorite, item.charge, item.description, item.test));
            console.log(userStoriesToLoad);  // Output the array of UserStory instances to the console
            userStoriesToLoad.forEach(userStory => container.insertBefore(userStory, addUserStory));
        } catch (e) {
            console.error('Invalid JSON format:', e);
        }
    };
    reader.readAsText(file);
    fileInput.style.display = "none";
}