import dayjs from 'dayjs'

import { IDateProps, TDateValidatorResult } from '../_types'

export interface ISetProps {
  /**
   * Unit to be used.
   */
  values: [unit: dayjs.UnitType, value: number][]
}

/**
 * Modify the date.
 */
export const set = (props: ISetProps & Omit<IDateProps, 'message'>): TDateValidatorResult => {
  const { values, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v) => {
        let date = dayjs(v)
        if (!date.isValid()) {
          return v as unknown
        }

        for (const [unit, value] of values) {
          date = date.set(unit, value)
        }

        return date.toDate()
      })
    }

    return schema
  }
}
