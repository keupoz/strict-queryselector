# strict-queryselector

## Usage
```typescript
import { querySelector } from "@keupoz/strict-queryselector";

// Same examples applies to querySelectorAll
// Gets body element with type of HTMLBodyElement
const body = querySelector("body", HTMLBodyElement);

// Throws TypeError as body element is not instance of HTMLDivElement
const bodyDiv = querySelector("body", HTMLDivElement);

// Throws Error if element doesn't exist
// If it exists, checks if it's instance of specified type
const meaningOfLife = querySelector(".life-meaning", HTMLDivElement);
```

### Wrappers
There are wrapper functions that allows to wrap the type guard around custom element. And they return the same function as regular `querySelector`.
```typescript
const bodyQuerySelector = wrapQuerySelector(document.body);
```
