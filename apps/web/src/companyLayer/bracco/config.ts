import { CompanyConfig } from "../company.types";

export const braccoCompany: CompanyConfig = {
  id: "bracco",
  name: "bracco",
  displayName: "Bracco 4x4",
  domain: "bracco4x4.com",
  assetsBaseUrl: "https://bracco4x4.com/pruebaFtp",

  branding: {
      logoText: "BRACCO",
      tagline: "Equipamiento 4x4",
      shortName: "Bracco",
      legalName: "Equipamientos Bracco S.A.",
      logoAlt: "Logo de Bracco",
  },

  content: {
    home: {
      heroTitle: "Equipamiento 4x4 para quienes exigen más",
      heroSubtitle:
        "Jaulas, defensas, estribos, cobertores y accesorios diseñados para trabajo, aventura y máxima resistencia.",
      primaryCta: "Explorar catálogo",
      secondaryCta: "Conocer la empresa",
      heroBadge: "Catálogo oficial Bracco",
      aboutEyebrow:"Empresa",
      aboutTitle:"Diseño, fabricacion y equipamiento para vehiculos exigentes",
      aboutDescription:"Bracco desarrolla equipamiento 4x4 pensado para trabajo, aventura y uso intensivo, integrando diseño, resistencia y funcionalidad.",
      aboutCards:
                   [{ title: "Trayectoria",
                      description: "Experiencia en desarrollo de accesorios para pickups, SUVs y vehículos comerciales.",},
                    {
                      title: "Productos",
                      description:
                        "Catálogo organizado por líneas, categorías y compatibilidad vehicular.",
                    },
                    {
                      title: "Operación comercial",
                      description:
                        "Base preparada para usuarios, pedidos y futuras operaciones privadas.",
                    },
                  ],
      catalogEyebrow: "Catálogo",
      catalogTitle: "Explorá productos por categoría, vehículo y aplicación",
      catalogDescription:"El catálogo permite buscar productos por descripción, línea, marca, modelo y año, respetando la estructura real de compatibilidades del ERP.",
      catalogCta: "Ir al catálogo",
      catalogFeatureCards:
                  [
                    {
                      label: "Búsqueda",
                      title: "Búsqueda por nombre, código o descripción",
                      },
                      {
                        label: "Vehículo",
                        title: "Filtros por marca, modelo y año",
                      },
                      {
                        label: "Categorías",
                        title: "Navegación por líneas de producto",
                      },
                  ],    
                  
      ctaEyebrow: "Próximo paso",
      ctaTitle: "Prepará tu experiencia comercial digital",
      ctaDescription:"La plataforma está preparada para evolucionar hacia usuarios autorizados, roles comerciales, pedidos online e integración completa con el sistema empresarial.",
      ctaPrimary: "Explorar catálogo",
      ctaSecondary: "Próximamente: acceso privado",   
      
      heroPreviewTitle:"Vista previa de la plataforma",
      heroPreviewItems: [
                          "Catálogo público con productos, imágenes y filtros por vehículo",
                          "Área privada futura para clientes, usuarios y roles comerciales",
                          "Integración con el sistema empresarial para sincronizar catálogo y pedidos",
                        ],

    },
    catalog: {
      title: "Catálogo de productos",
      subtitle:
        "Encontrá accesorios compatibles con tu vehículo usando búsqueda, categorías y filtros por marca, modelo y año.",
      searchPlaceholder: "Buscar por nombre, código o descripción...",
      vehicleFilterTitle: "Buscar tu vehículo",
      moreFiltersTitle: "Más filtros",
      eyeBrow:"Catálogo",
      categoriesTitle: "Categorías",
      allCategoriesLabel:"Todas", 
      productGallery: {
          noImage: "Sin imagen",
        },

      filterPanel: {
      searchLabel: "Buscar productos",
      brandLabel: "Marca",
      modelLabel: "Modelo",
      yearLabel: "Año",
      allBrandsOption: "Todas",
      allModelsOption: "Todos",
      allYearsOption: "Todos",
      minPriceLabel: "Precio mínimo",
      maxPriceLabel: "Precio máximo",
      minPricePlaceholder: "Ej: 100",
      maxPricePlaceholder: "Ej: 1000",
      clearFilters: "Limpiar filtros",
    },   
    
    activeFilters: {
      searchPrefix: "Buscar",
      categoryPrefix: "Categoría",
      productLinePrefix: "Línea",
      yearPrefix: "Año",
      minPricePrefix: "Min",
      maxPricePrefix: "Max",
      sortApplied: "Orden aplicado",
    },

    pagination: {
      previous: "Anterior",
      next: "Siguiente",
      pageLabel: "Página",
      ofLabel: "de",
    },

    emptyState: {
      message: "No se encontraron productos con los filtros seleccionados.",
      clearFilters: "Limpiar filtros",
    },






    },

    navigation:{
      home: "Inicio",
      catalog: "Catálogo",
      company: "Empresa",
      contact: "Contacto",
      login: "Ingresar",
    },

    productCard: {
      noImage: "Sin Imagen",
      yearsLabel: "Años",
      detailCta: "Ver",
    },


    

  },

  theme: {
    colors: {
      primary: "#0092C6",
      secondary: "#1A1A1A",
      background: "#FFFFFF",
      text: "#1A1A1A",
    },
    typography: {
      heading: "Circular",
      body: "Raleway",
    },
  },

  features: {
    vehicleFitment: true,
    ecommerce: true,
    auth: false,
    orders: false,
  },
};