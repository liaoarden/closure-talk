import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReleaseNotes from "../model/ReleaseNotes";

const release_notes = require("../release_notes.json") as ReleaseNotes[];

export default function InfoView() {
  const [dataVersions, setDataVersions] = useState<string[]>([]);

  const link = (title: string, url: string) => (
    <a href={url} target="_blank" rel="noreferrer">{title}</a>
  );

  useEffect(() => {
    if (dataVersions.length > 0) {
      return;
    }

    (async () => {
      const data = await (await fetch("/resources/versions.json")).json();
      setDataVersions(
        Object.keys(data).sort().map(k => `${k}: ${data[k]}`)
      );
    })();
  }, [dataVersions]);

  return (
    <Stack spacing={1}>
      <Typography variant="h5">Closure Talk</Typography>
      <div>
        <pre>v{release_notes[0].version} ({release_notes[0].date})</pre>
        <pre>{release_notes[0].note}</pre>
        <pre>{dataVersions.join("\n")}</pre>
      </div>
      {release_notes.map((item, idx) => {
        if (idx === 0) {
          return (<div key={idx}>Old Versions</div>);
        }
        return (
          <div key={idx}>
            <pre>v{item.version} ({item.date}){"\n"}{item.note}</pre>
          </div>
        )
      })}

      <Typography variant="body1">More information can be found on {link("Project Homepage", "https://github.com/ClosureTalk/closure-talk")}.</Typography>
      <Typography variant="h6">Credits &amp; Copyrights</Typography>
      <Typography variant="body1">
        This project is inspired by {link("Yuzutalk", "https://www.yuzutalk.net/")}, and the Yuzutalk-style renderer is taken from their website.
      </Typography>
      <Typography variant="body1">
        Character data sources:
        Arknights from {link("Kengxxiao/ArknightsGameData", "https://github.com/Kengxxiao/ArknightsGameData")}.
        Blue Archive from {link("YuzuTalk/translation", "https://github.com/YuzuTalk/translation")}.
      </Typography>
      <Typography variant="body1">
        Arknights avatar copyrights belong to {link("HyperGryph", "https://ak.hypergryph.com/")}; Blue Archive avatar and stamp copyrights belong to {link("Yostar & NEXON Games", "https://bluearchive.jp/")}.
      </Typography>
    </Stack>
  );
}
