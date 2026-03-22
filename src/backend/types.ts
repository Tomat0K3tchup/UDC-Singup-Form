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
}

export type MedicalQuestionKey =
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "q7"
  | "q8"
  | "q9"
  | "q10"
  | "qA_1"
  | "qA_2"
  | "qA_3"
  | "qA_4"
  | "qA_5"
  | "qB_1"
  | "qB_2"
  | "qB_3"
  | "qB_4"
  | "qC_1"
  | "qC_2"
  | "qC_3"
  | "qC_4"
  | "qD_1"
  | "qD_2"
  | "qD_3"
  | "qD_4"
  | "qD_5"
  | "qE_1"
  | "qE_2"
  | "qE_3"
  | "qE_4"
  | "qF_1"
  | "qF_2"
  | "qF_3"
  | "qF_4"
  | "qF_5"
  | "qG_1"
  | "qG_2"
  | "qG_3"
  | "qG_4"
  | "qG_5"
  | "qG_6";

export type MedicalQuestionFields = Record<MedicalQuestionKey, string>;

export type MedicalCustomerData = CustomerData & Partial<MedicalQuestionFields>;
