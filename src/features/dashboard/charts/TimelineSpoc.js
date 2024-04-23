import React, { useEffect, useState } from "react";
import Timeline from "react-calendar-timeline";
import "../../../Timeline.css";
import DescriptionModal from "../DescriptionModal";

const TimelineSpoc = (props) => {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState(null);
  useEffect(() => {
    console.log("effect...");
    initialData();
  }, [props.datas, props.changes]);

  const initialData = () => {
    const g = props.channels.map((ch) => {
      return {
        id: ch.id,
        title: ch.code,
        stackItems: true,
      };
    });
    setGroups(g);

    const itms = props.datas.map((tl, idx) => {
      const bg = () => {
        let c = "rgba(200, 200, 200, 0.3)";
        switch (tl.status) {
          case "On Going":
            c = "rgba(255, 255, 99, 0.3)";
            break;
          case "On Hold":
            c = "rgba(99, 99, 99, 0.3)";
            break;
          case "E2E Tests":
            c = "rgba(99, 132, 255, 0.3)";
            break;
          case "Launched":
            c = "rgba(0, 255, 0, 0.3)";
            break;
          case "Finished":
            c = "rgba(99, 255, 132, 0.3)";
            break;
          default:
            break;
        }
        return c;
      };
      const borderBg = () => {
        let c = "rgba(200, 200, 200, 1)";
        switch (tl.status) {
          case "On Going":
            c = "rgba(255, 255, 99, 1)";
            break;
          case "On Hold":
            c = "rgba(99, 99, 99, 1)";
            break;
          case "E2E Tests":
            c = "rgba(99, 132, 255, 1)";
            break;
          case "Launched":
            c = "rgba(0, 255, 0, 1)";
            break;
          case "Finished":
            c = "rgba(99, 255, 132, 1)";
            break;
          default:
            break;
        }
        return c;
      };
      //const idd = tl.channel.id * 1000 + tl.id;
      return {
        id: idx,
        group: tl.channel.id,
        title: "", //tl.id + " - " + tl.title,
        start_time: new Date(tl.start.substring(0, 10)).getTime(),
        end_time:
          new Date(tl.start.substring(0, 10)).getTime() +
          tl.days * 24 * 60 * 60 * 1000,
        itemProps: {
          // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
          "data-custom-attribute": "Random content",
          "aria-hidden": true,
          onMouseDown: () => {
            itemClicked(tl.title);
          },
          onDoubleClick: () => {},
          className: "modal-header",
          style: {
            backgroundColor: bg(),
            color: "black",
            borderColor: borderBg(),
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 5,
            borderLeftWidth: 1,
            borderRightWidth: 1,
          },
        },
      };
    });
    setItems(itms);
  };

  const itemClicked = (item) => {
    console.log(item);
    setDesc({ title: "SR Title", text: item });
  };

  return (
    <div>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={new Date("2023-01-01").getTime()}
        defaultTimeEnd={new Date().getTime()}
      />
      <DescriptionModal
        title={desc != null ? desc.title : ""}
        text={desc != null ? desc.text : ""}
        show={desc != null}
        onClose={() => setDesc(null)}
        onHide={() => setDesc(null)}
      />
    </div>
  );
};

export default TimelineSpoc;
