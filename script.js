// Create a Post
const form  = document.getElementById("tutorialForm")
form.addEventListener("submit", postData)

async function postData (event){
    event.preventDefault()

    const form = event.target;

    const formData = new FormData(form)

    const url = "http://localhost:3000/api/tutorial"

    const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        published: formData.get("published") === "true"
    }

    try{
        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error("Failed to post data")
        }
        const responseData = await response.json()
        console.log(responseData)

        location.reload()
    }
    catch(error){
        console.log("Erroe", error.message)
    }
}


// Retrive all data published

let currentPage;
let totalPages;

fetchData()

function fetchData (page=0){
    fetch(`http://localhost:3000/api/tutorial/published?page=${page}`)
    .then(response => {
        if(!response.ok){
            throw new Error("Failed to get data")
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        currentPage = data.currentPage;
        totalPages = data.totalPages
        displayTutorials(data.tutorials)
        displayPagination()
    })
    .catch(error => {
        console.log("Error", error.message)
    })
}


function displayTutorials(tutorials){
    const tutorialList = document.getElementById("tutorialList")
    tutorialList.innerHTML = ""

    tutorials.forEach(tutorial => {
        const tutorialItem = document.createElement("div")
        tutorialItem.classList.add("tutorial-item")
        tutorialItem.setAttribute("data-id", tutorial.id)

        const titleElement = document.createElement('h2')
        titleElement.textContent = tutorial.title

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = tutorial.description;
    
        const publishedElement = document.createElement('p');
        publishedElement.textContent = tutorial.published ? 'Published' : 'Not Published';

        const deleteElement = document.createElement('button')
        deleteElement.textContent = 'Delete';

        const editElement = document.createElement('button')
        editElement.textContent = 'Edit';

        tutorialItem.appendChild(titleElement);
        tutorialItem.appendChild(descriptionElement);
        tutorialItem.appendChild(publishedElement);
        tutorialItem.appendChild(deleteElement); // Append the delete button
        tutorialItem.appendChild(editElement); // Append the edit button
    
        tutorialList.appendChild(tutorialItem);


        editElement.addEventListener("click", () => {
            const tutorialId = tutorialItem.getAttribute('data-id')
            populateForm(tutorialId)

            updateForm.setAttribute('data-id', tutorialId)

            // Make form visible
            const formElement = document.getElementById("update-tutorialForm")
            formElement.style.display = "flex"
        })

        deleteElement.addEventListener('click', ()=>{
            const tutorialId = tutorialItem.getAttribute('data-id')

            deletePost(tutorialId);
        })

    })
}

function displayPagination(){
    const pagination = document.getElementById("pagination")
    pagination.innerHTML = ""

    const currentPageElement = document.createElement('span');
    currentPageElement.textContent = `Current Page: ${currentPage + 1}`;
  
    const totalPagesElement = document.createElement('span');
    totalPagesElement.textContent = `Total Pages: ${totalPages}`;

  
    pagination.appendChild(currentPageElement);
    pagination.appendChild(totalPagesElement);

    for(let page = 0; page < totalPages; page++){
        const pageButton = document.createElement('button')
        pageButton.textContent = page + 1
        pageButton.addEventListener("click", () => {
            fetchData(page)
        })
        pagination.appendChild(pageButton)
    }
}


// Retrieve all data

fetchAllData()

function fetchAllData (page = 0){
    fetch(`http://localhost:3000/api/tutorial?page=${page}`)
    .then(response => {
        if(!response.ok){
            throw new Error("Failed to get data")
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        currentPage = data.currentPage;
        totalPages = data.totalPages
        displayAllTutorials(data.tutorials)
        displayAllPagination()
    })
    .catch(error => {
        console.log("Error", error.message)
    })
}



function displayAllTutorials(tutorials){
    const tutorialList = document.getElementById("tutorialAllList")
    tutorialList.innerHTML = ""

    tutorials.forEach(tutorial => {
        const tutorialItem = document.createElement("div")
        tutorialItem.classList.add("tutorial-item")
        tutorialItem.setAttribute("data-id", tutorial.id)

        const titleElement = document.createElement('h2')
        titleElement.textContent = tutorial.title

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = tutorial.description;
    
        const publishedElement = document.createElement('p');
        publishedElement.textContent = tutorial.published ? 'Published' : 'Not Published';

        const deleteElement = document.createElement('button')
        deleteElement.textContent = 'Delete';

        const editElement = document.createElement('button')
        editElement.textContent = 'Edit';

        tutorialItem.appendChild(titleElement);
        tutorialItem.appendChild(descriptionElement);
        tutorialItem.appendChild(publishedElement);
        tutorialItem.appendChild(deleteElement); // Append the delete button
        tutorialItem.appendChild(editElement); // Append the edit button
    
        tutorialList.appendChild(tutorialItem);

        editElement.addEventListener("click", () => {
            const tutorialId = tutorialItem.getAttribute('data-id')
            populateForm(tutorialId)

            updateForm.setAttribute('data-id', tutorialId)

            // Make form visible
            const formElement = document.getElementById("update-tutorialForm")
            formElement.style.display = "flex"
        })
        deleteElement.addEventListener('click', ()=>{
            const tutorialId = tutorialItem.getAttribute('data-id')

            deletePost(tutorialId);
        })
    })
}

function displayAllPagination(){
    const pagination = document.getElementById("paginationAll")
    pagination.innerHTML = ""

    const currentPageElement = document.createElement('span');
    currentPageElement.textContent = `Current Page: ${currentPage + 1}`;
  
    const totalPagesElement = document.createElement('span');
    totalPagesElement.textContent = `Total Pages: ${totalPages}`;

  
    pagination.appendChild(currentPageElement);
    pagination.appendChild(totalPagesElement);

    for(let page = 0; page < totalPages; page++){
        const pageButton = document.createElement('button')
        pageButton.textContent = page + 1
        pageButton.addEventListener("click", () => {
            fetchAllData(page)
        })
        pagination.appendChild(pageButton)
    }
}


// Update Data by its Id


function populateForm(tutorialId){
    const form = document.getElementById("update-tutorialForm")
    const titleInput = form.querySelector('input[name="update-title"]');
    const descriptionTextarea = form.querySelector('textarea[name="update-description"]');
    const publishedCheckbox = form.querySelector('input[name="update-published"]');

    // Fetch the tutorial data on the tutorial ID
    fetch(`http://localhost:3000/api/tutorial/${tutorialId}`)
    .then(response => {
        if(!response.ok){
            throw new Error("Failed to get data")
        }
        return response.json()
    })
    .then(data => {
        titleInput.value = data.title;
        descriptionTextarea.value = data.description;
        publishedCheckbox.checked = data.published
    })
    .catch(error => {
        console.log("Error", error.message)
    })
}

// Event listener for the form submit

const updateForm = document.getElementById('update-tutorialForm')
updateForm.addEventListener('submit', updateData)

async function updateData(event){
    event.preventDefault()

    const tutorialId = event.target.getAttribute('data-id')
    const form = document.getElementById('update-tutorialForm')

    const formData = {
        title: form.elements['update-title'].value,
         description: form.elements['update-description'].value,
          published: form.elements['update-published'].checked
    }

    const url = `http://localhost:3000/api/tutorial/${tutorialId}`

    try{
        const response = await fetch(url, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error("Failed to post data")
        }
        const responseData = await response.json()
        console.log(responseData)

        form.reset()

        fetchData(currentPage)
        location.reload()
    }
    catch(error){
        console.log(error.message)
        }
}


// Deleting a data

async function deletePost(tutorialId){
    const url = `http://localhost:3000/api/tutorial/${tutorialId}`

    try{
        const response = await fetch(url, {
            method: "DELETE"
        })
        if(!response.ok){
            throw new Error("Failed to delete data")
        }
        location.reload()
    }
    catch(error){
        console.log('Error', error.message)
    }
}