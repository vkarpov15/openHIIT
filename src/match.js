module.exports = match;

function match(val, map) {
  if (!map[val]) {
    return map['DEFAULT']();
  }
  return map[val]();
}
