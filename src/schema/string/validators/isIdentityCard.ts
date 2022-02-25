import _isIdentityCard from 'validator/lib/isIdentityCard'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isIdentityCard>

export interface IIsIdentityCardProps {
  /**
   * Locale is one of [`LK`, `PL`, `ES`, `FI`, `IN`, `IT`, `IR`, `MZ`, `NO`, `TH`, `zh-TW`, `he-IL`, `ar-LY`, `ar-TN`, `zh-CN`] OR `any`. If `any` is used, function will check if any of the locals match.
   */
  locale?: TParameters[1]
}

/**
 * Check if the string is a valid identity card code.
 */
export const isIdentityCard = (
  props?: TReferenceProps<IIsIdentityCardProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { locale } = parseReference<IIsIdentityCardProps>(this, props)

          const result = _isIdentityCard(value, locale)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_identity_card_number' },
                  { locale }
                ),
              })
        },
      })
    }

    return schema
  }
}
