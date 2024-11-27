import { BenDecoder } from './decode.ts'

Deno.test('int', () => {
    const encoder = new TextEncoder()
    const data = encoder.encode('i-42e')
    const result = BenDecoder(data)
    console.log(result)
})

Deno.test('torrent1', () => {
    const data = Deno.readFileSync('./test/[Hakugetsu&VCB-Studio] No Game No Life [1080p].torrent')
    const result = BenDecoder(data)
    console.log(result)
})

Deno.test('torrent2', () => {
    const data = Deno.readFileSync('./test/[ANi] Youkai Gakkou no Sensei Hajimemashita -  妖怪學校的菜鳥老師 - 08 [1080P][Baha][WEB-DL][AAC AVC][CHT].torrent')
    const result = BenDecoder(data)
    console.log(result)
})

Deno.test('torrent3', () => {
    const data = Deno.readFileSync('./test/[DBD-Raws][盾之勇者成名录 第二季][01-13TV全集][1080P][BDRip][HEVC-10bit][简繁外挂][FLAC]nyaa.torrent')
    const result = BenDecoder(data)
    console.log(result)
})
