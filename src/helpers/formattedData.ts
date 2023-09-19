import data from "../near-earth-asteroids.json";
import { discoveryDateFormat } from "./dateFormat";

const formattedData = data.map((row) => {
  return {
    ...row,
    h_mag: Number(row.h_mag),
    moid_au: Number(row.moid_au),
    q_au_1: Number(row.q_au_1),
    q_au_2: Number(row.q_au_2),
    period_yr: Number(row.period_yr),
    i_deg: Number(row.i_deg),
    discovery_date: discoveryDateFormat.format(new Date(row.discovery_date)),
    pha: row.pha === "Y" ? "Yes" : row.pha === "N" ? "No" : "",
  };
});

export default formattedData;