import { ActivityOptions, ActivityType } from 'discord.js';
import { configDotenv } from 'dotenv';

import type { DefaultServerConfig, DefaultUserConfig, LocalDBServerConfig } from '../types';

configDotenv();

export const isDevMode: boolean = !!+process.env.DEVMODE! ?? false;

export const customStatus: ActivityOptions[] = [
  { name: 'Galactics bot', type: ActivityType.Playing },
  { name: 'Developed by gt dev team', type: ActivityType.Watching },
  { name: 'Have fun', type: ActivityType.Watching },
  { name: 'need help? /mod-help', type: ActivityType.Watching },
];

export const defaultLocalDBServerConfig: LocalDBServerConfig = {
  lastJoinedIds: [],
  statusChannels: [],
  tempChannels: [],
};

export const defaultServerConfig: DefaultServerConfig = {
  features: {
    serverConfig: true,
    ping: false,
    blockLinks: false,
    diceRoll: false,
    avatar: false,
    user: false,
    clearChat: false,
    lockChannel: false,
    unlockChannel: false,
    slowMode: false,
    serverInfo: false,
    welcome: false,
    autoBan: false,
    repeatedWelcomes: false,
    modHelp: false,
    warn: false,
    serverStatus: false,
    tempChannels: false,
    roleOrganize: false,
    maintenance: false,
  },
  channels: {
    logs: null,
    modLogs: null,
    welcome: null,
    rules: null,
    statusCategory: null,
    tempChannelCategory: null,
    tempChannelGenerator: null,
    tempChannelCommands: null,
  },
  roles: {
    bot: null,
    member: null,
    maintenance: null,
  },
  isMaintenance: false,
  isDevServer: isDevMode,
  embeds: {
    color: '#000000',
  },
  properties: {
    autoBanTrigger: 5,
    modHelpMessage: 'One of our moderators will help you shortly',
    statuses: [],
  },
  ...defaultLocalDBServerConfig,
};

export const defaultUserConfig: DefaultUserConfig = {
  warns: {
    number: 0,
    reasons: [],
  },
};

const getPropType = <T extends keyof DefaultServerConfig>(propName: T, value: any): DefaultServerConfig[T] =>
  Object.assign({}, ...Object.keys(defaultServerConfig[propName]).map((prop) => ({ [prop]: value })));

export const featuresType = getPropType('features', Boolean);
export const channelsType = getPropType('channels', String || null);
export const rolesType = getPropType('roles', String || null);
