import _escape from 'validator/lib/escape'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IEscapeProps {}

/**
 * Replace `<`, `>`, `&`, `'`, `"` and `/` with HTML entities.
 */
export const escape = (
  props?: IEscapeProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _escape(v) : v))
    }

    return schema
  }
}
