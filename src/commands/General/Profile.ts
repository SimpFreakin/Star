import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'profile',
            description: 'Displays user-profile š',
            category: 'general',
            usage: `${client.config.prefix}profile (@tag)`,
            aliases: ['p']
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid
        let username = user === M.sender.jid ? M.sender.username : ''
        if (!username) {
            const contact = this.client.getContact(user)
            username = contact.notify || contact.vname || contact.name || user.split('@')[0]
        }
        let pfp: string
        try {
            pfp = await this.client.getProfilePicture(user)
        } catch (err) {
            M.reply(`Profile Picture not Accessible of ${username} āØ`)
            pfp =
                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Kawaii_robot_power_clipart.svg/640px-Kawaii_robot_power_clipart.svg.png'
        }
        const data = await this.client.getUser(user)
        await M.reply(
            await request.buffer(
                pfp ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Kawaii_robot_power_clipart.svg/640px-Kawaii_robot_power_clipart.svg.png'
            ),
            MessageType.image,
            undefined,
            undefined,
            `š *Username: ${username}*\n\nš« *About: ${
                (await this.client.getStatus(user)).status || 'None'
            }*\n\nš *XP: ${data.Xp || 0}*\n\nš *Admin: ${
                M.groupMetadata?.admins?.includes(user) || false
            }*\n\nā *Ban: ${data.ban || false}*`
        )
    }
}
