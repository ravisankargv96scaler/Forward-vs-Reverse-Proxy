
export enum TabType {
  CONCEPT = 'Core Concept',
  FORWARD = 'Forward Proxy',
  REVERSE = 'Reverse Proxy',
  COMPARISON = 'Comparison Table',
  NGINX = 'Nginx Config',
  QUIZ = 'Quiz'
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ServerState {
  id: number;
  active: boolean;
  load: number;
}
