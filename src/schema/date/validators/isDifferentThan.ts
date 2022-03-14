import dayjs from 'dayjs'

import { parseReference, TReferenceProps } from '../../..'
import { IDateProps, TDateValidatorResult } from '../_types'

export interface IIsDifferentThanProps {
  /**
   * The list of blacklisted values.
   */
  values: Date[]
}

/**
 * Check if the date is different than a list of values.
 */
export const isDifferentThan = (
  props: TReferenceProps<IIsDifferentThanProps> & IDateProps
): TDateValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          const valueObj = dayjs(value)
          if (!valueObj.isValid()) return true

          const { values } = parseReference<IIsDifferentThanProps>(this, props)

          const whitelist: dayjs.Dayjs[] = []
          for (const v of values) {
            whitelist.push(dayjs(v))
          }

          let result = true

          for (const entry of whitelist) {
            if (entry.isSame(valueObj)) {
              result = false
              break
            }
          }

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.d_is_different_than' },
                  {
                    values: intl.formatList(values.map((e) => e.toString())),
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
