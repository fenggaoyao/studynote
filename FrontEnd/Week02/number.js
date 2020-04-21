/**
 * JavaScript Number Regex
 */
const {
    combine,
    atLeastOne,
    optional,
    or
} = require('./helper');

const Dot = '\\.';

const BinaryDigit = "[01]"; // 二进制字符组
const BinaryIntegerLiteral = combine('0[bB]', atLeastOne(BinaryDigit)); // 0[bB][01]+

const OctalDigit = "[0-7]";
const OctalIntegerLiteral = combine('0[oO]', atLeastOne(OctalDigit)); // 0[oO][0-7]+

const HexDigits = "[0-9a-fA-F]";
const HexIntegerLiteral = combine('0[xX]', atLeastOne(HexDigits)); // 0[xX][0-9a-fA-F]+

const DecimalDigit = "[0-9]";
const DecimalDigits = atLeastOne(DecimalDigit); // [0-9]+
const NonZeroDigit = "[1-9]";
const SignedInteger = combine("[+-]?", DecimalDigits);
const ExponentPart = combine("[eE]", SignedInteger); // [eE][+-]?[0-9]+
const DecimalIntegerLiteral = or(
    "0",
    combine(NonZeroDigit, optional(DecimalDigits))
); //  0 | [1-9]([0-9]+)?
const DecimalLiteral = or(
    combine(DecimalIntegerLiteral, Dot, optional(DecimalDigits), optional(ExponentPart)),
    combine(Dot, DecimalDigits, optional(ExponentPart)),
    combine(DecimalIntegerLiteral, optional(ExponentPart))
);

let regexText = or(
    DecimalLiteral,
    BinaryIntegerLiteral,
    OctalIntegerLiteral,
    HexIntegerLiteral
);

module.exports = regexText;