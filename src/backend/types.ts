export interface CustomerData {
  first_name: string;
  last_name: string;
  pkg: string;
  dob?: string;
  date?: string | Date;
  signature?: string;
  instructor?: string;
  package?: string;
  form_language?: string;
  di?: string | boolean;
  di_policy_nb?: string | number;
  id_file?: string;
  [key: string]: unknown;
}
