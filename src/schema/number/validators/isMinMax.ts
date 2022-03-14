import { parseReference, TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsMinMaxProps {
  /**
   * Minimum value.
   */
  min?: number
  /**
   * Delta added to `min` (eg: you have a `min` of `10` and a `minDelta` of `5`, then the minimal value will be `15`). You can also use negative value. This property is useful when you are using refs.
   */
  minDelta?: number
  /**
   * Whether the minimal value should be accepted.
   *
   * @default true
   */
  minIncluded?: boolean

  /**
   * Maximum value.
   */
  max?: number
  /**
   * Delta added to `max` (eg: you have a `max` of `10` and a `maxDelta` of `5`, then the maximal value will be `15`). You can also use negative value. This property is useful when you are using refs.
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
 * Check if the value corresponds to the min/max constraints.
 */
export const isMinMax = (
  props?: TReferenceProps<IIsMinMaxProps> & INumberProps
): TNumberValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'number') return true

          const {
            min,
            minDelta,
            minIncluded = true,
            max,
            maxDelta,
            maxIncluded = true,
          } = parseReference<IIsMinMaxProps>(this, props)

          const minValue = min ? min + (minDelta ?? 0) : undefined
          const maxValue = max ? max + (maxDelta ?? 0) : undefined

          const minValid =
            typeof minValue === 'number'
              ? minIncluded
                ? value >= minValue
                : value > minValue
              : true

          const maxValid =
            typeof maxValue === 'number'
              ? maxIncluded
                ? value <= maxValue
                : value < maxValue
              : true

          if (!minValid && !maxValid) {
            return this.createError({
              message: intl.formatErrorMessage(
                { id: message ?? 'e.y_v.n_min_max' },
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
                  { id: message ?? 'e.y_v.n_min' },
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
                { id: message ?? 'e.y_v.n_max' },
                {
                  min: minValue ?? -1,
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
