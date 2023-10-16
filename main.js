container = document.getElementById("container");
addUserStory = document.getElementById("addUserStory");
saveButton = document.getElementById("save");
class UserStory {
    constructor(id="", titre="", priorite="", charge="", description="", test="") {
        this.id = id;
        this.titre = titre;
        this.priorite = priorite;
        this.charge = charge;
        this.description = description;
        this.test = test;
        this.htmlElement = this.show();
    }

    show() {
        let pack = document.createElement("div");
        let userStory = document.createElement("div");
        let id = document.createElement("input");
        let titre = document.createElement("input");
        let classification = document.createElement("div");
        let priorite = document.createElement("input");
        let charge = document.createElement("input");
        let description = document.createElement("textarea");
        let test = document.createElement("textarea");
        let button = document.createElement("button");
        let suppButton = document.createElement("button");
        pack.classList.add("pack");
        userStory.classList.add("userStory");
        id.classList.add("id");
        id.value = this.id;
        id.placeholder = "ID";
        titre.classList.add("titre");
        titre.value = this.titre;
        titre.placeholder = "Titre";
        classification.classList.add("classification");
        priorite.classList.add("priorite");
        priorite.value = this.priorite;
        priorite.placeholder = "Priorité";
        charge.classList.add("charge");
        charge.value = this.charge;
        charge.placeholder = "Charge";
        description.classList.add("description");
        description.value = this.description;
        description.placeholder = "Description";
        test.classList.add("test");
        test.style.display = "none";
        test.value = this.test;
        test.placeholder = "Test";
        button.innerHTML = "Retourner"
        suppButton.innerHTML = "Supprimer"
        suppButton.addEventListener("click", () => {
            pack.remove();
            userStories.splice(userStories.indexOf(this), 1);
        });
        pack.appendChild(userStory);
        userStory.appendChild(id);
        userStory.appendChild(titre);
        userStory.appendChild(classification);
        classification.appendChild(priorite);
        classification.appendChild(charge);
        userStory.appendChild(description);
        pack.appendChild(test);
        pack.appendChild(button);
        pack.appendChild(suppButton);
        container.insertBefore(pack, addUserStory);

        /* Events */
        button.addEventListener("click", () => {
            this.reverse();
        });

        id.addEventListener("input", () => {
            this.id = id.value;
        });

        titre.addEventListener("input", () => {
            this.titre = titre.value;
        });

        priorite.addEventListener("input", () => {
            this.priorite = priorite.value;
        });

        charge.addEventListener("input", () => {
            this.charge = charge.value;
        });

        description.addEventListener("input", () => {
            this.description = description.value;
        });

        test.addEventListener("input", () => {
            this.test = test.value;
        });
        return test;
    }

    reverse() {
        if (this.htmlElement.style.display == "none") {
            this.htmlElement.style.display = "block";
        } else {
            this.htmlElement.style.display = "none";
        }
    }
}

let userStories = [];

addUserStory.addEventListener("click", () => {
    let userStory = new UserStory();
    userStories.push(userStory);
});



document.addEventListener("keydown", (e) => {
    if (e.key == "+") {
        let userStory = new UserStory();
        userStories.push(userStory);
    }
    if (e.ctrlKey && e.key == "s") {
        e.preventDefault();
        var jsonString = JSON.stringify(userStories, null, 2);
        var blob = new Blob([jsonString], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'UserStories.json';
        document.body.appendChild(a);  // This line is needed for Firefox
        a.click();
        document.body.removeChild(a);  // This line is needed for Firefox
    }

    if (e.ctrlKey && e.key == "l") {
        e.preventDefault();
        if (fileInput.style.display == "block") {
            fileInput.style.display = "none";
        } else {
            fileInput.style.display = "block";
        }
    }
});

let fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileSelect, false);
saveButton.addEventListener("click", () => {
    var jsonString = JSON.stringify(userStories, null, 2);
    var blob = new Blob([jsonString], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'UserStories.json';
    document.body.appendChild(a);  // This line is needed for Firefox
    a.click();
    document.body.removeChild(a);  // This line is needed for Firefox
});


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
            userStoriesToLoad.forEach(userStory => userStories.push(userStory));
        } catch (e) {
            console.error('Invalid JSON format:', e);
        }
    };
    reader.readAsText(file);
    fileInput.style.display = "none";
}