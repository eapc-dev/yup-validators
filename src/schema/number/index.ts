import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

import { TNumberValidatorResult } from './_types'

export const schema = (
  intl: IIntlShape,
  ...validators: TNumberValidatorResult[]
): yup.NumberSchema => {
  let value = new yup.NumberSchema()

  for (const validator of validators) {
    value = validator(value, intl)
  }

  value.typeError(intl.formatErrorMessage({ id: 'e.form.n_type_error' }))

  return value
}

export * from './_types'

export * from './validators/isEqualTo'
export * from './validators/isDifferentThan'
export * from './validators/isInteger'
export * from './validators/isMinMax'
export * from './validators/isMod'
export * from './validators/isNegative'
export * from './validators/isNullable'
export * from './validators/isRequired'
export * from './validators/isOptional'
export * from './validators/isPositive'

export * from './transformers/trunc'
export * from './transformers/round'
export * from './transformers/ceil'
export * from './transformers/floor'
