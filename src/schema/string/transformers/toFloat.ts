import _toFloat from 'validator/lib/toFloat'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IToFloatProps {}

/**
 * 	Convert the input string to a `Float`, or `NaN` if the input is not a float.
 */
export const toFloat = (
  props: IToFloatProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _toFloat(v) : v))
    }

    return schema
  }
}
