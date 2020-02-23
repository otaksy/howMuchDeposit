const _ = require("lodash");
const ParameterError = require("../../error/parameterError")

// 各硬貨の体積
const VOLUMES = {
  1: "471", // 10^2 * PI * 1.5
  5: "570", // 11^2 * PI * 1.5
  10: "651", // 11.75^2 * PI * 1.5
  50: "589", // 10.5^2 * PI * 1.7
  100: "682", // 11.3^2 * PI * 1.7
  500: "993" // 13.75^2 * PI * 1.8
};

/**
 * 貯金可能な金額を算出する
 */
class HowMuchDeposit {
  /**
   * 初期化
   * @param {Object} context コンテキストデータ
   */
  initialize(context) {
    this.maxAmount = context.req.body.maxAmount;
    this.ratio = context.req.body.ratio;
  }

  /**
   * バリデーション
   * @param {Object} context コンテキストデータ
   */
  validate(context) {
    if (_.isNaN(Number(this.maxAmount))) {
      throw new ParameterError("The maxAmount must be a type of Number.");
    }
    if (this.maxAmount < 1) {
      throw new ParameterError("The maxAmount must be a positive Number.");
    }
    if (_.isEmpty(this.ratio)) {
      throw new ParameterError("The ratio is empty.");
    }
    if (_.difference(_.keys(this.ratio), _.keys(VOLUMES)).length > 0
      || _.keys(this.ratio).length !== _.keys(VOLUMES).length) {
      throw new ParameterError("The ratio is invalid.");
    }
    if (_.sum(_.values(this.ratio)) !== 1) {
      throw new ParameterError("Sum of the ratio must be 1.");
    }
  }

  /**
   * 本処理
   * @param {Object} context コンテキストデータ
   */
  process(context) {
    // 500円硬貨の最大枚数から最大体積を算出する
    const max500Num = Math.floor(this.maxAmount / 500);
    const maxVolume = VOLUMES[500] * max500Num;
    // 硬貨の割合から最低体積を算出する
    const minVolume = _.reduce(VOLUMES, (r, v, k) => {
      const ratio = this.ratio[k] === 1 ? 0.1 : this.ratio[k];
      return r + Math.round(v * ratio * 10);
    }, 0);
    if (maxVolume < minVolume) {
      throw new ParameterError("Too low maxAmount.");
    }
    // 硬貨の組が何セット入るか算出する
    const setNum = Math.floor(maxVolume / minVolume);
    context.result = _.reduce(VOLUMES, (r, v, k) => {
      const ratio = this.ratio[k] === 1 ? 0.1 : this.ratio[k];
      return r + Math.round(k * ratio * 10 * setNum);
    }, 0);
  }

  /**
   * 終了処理
   * @param {Object} context コンテキストデータ
   */
  finalize(context) {
    context.res.set("Contnt-Type", "application/json");
    context.res.status(200);
    context.res.send({"deposit": context.result});
  }
}
module.exports = HowMuchDeposit;