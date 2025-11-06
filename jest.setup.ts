import "@testing-library/jest-dom";

// Polyfill for encoding which isn't present globally in jsdom
import { TextEncoder, TextDecoder } from 'util';

// Mock external dependencies that solid-logic expects
jest.mock('$rdf', () => require('rdflib'), { virtual: true })

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
