import config from "./config";

/* global ym */

export default function reachGoal(goalTarget, cb) {
  if (!goalTarget) {
    return;
  }

  if (!config.metrikaID) {
    return;
  }

  // console.log(goalTarget);

  if (cb) {
    try {
      ym(config.metrikaID, "reachGoal", goalTarget, () => {
        cb();
      });
    } catch (e) {
      cb();
    }
  } else {
    try {
      ym(config.metrikaID, "reachGoal", goalTarget);
    } catch (e) {}
  }
}
