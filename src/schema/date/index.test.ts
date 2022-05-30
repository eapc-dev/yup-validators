import { date, i18n } from '../../index'

const SCHEMAS: [
  name: string,
  schema: ReturnType<typeof date['schema']>,
  valid: unknown[],
  invalid: unknown[]
][] = [
  [
    'isRequired',
    date.schema(i18n.DEFAULT_INTL, date.isRequired()),
    [new Date(), '1998-01-14'],
    [undefined, null],
  ],
  [
    '!isRequired',
    date.schema(i18n.DEFAULT_INTL, date.isRequired({ active: false })),
    [new Date(), '1998-01-14', null, undefined],
    [],
  ],
  [
    'isMinMax',
    date.schema(
      i18n.DEFAULT_INTL,
      date.isRequired(),
      date.isMinMax({
        min: new Date(1998, 0, 14),
        max: new Date(1999, 0, 14),
      })
    ),
    [new Date(1998, 0, 14), new Date(1999, 0, 1), new Date(1999, 0, 14)],
    [new Date(1998, 0, 13), new Date(1999, 0, 15)],
  ],
  [
    'isMinMax (delta)',
    date.schema(
      i18n.DEFAULT_INTL,
      date.isRequired(),
      date.isMinMax({
        min: new Date(1998, 0, 14),
        minDelta: [[-1, 'day']],
        max: new Date(1999, 0, 14),
      })
    ),
    [new Date(1998, 0, 14), new Date(1999, 0, 1), new Date(1999, 0, 14)],
    [new Date(1998, 0, 12), new Date(1999, 0, 15)],
  ],
  [
    'isEqualTo',
    date.schema(
      i18n.DEFAULT_INTL,
      date.isRequired(),
      date.isEqualTo({
        values: [new Date(1998, 0, 14)],
      })
    ),
    ['1998-01-14'],
    [new Date(), null],
  ],
  [
    'isDifferentThan',
    date.schema(
      i18n.DEFAULT_INTL,
      date.isRequired(),
      date.isDifferentThan({
        values: [new Date(1998, 0, 14)],
      })
    ),
    [new Date()],
    ['1998-01-14', null],
  ],
]

describe('Date validation', () => {
  for (const [name, schema, valid, invalid] of SCHEMAS) {
    // eslint-disable-next-line jest/valid-title
    it(name, () => {
      for (const value of valid) {
        expect(schema.isValidSync(value)).toBe(true)
      }

      for (const value of invalid) {
        expect(schema.isValidSync(value)).toBe(false)
      }
    })
  }

  it('changing times on timezone (utc)', () => {
    const schema = date.schema(
      i18n.DEFAULT_INTL,
      date.isRequired(),
      date.setEndOf({
        unit: 'day',
        timezone: ['utc', true],
      })
    )

    expect(schema.cast('1998-01-14T00:00:00.000Z')?.toISOString()).toBe('1998-01-14T23:59:59.999Z')
  })

  it('changing times on timezone', () => {
    const schema = date.schema(
      i18n.DEFAULT_INTL,
      date.isRequired(),
      date.setEndOf({
        unit: 'day',
      })
    )

    expect(schema.cast('1998-01-13T23:00:00.000Z')?.toISOString()).toBe('1998-01-14T22:59:59.999Z')
  })
})
