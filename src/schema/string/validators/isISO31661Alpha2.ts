import _isISO31661Alpha2 from 'validator/lib/isISO31661Alpha2'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsISO31661Alpha2Props {}

/**
 * Check if the string is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned country code.
 */
export const isISO31661Alpha2 = (
  props?: TReferenceProps<IIsISO31661Alpha2Props> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isISO31661Alpha2(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_iso31661alpha2_country_code',
        }),
      })
    }

    return schema
  }
}
