import _isAlpha from 'validator/lib/isAlpha'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isAlpha>

export interface IIsAlphaProps {
  locale?: TParameters[1]
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
          if (!value) return true

          const { locale, options } = parseReference<IIsAlphaProps>(this, props)

          const result = _isAlpha(value, locale, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_alpha' },
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
