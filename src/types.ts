export type element = list | dict | number | string | Uint8Array
export type dict = { [key: string]: element }
export type list = element[]
