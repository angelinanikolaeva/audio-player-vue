export const rgbaToHex = (r: number, g: number, b: number, a: number = 1) => {
  if (
    !(r >= 0 && r <= 255) ||
    !(g >= 0 && g <= 255) ||
    !(b >= 0 && b <= 255) ||
    !(a >= 0 && a <= 1)
  ) {
    throw new Error('Error wgile converting to hex, wrong colors');
  }

  const red = r.toString(16).padStart(2, '0');
  const green = g.toString(16).padStart(2, '0');
  const blue = b.toString(16).padStart(2, '0');
  const alpha = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');

  return `#${red}${green}${blue}${alpha}`;
};
