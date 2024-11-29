import { BenDecoder } from './decode.ts'
import { BenEncoder } from './encode.ts'

Deno.test('dict', () => {
    const data = {
        number: 114514,
        string: 'fuck',
        list: ['1!', '5!'],
        dict: {
            a: 'b',
        },
    }
    const result = BenEncoder(data)
    console.log(new TextDecoder().decode(result))
})

Deno.test('torrent', async () => {
    const file = Deno.readFileSync('./test/[ANi] Youkai Gakkou no Sensei Hajimemashita -  妖怪學校的菜鳥老師 - 08 [1080P][Baha][WEB-DL][AAC AVC][CHT].torrent')
    const result = BenEncoder(BenDecoder(file))
    console.log(await hash(file) === await hash(result))
})

async function hash(data: Uint8Array) {
    const algorithm = 'SHA-256'
    const buffer = await crypto.subtle.digest(algorithm, data)
    return btoa(new Uint8Array(buffer).toString())
}
