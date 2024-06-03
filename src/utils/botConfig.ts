import { configDotenv } from 'dotenv';

import { BotConfig, Features } from '../types';

configDotenv();

export const isDevMode: boolean = !!+process.env.DEVMODE ?? false;

export const defaultServerConfig: BotConfig = {
  features: {
    ping: false,
    blockLinks: false,
    diceRoll: false,
    avatar: false,
    user: false,
    clearChat: false,
    serverInfo: false,
  },
  prefixes: ['gt!'],
  isMaintenance: false,
  isDevServer: isDevMode,
  embeds: {
    color: '#000000',
  },
};

export const defaultUserConfig: DefaultUserConfig = {
  warns: {
    number: 0,
    reasons: [],
  },
};

export const features: Features = Object.assign(
  {},
  ...Object.keys(defaultServerConfig.features).map((feature) => ({ [feature]: Boolean }))
);

export const botConfig: BotConfig = defaultServerConfig;
