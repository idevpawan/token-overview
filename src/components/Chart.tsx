import { memo } from "react";

function Chart({ chain, address }: { chain: string; address: string }) {
  return (
    <div
      className="tradingview-widget-container rounded-xl"
      style={{ height: "100%", width: "100%" }}
    >
      <iframe
        width={"100%"}
        height={"100%"}
        src={`https://www.dextools.io/widget-chart/en/${chain}/pe-light/${address}?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false`}
      ></iframe>
    </div>
  );
}

export default memo(Chart);
