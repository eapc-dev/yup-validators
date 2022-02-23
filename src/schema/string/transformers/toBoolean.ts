import _toBoolean from 'validator/lib/toBoolean'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _toBoolean>

export interface IToBooleanProps {
  /**
   * In strict mode only `1` and `true` return true.
   */
  strict?: TParameters[1]
}

/**
 * Convert the input string to a `boolean`. Everything except for `0`, `false` and `(empty string)` returns true.
 */
export const toBoolean = (
  props?: IToBooleanProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { strict, active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _toBoolean(v, strict) : v))
    }

    return schema
  }
}
