import { CompanyConfig } from "../company.types";

export const demoCompany: CompanyConfig = {
  id: "demo",
  name: "demo",
  displayName: "Cliente Demo",
  domain: "demo.local",
  assetsBaseUrl: "https://bracco4x4.com/pruebaFtp",

  branding: {
     logoText: "DEMO STORE",
     tagline: "Catálogo profesional",
     shortName: "Demo",
     legalName: "Cliente Demo S.A.",
     logoAlt: "Logo de Cliente Demo",
  },

  content: {
    home: {
      heroTitle: "Catálogo digital para tu empresa",
      heroSubtitle:
        "Una plataforma moderna para mostrar productos, organizar categorías y preparar ventas online.",
      primaryCta: "Ver catálogo",
      secondaryCta: "Conocer más",
      heroBadge: "Plataforma comercial demo",
      aboutEyebrow: "Empresa",
      aboutTitle: "Una plataforma moderna para presentar tu catálogo",
      aboutDescription:
        "Cliente Demo muestra cómo la misma base tecnológica puede adaptarse a distintas empresas, marcas e industrias.",
      aboutCards: [
                  {
                    title: "Identidad",
                    description:
                      "Cada empresa puede tener textos, colores y experiencia propia.",
                  },
                  {
                    title: "Catálogo",
                    description:
                      "Productos, categorías y filtros configurados según el negocio.",
                  },
                  {
                    title: "Escalabilidad",
                    description:
                      "Base preparada para crecer hacia usuarios, pedidos e integraciones.",
                  },
                ],
      catalogEyebrow: "Catálogo",
      catalogTitle: "Organizá tus productos en una experiencia moderna",
      catalogDescription: "La plataforma permite adaptar productos, categorías y filtros a distintos tipos de empresa.",
      catalogCta: "Ver productos",
      catalogFeatureCards:
                [
                  {
                    label: "Búsqueda",
                    title: "Encontrá productos rápidamente",
                  },
                  {
                    label: "Filtros",
                    title: "Segmentá resultados según tu negocio",
                  },
                  {
                    label: "Experiencia",
                    title: "Catálogo preparado para ecommerce",
                  },
                ],
    ctaEyebrow: "Siguiente etapa",
    ctaTitle: "Convertí tu catálogo en una plataforma comercial",
    ctaDescription:"Esta base permite crecer hacia login, roles, pedidos y operaciones conectadas a sistemas existentes.",
    ctaPrimary: "Explorar productos",
    ctaSecondary: "Ver próximas funciones",       
    
    heroPreviewTitle: "Vista previa del sistema",
    heroPreviewItems: [
                        "Catálogo adaptable a diferentes rubros y tipos de producto",
                        "Configuración visual por empresa desde la capa Company Layer",
                        "Base preparada para usuarios, pedidos e integraciones futuras",
                      ],


    },
    catalog: {
      title: "Productos",
      subtitle:
        "Explorá productos con búsqueda, categorías y filtros avanzados.",
      searchPlaceholder: "Buscar productos...",
      vehicleFilterTitle: "Buscar compatibilidad",
      moreFiltersTitle: "Más opciones",
      eyeBrow:"Productos",
      categoriesTitle: "Seleccione",
      allCategoriesLabel:"Ver Todas", 
      productGallery: {
          noImage: "Sin imagen disponible",
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
        categoryPrefix: "Sección",
        productLinePrefix: "Subsección",
        yearPrefix: "Año",
        minPricePrefix: "Mín",
        maxPricePrefix: "Máx",
        sortApplied: "Orden aplicado",
      },

      pagination: {
        previous: "Anterior",
        next: "Siguiente",
        pageLabel: "Página",
        ofLabel: "de",
      },

      emptyState: {
        message: "No hay productos para los filtros seleccionados.",
        clearFilters: "Limpiar filtros",
      },


      resultsSummary: {
        showing: "Mostrando",
        of: "de",
        results: "productos",
      },

      sorting: {
        label: "Ordenar",
        defaultOption: "Sin orden",
        nameAsc: "Nombre A-Z",
        nameDesc: "Nombre Z-A",
        priceAsc: "Precio menor a mayor",
        priceDesc: "Precio mayor a menor",
      },


    },
    navigation: {
      home: "Inicio",
      catalog: "Productos",
      company: "Nosotros",
      contact: "Contacto",
      login: "Acceso",
    },

    productCard: {
      noImage: "Sin Imagen",
      yearsLabel: "Aplicacion",
      detailCta: "Ver",
      unspecifiedYears:"Aplicacion no especificada",
    },  

    productDetail: {
      yearsLabel: "Aplicación",
      priceNote: "Precio de referencia sujeto a disponibilidad",
      brochureCta: "Ver ficha técnica",
      videoCta: "Ver video",
      notFoundTitle: "Producto no disponible",
      notFoundDescription: "El producto solicitado no existe o ya no se encuentra disponible.",
      unspecifiedYears:"Aplicacion no especificada",

      specsTitle: "Información del producto",
      specLabels: {
        code: "Código",
        category: "Sección",
        brand: "Marca",
        model: "Modelo",
        years: "Aplicación",
      },
    },

  },

  theme: {
    colors: {
      primary: "#7C3AED",
      secondary: "#111827",
      background: "#FFFFFF",
      text: "#111827",
    },
    typography: {
      heading: "Inter",
      body: "Inter",
    },
  },

  features: {
    vehicleFitment: true,
    ecommerce: false,
    auth: false,
    orders: false,
  },
};