## [2.0.0](https://github.com/eapc-dev/yup-validators/compare/1.5.1...2.0.0) (2022-05-19)


### ⚠ BREAKING CHANGES

* null will now be accepted and values will be defaulted to null now

### Features

* null will now be accepted and values will be defaulted to null now ([0cd511e](https://github.com/eapc-dev/yup-validators/commit/0cd511ef5a293c7f4c01c33fde9441d60db94f76))


### Bug Fixes

* boolean schema not undefined ([ccdbb42](https://github.com/eapc-dev/yup-validators/commit/ccdbb425200fb533b69ade200113ba8b0037ff48))
* cleared some eslint errors ([ca5683b](https://github.com/eapc-dev/yup-validators/commit/ca5683b0aa2ede7b14401a05bea1bc2ed2863771))

### [1.5.1](https://github.com/eapc-dev/yup-validators/compare/1.5.0...1.5.1) (2022-05-17)


### Bug Fixes

* object and array schemas to be strict ([cb34af9](https://github.com/eapc-dev/yup-validators/commit/cb34af9e4d4d12d73afee8cb3d9c974d5f0af938))

## [1.5.0](https://github.com/eapc-dev/yup-validators/compare/1.4.3...1.5.0) (2022-05-17)


### Features

* added isPaymentReference ([f9a960c](https://github.com/eapc-dev/yup-validators/commit/f9a960c15dc896405c3d910e08d3c9e642f11aee))

### [1.4.3](https://github.com/eapc-dev/yup-validators/compare/1.4.2...1.4.3) (2022-05-17)


### Bug Fixes

* typeError schema sould replace old schema ([f69c4f6](https://github.com/eapc-dev/yup-validators/commit/f69c4f63eed671fd5e340e072f5ce9b7712be24c))

### [1.4.2](https://github.com/eapc-dev/yup-validators/compare/1.4.1...1.4.2) (2022-05-05)


### Bug Fixes

* boolean will always be false if falsy value or true if truthy value ([3f2cdfc](https://github.com/eapc-dev/yup-validators/commit/3f2cdfc6450939a13ad35ca1aa66aa325446807c))

### [1.4.1](https://github.com/eapc-dev/yup-validators/compare/1.4.0...1.4.1) (2022-04-29)


### Bug Fixes

* number transform to return number instance and not Big instance ([99a8290](https://github.com/eapc-dev/yup-validators/commit/99a82903388d224fc42e19656dba731378495843))

## [1.4.0](https://github.com/eapc-dev/yup-validators/compare/1.3.0...1.4.0) (2022-04-07)


### Features

* added some locales ([6c5e268](https://github.com/eapc-dev/yup-validators/commit/6c5e268e502ad4028f159853a6f38fdcf7507022))

## [1.3.0](https://github.com/eapc-dev/yup-validators/compare/1.2.7...1.3.0) (2022-03-15)


### Features

* added yup as an export ([cd7a9e5](https://github.com/eapc-dev/yup-validators/commit/cd7a9e54c42ad26368032b03d8e3f5b1a27fc7d8))

### [1.2.7](https://github.com/eapc-dev/yup-validators/compare/1.2.6...1.2.7) (2022-03-14)


### Bug Fixes

* stupid error with min and max value returned ([ae0a20f](https://github.com/eapc-dev/yup-validators/commit/ae0a20fb8f42eaa88ac84c988c339bc13223bff5))

### [1.2.6](https://github.com/eapc-dev/yup-validators/compare/1.2.5...1.2.6) (2022-03-14)


### Bug Fixes

* added some messages ([5d402e8](https://github.com/eapc-dev/yup-validators/commit/5d402e87c15cec9de46ee4b30d1f374c8d8f5be4))
* isEqualTo, isDifferentThan and isMod will now only accepts an array of values ([e24e621](https://github.com/eapc-dev/yup-validators/commit/e24e621ecaf0fefb11ab32848acaebe2fc62cada))
* length message will always include every parameters ([d673118](https://github.com/eapc-dev/yup-validators/commit/d673118de2140a8611fc83782a96e68b557c9562))

### [1.2.5](https://github.com/eapc-dev/yup-validators/compare/1.2.4...1.2.5) (2022-02-28)


### Bug Fixes

* changed some message ids ([a5fd4e7](https://github.com/eapc-dev/yup-validators/commit/a5fd4e7a22fa40b79e20f13a16a39a9dc37e4ca2))

### [1.2.4](https://github.com/eapc-dev/yup-validators/compare/1.2.3...1.2.4) (2022-02-25)


### Bug Fixes

* changed message id and added extract script ([541b32b](https://github.com/eapc-dev/yup-validators/commit/541b32bb254c7bc172541b706d6c187ca680e687))

### [1.2.3](https://github.com/eapc-dev/yup-validators/compare/1.2.2...1.2.3) (2022-02-24)


### Bug Fixes

* stripLow file case ([51c0d8c](https://github.com/eapc-dev/yup-validators/commit/51c0d8ca69a30066ba36a88a9972e09c86cc8a3a))

### [1.2.2](https://github.com/eapc-dev/yup-validators/compare/1.2.1...1.2.2) (2022-02-24)


### Bug Fixes

* use IntlShape from react-intl ([e8a2d6d](https://github.com/eapc-dev/yup-validators/commit/e8a2d6da9a6b006a3af2a353952961bb3784f300))

### [1.2.1](https://github.com/eapc-dev/yup-validators/compare/1.2.0...1.2.1) (2022-02-24)


### Bug Fixes

* intl to be extendable ([d96786e](https://github.com/eapc-dev/yup-validators/commit/d96786e7d32a4c4d0394c13ccedf5f821f3040e9))

## [1.2.0](https://github.com/eapc-dev/yup-validators/compare/1.1.0...1.2.0) (2022-02-24)


### Features

* added number validators and transformers ([763f39e](https://github.com/eapc-dev/yup-validators/commit/763f39e00f51e0c13454dc506d64089f72f680ef))


### Bug Fixes

* removed TFormatMessage ([47082be](https://github.com/eapc-dev/yup-validators/commit/47082be74c9769aca3c1935b3ed2edce7e5eb4df))

## [1.1.0](https://github.com/eapc-dev/yup-validators/compare/1.0.0...1.1.0) (2022-02-23)


### Features

* added date validators and transformers ([93029e7](https://github.com/eapc-dev/yup-validators/commit/93029e71f951348d3b3e8964e26c1226d2f25d6c))

## [1.0.0](https://github.com/eapc-dev/yup-validators/compare/0.4.0...1.0.0) (2022-02-23)


### ⚠ BREAKING CHANGES

* changed doesEqual to isEqualTo and doesNotEqual to isDifferentThan

### Features

* added doesEqual and doesNotEqual validator for boolean ([ebd2029](https://github.com/eapc-dev/yup-validators/commit/ebd20294f0881a522b978a7373c9dc514cc8ad8e))
* added isFalse, isTrue validators for boolean ([75c00c3](https://github.com/eapc-dev/yup-validators/commit/75c00c38be5994e6d8f0242908b6b9232efb3736))


### Bug Fixes

* changed doesEqual to isEqualTo and doesNotEqual to isDifferentThan ([d293cd7](https://github.com/eapc-dev/yup-validators/commit/d293cd72d4dcb6e785b251fde998f81514f7b5ab))

## [0.4.0](https://github.com/eapc-dev/yup-validators/compare/0.3.0...0.4.0) (2022-02-23)


### Features

* added array transformers ([efc58e4](https://github.com/eapc-dev/yup-validators/commit/efc58e4894ebd001f33e2281009ad22702eae2c7))
* length validators for array, date and number ([1792965](https://github.com/eapc-dev/yup-validators/commit/17929650372fb9eed6da10aa118e618a80735608))

## [0.3.0](https://github.com/jordanmonier/yup-validators/compare/0.2.1...0.3.0) (2022-02-22)


### Features

* added base schema for array, boolean, date and number ([98c3bbb](https://github.com/jordanmonier/yup-validators/commit/98c3bbbe9aa1137eb6a345682f0e497518b623c1))

### [0.2.1](https://github.com/jordanmonier/yup-validators/compare/0.2.0...0.2.1) (2022-02-22)


### Bug Fixes

* disabled sideEffects ([dfa166d](https://github.com/jordanmonier/yup-validators/commit/dfa166d81ae7c08b4f72d73b1e71641e099c25d5))

## [0.2.0](https://github.com/jordanmonier/yup-validators/compare/0.1.0...0.2.0) (2022-02-22)


### Features

* added webpack compilation ([22113c7](https://github.com/jordanmonier/yup-validators/commit/22113c7066729a7cdc6e01c99e3b3f639c1b614f))

## 0.1.0 (2022-02-22)


### Features

* added base string validators ([2643b20](https://github.com/jordanmonier/yup-validators/commit/2643b20ef1c67b4c1f018158a8403be957b143f4))
* added every basic string validators from validator.js ([03b0919](https://github.com/jordanmonier/yup-validators/commit/03b0919a08cffd6207d7991d628a17b5de1a39f1))
* added object schema ([ee4ebbd](https://github.com/jordanmonier/yup-validators/commit/ee4ebbd7f800ac5f1bff1b121f1476b92e976a07))
* added other string validator from validator.js ([efa7f18](https://github.com/jordanmonier/yup-validators/commit/efa7f18ae3a1b51e19aa9eddb34599d16cfae07a))
* added string transformers ([44174f9](https://github.com/jordanmonier/yup-validators/commit/44174f9596c64e074acd3f6643564e3dc02aec42))
* added string.isLength validator ([442c831](https://github.com/jordanmonier/yup-validators/commit/442c8319827d9f90837c4a2435a383e951bd97c8))
* base architecture ([8a7d647](https://github.com/jordanmonier/yup-validators/commit/8a7d647e6f0c997bfc55aee37b4e5985aab0b082))
* string validators done ([6a4eb70](https://github.com/jordanmonier/yup-validators/commit/6a4eb70f35367ef79e0803bc3c893146a7762d47))


### Bug Fixes

* added `npm run test`to pre-commit hooks ([9872fa9](https://github.com/jordanmonier/yup-validators/commit/9872fa9d2d4b606f5921288428888081c747ec2a))
* changed test functions to be function rather than arrow functions ([91a3bfe](https://github.com/jordanmonier/yup-validators/commit/91a3bfec76611ebf7c750eb75ef867df065ef297))
* renamed some validators ([e1e5a9c](https://github.com/jordanmonier/yup-validators/commit/e1e5a9c7e38b1f44736f5f570fa2e99712288a2d))

