import Immutable from 'immutable';

const emptyList = new Immutable.List();

const passedLanguageErrors = new Immutable.Map({
  items: emptyList,
  state: 'passed',
});

const validatingLanguageErrors = new Immutable.Map({
  items: emptyList,
  state: 'validating',
});

function buildFailedLanguageErrors(errorList) {
  return Immutable.fromJS({
    items: errorList,
    state: 'failed',
  });
}

const validatingErrors = new Immutable.Map({
  html: validatingLanguageErrors,
  css: validatingLanguageErrors,
  javascript: validatingLanguageErrors,
});

const emptyErrors = new Immutable.Map({
  html: passedLanguageErrors,
  css: passedLanguageErrors,
  javascript: passedLanguageErrors,
});

function errors(stateIn, action) {
  let state = stateIn;
  if (state === undefined) {
    state = emptyErrors;
  }

  switch (action.type) {
    case 'PROJECT_CREATED':
      return emptyErrors;

    case 'CURRENT_PROJECT_LOADED_FROM_STORAGE':
      return validatingErrors;

    case 'CURRENT_PROJECT_CHANGED':
      return validatingErrors;

    case 'PROJECT_SOURCE_EDITED':
      return state.set(action.payload.language, validatingLanguageErrors);

    case 'VALIDATED_SOURCE':
      if (action.payload.errors.length) {
        return state.set(
          action.payload.language,
          buildFailedLanguageErrors(action.payload.errors)
        );
      }
      return state.set(action.payload.language, passedLanguageErrors);

    case 'RESET_WORKSPACE':
      return emptyErrors;

    default:
      return state;
  }
}

export default errors;
