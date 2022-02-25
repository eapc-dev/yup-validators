import _isFloat from 'validator/lib/isFloat'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isFloat>

export interface IIsFloatProps {
  /**
   * Options is an object which can contain the keys `min`, `max`, `gt`, and/or `lt` to validate the float is within boundaries (e.g. `{ min: 7.22, max: 9.55 }`) it also has locale as an option.

     Min and max are equivalent to 'greater or equal' and 'less or equal', respectively while gt and lt are their strict counterparts.

     `locale` determine the decimal separator and is one of [`ar`, `ar-AE`, `ar-BH`, `ar-DZ`, `ar-EG`, `ar-IQ`, `ar-JO`, `ar-KW`, `ar-LB`, `ar-LY`, `ar-MA`, `ar-QA`, `ar-QM`, `ar-SA`, `ar-SD`, `ar-SY`, `ar-TN`, `ar-YE`, `bg-BG`, `cs-CZ`, `da-DK`, `de-DE`, `en-AU`, `en-GB`, `en-HK`, `en-IN`, `en-NZ`, `en-US`, `en-ZA`, `en-ZM`, `es-ES`, `fr-CA`, `fr-FR`, `hu-HU`, `it-IT`, `nb-NO`, `nl-NL`, `nn-NO`, `pl-PL`, `pt-BR`, `pt-PT`, `ru-RU`, `sl-SI`, `sr-RS`, `sr-RS@latin`, `sv-SE`, `tr-TR`, `uk-UA`]
   */
  options?: TParameters[1]
}

/**
 * Check if the string is a float.
 */
export const isFloat = (
  props?: TReferenceProps<IIsFloatProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsFloatProps>(this, props)

          const result = _isFloat(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_float' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
