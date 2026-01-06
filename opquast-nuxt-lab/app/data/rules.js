//this code is used to get all the rules from the rules.json file
// Useful if the source (API, CSV, ...) need to be change, no other change is needed in the app

import rules from "./rules.json"

export function getAllRules() {
  return rules
}

export function getRuleById(id) {
  return rules.find((r) => r.id === Number(id))
}
