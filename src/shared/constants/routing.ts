export const BREADCRUMB_ITEMS = [
  { label: "Inicio", path: "/" },
  { label: "Productos", path: "/productos" },
  { label: "Remeras Mangas Largas" },
];

export const ROUTES = [
  { label: "Inicio", to: "/#inicio", subsections: [] },
  {
    label: "Productos",
    to: "/#categorias",
    subsections: [
      { label: "Remeras Mangas Largas", to: "/productos/mangas_largas" },
      { label: "Remeras Mangas Cortas", to: "/productos/mangas_cortas" },
      { label: "Musculosas", to: "/productos/musculosas" },
      { label: "Ropa Interior", to: "/productos/ropa-interior" },
      { label: "Todos", to: "/productos" },
    ],
  },
  { label: "Nosotros", to: "/#nosotros", subsections: [] },
  {
    label: "Ayuda",
    to: "/ayuda",
    subsections: [
      { label: "Tiempos de Entrega", to: "/ayuda#entregas" },
      { label: "Política de Devolución", to: "/ayuda#cambios" },
      { label: "Contacto", to: "/ayuda#contacto" },
    ],
  },
];
