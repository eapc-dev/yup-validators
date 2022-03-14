import * as yup from 'yup'

import { parseReference, TReferenceProps } from '../../..'
import { IArrayProps, TArrayValidatorResult } from '../_types'

export interface IIsLengthProps {
  /**
   * Minimum length of the array.
   */
  min?: number
  /**
   * Delta added to `min` (eg: you have a `min` of `10` and a `minDelta` of `5`, then the minimal length of the array will be `15`). You can also use negative value. This property is useful when you are using refs.
   */
  minDelta?: number
  /**
   * Whether the minimal value should be accepted.
   *
   * @default true
   */
  minIncluded?: boolean

  /**
   * Maximum length of the array.
   */
  max?: number
  /**
   * Delta added to `max` (eg: you have a `max` of `10` and a `maxDelta` of `5`, then the maximal length of the array will be `15`). You can also use negative value. This property is useful when you are using refs.
   */
  maxDelta?: number
  /**
   * Whether the maximal value should be accepted.
   *
   * @default true
   */
  maxIncluded?: boolean
}

/**
 * Check if the `array` is defined.
 */
export const isLength = <T extends yup.AnySchema>(
  props?: TReferenceProps<IIsLengthProps> & IArrayProps
): TArrayValidatorResult<T> => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!Array.isArray(value)) return true

          const { length } = value

          const {
            min,
            minDelta,
            minIncluded = true,
            max,
            maxDelta,
            maxIncluded = true,
          } = parseReference<IIsLengthProps>(this, props)

          const minValue = min ? min + (minDelta ?? 0) : undefined
          const maxValue = max ? max + (maxDelta ?? 0) : undefined

          const minValid =
            typeof minValue === 'number'
              ? minIncluded
                ? length >= minValue
                : length > minValue
              : true

          const maxValid =
            typeof maxValue === 'number'
              ? maxIncluded
                ? length <= maxValue
                : length < maxValue
              : true

          if (!minValid && !maxValid) {
            return this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.a_min_max_length' },
                {
                  min: minValue,
                  min_included: minIncluded,
                  max: maxValue,
                  max_included: maxIncluded,
                }
              ),
            })
          } else if (!minValid) {
            if (!minValid) {
              return this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.a_min_length' },
                  {
                    min: minValue,
                    min_included: minIncluded,
                    max: maxValue ?? -1,
                    max_included: maxIncluded,
                  }
                ),
              })
            }
          } else if (!maxValid) {
            return this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.a_max_length' },
                {
                  min: minValue,
                  min_included: minIncluded,
                  max: maxValue,
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
