export interface AnimationConfig {
  type: 'jump' | 'fade' | 'none';
  direction: 'ltr' | 'rtl' | 'normal';
  duration: number;
  delay: number;
}

export interface StyleConfig {
  borderRadius: number;
  boxShadow: boolean;
  darkMode: boolean;
  skillsView: 'card' | 'stats';
}

export interface PortfolioConfig {
  animation: AnimationConfig;
  style: StyleConfig;
}

export const defaultConfig: PortfolioConfig = {
  animation: {
    type: 'jump',
    direction: 'normal',
    duration: 0.5,
    delay: 0.2
  },
  style: {
    borderRadius: 8,
    boxShadow: true,
    darkMode: false,
    skillsView: 'card'
  }
};
