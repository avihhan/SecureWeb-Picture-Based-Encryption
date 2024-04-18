// Function to encrypt text using a key
function encrypt(text, key) {
  let encryptedText = "";
  for (let i = 0; i < text.length; i++) {
    // Convert character to ASCII value and add corresponding key character's ASCII value
    // console.log("Ascii of original char " + i + "_" + text.charCodeAt(i));
    // console.log("key_addition: " + i + "_" + key.charCodeAt(i % key.length));
    let encryptedCharCode = text.charCodeAt(i) + key.charCodeAt(i % key.length);
    console.log("ecc: " + i + "_" + encryptedCharCode);
    // Append encrypted character to the encrypted text string
    encryptedText += String.fromCharCode(encryptedCharCode);
  }
  return encryptedText;
}

// Function to decrypt text using a key
function decrypt(encryptedText, key) {
  let decryptedText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    // Subtract corresponding key character's ASCII value from encrypted character's ASCII value
    let decryptedCharCode =
      encryptedText.charCodeAt(i) - key.charCodeAt(i % key.length);
    // Append decrypted character to the decrypted text string
    decryptedText += String.fromCharCode(decryptedCharCode);
  }
  return decryptedText;
}

// Example usage
const plaintext = "ÔÔÔÔ";
const key = "secret";

// Encrypt the plaintext
const encrypted = encrypt(plaintext, key);
console.log("Encrypted:", encrypted);

// Decrypt the encrypted text
const decrypted = decrypt(encrypted, key);
console.log("Decrypted:", decrypted);
