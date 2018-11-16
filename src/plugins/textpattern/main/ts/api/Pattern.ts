/**
 * Pattern.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import { Arr, Obj } from '@ephox/katamari';

export interface InlinePattern {
  start: string;
  end: string;
  format: string | string[];
}

export interface BlockPattern {
  start: string;
  format?: string | string[];
  cmd?: string;
}

export interface ReplacementPattern {
  start: string;
  replacement: string;
}

export type Pattern = InlinePattern | BlockPattern | ReplacementPattern;

export interface PatternSet {
  inlinePatterns: InlinePattern[];
  blockPatterns: BlockPattern[];
  replacementPatterns: ReplacementPattern[];
}

const isInlinePattern = (pattern: any): pattern is InlinePattern => {
  return Obj.has(pattern, 'start') && Obj.has(pattern, 'end');
};

const isBlockPattern = (pattern: any): pattern is BlockPattern => {
  return !Obj.has(pattern, 'end') && !Obj.has(pattern, 'replacement');
};

const isReplacementPattern = (pattern: any): pattern is ReplacementPattern => {
  return Obj.has(pattern, 'replacement');
};

const sortPatterns = <T extends Pattern>(patterns: T[]): T[] => {
  return Arr.sort(patterns, (a, b) => {
    if (a.start.length === b.start.length) {
      return 0;
    }
    return a.start.length > b.start.length ? -1 : 1;
  });
};

const createPatternSet = (patterns: Pattern[]): PatternSet => {
  return {
    inlinePatterns: sortPatterns(Arr.filter(patterns, isInlinePattern)),
    blockPatterns: sortPatterns(Arr.filter(patterns, isBlockPattern)),
    replacementPatterns: Arr.filter(patterns, isReplacementPattern),
  };
};

export {
  createPatternSet
};