import * as bcrypt from 'bcrypt';

// Example bcrypt hashes
const hash1 = '$2a$10$DuT.6FlTctVthfEh.fydwOj3jtuPeUpD9IcTbmTQZllKxI0PpyP1i';
const hash2 = '$2a$10$DuT.6FlTctVthfEh.fydwOj3jtuPeUpD9IcTbmTQZllKxI0PpyP1i';

// Function to compare two bcrypt hashes
function compareBcryptHashes(hash1, hash2) {
  return bcrypt.compareSync(hash1, hash2);
}

// Usage
if (compareBcryptHashes(hash1, hash2)) {
  console.log('Hashes match!');
} else {
  console.log('Hashes do not match.');
}
