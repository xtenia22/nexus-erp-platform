export type CompanyFeatureFlags = {
  vehicleFitment: boolean;
  ecommerce: boolean;
  auth: boolean;
  orders: boolean;
};

export type CompanyTheme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  typography: {
    heading: string;
    body: string;
  };
};

export type CompanyBranding = {
  logoText: string;
  tagline: string;
  shortName: string;
  legalName: string;
  logoAlt: string;
};

export type CompanyContent = {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
    heroBadge:string;
    aboutEyebrow:string;
    aboutTitle:string;
    aboutDescription:string;
    aboutCards: {
      title:string,
      description:string;
    }[];

    catalogEyebrow: string;
    catalogTitle: string;
    catalogDescription: string;
    catalogCta: string;
    catalogFeatureCards: {
      label: string;
      title: string;
    }[];


    ctaEyebrow: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaPrimary: string;
    ctaSecondary: string;

    heroPreviewTitle: string;
    heroPreviewItems: string[];

  };


  catalog: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    vehicleFilterTitle: string;
    moreFiltersTitle: string;
    eyeBrow:string;
    categoriesTitle: string;
    allCategoriesLabel: string;
    productGallery: {
      noImage: string;
      };

     filterPanel: {
      searchLabel: string;
      brandLabel: string;
      modelLabel: string;
      yearLabel: string;
      allBrandsOption: string;
      allModelsOption: string;
      allYearsOption: string;
      minPriceLabel: string;
      maxPriceLabel: string;
      minPricePlaceholder: string;
      maxPricePlaceholder: string;
      clearFilters: string;
    };  
    activeFilters: {
      searchPrefix: string;
      categoryPrefix: string;
      productLinePrefix: string;
      yearPrefix: string;
      minPricePrefix: string;
      maxPricePrefix: string;
      sortApplied: string;
    };

    pagination: {
      previous: string;
      next: string;
      pageLabel: string;
      ofLabel: string;
    };

    emptyState: {
      message: string;
      clearFilters: string;
    };

  };  
  navigation : {
    home:string;
    catalog:string;
    company:string;
    contact:string;
    login:string;
  };


  productCard: {
    noImage: string;
    yearsLabel: string;
    detailCta: string;
    unspecifiedYears: string;
  };

 productDetail: {
  yearsLabel: string;
  priceNote: string;
  brochureCta: string;
  videoCta: string;
  notFoundTitle: string;
  notFoundDescription: string;
  unspecifiedYears: string;
};
 

};

export type CompanyConfig = {
  id: string;
  name: string;
  displayName: string;
  domain: string;
  assetsBaseUrl: string;
  branding: CompanyBranding;
  content: CompanyContent;
  theme: CompanyTheme;
  features: CompanyFeatureFlags;
};