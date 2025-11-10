import 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
      email: string;
      name: string;
      lastName: string;
      role: 'evaluator' | 'participant' | 'admin';
    };
  }
}

