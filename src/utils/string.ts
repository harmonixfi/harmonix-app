export const maskAddress = (address: string) => {
  // Check if the address is valid
  if (!address || address.length < 10) {
    return 'Invalid address';
  }

  // Extract the first few characters
  const startPart = address.substring(0, 5);

  // Extract the last few characters
  const endPart = address.substring(address.length - 4);

  // Create the masked address
  const maskedAddress = `${startPart}...${endPart}`;

  return maskedAddress;
};
