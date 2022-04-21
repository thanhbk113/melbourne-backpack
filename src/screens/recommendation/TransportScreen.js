import RecommendationTemplate from "../../components/recommendation/template/RecommendationTemplate";
import { useEffect, useState } from "react";

import { DEVID, ROUTE_TYPE_SIGNATURE, TRANSPORT_SIGNATURE } from "@env";

const TransportScreen = () => {
  const [rawData, setRawData] = useState([]);
  const [routeType, setRouteType] = useState([]);
  const typeUrl = `http://timetableapi.ptv.vic.gov.au/v3/route_types?devid=${DEVID}&signature=${ROUTE_TYPE_SIGNATURE}`;

  const lat = "-37.8080770201347";
  const long = "144.96268921184907";
  const dataUrl = `http://timetableapi.ptv.vic.gov.au/v3/stops/location/${lat},${long}?devid=${DEVID}&signature=${TRANSPORT_SIGNATURE}`;

  const getRouteType = () => {
    fetch(typeUrl)
      .then((res) => res.json())
      .then((data) => setRouteType(data["route_types"]));
  };

  const getRawData = () => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => setRawData(data["stops"]));
  };

  const defineRouteType = (type) => {
    let routeName = "";
    routeType.map((route) => {
      if (route["route_type"] === type) {
        routeName = route["route_type_name"];
      }
    });
    return routeName;
  };

  const getRouteNumAndName = (routes) => {
    const routeInfo = [];
    routes.map((route) => {
      routeInfo.push({
        routeName: route["route_name"],
        routNum: route["route_number"],
      });
    });
    return routeInfo;
  };

  const processRawData = () => {
    const processedData = [];
    rawData.map((data) => {
      processedData.push({
        stopName: data["stop_name"],
        stopLat: data["stop_latitude"],
        stopLong: data["stop_longitude"],
        transportationType: defineRouteType(data["route_type"]),
        route: getRouteNumAndName(data["routes"]),
      });
    });
    return processedData;
  };

  useEffect(() => {
    getRouteType();
    getRawData();
  }, []);

  const categories = ["Distance from RMIT"];

  return (
    <RecommendationTemplate
      data={processRawData()}
      topic="Transportation"
      categories={categories}
      transport
    />
  );
};

export default TransportScreen;
