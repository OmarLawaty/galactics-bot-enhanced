import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';

import { getEmbed } from '@utils';
import { getServerUserProperty, getUserProperty } from '@db';
import { onUserTranslate } from '@i18n/onTranslate';
import { onFormatNumber } from '@handlers/onFormat';

import type { Command } from './types';

export const user: Command = async (interaction) => {
  const { user, guild, options } = interaction;
  const t = await onUserTranslate(interaction.user.id);

  const guildUser = guild.members.cache.get(options.getUser('user')?.id ?? user.id);
  if (!guildUser) return interaction.reply({ content: t('error.userNotSet'), ephemeral: true });

  const preferredLanguage = await getUserProperty(guildUser.id, 'language');
  const birthday = await getUserProperty(guildUser.id, 'birthday');
  const formatNumber = onFormatNumber(preferredLanguage);

  const color = await getEmbed(guild.id, 'color');
  const warns = await getServerUserProperty(guild.id, guildUser.id, 'warns');

  const userAvatarUrl = guildUser.user.avatarURL({ size: 2048 });

  interaction.reply({
    embeds: [
      new EmbedBuilder()
        .addFields(
          {
            name: `${t('name.preferredLanguage')}:`,
            value: t(`name.${preferredLanguage}`),
            inline: true,
          },
          {
            name: `${t('name.birthday')}:`,
            value: `${birthday ? `**<t:${parseInt(`${new Date(birthday).getTime() / 1000}`, 10)}:R>**` : t('birthday.notSet')}`,
            inline: true,
          },
          { name: `${t('userInfo.warnsCount')}:`, value: `${formatNumber(warns.number)}` },
          {
            name: `${t('userInfo.lastTimeTouchedGrass')}:`,
            value: `**<t:${parseInt(`${guildUser.user.createdTimestamp / 1000}`, 10)}:R>**`,
            inline: false,
          },
          {
            name: `${t('userInfo.joinedServer')}:`,
            value: `**<t:${parseInt(`${(guildUser.joinedTimestamp ?? 0) / 1000}`, 10)}:R>**`,
            inline: true,
          }
        )
        .setThumbnail(userAvatarUrl)
        .setColor(color)
        .setFooter({ text: guildUser.user.tag, iconURL: userAvatarUrl ?? undefined }),
    ],
    ephemeral: false,
  });
};

user.create = {
  name: 'user',
  description: 'Get your account creation and server joined date',
  options: [
    {
      name: 'user',
      description: "get server member's data",
      type: ApplicationCommandOptionType.User,
    },
  ],
};
