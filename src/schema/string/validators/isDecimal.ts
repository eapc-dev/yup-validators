import _isDecimal from 'validator/lib/isDecimal'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isDecimal>

export interface IIsDecimalProps {
  /**
   * Options is an object which defaults to `{ force_decimal: false, decimal_digits: '1,', locale: 'en-US' }`

    Locale determine the decimal separator and is one of [`ar`, `ar-AE`, `ar-BH`, `ar-DZ`, `ar-EG`, `ar-IQ`, `ar-JO`, `ar-KW`, `ar-LB`, `ar-LY`, `ar-MA`, `ar-QA`, `ar-QM`, `ar-SA`, `ar-SD`, `ar-SY`, `ar-TN`, `ar-YE`, `bg-BG`, `cs-CZ`, `da-DK`, `de-DE`, `el-GR`, `en-AU`, `en-GB`, `en-HK`, `en-IN`, `en-NZ`, `en-US`, `en-ZA`, `en-ZM`, `es-ES`, `fa`, `fa-AF`, `fa-IR`, `fr-FR`, `fr-CA`, `hu-HU`, `id-ID`, `it-IT`, `ku-IQ`, `nb-NO`, `nl-NL`, `nn-NO`, `pl-PL`, `pl-Pl`, `pt-BR`, `pt-PT`, `ru-RU`, `sl-SI`, `sr-RS`, `sr-RS@latin`, `sv-SE`, `tr-TR`, `uk-UA`, `vi-VN`].
    
    Note: decimal_digits is given as a range like `1,3`, a specific value like `3` or min like `1,`.
   */
  options?: TParameters[1]
}

/**
 * Check if the string represents a decimal number,
 * such as `0.1`, `.3`, `1.1`, `1.00003`, `4.0` etc.
 */
export const isDecimal = (
  props?: TReferenceProps<IIsDecimalProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsDecimalProps>(this, props)

          const result = _isDecimal(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_decimal_number' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
