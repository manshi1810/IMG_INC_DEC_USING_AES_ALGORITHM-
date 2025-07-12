let imageBase64 = "";
let encryptedData = "";

// Handle image file input
document.getElementById("imageInput").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    imageBase64 = reader.result;
    alert("Image loaded successfully.");
  };
  reader.readAsDataURL(file);
});

// Encrypt the image
function encryptImage() {
  const key = document.getElementById("keyInput").value;

  if (!key || !imageBase64) {
    alert("Please enter a key and select an image.");
    return;
  }

  encryptedData = CryptoJS.AES.encrypt(imageBase64, key).toString();
  document.getElementById("encryptedOutput").value = encryptedData;
}

// Decrypt the image and show it
function decryptImage() {
  const key = document.getElementById("decryptKeyInput").value;
  const downloadLink = document.getElementById("downloadLink");
  const imageElement = document.getElementById("decryptedImage");

  if (!key || !encryptedData) {
    alert("Please enter the decryption key and ensure encrypted data is available.");
    return;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedBase64 = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedBase64.startsWith("data:image")) {
      throw new Error("Invalid decrypted data");
    }

    imageElement.src = decryptedBase64;
    downloadLink.href = decryptedBase64;
    downloadLink.classList.remove("d-none");

  } catch (error) {
    alert("Decryption failed. Check the key and try again.");
  }
}
