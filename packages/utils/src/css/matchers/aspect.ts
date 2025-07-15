// aspect.ts

// aspect-ratio
// Utilities for controlling the aspect ratio of an element.

// Class                       Styles
// aspect-<ratio>              aspect-ratio: <ratio>;
// aspect-square               aspect-ratio: 1 / 1;
// aspect-video                aspect-ratio: var(--aspect-ratio-video); /* 16 / 9 */
// aspect-auto                 aspect-ratio: auto;
// aspect-(<custom-property>)  aspect-ratio: var(<custom-property>);
// aspect-[<value>]            aspect-ratio: <value>;
// aspect-[<custom-property>] aspect-ratio: var(<custom-property>);  


// Basic example
// Use aspect-<ratio> utilities like aspect-3/2 to give an element a specific aspect ratio:

// Using a video aspect ratio
// Use the aspect-video utility to give a video element a 16 / 9 aspect ratio:

// Using a custom value
// Use the aspect-[<value>] syntax to set the aspect ratio based on a completely custom value:
// <img class="aspect-[calc(4*3+1)/3] ..." src="/img/villas.jpg" />


//For CSS variables, you can also use the aspect-(<custom-property>) syntax:
// <img class="aspect-(--my-aspect-ratio) ..." src="/img/villas.jpg" />
// This is just a shorthand for aspect-[var(<custom-property>)] that adds the var() function for you automatically.

// Responsive design
// Prefix an aspect-ratio utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
// <iframe class="aspect-video md:aspect-square ..." src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>

// Customizing your theme
// Use the --aspect-* theme variables to customize the aspect ratio utilities in your project:
// @theme {
  // --aspect-retro: 4 / 3; 
// }

// Now the aspect-retro utility can be used in your markup:

//<iframe class="aspect-retro" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>


import type { TailwindSuggestion } from '@tailwind-studio/types';
import { aspectRatioMap } from '../constants/aspectMap';

export function matchAspect(
  prop: string,
  value: string
): TailwindSuggestion[] {
  if (prop !== 'aspect-ratio') return [];

  const val = value.trim();

  // 1. Theme mappings (e.g. '1 / 1' → aspect-square, '4 / 3' → aspect-retro)
  if (aspectRatioMap[val]) {
    return [{ tw: aspectRatioMap[val], reason: 'matched from aspectRatioMap' }];
  }

  // 2. Handle special case: `auto`
  if (val === 'auto') {
    return [{ tw: 'aspect-auto', reason: 'auto value' }];
  }

  // 3. Handle `var(...)` → convert to aspect-(...)
  const varMatch = val.match(/^var\((--[^)]+)\)$/);
  if (varMatch) {
    return [
      {
        tw: `aspect-(${varMatch[1]})`,
        reason: 'CSS variable for aspect ratio',
      },
    ];
  }

  // 4. Handle `calc(...)` or custom ratios → aspect-[value]
  const isCustomExpression = /calc|[0-9]+ *\/ *[0-9]+/.test(val);
  if (isCustomExpression) {
    return [
      {
        tw: `aspect-[${val}]`,
        reason: 'custom aspect ratio expression',
      },
    ];
  }

  // 5. Fallback to custom wrapper
  return [{ tw: `aspect-[${val}]`, reason: 'unmapped custom value' }];
}
