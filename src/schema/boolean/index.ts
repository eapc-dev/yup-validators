import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

import { TBooleanValidatorResult } from './_types'

export const schema = <Intl extends IIntlShape = IIntlShape>(
  intl: Intl,
  ...validators: TBooleanValidatorResult<Intl>[]
): yup.BooleanSchema => {
  let value = new yup.BooleanSchema()

  value = value.default(false)
  value = value.transform((v) => !!v)

  for (const validator of validators) {
    value = validator(value, intl)
  }

  value.typeError(intl.formatErrorMessage({ id: 'e.y_v.b_type_error' }))

  return value
}

export * from './_types'

export * from './validators/isDifferentThan'
export * from './validators/isEqualTo'
export * from './validators/isFalse'
export * from './validators/isNullable'
export * from './validators/isOptional'
export * from './validators/isRequired'
export * from './validators/isTrue'
