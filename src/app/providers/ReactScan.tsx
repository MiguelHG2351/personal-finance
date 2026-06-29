"use client";
// react-scan must be imported before react
import { scan } from "react-scan";
import { JSX, useEffect } from "react";

export function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: process.env.NEXT_PUBLIC_REACT_SCAN === "true",
    });
  }, []);

  return <></>;
}
