//https://codesandbox.io/s/simple-audio-analyser-wu51m?file=/src/App.js
// https://github.com/dcyoung/r3f-audio-visualizer

import { Suspense } from "react";
import { useControls } from "leva";
import {
  APPLICATION_MODE,
  getAppModeDisplayName,
  getPlatformSupportedApplicationModes,
} from "./components/applicationModes";

import AudioFFTAnalyzer from "./components/analyzers/audioFFTAnalyzer";
import AudioScopeAnalyzer from "./components/analyzers/audioScopeAnalyzer";
import AudioScopeCanvas from "./components/canvas/AudioScope";
import Visual3DCanvas from "./components/canvas/Visual3D";


const getAnalyzerComponent = (mode) => {
  switch (mode) {
    case APPLICATION_MODE.AUDIO:
      return <AudioFFTAnalyzer />;
    case APPLICATION_MODE.AUDIO_SCOPE:
      return <AudioScopeAnalyzer />;
    default:
      return null;
  }
};

const AVAILABLE_MODES = getPlatformSupportedApplicationModes();

const getCanvasComponent = (mode) => {
  switch (mode) {
    case APPLICATION_MODE.AUDIO_SCOPE:
      return <AudioScopeCanvas />;
    default:
      return <Visual3DCanvas mode={mode} />;
  }
};

const AudioPlayer = () => {
  const modeParam = new URLSearchParams(document.location.search).get("mode");
  const { mode } = useControls({
    mode: {
      value:
        modeParam && AVAILABLE_MODES.includes(modeParam)
          ? modeParam
          : AVAILABLE_MODES[0],
      options: AVAILABLE_MODES.reduce(
        (o, mode) => ({ ...o, [getAppModeDisplayName(mode)]: mode }),
        {}
      ),
      order: -100,
    },
  });

  return (
    <Suspense fallback={<span>loading...</span>}>
      {getAnalyzerComponent(mode)}
      {getCanvasComponent(mode)}
    </Suspense>
  );
};
export default AudioPlayer;