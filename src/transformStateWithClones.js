'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        break;

      case 'removeProperties':
        const newState = { ...currentState };

        action.keysToRemove.forEach((key) => delete newState[key]);
        currentState = newState;
        break;

      default:
        currentState = {};
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
