/* eslint-env jest */
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

require('@testing-library/jest-dom')

// Polyfills for Node.js environment
const { TextEncoder, TextDecoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
