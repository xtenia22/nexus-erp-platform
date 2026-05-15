import { braccoCompany } from "./bracco/config";
import { demoCompany } from "./demo/config";

const companies = {
  bracco: braccoCompany,
  demo: demoCompany,
};

type CompanyKey = keyof typeof companies;

const selectedCompany = process.env.NEXT_PUBLIC_COMPANY as
  | CompanyKey
  | undefined;

export const company = companies[selectedCompany ?? "bracco"] ?? braccoCompany;