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