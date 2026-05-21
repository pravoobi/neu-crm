import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes with false', () => {
    expect(cn('base', false && 'excluded', 'included')).toBe('base included')
  })

  it('resolves tailwind conflicts in favor of the last value', () => {
    expect(cn('p-4', 'p-6')).toBe('p-6')
  })

  it('handles undefined and null without throwing', () => {
    expect(cn('base', undefined, null as never, 'end')).toBe('base end')
  })

  it('handles object syntax', () => {
    expect(cn({ 'is-active': true, 'is-disabled': false })).toBe('is-active')
  })

  it('returns empty string with no arguments', () => {
    expect(cn()).toBe('')
  })
})
