import { memo } from "react";

function Chart() {
  return (
    <div
      className="tradingview-widget-container rounded-xl"
      style={{ height: "100%", width: "100%" }}
    >
      <iframe
        width={"100%"}
        height={"100%"}
        src="https://www.dextools.io/widget-chart/en/ether/pe-light/0xa29fe6ef9592b5d408cca961d0fb9b1faf497d6d?theme=light&chartType=2&chartResolution=30&drawingToolbars=false"
      ></iframe>
    </div>
  );
}

export default memo(Chart);
