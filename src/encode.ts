import { dictionary_start, end_of_type, integer_start, list_start, string_delim } from './const.ts'
import type { element } from './types.ts'

export function BenEncoder(data: element): Uint8Array {
    const textencoder = new TextEncoder()
    return encoder(data)

    function encoder(data: element): Uint8Array {
        switch (typeof data) {
            case 'number':
            case 'bigint':
                return number(data)
            case 'string':
                return string(data)
            case 'object': {
                if (Array.isArray(data)) {
                    return list(data)
                } else if (data instanceof Uint8Array) {
                    return buffer(data)
                } else {
                    return dict(data)
                }
            }
            default:
                return new Uint8Array()
        }
    }

    function dict(data: object): Uint8Array {
        const kv = Object.entries(data)
        const arrays: Uint8Array[] = []
        for (const [k, v] of kv) {
            const vb = encoder(v)
            if (vb.length === 0) {
                continue
            }
            const kb = encoder(k)
            arrays.push(kb, vb)
        }
        const mergedArray = mergeUint8Arrays(arrays)
        mergedArray[0] = dictionary_start
        mergedArray[mergedArray.length - 1] = end_of_type
        return mergedArray
    }

    function list(data: Array<element>): Uint8Array {
        const arrays = data.map((v) => encoder(v))
        const mergedArray = mergeUint8Arrays(arrays)
        mergedArray[0] = list_start
        mergedArray[mergedArray.length - 1] = end_of_type
        return mergedArray
    }

    function number(data: number | bigint): Uint8Array {
        const bytes = textencoder.encode(data.toString())
        const result = new Uint8Array(bytes.length + 2)
        result[0] = integer_start
        result.set(bytes, 1)
        result[bytes.length + 1] = end_of_type
        return result
    }

    function string(data: string): Uint8Array {
        const bytes = textencoder.encode(data)
        return buffer(bytes)
    }

    function buffer(data: Uint8Array): Uint8Array {
        const strlength = data.length.toString()
        const result = new Uint8Array(strlength.length + 1 + data.length)
        result.set(textencoder.encode(strlength))
        result[strlength.length] = string_delim
        result.set(data, strlength.length + 1)
        return result
    }

    function mergeUint8Arrays(arrays: Uint8Array[]): Uint8Array {
        let totalLength = 0
        for (const arr of arrays) {
            totalLength += arr.length
        }

        const mergedArray = new Uint8Array(totalLength + 2)
        let offset = 1
        for (const arr of arrays) {
            mergedArray.set(arr, offset)
            offset += arr.length
        }

        return mergedArray
    }
}
