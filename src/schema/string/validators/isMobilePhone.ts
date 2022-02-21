import _isMobilePhone from 'validator/lib/isMobilePhone'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isMobilePhone>

export interface IIsMobilePhoneProps {
  locale?: TParameters[1]
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
          if (!value) return true

          const { locale, options } = parseReference<IIsMobilePhoneProps>(this, props)

          const result = _isMobilePhone(value, locale, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_a_mobile_phone' },
                  {
                    locale: Array.isArray(locale)
                      ? locale.join(
                          intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' })
                        )
                      : locale,
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
