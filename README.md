# strict-queryselector

## Usage
```typescript
import { querySelector } from "@keupoz/strict-queryselector";

// Gets body element with type of HTMLBodyElement
const body = querySelector("body", HTMLBodyElement);

// Throws TypeError as body element is instance of HTMLDivElement
const bodyDiv = querySelector("body", HTMLDivElement);

// Throws Error if element doesn't exist
// If it exists, checks if it's instance of specified type
const meaningOfLife = querySelector(".life-meaning", HTMLDivElement);
```
