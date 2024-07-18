import { ChannelType, VoiceState } from 'discord.js';

import { getServerSchemaItem } from '../../db';
import { createChannel } from './helpers';
import { getLocalDBItem, setLocalDBItem } from '../../localdb';
import { isFeatureAllowed } from '../../utils/helpers';

export const onTempChannel = async (oldState: VoiceState, newState: VoiceState) => {
  const voiceState = newState ?? oldState;

  if (!(await isFeatureAllowed('tempChannels', voiceState.guild.id))) return;

  const {
    tempChannelCategory: categoryId,
    tempChannelGenerator: generatorId,
    tempChannelCommands: commandsId,
  } = await getServerSchemaItem(voiceState.guild.id, 'channels');

  const category = voiceState.guild.channels.cache.get(categoryId);
  const commandsChannel = voiceState.guild.channels.cache.get(commandsId);
  const generatorChannel = voiceState.guild.channels.cache.get(generatorId);

  if (!category || !commandsChannel || !generatorChannel) return;

  // If the user is in the category channel
  if (newState?.channel?.parent.id === categoryId) {
    if (commandsChannel.type === ChannelType.GuildText)
      commandsChannel.permissionOverwrites.edit(newState?.member.id, { ViewChannel: true, SendMessages: true });

    if (newState?.channel.id !== generatorId)
      newState?.channel.permissionOverwrites.edit(newState?.member.id, {
        SendMessages: true,
        ReadMessageHistory: true,
      });
  }

  // If the user is in the generator channel
  if (newState?.channel?.id === generatorId)
    createChannel(voiceState.guild, categoryId, newState.member).then(() => {
      if (generatorChannel.type !== ChannelType.GuildVoice) return;

      generatorChannel.permissionOverwrites
        .edit(newState?.member.id, { Connect: false, SendMessages: false, ReadMessageHistory: false })
        .then((_) => setTimeout(() => generatorChannel.permissionOverwrites.delete(newState?.member.id), 3000));
    });

  // If the user leaves the category channel
  if (oldState?.channel?.parentId !== categoryId) return;

  // If the user leaves the category channel and goes to another category channel
  if (newState?.channel?.parentId !== categoryId && commandsChannel.type === ChannelType.GuildText)
    commandsChannel.permissionOverwrites.delete(oldState?.member.id);

  if (generatorId === oldState?.channel?.id || oldState.channel.members.size) return;

  // If the user leaves the generator channel
  const oldDbVc = (await getLocalDBItem(voiceState.guild.id, 'tempChannels')).find(
    (tempChannel) => tempChannel.channelId === oldState.channel.id
  );

  oldState.channel
    .delete()
    .then(
      async (_) =>
        await setLocalDBItem(voiceState.guild.id, 'tempChannels', (prevTempChannels) =>
          prevTempChannels.filter((tempChannel) => tempChannel.channelId !== oldDbVc.channelId)
        )
    );
};
