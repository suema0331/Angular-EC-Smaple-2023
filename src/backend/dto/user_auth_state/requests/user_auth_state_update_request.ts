export interface UserAuthStateUpdateRequest{

  user_auth_state_id: string;
  register: Date;
  code1: string;
  code2: string;
  email_verified: number;
  questionnaire_answered: number;

}
