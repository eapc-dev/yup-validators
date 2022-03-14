import dayjs from 'dayjs'

import { parseReference, TReferenceProps } from '../../..'
import { IDateProps, TDateValidatorResult } from '../_types'

export interface IIsMinMaxProps {
  /**
   * Minimum date.
   */
  min?: number | string | Date
  /**
   * Delta added to `min` (eg: you have a `min` of `1998-01-14` and a `minDelta` of `[[1, 'day']]`, then the minimal date will be `1998-01-15`). You can also use negative value. This property is useful when you are using refs.
   */
  minDelta?: [value: number, type: dayjs.ManipulateType][]
  /**
   * Whether the minimal value should be accepted.
   *
   * @default true
   */
  minIncluded?: boolean

  /**
   * Maximum date.
   */
  max?: number | string | Date
  /**
   * Delta added to `max` (eg: you have a `min` of `1998-01-14` and a `minDelta` of `[[1, 'day']]`, then the minimal date will be `1998-01-15`). You can also use negative value. This property is useful when you are using refs.
   */
  maxDelta?: [value: number, type: dayjs.ManipulateType][]
  /**
   * Whether the maximal value should be accepted.
   *
   * @default true
   */
  maxIncluded?: boolean
}

/**
 * Check if the date corresponds to the min/max constraints.
 */
export const isMinMax = (
  props?: TReferenceProps<IIsMinMaxProps> & IDateProps
): TDateValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          const valueObj = dayjs(value)
          if (!valueObj.isValid()) return true

          const {
            min,
            minDelta,
            minIncluded = true,
            max,
            maxDelta,
            maxIncluded = true,
          } = parseReference<IIsMinMaxProps>(this, props)

          let minValue = min ? dayjs(min) : undefined
          if (minValue && minDelta && minDelta.length > 0) {
            for (const [delta, unit] of minDelta) {
              minValue = minValue.add(delta, unit)
            }
          }

          let maxValue = max ? dayjs(max) : undefined
          if (maxValue && maxDelta && maxDelta.length > 0) {
            for (const [delta, unit] of maxDelta) {
              maxValue = maxValue.add(delta, unit)
            }
          }

          const minValid = minValue
            ? minIncluded
              ? valueObj.isAfter(minValue) || valueObj.isSame(minValue)
              : valueObj.isAfter(minValue)
            : true

          const maxValid = maxValue
            ? maxIncluded
              ? valueObj.isBefore(maxValue) || valueObj.isSame(maxValue)
              : valueObj.isBefore(maxValue)
            : true

          if (!minValid && !maxValid) {
            return this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.d_min_max' },
                {
                  min: minValue?.toDate(),
                  min_included: minIncluded,
                  max: maxValue?.toDate(),
                  max_included: maxIncluded,
                }
              ),
            })
          } else if (!minValid) {
            return this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.d_min' },
                {
                  min: minValue?.toDate(),
                  min_included: minIncluded,
                  max: maxValue?.toDate(),
                  max_included: maxIncluded,
                }
              ),
            })
          } else if (!maxValid) {
            return this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.d_max' },
                {
                  min: minValue?.toDate(),
                  min_included: minIncluded,
                  max: maxValue?.toDate(),
                  max_included: maxIncluded,
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
