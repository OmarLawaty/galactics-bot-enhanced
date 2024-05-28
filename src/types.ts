import { commandName } from './actionHandlers/commands/types';

export type Prefix = 'gt!';

export type Features = {
  ping: boolean;
  blockLinks: boolean;
} & {
  [t in commandName]: boolean;
};

export type FeatureName = keyof Features;

export type BotConfig = {
  allowedFeatures: Features;
  prefixes: Prefix[];
  serverId: `${number}`;
};
