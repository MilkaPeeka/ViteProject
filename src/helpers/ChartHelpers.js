export const hexToRGB = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  };


export const drawTextInsideDoughnutPlugin = (valid, invalid, fontFamily, fontColor) => {
    return {
        beforeDraw: function(chart) {
            const width = chart.width, height = chart.height, ctx = chart.ctx;
            ctx.restore();
            ctx.fillStyle = fontColor;
            ctx.textBaseline = "bottom";
            // topLabel
            ctx.font = `bold ${(height/160).toFixed(2)}em ${fontFamily}`;
            const topLabel = `%${Math.round(100 * valid / (valid + invalid))}`;
            const topLabelX = Math.round((width - ctx.measureText(topLabel).width) / 2);
            const topLabelY = height * 0.57;
            ctx.fillText(topLabel, topLabelX, topLabelY);

            // middleLabel
            ctx.font = `bold ${(height/220).toFixed(2)}em ${fontFamily}`;
            const middleLabel = `${valid} כשירים`;
            const middleLabelX = Math.round((width - ctx.measureText(middleLabel).width) / 2);
            const middleLabelY = height * 0.66; 
            ctx.fillText(middleLabel, middleLabelX, middleLabelY);

            // bottomLabel
            ctx.font = ` ${(height/270).toFixed(2)}em ${fontFamily}`;
            const bottomLabel = `מתוך ${valid + invalid}`;
            const bottomLabelX = Math.round((width - ctx.measureText(bottomLabel).width) / 2);
            const bottomLabelY = height * 0.71; 
            ctx.fillText(bottomLabel, bottomLabelX, bottomLabelY);
      
            ctx.save();
        }
    }
};


export const matchColorToPrecentage = (percentage, a = 1) => {
    percentage = 100 - percentage;
    // Ensure the percentage is within the range [0, 100]
    const normalizedPercentage = Math.min(100, Math.max(0, percentage));

    // Calculate the hue value based on the percentage (red for lower percentages, green for higher percentages)
    const hue = (1 - normalizedPercentage / 100) * 120; // 0 for green, 120 for red
  
    // Set the saturation and lightness to a constant value for pastel colors
    const saturation = 50; // 0-100, 0 being completely desaturated, 100 being fully saturated
    const lightness = 50; // 0-100, 0 being completely dark, 100 being fully light
  
    // Convert HSL values to RGB values
    const hslToRgb = (h, s, l) => {
      h /= 360;
      s /= 100;
      l /= 100;
      let r, g, b;
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    };
  
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
  
    return `rgba(${r},${g},${b}, ${a})`;
  };