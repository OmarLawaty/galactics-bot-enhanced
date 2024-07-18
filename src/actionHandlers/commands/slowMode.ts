import { ApplicationCommandOptionType } from 'discord.js';

import type { Command } from './types';

export const slowMode: Command = (interaction) => {
  const { options, channel } = interaction;

  const duration = options.getInteger('duration');

  channel.setRateLimitPerUser(duration, 'Change slow mode').then(() =>
    interaction.reply({
      content: duration ? `Channel slow mode is set to ${duration}s` : `Slow mode has been removed`,
      ephemeral: true,
    })
  );
};

slowMode.create = {
  name: 'slow-mode',
  description: "Set channel's slow mode",
  options: [
    {
      name: 'duration',
      description: 'Slow mode duration in seconds',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
