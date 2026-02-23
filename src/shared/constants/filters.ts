export const MODEL_OPTIONS = [
  { 
    id: "male", 
    name: "Hombre", 
    heightInfo: "185",
    sizeInfo: "L",
  },
  { 
    id: "female", 
    name: "Mujer", 
    heightInfo: "165",
    sizeInfo: "M",
  }
];

export const CATEGORIES = {
  id: "category",
  label: "Categoría",
  options: [
    { value: "Remera Manga Larga", label: "Remera Manga Larga" },
    { value: "Remera Manga Corta", label: "Remera Manga Corta" },
    { value: "Musculosa", label: "Musculosa" },
    { value: "Chombas", label: "Chombas" },
  ],
};

export const SIZES = {
  id: "size",
  label: "Talle",
  type: "size",
  options: [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ],
};

export const COLORS = {
  id: "color",
  label: "Color",
  type: "color",
  options: [
    { value: "Black", label: "Negro", hex: "#000000" },
    { value: "White", label: "Blanco", hex: "#FFFFFF" },
    { value: "Gray", label: "Gris", hex: "#C0C0C0" },
    { value: "Olive", label: "Oliva", hex: "#808000" },
    { value: "Red", label: "Rojo", hex: "#FF0000" },
  ],
};

export const MATERIALS = {
  id: "material",
  label: "Material",
  type: "button",
  options: [
    { value: "Cotton", label: "Algodón" },
    { value: "Polyester", label: "Poliéster" },
    { value: "Silk", label: "Seda" },
    // { value: "Morley", label: "Morley" },
    // { value: "Waffle", label: "Waffle" },
    // { value: "Spandex", label: "Spandex" },
  ],
};

export const FIT_TYPES = {
  id: "fitType",
  label: "Calce",
  type: "button",
  options: [
    { value: "Regular", label: "Regular" },
    { value: "Slim", label: "Slim" },
    { value: "Oversize", label: "Oversize" },
  ],
};

export const NECK_TYPES = {
  id: "neckType",
  label: "Cuello",
  type: "button",
  options: [
    { value: "CrewNeck", label: "Redondo" },
    { value: "VNeck", label: "En V" },
    { value: "Polo", label: "Polo" },
  ],
};

export const POLO_TYPES = {
  id: "type",
  label: "Prenda",
  type: "button",
  options: [
    { value: "Slip", label: "Slip" },
    { value: "Medio-Bóxer", label: "Medio-Bóxer" },
    { value: "Bóxer", label: "Bóxer" },
  ],
};

export const FILTER_GROUPS = {
  category: CATEGORIES,
  size: SIZES,
  color: COLORS,
  material: MATERIALS,
  fitType: FIT_TYPES,
  neckType: NECK_TYPES,
  type: POLO_TYPES,
};

export const SHIRT_FORM_CONFIG = {
  title: "Remera Manga Corta",
  groups: [MATERIALS, NECK_TYPES, FIT_TYPES, COLORS, SIZES],
};