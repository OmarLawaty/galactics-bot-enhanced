import type { Client } from 'discord.js';

import type { Action, IntervalFn } from './types';

export const action: Action = (Client, actionType, actionFn) => {
  Client.on(actionType, actionFn);
};

export const interval = (client: Client<true>, intervalFn: IntervalFn, time: number) => {
  setInterval(() => intervalFn(client, time), time);
};
