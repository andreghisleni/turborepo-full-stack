export function removeCharacters(str: string) {
  // Remove caracteres acentuados
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}
