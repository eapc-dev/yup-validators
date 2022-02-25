import _isAlpha from 'validator/lib/isAlpha'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isAlpha>

export interface IIsAlphaProps {
  /**
   * Locale is one of [`ar`, `ar-AE`, `ar-BH`, `ar-DZ`, `ar-EG`, `ar-IQ`, `ar-JO`, `ar-KW`, `ar-LB`, `ar-LY`, `ar-MA`, `ar-QA`, `ar-QM`, `ar-SA`, `ar-SD`, `ar-SY`, `ar-TN`, `ar-YE`, `bg-BG`, `cs-CZ`, `da-DK`, `de-DE`, `el-GR`, `en-AU`, `en-GB`, `en-HK`, `en-IN`, `en-NZ`, `en-US`, `en-ZA`, `en-ZM`, `es-ES`, `fa-IR`, `fi-FI`, `fr-CA`, `fr-FR`, `he`, `hi-IN`, `hu-HU`, `it-IT`, `ku-IQ`, `nb-NO`, `nl-NL`, `nn-NO`, `pl-PL`, `pt-BR`, `pt-PT`, `ru-RU`, `sl-SI`, `sk-SK`, `sr-RS`, `sr-RS@latin`, `sv-SE`, `tr-TR`, `uk-UA`]) and defaults to `en-US`.
   */
  locale?: TParameters[1]

  /**
   * `options` is an optional object that can be supplied with the following key(s): `ignore` which can either be a `string` or `RegExp` of characters to be ignored e.g. ` -` will ignore spaces and -'s.
   */
  options?: TParameters[2]
}

/**
 * Check if the string contains only letters (a-zA-Z).
 */
export const isAlpha = (
  props?: TReferenceProps<IIsAlphaProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { locale, options } = parseReference<IIsAlphaProps>(this, props)

          const result = _isAlpha(value, locale, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_alpha' },
                  {
                    locale,
                    ...options,
                    ignore: options?.ignore?.toString(),
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
