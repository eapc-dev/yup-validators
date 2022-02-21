import _isAlphanumeric from 'validator/lib/isAlphanumeric'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isAlphanumeric>

export interface IIsAlphanumericProps {
  locale?: TParameters[1]
  options?: TParameters[2]
}

/**
 * Check if the string contains only letters and numbers.
 */
export const isAlphanumeric = (
  props?: TReferenceProps<IIsAlphanumericProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { locale, options } = parseReference<IIsAlphanumericProps>(this, props)

          const result = _isAlphanumeric(value, locale, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_alphanumeric' },
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
