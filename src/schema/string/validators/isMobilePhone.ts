import _isMobilePhone from 'validator/lib/isMobilePhone'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isMobilePhone>

export interface IIsMobilePhoneProps {
  /**
   * Locale is either an array of locales (e.g [`sk-SK`, `sr-RS`]) OR one of [`am-Am`, `ar-AE`, `ar-BH`, `ar-DZ`, `ar-EG`, `ar-IQ`, `ar-JO`, `ar-KW`, `ar-PS`, `ar-SA`, `ar-SY`, `ar-TN`, `az-AZ`, `az-LY`, `az-LB`, `bs-BA`, `be-BY`, `bg-BG`, `bn-BD`, `ca-AD`, `cs-CZ`, `da-DK`, `de-DE`, `de-AT`, `de-CH`, `de-LU`, `dv-MV`, `el-GR`, `en-AU`, `en-BM`, `en-BW`, `en-CA`, `en-GB`, `en-GG`, `en-GH`, `en-GY`, `en-HK`, `en-MO`, `en-IE`, `en-IN`, `en-KE`, `en-KI`, `en-MT`, `en-MU`, `en-NG`, `en-NZ`, `en-PK`, `en-PH`, `en-RW`, `en-SG`, `en-SL`, `en-UG`, `en-US`, `en-TZ`, `en-ZA`, `en-ZM`, `en-ZW`, `es-AR`, `es-BO`, `es-CL`, `es-CO`, `es-CR`, `es-CU`, `es-DO`, `es-HN`, `es-PE`, `es-EC`, `es-ES`, `es-MX`, `es-PA`, `es-PY`, `es-SV`, `es-UY`, `es-VE`, `et-EE`, `fa-IR`, `fi-FI`, `fj-FJ`, `fo-FO`, `fr-BE`, `fr-BF`, `fr-FR`, `fr-GF`, `fr-GP`, `fr-MQ`, `fr-PF`, `fr-RE`, `ga-IE`, `he-IL`, `hu-HU`, `id-ID`, `it-IT`, `it-SM`, `ja-JP`, `ka-GE`, `kk-KZ`, `kl-GL`, `ko-KR`, `lt-LT`, `ms-MY`, `mz-MZ`, `nb-NO`, `ne-NP`, `nl-BE`, `nl-NL`, `nn-NO`, `pl-PL`, `pt-BR`, `pt-PT`, `pt-AO`, `ro-RO`, `ru-RU`, `si-LK` `sl-SI`, `sk-SK`, `sq-AL`, `sr-RS`, `sv-SE`, `tg-TJ`, `th-TH`, `tk-TM`, `tr-TR`, `uk-UA`, `uz-UZ`, `vi-VN`, `zh-CN`, `zh-HK`, `zh-MO`, `zh-TW`, `dz-BT`] OR defaults to `any`. If `any` or a falsy value is used, function will check if any of the locales match.
   */
  locale?: TParameters[1]

  /**
   * Options is an optional object that can be supplied with the following keys: `strictMode`, if this is set to `true`, the mobile phone number must be supplied with the country code and therefore must start with `+`.
   */
  options?: TParameters[2]
}

/**
 * Check if the string is a mobile phone number.
 */
export const isMobilePhone = (
  props?: TReferenceProps<IIsMobilePhoneProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { locale, options } = parseReference<IIsMobilePhoneProps>(this, props)

          const result = _isMobilePhone(value, locale, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_mobile_phone' },
                  {
                    locale: Array.isArray(locale) ? intl.formatList(locale) : locale,
                    ...options,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
