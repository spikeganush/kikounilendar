export interface IUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    picture: string;
    provider_id: string;
    sub: string;
  };
  identities: [
    {
      id: string;
      user_id: string;
      identity_data: {
        avatar_url: string;
        email: string;
        email_verified: boolean;
        full_name: string;
        iss: string;
        name: string;
        picture: string;
        provider_id: string;
        sub: string;
      };
      provider: string;
      last_sign_in_at: string;
      created_at: string;
      updated_at: string;
    },
  ];
  created_at: string;
  updated_at: string;
}

export interface IUserDb {
  id: string;
  full_name: string;
  username: string | null;
  lover_id: string | null;
  avatar_url: string | null;
  updated_at: string | null;
  personal_notifications: boolean;
  lover_notifications: boolean;
}
