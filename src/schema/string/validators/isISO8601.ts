import _isISO8601 from 'validator/lib/isISO8601'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsISO8601Props {}

/**
 * Check if the string is a valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date.
 */
export const isISO8601 = (
  props?: TReferenceProps<IIsISO8601Props> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isISO8601(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_iso8601_date',
        }),
      })
    }

    return schema
  }
}
