"use client";
import { useEffect } from "react";
import { startSession } from "./methods";
import { clarity } from "react-microsoft-clarity";

export default function SimpleTrackX() {
  useEffect(() => {
    clarity.init("ghwibrmhxr");
    clarity.consent();
    startSession();
  }, []);

  return <></>;
}
