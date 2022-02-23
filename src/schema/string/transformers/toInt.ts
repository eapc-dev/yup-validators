import _toInt from 'validator/lib/toInt'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _toInt>

export interface IToIntProps {
  radix?: TParameters[1]
}

/**
 * Convert the input string to an `integer`, or `NaN` if the input is not an integer.
 */
export const toInt = (
  props?: IToIntProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { radix, active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _toInt(v, radix) : v))
    }

    return schema
  }
}
