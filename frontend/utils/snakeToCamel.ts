/**
 * キャメルケースに変換するための型定義
 * @template T オブジェクトの型
 * @typedef {object} CamelCase
 * - もしTがオブジェクト（Record<string, unknown>）ならば、その全てのキーをキャメルケースに変換する
 * - もしTが配列ならば、その要素を再帰的にキャメルケースに変換する
 * - それ以外の場合、Tをそのまま返す
 */
// export type CamelCase<T> = T extends Record<string, unknown>
//   ? { [K in keyof T]: CamelCase<T[K]> }
//   : T extends (infer U)[]
//   ? U extends Record<string, unknown>
//     ? CamelCase<U>[]
//     : T
//   : T;

import exp from "constants";

type SnakeToCamelCase<T extends string> = T extends `${infer R}_${infer U}`
  ? `${R}${Capitalize<SnakeToCamelCase<U>>}`
  : T;

export type SnakeToCamel<T extends object> = {
  [K in keyof T as `${SnakeToCamelCase<string & K>}`]: T[K];
};

/**
 * スネークケースやケバブケースの文字列をキャメルケースに変換する関数
 * @function toCamelCase
 * @template T オブジェクトの型
 * @param {T} obj スネークケースやケバブケースのキーを持つオブジェクト
 * @returns {SnakeToCamel<T>} キャメルケースのキーを持つオブジェクト
 * @description
 * - もし入力が配列ならば、その要素を再帰的にキャメルケースに変換する
 * - もし入力がオブジェクトならば、そのキーをキャメルケースに変換する
 * - それ以外の場合、入力をそのまま返す
 */
export const toCamelCase = <T extends Record<string, unknown>>(
  obj: T
): SnakeToCamel<T> => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase) as unknown as SnakeToCamel<T>;
  }
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/([-_][a-z])/g, (group) =>
          group.toUpperCase().replace("-", "").replace("_", "")
        ),
        toCamelCase(value as Record<string, unknown>),
      ])
    ) as unknown as SnakeToCamel<T>;
  }
  return obj as SnakeToCamel<T>;
};

export default toCamelCase;
