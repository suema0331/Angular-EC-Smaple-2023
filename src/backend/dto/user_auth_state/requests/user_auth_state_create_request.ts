export interface UserAuthStateCreateRequest{

  parent_user_id: string;
  register: Date;
  code1: string;
  code2: string;
  email_verified: number;
  questionnaire_answered: number;

}
