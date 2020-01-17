export const includesObject = (obj, cmp) => {
  var found = false;
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].id == cmp) {
      found = true;
      break;
    }
  }
  return found;
};
