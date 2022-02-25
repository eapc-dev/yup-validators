import _isISO4217 from 'validator/lib/isISO4217'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsISO4217Props {}

/**
 * Check if the string is a valid [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) officially assigned currency code.
 */
export const isISO4217 = (
  props?: TReferenceProps<IIsISO4217Props> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isISO4217(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_iso4217_currency_code',
        }),
      })
    }

    return schema
  }
}
