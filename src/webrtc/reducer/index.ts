import * as React from 'react';

export type VideoType = 'camera' | 'display' | null;

interface MediaStore {
  stream: MediaStream;
  videoInDevices: MediaDeviceInfo[];
  videoDeviceId: string | null;
  isVideoTrackMuted: boolean;
  videoType: VideoType;
  videoTrack: MediaStreamTrack | null;
}

interface MediaAction {
  type: string;
  payload?: any;
}

const initialState: MediaStore = {
  stream: new MediaStream(),
  videoInDevices: [],
  videoDeviceId: null,
  isVideoTrackMuted: false,
  videoType: null,
  videoTrack: null
};

const reducer: React.Reducer<MediaStore, MediaAction> = (
  state: MediaStore,
  action: MediaAction
) => {
  switch (action.type) {
    case 'SET_VIDEO_TRACK': {
      const { track, type, deviceId } = action.payload;
      return { ...state, videoTrack: track, videoType: type, videoDeviceId: deviceId };
    }

    case 'RELEASE_VIDEO': {
      if (state.videoTrack instanceof MediaStreamTrack) {
        state.videoTrack.stop();
      }
      // stateの変更をwatchしていないといけない?
      return state;
    }

    default:
      return { ...state };
      break;
  }
};

export const useCameraState = () => {
  const [camera, dispatch] = React.useReducer(reducer, initialState);

  const setVideoTrack = React.useCallback(
    (track: MediaStreamTrack, videoType: VideoType, deviceId: string) => {
      dispatch({
        type: 'SET_VIDEO_TRACK',
        payload: { track: track, type: videoType, deviceId: deviceId }
      });
    },
    []
  );

  const releaseVideo = React.useCallback(() => {
    dispatch({ type: 'RELEASE_VIDEO' });
  }, []);

  return { camera, setVideoTrack, releaseVideo };
};
