console.log('js file working')

// Get references to the custom image and file input
const customImage = document.querySelector('.uploadImage');
const fileInput = document.querySelector('.fileInput');

// When the custom image is clicked, trigger the file input
customImage.addEventListener('click', () => {
    fileInput.click();
});

// Handle file selection
fileInput.addEventListener('change', function () {
    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        // You can do something with the selected file here.
        // For example, you can display the image on the custom image container:
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            customImage.src = e.target.result;
        };
        fileReader.readAsDataURL(fileInput.files[0]);
    }
});