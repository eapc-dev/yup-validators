import dayjs from 'dayjs'

import { parseReference, TReferenceProps } from '../../..'
import { IDateProps, TDateValidatorResult } from '../_types'

export interface IIsInFutureProps {
  /**
   * Delta to be added (eg: you have a `Date.now()` of `1998-01-14` and a `delta` of `[[1, 'day']]`, then the minimal date will be `1998-01-15`). You can also use negative value. This property is useful when you are using refs.
   */
  delta?: [value: number, type: dayjs.ManipulateType][]

  /**
   * Whether the `Date.now() + delta` date should be accepted.
   *
   * @default false
   */
  included?: boolean
}

/**
 * Check if the date is in the future.
 */
export const isInFuture = (
  props?: TReferenceProps<IIsInFutureProps> & IDateProps
): TDateValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          const valueObj = dayjs(value)
          if (!valueObj.isValid()) return true

          const { delta: minDelta, included: minIncluded = true } =
            parseReference<IIsInFutureProps>(this, props)

          let minValue = dayjs()
          if (minValue && minDelta && minDelta.length > 0) {
            for (const [delta, unit] of minDelta) {
              minValue = minValue.add(delta, unit)
            }
          }

          const minValid = minValue
            ? minIncluded
              ? valueObj.isAfter(minValue) || valueObj.isSame(minValue)
              : valueObj.isAfter(minValue)
            : true

          if (!minValid) {
            this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.d_is_in_future' },
                {
                  value: minValue?.toDate(),
                  included: minIncluded,
                }
              ),
            })
          }

          return true
        },
      })
    }

    return schema
  }
}
