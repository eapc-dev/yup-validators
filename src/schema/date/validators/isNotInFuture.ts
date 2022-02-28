import dayjs from 'dayjs'

import { parseReference, TReferenceProps } from '../../..'
import { IDateProps, TDateValidatorResult } from '../_types'

export interface IIsNotInFutureProps {
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
 * Check if the date is not in the future.
 */
export const isNotInFuture = (
  props?: TReferenceProps<IIsNotInFutureProps> & IDateProps
): TDateValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          const valueObj = dayjs(value)
          if (!valueObj.isValid()) return true

          const { delta: maxDelta, included: maxIncluded = true } =
            parseReference<IIsNotInFutureProps>(this, props)

          let maxValue = dayjs()
          if (maxValue && maxDelta && maxDelta.length > 0) {
            for (const [delta, unit] of maxDelta) {
              maxValue = maxValue.add(delta, unit)
            }
          }

          const maxValid = maxValue
            ? maxIncluded
              ? valueObj.isBefore(maxValue) || valueObj.isSame(maxValue)
              : valueObj.isBefore(maxValue)
            : true

          if (!maxValid) {
            this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.d_is_not_in_future' },
                {
                  value: maxValue?.toDate(),
                  included: maxIncluded,
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
