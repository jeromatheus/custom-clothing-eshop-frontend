// Record<string, string> asegura que es un objeto clave-valor de strings
export const COLOR_MAP: Record<string, string> = {
  Black: "#000000",
  White: "#FFFFFF",
  Gray: "#808080",
  Olive: "#556B2F",
  Red: "#FF0000",
  Blue: "#0000FF",
  Navy: "#000080",
  Beige: "#F5F5DC",
  Brown: "#8B4513",
};

// Helper para obtener el hex o devolver el valor original si no existe
export const getColorHex = (colorName: string): string => {
  return COLOR_MAP[colorName] || colorName;
};