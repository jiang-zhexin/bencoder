# Bencoder
Cross-platform bencode en/decode implementation in JavaScript.

## How to use?
### For deno
Add Package
```bash
deno add jsr:@zhexin/bencoder
```
Coding
```TypeScript
// main.ts
import { BenDecoder, BenEncoder } from "@zhexin/bencoder"

const file = Deno.readFileSync("./your.torrent")
const result = BenDecoder(file)
console.log(result)
const bin = BenEncoder(result)
Deno.writeFileSync("./another.torrent", bin)
```
Run it
```bash
deno run --allow-read --allow-write ./main.ts
```

### For node
Add Package
```bash
pnpm dlx jsr add @zhexin/bencoder
```
Coding
```TypeScript
import { BenDecoder, BenEncoder } from "@zhexin/bencoder"
```
### Other JavaScript Runtime
The same support is provided.

Further elaboration will not be repeated.