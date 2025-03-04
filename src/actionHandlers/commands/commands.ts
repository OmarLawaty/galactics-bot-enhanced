import type { Command } from './types';

import { diceRoll } from './diceRoll';
import { avatar } from './avatar';
import { user } from './user';
import { clearChat } from './clearChat';
import { serverInfo } from './serverInfo';
import { slowMode } from './slowMode';
import { unlockChannel } from './unlockChannel';
import { lockChannel } from './lockChannel';
import { serverConfig } from './serverConfig';
import { modHelp } from './modHelp';
import { warn } from './warn';
import { serverStatus } from './serverStatus';
import { maintenance } from './maintenance';
import { morseTranslate } from './morseTranslate';
import { preferredLanguage } from './preferredLanguage';
import { serverLanguage } from './serverLanguage';
import { birthday } from './birthday';

export const commands = [
  { name: 'roll-dice', type: 'diceRoll', interaction: diceRoll },
  { name: 'avatar', type: 'avatar', interaction: avatar },
  { name: 'user', type: 'user', interaction: user },
  { name: 'clear', type: 'clearChat', interaction: clearChat },
  { name: 'server-info', type: 'serverInfo', interaction: serverInfo },
  { name: 'slow-mode', type: 'slowMode', interaction: slowMode },
  { name: 'unlock-channel', type: 'unlockChannel', interaction: unlockChannel },
  { name: 'lock-channel', type: 'lockChannel', interaction: lockChannel },
  { name: 'server-config', type: 'serverConfig', interaction: serverConfig },
  { name: 'mod-help', type: 'modHelp', interaction: modHelp },
  { name: 'warn', type: 'warn', interaction: warn },
  { name: 'server-status', type: 'serverStatus', interaction: serverStatus },
  { name: 'maintenance', type: 'maintenance', interaction: maintenance },
  { name: 'morse-translate', type: 'morseTranslate', interaction: morseTranslate },
  { name: 'preferred-language', type: 'preferredLanguage', interaction: preferredLanguage },
  { name: 'server-language', type: 'serverLanguage', interaction: serverLanguage },
  { name: 'birthday', type: 'birthday', interaction: birthday },
] as const satisfies CommandLayout[];

interface CommandLayout {
  name: string;
  type: string;
  interaction: Command;
}
