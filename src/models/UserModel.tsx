export type UserModel = {
  id: string;
  name: string;
  email: string;
  profile_picture_path: string | null;
  is_active: boolean;
  email_verified_at: string | null;
  created_at: string;
};
