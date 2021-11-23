const Color = require('color');

/**
 * Generate 10% to 90% transparencies for each color.
 * And example result is `color-FG20-O20` for 20%
 * opacity (80% transparent).
 */
module.exports = {
  transparency: (color, percent) =>
    Color(color)
      .alpha((100 - percent) / 100)
      .hsl()
      .string(),

  whiten: (color, percent) =>
    Color(color)
      .whiten(percent / 100)
      .hex()
      .toLowerCase(),

  blacken: (color, percent) =>
    Color(color)
      .blacken(percent / 100)
      .hex()
      .toLowerCase(),

  lighten: (color, percent) =>
    Color(color)
      .lighten(percent / 100)
      .hex()
      .toLowerCase(),

  darken: (color, percent) =>
    Color(color)
      .darken(percent / 100)
      .hex()
      .toLowerCase(),

  generateOpacityRange: (source, colors, step = 10) => {
    const opacity = (color, i) =>
      Color(source[color])
        .alpha(i / 100)
        .hsl()
        .string();

    return colors.reduce((acc, color) => {
      if (source[color]) {
        for (let i = 100 - step; i > 0; i -= step) {
          acc[`${color}-O${i}`] = opacity(color, i);
        }
        acc[`${color}-O5`] = opacity(color, 5);
      }
      return acc;
    }, {});
  },

  generateLightenDarken: (source, colors, adjustments) => {
    return colors.reduce((acc, color) => {
      if (source[color]) {
        acc[`${color}-L10`] = Color(source[color])
          .lighten((adjustments?.[`cfg-${color}-lighten`] || 0.25) * 1)
          .hex()
          .toLowerCase();
        acc[`${color}-L20`] = Color(source[color])
          .lighten((adjustments?.[`cfg-${color}-lighten`] || 0.25) * 2)
          .hex()
          .toLowerCase();
        acc[`${color}-L30`] = Color(source[color])
          .lighten((adjustments?.[`cfg-${color}-lighten`] || 0.25) * 3)
          .hex()
          .toLowerCase();

        acc[`${color}-D10`] = Color(source[color])
          .darken((adjustments?.[`cfg-${color}-darken`] || 0.125) * 1)
          .hex()
          .toLowerCase();
        acc[`${color}-D20`] = Color(source[color])
          .darken((adjustments?.[`cfg-${color}-darken`] || 0.125) * 2)
          .hex()
          .toLowerCase();
        acc[`${color}-D30`] = Color(source[color])
          .darken((adjustments?.[`cfg-${color}-darken`] || 0.125) * 3)
          .hex()
          .toLowerCase();
      }
      return acc;
    }, {});
  },

  generateShade: (source, colors, backgroundColor) => {
    return colors.reduce((acc, color) => {
      if (source[color]) {
        acc[`${color}-shade`] = Color(source[color]).alpha(0.15).mix(Color(backgroundColor)).hex().toLowerCase();
      }
      return acc;
    }, {});
  },
};
