import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'slap',
            description: 'Slap someone!!',
            category: 'fun',
            usage: `${client.config.prefix}slap @whom_you_wanna_slap`
        })
    }
    run = async (M: ISimplifiedMessage): Promise<void> => {
        const user1 = M.sender.jid
        const user2 = M.mentioned[0]
        //  let username1 = user1.split('@')[0]
        //  let username2 = user2.split('@')[0]
        // let username1 = user1.replace('@s.whatsapp.net', '')
        // let username2 = user2.replace('@s.whatsapp.net', '')
        const n = [
            './assets/videos/slap/slap1.mp4',
            './assets/videos/slap/slap2.mp4',
            './assets/videos/slap/slap3.mp4',
            './assets/videos/slap/slap4.mp4',
            './assets/videos/slap/slap.mp4'
        ]
        let slap = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: slap }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `@${user1.split('@')[0]} Slapped @${user2.split('@')[0]} I hope you still Alive`,
            contextInfo: { mentionedJid: [user1, user2] }
        })
    }
}
