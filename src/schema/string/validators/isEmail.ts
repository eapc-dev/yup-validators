import _isEmail from 'validator/lib/isEmail'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isEmail>

export interface IIsEmailProps {
  options?: TParameters[1]
}

/**
 * Check if the string is an email.
 */
export const isEmail = (
  props?: TReferenceProps<IIsEmailProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsEmailProps>(this, props)

          const result = _isEmail(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_an_email' },
                  {
                    ...options,
                    host_blacklist: options?.host_blacklist?.join(
                      intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' })
                    ),
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
