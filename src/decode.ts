import { flag } from './const.ts'
import type { dict, element, list } from './types.ts'

/**
 * This function converts bencode-encoded bytes into an object.
 */
export function BenDecoder<T = unknown>(data: Uint8Array): T {
    let position = 0
    const textdecoder = new TextDecoder('utf-8', { fatal: true })
    return next() as T

    function next(): element {
        switch (data.at(position)) {
            case flag.dictionary_start:
                return dict()
            case flag.list_start:
                return list()
            case flag.integer_start:
                return number()
            default: {
                const bytes = buffer()
                try {
                    return textdecoder.decode(bytes)
                } catch {
                    return bytes
                }
            }
        }
    }

    function dict(): dict {
        position++
        const dict: dict = {}

        while (data.at(position) !== flag.end_of_type) {
            const key = string()
            dict[key] = next()
        }

        position++
        return dict
    }

    function list(): list {
        position++
        const list: list = []

        while (data.at(position) !== flag.end_of_type) {
            list.push(next())
        }

        position++
        return list
    }

    function number(): number {
        const end = find(flag.end_of_type)
        const number = bytes2number(data.slice(position + 1, end))
        position = end + 1
        return number
    }

    function string(): string {
        return textdecoder.decode(buffer())
    }

    function buffer(): Uint8Array {
        const sep = find(flag.string_delim)
        const length = bytes2number(data.slice(position, sep))
        const end = sep + 1 + length
        position = end
        return data.slice(sep + 1, end)
    }

    function find(chr: number): number {
        return data.indexOf(chr, position)
    }

    function bytes2number(data: Uint8Array): number {
        return parseInt(textdecoder.decode(data))
    }
}
