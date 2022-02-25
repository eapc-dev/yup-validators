import dayjs from 'dayjs'

import { parseReference, TReferenceProps } from '../../..'
import { IDateProps, TDateValidatorResult } from '../_types'

export interface IIsEqualToProps {
  /**
   * The list of authorized values. Can be either an array of date or just a date.
   */
  values: Date | Date[]
}

/**
 * Check if the date is equal to a list of values.
 */
export const isEqualTo = (
  props: TReferenceProps<IIsEqualToProps> & IDateProps
): TDateValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          const valueObj = dayjs(value)
          if (!valueObj.isValid()) return true

          const { values } = parseReference<IIsEqualToProps>(this, props)

          const whitelist: dayjs.Dayjs[] = []
          if (Array.isArray(values)) {
            for (const v of values) {
              whitelist.push(dayjs(v))
            }
          } else {
            whitelist.push(dayjs(values))
          }

          let result = false

          for (const entry of whitelist) {
            if (entry.isSame(valueObj)) {
              result = true
              break
            }
          }

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.d_is_equal_to' },
                  {
                    values: Array.isArray(values)
                      ? intl.formatList(values.map((e) => e.toString()))
                      : values,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
