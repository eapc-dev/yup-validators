import dayjs from 'dayjs'

import { IDateProps, TDateValidatorResult } from '../_types'

export interface IStartOfProps {
  /**
   * Unit to be used.
   */
  unit: dayjs.OpUnitType
}

/**
 * Set the date to the start of `unit`.
 */
export const setStartOf = (
  props: IStartOfProps & Omit<IDateProps, 'message'>
): TDateValidatorResult => {
  const { unit, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v) => {
        const date = dayjs(v)
        if (!date.isValid()) {
          return v as unknown
        }

        return date.startOf(unit).toDate()
      })
    }

    return schema
  }
}
