import _toDate from 'validator/lib/toDate'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IToDateProps {}

/**
 * 	Convert the input string to a `Date`, or `null` if the input is not a date.
 */
export const toDate = (
  props: IToDateProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _toDate(v) : v))
    }

    return schema
  }
}
