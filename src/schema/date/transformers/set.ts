import dayjs from 'dayjs'
import pluginTimezone from 'dayjs/plugin/timezone'
import pluginUTC from 'dayjs/plugin/utc'

import { IDateProps, TDateValidatorResult } from '../_types'

dayjs.extend(pluginUTC)
dayjs.extend(pluginTimezone)

export interface ISetProps {
  /**
   * Unit to be used.
   */
  values: [unit: dayjs.UnitType, value: number][]

  /**
   * Timezone to be used.
   */
  timezone?: [tz: string, keepLocalTimes?: boolean]
}

/**
 * Set values on the date using `dayjs`.
 */
export const set = (props: ISetProps & Omit<IDateProps, 'message'>): TDateValidatorResult => {
  const { values, timezone, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v) => {
        let date = dayjs(v)
        if (!date.isValid()) {
          return v as unknown
        }

        date = date.tz(timezone?.[0], timezone?.[1])
        for (const [unit, value] of values) {
          date = date.set(unit, value)
        }

        return date.toDate()
      })
    }

    return schema
  }
}
