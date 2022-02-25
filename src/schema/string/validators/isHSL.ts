import _isHSL from 'validator/lib/isHSL'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsHSLProps {}

/**
 * Check if the string is an HSL (hue, saturation, lightness, optional alpha) color based on CSS Colors Level 4 specification.
 * Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).
 */
export const isHSL = (
  props?: TReferenceProps<IIsHSLProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isHSL(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_hsl_color',
        }),
      })
    }

    return schema
  }
}
