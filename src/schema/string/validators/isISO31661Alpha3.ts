import _isISO31661Alpha3 from 'validator/lib/isISO31661Alpha3'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsISO31661Alpha3Props {}

/**
 * Check if the string is a valid [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) officially assigned country code.
 */
export const isISO31661Alpha3 = (
  props?: TReferenceProps<IIsISO31661Alpha3Props> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isISO31661Alpha3(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_iso31661alpha3_country_code',
        }),
      })
    }

    return schema
  }
}
